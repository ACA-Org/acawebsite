"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

export default function CompleteSignIn() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    const completeSignIn = async () => {
      if (!token) {
        console.error("No token provided");
        window.location.href = "/auth/error?error=NoToken";
        return;
      }

      try {
        const result = await signIn("imis", {
          token,
          redirect: true,
          callbackUrl: "/", // or wherever you want to redirect after successful login
        });

        if (result?.error) {
          console.error("Sign in error:", result.error);
          window.location.href = `/auth/error?error=${encodeURIComponent(result.error)}`;
        }
      } catch (error) {
        console.error("Error during sign in:", error);
        window.location.href = "/auth/error?error=SignInFailed";
      }
    };

    completeSignIn();
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Completing sign in...
          </h2>
          <div className="mt-8 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
