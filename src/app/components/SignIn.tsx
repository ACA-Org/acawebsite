"use client";

import {
  TransitionLinkProps,
  TransitionLink,
  LinkButton,
} from "@/components/ui/button";
import { useSignIn } from "../hooks/useSignIn";
import { signOut } from "next-auth/react";
import { userAtom } from "../atoms/userAtom";
import { useAtomValue } from "jotai";

export function AuthButton({
  signInText = "Sign In",
  signOutText = "Sign Out",
  ...props
}: Omit<TransitionLinkProps, "href" | "field"> & {
  signInText?: string;
  signOutText?: string;
}) {
  const user = useAtomValue(userAtom);
  const { imisLoginUrl } = useSignIn();

  if (user) {
    return (
      <LinkButton
        {...props}
        field={{
          link_type: "Web",
          url: "",
          text: signOutText,
        }}
        document={undefined}
        onClick={(e) => {
          e.preventDefault();
          signOut();
          props.onClick?.(e);
        }}
        href={undefined}
      />
    );
  }

  return (
    <LinkButton
      {...props}
      document={undefined}
      field={{
        link_type: "Web",
        url: imisLoginUrl,
        text: signInText,
      }}
    />
  );
}

export function AuthTextLink({
  signInText = "Sign In",
  signOutText = "Sign Out",
  ...props
}: Omit<TransitionLinkProps, "href"> & {
  signInText?: string;
  signOutText?: string;
}) {
  const user = useAtomValue(userAtom);
  const { imisLoginUrl } = useSignIn();

  if (user) {
    return (
      <TransitionLink
        {...props}
        field={{
          link_type: "Web",
          url: "",
          text: signOutText,
        }}
        document={undefined}
        onClick={(e) => {
          e.preventDefault();
          signOut();
          props.onClick?.(e);
        }}
        href={undefined}
      />
    );
  }

  return (
    <TransitionLink
      {...props}
      document={undefined}
      field={{
        link_type: "Web",
        url: imisLoginUrl,
        text: signInText,
      }}
    />
  );
}

