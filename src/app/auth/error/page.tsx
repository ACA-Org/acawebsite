"use client";

import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSignIn } from "@/app/hooks/useSignIn";

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const { signIn } = useSignIn();

  const getErrorMessage = (errorCode: string | null) => {
    switch (errorCode) {
      case "Configuration":
        return "There is a problem with the server configuration.";
      case "AccessDenied":
        return "You do not have permission to sign in.";
      case "Verification":
        return "The verification failed. Please try signing in again.";
      default:
        return "An error occurred during authentication. Please try again.";
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md space-y-8 p-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <div className="mt-4">
            <p className="text-center text-red-600">{getErrorMessage(error)}</p>
          </div>
          <div className="mt-8 flex justify-center">
            <Button
              onClick={() => signIn()}
              className="rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
