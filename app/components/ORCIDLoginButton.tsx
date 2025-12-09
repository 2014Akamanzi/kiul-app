"use client";

import { supabase } from "../lib/supabaseClient";

export default function ORCIDLoginButton() {
  const login = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "orcid" as any,
        options: {
          scopes: "openid profile email",
          redirectTo: window.location.origin + "/auth/callback",
        },
      });

      if (error) {
        console.error("ORCID login error:", error);
        alert("ORCID login failed. Please ensure ORCID is enabled in Supabase.");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <button
      onClick={login}
      className="w-full px-6 py-3 bg-green-700 text-white rounded-xl font-semibold hover:bg-green-800 transition-colors flex items-center justify-center gap-3"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="256" height="256" rx="128" fill="white" />
        <path
          d="M77 138.5C77 125.521 87.521 115 100.5 115C113.479 115 124 125.521 124 138.5C124 151.479 113.479 162 100.5 162C87.521 162 77 151.479 77 138.5Z"
          fill="#A6CE39"
        />
        <path
          d="M144 115H164V162H144V115Z"
          fill="#A6CE39"
        />
        <path
          d="M184 115H204C215.046 115 224 123.954 224 135C224 146.046 215.046 155 204 155H184V115Z"
          fill="#A6CE39"
        />
      </svg>
      Sign in with ORCID
    </button>
  );
}
