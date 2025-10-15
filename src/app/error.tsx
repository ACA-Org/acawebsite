"use client";

import { Button } from "@/components/ui/button";
import { LinkButton } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-3xl font-bold">Something went wrong</h1>
        <p className="mb-6 text-gray-600">
          An error occurred while loading this page.
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={reset}>Try Again</Button>
          <LinkButton href="/" variant="secondary">
            Go Home
          </LinkButton>
        </div>
      </div>
    </div>
  );
}
