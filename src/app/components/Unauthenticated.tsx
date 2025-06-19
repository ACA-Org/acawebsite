"use client";

import { useSignIn } from "@/app/hooks/useSignIn";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Unauthenticated() {
  const { signIn } = useSignIn();
  const router = useRouter();

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-8 px-4">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold text-blue-300">
          Authentication Required
        </h1>
        <p className="max-w-md text-lg text-gray-600">
          To access this content, please sign in to your account. If you
          don&apos;t have an account, you can create one during the sign-in
          process.
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button variant="primary" onClick={() => signIn()}>
          Sign In
        </Button>
        <Button variant="primary" outlined onClick={() => router.back()}>
          Go Back
        </Button>
      </div>
    </div>
  );
}

