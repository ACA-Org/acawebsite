"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function CompleteSignIn() {
  const searchParams = useSearchParams();
  console.log("CompleteSignIn: Starting sign-in completion process");

  useEffect(() => {
    (async () => {
      let token;
      let userName;
      try {
        token = searchParams.get("token");
        userName = searchParams.get("userName");
        console.log(
          "CompleteSignIn: Successfully extracted token and userName from search params"
        );
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

      console.log("CompleteSignIn: Attempting to sign in with iMIS provider");

      try {
        console.log(
          "CompleteSignIn: Initiating sign-in with token length:",
          token.length
        );
        const result = await signIn("imis", {
          token,
          userName: userName || undefined,
          redirect: true,
          callbackUrl: "/", // or wherever you want to redirect after successful login
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

        console.log("CompleteSignIn: Sign-in successful, awaiting redirect");
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

  console.log(
    "CompleteSignIn: Rendering loading state while redirect processes"
  );

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

