// app/page.tsx
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
      <div className="max-w-xl mx-auto p-6 rounded-xl bg-slate-900 shadow-lg border border-slate-800">
        <h1 className="text-3xl font-semibold mb-4">
          Hi, I&apos;m Ankit Dimri – Full‑Stack Developer
        </h1>
        <p className="text-slate-300 mb-4">
          This task manager app is my internship submission. It demonstrates
          secure authentication (JWT in HTTP‑only cookies), end‑to‑end AES
          encryption, clean REST APIs, and a responsive Next.js frontend
          connected to a MongoDB Atlas backend.
        </p>
        <p className="text-slate-300 mb-4">
          On the backend, I built modular Express controllers with proper
          validation, pagination, search, and user‑scoped authorization so each
          user only sees their own tasks. On the frontend, I used Next.js and
          Axios to integrate the APIs with protected routes and a simple,
          focused UI.
        </p>
        <p className="text-slate-300 mb-6">
          I value clear architecture, security‑first design, and fast
          iterations. I would be excited to bring the same mindset and execution
          speed to your team during this internship.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            href="/register"
            className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-medium hover:bg-emerald-400 transition"
          >
            Try the app (Register)
          </Link>

          <a
            href="https://github.com/AnkitDimri4/fullstack-task-manager.git"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg border border-slate-600 text-slate-200 hover:bg-slate-600 transition"
          >
            View Source Code
          </a>

          <a
            href="https://portfolio-nine-orcin-33.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg border  bg-cyan-600 border-slate-600 text-slate-200 hover:bg-cyan-400 transition"
          >
            View Portfolio
          </a>
        </div>
      </div>
    </main>
  );
}
