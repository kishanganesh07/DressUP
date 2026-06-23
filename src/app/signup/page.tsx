"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
// Remove axios import

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        router.push("/login");
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err: unknown) {
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-zinc-50">
      <div className="max-w-md w-full space-y-8 bg-white p-10 border border-zinc-200 shadow-sm relative overflow-hidden">
        <div className="text-center">
          <h1 className="text-3xl font-medium text-zinc-900 tracking-tight mb-2 uppercase">
            Create an Account
          </h1>
          <p className="text-zinc-500 text-sm">Join us for exclusive clothing collections.</p>
        </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-zinc-700">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-2 appearance-none relative block w-full px-4 py-3 border border-zinc-300 bg-white placeholder-zinc-400 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm transition-all"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-2 appearance-none relative block w-full px-4 py-3 border border-zinc-300 bg-white placeholder-zinc-400 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm transition-all"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-2 appearance-none relative block w-full px-4 py-3 border border-zinc-300 bg-white placeholder-zinc-400 text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 sm:text-sm transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium text-white bg-zinc-900 hover:bg-black transition-colors duration-300 disabled:opacity-70 uppercase tracking-widest"
            >
              {loading ? (
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                "Create Account"
              )}
            </button>
        </form>

        <p className="mt-8 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="text-zinc-900 font-medium hover:text-zinc-600 transition-colors border-b border-zinc-900 pb-0.5">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}