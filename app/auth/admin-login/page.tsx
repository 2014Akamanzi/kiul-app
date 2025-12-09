"use client";

import { useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
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

    const { error: signInError } = await signIn(email, password);

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
    } else {
      // Redirect to admin dashboard
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="w-full min-h-[80vh] flex items-center justify-center px-4">
      <div className="max-w-[400px] w-full bg-white border rounded-xl p-8 shadow-sm">
        {/* Admin Badge */}
        <div className="flex justify-center mb-4">
          <div className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full font-semibold text-sm">
            🔐 Admin Portal
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-3">Admin Login</h1>
        
        <p className="text-sm text-center text-gray-600 mb-6 leading-relaxed">
          Authorized administrators only. Log in to access the KIUL admin portal and manage learning materials, publications, and system resources.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2">Admin Email</label>
            <input
              type="email"
              required
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:border-emerald-500"
              placeholder="admin@kiul.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              required
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:border-emerald-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold
                       hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login to Admin Portal"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-center text-sm text-gray-600">
            Not an admin?{" "}
            <Link href="/auth/login" className="text-emerald-600 hover:text-emerald-700 font-semibold">
              Regular Login
            </Link>
          </p>
        </div>

        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-800 text-center">
            ⚠️ This portal is restricted to authorized KIUL administrators. Unauthorized access attempts are logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
}
