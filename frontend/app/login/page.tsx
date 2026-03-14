"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api, { encryptRequest, decryptResponse } from "../../services/api";

type PlainObject = Record<string, unknown>;

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const body = encryptRequest(form);
      const res = await api.post("/auth/login", body);

      if (res.data.success) {
        router.push("/dashboard");
      } else {
        try {
          const data = decryptResponse(res.data.data) as PlainObject;
          setError(
            (data.message as string) || "Login failed"
          );
        } catch {
          setError("Login failed");
        }
      }
    } catch {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold text-slate-200">
            Welcome back
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Sign in to manage your tasks
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className=" bg-linear-to-br from-slate-900 via-slate-900 to-slate-900 rounded-2xl shadow-sm border px-6 pt-6 pb-7"
        >
          {error && (
            <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-md px-3 py-2 mb-3">
              {error}
            </p>
          )}

          <div className="mb-3">
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Email
            </label>
            <input
              className="border border-slate-300 text-slate-200 rounded-lg w-full py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-xs font-medium text-slate-400 mb-1.5">
              Password
            </label>
            <input
              className="bg-slate-800 border border-slate-300  text-slate-200 rounded-lg w-full py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-2.5 px-4 rounded-lg text-sm shadow-sm transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-center text-sm text-slate-400 mt-4">
            Don&apos;t have an account?{" "}
            <a
              href="/register"
              className="text-blue-600 hover:underline font-medium"
            >
              Register
            </a>
          </p>
        </form>
      </div>
    </main>
  );
}
