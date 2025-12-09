"use client";

import { useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ORCIDLoginButton from "@/app/components/ORCIDLoginButton";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { signIn } = useAuth();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-[400px] w-full bg-white border rounded-xl p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-center mb-3">Login to KIUL</h1>
        
        <p className="text-sm text-center text-gray-600 mb-6 leading-relaxed">
          Access your personalized learning journey. Log in to view your saved courses, track your progress, and continue your Ubuntu-informed education experience.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>
            <input
              type="email"
              required
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:border-[var(--kiul-green)]"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              required
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:border-[var(--kiul-green)]"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-[var(--kiul-green)] text-white rounded-xl font-semibold
                       hover:bg-[var(--kiul-green-dark)] transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <ORCIDLoginButton />

        <p className="text-center text-sm text-[var(--kiul-text-soft)] mt-6">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="text-[var(--kiul-green)] hover:underline font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
