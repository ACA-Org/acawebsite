"use client";

import { FileQuestion } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="space-y-2">
          <div className="flex justify-center">
            <FileQuestion className="text-muted-foreground h-24 w-24" />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter">
            Page Not Found
          </h1>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="focus-visible:ring-ring ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
