"use client";

import { Button, ButtonProps } from "@/components/ui/button";
import { useSignIn } from "../hooks/useSignIn";
import { signOut } from "next-auth/react";
import { userAtom } from "../atoms/userAtom";
import { useAtomValue } from "jotai";

export function AuthButton(props: ButtonProps) {
  const user = useAtomValue(userAtom);
  const { signIn } = useSignIn();

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
  const user = useAtomValue(userAtom);
  const { signIn } = useSignIn();

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

