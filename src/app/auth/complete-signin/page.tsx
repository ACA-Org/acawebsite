"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CompleteSignIn() {
  const searchParams = useSearchParams();
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  useEffect(() => {
    const cookies = document.cookie.split(";");
    // Check for both authCallbackUrl (from middleware) and redirectUrl (legacy)
    const redirectCookie = cookies.find(
      (cookie) =>
        cookie.trim().startsWith("authCallbackUrl=") ||
        cookie.trim().startsWith("redirectUrl=")
    );
    let savedRedirectUrl = null;

    if (redirectCookie) {
      const cookieName = redirectCookie.trim().split("=")[0];
      savedRedirectUrl = decodeURIComponent(redirectCookie.split("=")[1]);

      // Clear both possible cookie names
      document.cookie = `${cookieName}=;max-age=0;path=/`;
      setRedirectUrl(savedRedirectUrl);
    }

    (async () => {
      let token;
      let userName;
      try {
        token = searchParams.get("token");
        userName = searchParams.get("userName");
      } catch (error) {
        console.error(
          "CompleteSignIn: Error extracting token from search params:",
          error
        );
        window.location.href = "/auth/error?error=TokenExtractionFailed";
        return;
      }

      if (!token) {
        console.error("CompleteSignIn: No token provided in search params");
        window.location.href = "/auth/error?error=NoToken";
        return;
      }

      try {
        const result = await signIn("imis", {
          token,
          userName: userName || undefined,
          redirect: false, // Don't use NextAuth's redirect, handle it manually
        });

        if (result?.error) {
          console.error(
            "CompleteSignIn: Sign-in failed with error:",
            result.error
          );
          console.error(
            "CompleteSignIn: Full result object:",
            JSON.stringify(result, null, 2)
          );
          window.location.href = `/auth/error?error=${encodeURIComponent(result.error)}`;
          return;
        }

        // If sign-in was successful, redirect to the saved URL or home
        if (result?.ok) {
          window.location.href = savedRedirectUrl || "/";
          return;
        }
      } catch (error) {
        console.error(
          "CompleteSignIn: Unexpected error during sign-in process:",
          error
        );
        if (error instanceof Error) {
          console.error("CompleteSignIn: Error details:", {
            name: error.name,
            message: error.message,
            stack: error.stack,
          });
        }
        window.location.href = "/auth/error?error=SignInFailed";
        return;
      }
    })();
  }, [searchParams]);

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-8 px-4">
      <div className="space-y-4 text-center">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Completing sign in...
        </h2>
        {redirectUrl && (
          <p className="mt-2 text-center text-sm text-gray-600">
            You will be redirected back to where you were
          </p>
        )}
        <div className="mt-8 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
        </div>
      </div>
    </div>
  );
}
