"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SyntheticEvent } from "react";
import api, { encryptRequest, decryptResponse } from "../../services/api";

type Task = {
  _id: string;
  title: string;
  description?: string;
  status: "pending" | "completed";
  createdAt?: string;
};

type PlainObject = Record<string, unknown>;

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const params: Record<string, string | number> = { page, limit: 10 };
      if (search) params.search = search;
      if (statusFilter) params.status = statusFilter;

      const res = await api.get("/tasks", { params });

      if (!res.data.success) {
        try {
          const data = decryptResponse(res.data.data) as PlainObject;
          if (data.message === "Unauthorized") {
            router.push("/login");
            return;
          }
          setError((data.message as string) || "Failed to fetch tasks");
        } catch {
          setError("Failed to fetch tasks");
        }
        return;
      }

      const data = decryptResponse(res.data.data);
      setTasks(data as unknown as Task[]);
    } catch {
      setError("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, statusFilter]);

  const handleLogout = () => {
    router.push("/login");
  };

  const handleChangeForm = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ title: "", description: "", status: "pending" });
    setEditingId(null);
  };

  const handleCreateOrUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    setError("");

    try {
      const body = encryptRequest({
        title: form.title,
        description: form.description,
        status: form.status,
      });

      if (editingId) {
        const res = await api.put(`/tasks/${editingId}`, body);
        if (!res.data.success) {
          const data = decryptResponse(res.data.data) as PlainObject;
          setError((data.message as string) || "Failed to update task");
          return;
        }
      } else {
        const res = await api.post("/tasks", body);
        if (!res.data.success) {
          const data = decryptResponse(res.data.data) as PlainObject;
          setError((data.message as string) || "Failed to create task");
          return;
        }
      }

      resetForm();
      fetchTasks();
    } catch {
      setError("Something went wrong");
    }
  };

  const handleEdit = (task: Task) => {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description || "",
      status: task.status,
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    setError("");

    try {
      const res = await api.delete(`/tasks/${id}`);
      if (!res.data.success) {
        const data = decryptResponse(res.data.data) as PlainObject;
        setError((data.message as string) || "Failed to delete task");
        return;
      }
      fetchTasks();
    } catch {
      setError("Failed to delete task");
    }
  };
  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      <header className="sticky top-0 z-20 bg-slate-950/80 backdrop-blur border-b border-slate-800/60 px-6 py-4 flex items-center justify-between shadow-sm">
        <h1 className="text-xl font-semibold tracking-tight flex items-center gap-2">
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-sky-500/20 text-sky-400 text-xs font-bold animate-pulse">
            TM
          </span>
          <span>Task Manager Dashboard</span>
        </h1>
        <button
          onClick={handleLogout}
          className="bg-rose-700 hover:bg-rose-900 active:bg-rose-700 text-white
                   px-4 py-2 rounded-md text-xs sm:text-sm shadow-sm
                   transition-all duration-150 ease-out
                   hover:-translate-y-0.5 active:translate-y-0
                   hover:shadow-md"
        >
          Logout
        </button>
      </header>

      <section className="max-w-5xl mx-auto py-8 px-4 space-y-6">
        {error && (
          <p className="text-rose-300 text-sm bg-rose-950/40 border border-rose-800/60 rounded-md px-3 py-2 flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-ping" />
            <span>{error}</span>
          </p>
        )}

        {/* Filter & Search */}
        <div
          className="bg-slate-900/70 rounded-2xl shadow-lg shadow-slate-950/40 border border-slate-800/70 px-4 py-3 flex flex-wrap items-center gap-3
                      transition-all duration-200 hover:border-sky-500/60 hover:shadow-sky-900/40"
        >
          <input
            placeholder="Search tasks by title..."
            className="border border-slate-700/80 bg-slate-900/60 rounded-lg px-3 py-2 flex-1 min-w-40 text-xs sm:text-sm
                     text-slate-50 placeholder:text-slate-500
                     focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-400
                     transition-all duration-150"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
          <select
            className="border border-slate-700/80 bg-slate-900/60 rounded-lg px-3 py-2.5 text-xs sm:text-sm
                     text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-400
                     transition-all duration-150"
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Create / Edit Form */}
        <form
          onSubmit={handleCreateOrUpdate}
          className="bg-slate-900/80 rounded-2xl shadow-lg shadow-slate-950/40 border border-slate-800/70 px-5 py-5 space-y-3
                   transition-transform duration-200 hover:-translate-y-0.5 hover:border-sky-500/60 hover:shadow-sky-900/40"
        >
          <h2 className="text-base sm:text-lg font-semibold text-slate-50 flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-sky-500/15 text-sky-400 text-xs">
              {editingId ? "✎" : "+"}
            </span>
            <span>{editingId ? "Edit Task" : "Create Task"}</span>
          </h2>

          <div>
            <input
              name="title"
              placeholder="Task title"
              className="border border-slate-700/80 bg-slate-950/60 rounded-lg w-full px-3 py-2 text-xs sm:text-sm
                       text-slate-50 placeholder:text-slate-500
                       focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-400
                       transition-all duration-150"
              value={form.title}
              onChange={handleChangeForm}
              required
            />
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Short description (optional)"
              className="border border-slate-700/80 bg-slate-950/60 rounded-lg w-full px-3 py-2 text-xs sm:text-sm
                       text-slate-50 placeholder:text-slate-500
                       focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-400
                       transition-all duration-150"
              value={form.description}
              onChange={handleChangeForm}
              rows={3}
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              name="status"
              className="border border-slate-700/80 bg-slate-950/60 rounded-lg px-3 py-2 text-xs sm:text-sm
                       text-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-400
                       transition-all duration-150"
              value={form.status}
              onChange={handleChangeForm}
            >
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>

            <div className="flex gap-2 ml-auto">
              <button
                type="submit"
                className="bg-sky-500 hover:bg-sky-600 active:bg-sky-700 text-white
                         px-4 py-2 rounded-md text-xs sm:text-sm shadow-sm
                         transition-all duration-150 ease-out
                         hover:-translate-y-0.5 active:translate-y-0
                         hover:shadow-sky-900/40"
              >
                {editingId ? "Update Task" : "Create Task"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="border border-slate-700/80 text-slate-200
                           hover:bg-slate-900 active:bg-slate-800
                           px-4 py-2 rounded-md text-xs sm:text-sm
                           transition-colors duration-150"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
        </form>

        {/* Task List */}
        <div
          className="bg-slate-900/80 rounded-3xl shadow-lg shadow-slate-950/60 border border-slate-800/70 px-5 py-4
                      transition-transform duration-200 hover:-translate-y-0.5 hover:border-sky-600/60 hover:shadow-sky-900/40"
        >
          <h2 className="text-base sm:text-lg font-semibold mb-3 text-slate-50 flex items-center gap-2">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-sky-500/15 text-sky-400 text-[10px]">
              ✔
            </span>
            <span>Tasks</span>
          </h2>

          {loading ? (
            <p className="text-xs sm:text-sm text-slate-400 animate-pulse">
              Loading tasks...
            </p>
          ) : tasks.length === 0 ? (
            <p className="text-xs sm:text-sm text-slate-400">
              No tasks found. Create your first one above.
            </p>
          ) : (
            <ul className="divide-y divide-slate-800/80">
              {tasks.map((task) => (
                <li
                  key={task._id}
                  className="py-3 flex items-start justify-between gap-3
                           transition-colors duration-150 hover:bg-slate-900/70"
                >
                  <div>
                    <p className="font-medium text-slate-50 text-sm">
                      {task.title}{" "}
                      <span
                        className={`text-[10px] ml-2 px-2 py-0.5 rounded-full align-middle
                        ${
                          task.status === "completed"
                            ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-200 border border-amber-500/30"
                        }`}
                      >
                        {task.status}
                      </span>
                    </p>
                    {task.description && (
                      <p className="text-[11px] text-slate-400 mt-1">
                        {task.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-[11px] px-3 py-1.5 rounded-md
                               bg-slate-800 hover:bg-slate-700 text-slate-100
                               transition-all duration-150 hover:-translate-y-0.5"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="text-[11px] px-3 py-1.5 rounded-md
                               bg-rose-700 hover:bg-rose-900 active:bg-rose-800 text-white
                               shadow-sm transition-all duration-150
                               hover:-translate-y-0.5 hover:shadow-rose-900/40"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="flex justify-end items-center gap-2 mt-4">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-1.5 border border-slate-700/80 rounded-md text-[11px] sm:text-xs
                       text-slate-200 disabled:opacity-35 disabled:cursor-not-allowed
                       hover:bg-slate-900 active:bg-slate-800
                       transition-colors duration-150"
            >
              Previous
            </button>
            <span className="text-[11px] text-slate-400 px-2 py-1">
              Page {page}
            </span>
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 border border-slate-700/80 rounded-md text-[11px] sm:text-xs
                       text-slate-200 hover:bg-slate-900 active:bg-slate-800
                       transition-colors duration-150"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
