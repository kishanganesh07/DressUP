"use client";

import { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
interface AuthModalProps {
  onClose: () => void;
  onSuccess: (user: any) => void;
}

export default function AuthModal({ onClose, onSuccess }: AuthModalProps) {
  const [view, setView] = useState<"login" | "signup" | "forgot">("login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMsg("");

    try {
      if (view === "forgot") {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: formData.email }),
        });
        const data = await res.json();
        if (data.success) {
          setSuccessMsg(data.message || "Reset link sent! Please check your email.");
          // Clear email
          setFormData({ ...formData, email: "" });
        } else {
          setError(data.message || "Failed to send reset link.");
        }
        setLoading(false);
        return;
      }

      const endpoint = view === "login" ? "/api/auth/login" : "/api/auth/signup";
      const payload = view === "login" 
        ? { email: formData.email, password: formData.password }
        : formData;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      
      if (data.success) {
        if (view === "login") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          onSuccess(data.user);
          onClose();
        } else {
          // Signup success -> switch to login
          setView("login");
          setError("");
          alert("Account created! Please sign in.");
        }
      } else {
        setError(data.message || "Something went wrong.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        onSuccess(data.user);
        onClose();
      } else {
        setError(data.message || "Google Authentication failed.");
      }
    } catch (err) {
      setError("An unexpected error occurred during Google Sign-In.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-zinc-950/40 backdrop-blur-sm transition-all duration-300">
      <div className="relative w-full max-w-[500px] bg-[#fdfcfb] border border-zinc-200 rounded-3xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-100">
          <h2 className="text-2xl font-serif text-zinc-900 tracking-wide">
            {view === "login" ? "Welcome Back" : view === "signup" ? "Create Account" : "Reset Password"}
          </h2>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-8 sm:p-10">
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm text-center">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-100 text-green-600 text-sm text-center">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {view === "signup" && (
              <div className="space-y-1">
                <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={view === "signup"}
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-lg focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-zinc-900 transition-all"
                  placeholder="John Doe"
                />
              </div>
            )}
            
            <div className="space-y-1">
              <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-lg focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-zinc-900 transition-all"
                placeholder="you@example.com"
              />
            </div>

            {view !== "forgot" && (
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">Password</label>
                  {view === "login" && (
                    <button
                      type="button"
                      onClick={() => {
                        setView("forgot");
                        setError("");
                        setSuccessMsg("");
                      }}
                      className="text-[10px] text-zinc-400 hover:text-zinc-900 font-medium uppercase tracking-wider transition-colors"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-zinc-200 rounded-lg focus:ring-1 focus:ring-zinc-900 focus:border-zinc-900 text-zinc-900 transition-all"
                  placeholder="••••••••"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-4 bg-zinc-900 text-white rounded-lg text-[11px] font-bold uppercase tracking-[0.15em] hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing
                </span>
              ) : view === "login" ? (
                "Sign In"
              ) : view === "signup" ? (
                "Create Account"
              ) : (
                "Send Reset Link"
              )}
            </button>
            
            {view !== "forgot" && (
              <>
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-zinc-200"></div>
                  <span className="flex-shrink-0 mx-4 text-zinc-400 text-xs uppercase tracking-widest font-medium">Or</span>
                  <div className="flex-grow border-t border-zinc-200"></div>
                </div>

                <div className="flex justify-center w-full">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                      setError("Google Login Failed");
                    }}
                    theme="outline"
                    size="large"
                    text={view === "login" ? "signin_with" : "signup_with"}
                    shape="rectangular"
                  />
                </div>
              </>
            )}
          </form>

          <div className="mt-8 pt-6 border-t border-zinc-100 text-center flex flex-col gap-3">
            {view === "forgot" ? (
              <button
                onClick={() => {
                  setView("login");
                  setError("");
                  setSuccessMsg("");
                }}
                className="text-sm font-medium text-zinc-900 hover:text-zinc-600 transition-colors border-b border-zinc-900 pb-0.5 inline-block mx-auto"
              >
                Back to Sign In
              </button>
            ) : (
              <p className="text-sm text-zinc-500">
                {view === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                  onClick={() => {
                    setView(view === "login" ? "signup" : "login");
                    setError("");
                    setSuccessMsg("");
                  }}
                  className="font-medium text-zinc-900 hover:text-zinc-600 transition-colors border-b border-zinc-900 pb-0.5"
                >
                  {view === "login" ? "Create one" : "Sign in"}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
