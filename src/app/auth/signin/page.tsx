"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SignIn() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    // Redirect to IMIS login page
    const imisLoginUrl = process.env.NEXT_PUBLIC_IMIS_LOGIN_URL;
    const redirectUrl = `${window.location.origin}/api/auth/imis`;

    window.location.href = `${imisLoginUrl}?redirect_uri=${encodeURIComponent(redirectUrl)}`;
  }, []);

  // Show loading state while redirecting
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Redirecting to IMIS...
          </h2>
          {error && (
            <p className="mt-2 text-center text-sm text-red-600">
              {error === "Callback"
                ? "Error during login. Please try again."
                : error}
            </p>
          )}
          <div className="mt-8 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

