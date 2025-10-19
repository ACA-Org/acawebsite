"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useSignIn } from "../hooks/useSignIn";
import { signOut, useSession } from "next-auth/react";

export function AuthButton(props: ButtonProps) {
  const { signIn } = useSignIn();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <Button
      {...props}
      type="button"
      onClick={() => {
        if (user?.id) {
          signOut();
        } else {
          signIn();
        }
      }}
    >
      {props?.children || (user?.id ? "Sign Out" : "Sign In")}
    </Button>
  );
}

export function AuthTextLink(props: React.HTMLAttributes<HTMLSpanElement>) {
  const { signIn } = useSignIn();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <span
      {...props}
      role="button"
      onClick={() => {
        if (user?.id) {
          signOut();
        } else {
          signIn();
        }
      }}
    >
      {props?.children || (user?.id ? "Sign Out" : "Sign In")}
    </span>
  );
}
