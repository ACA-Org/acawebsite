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

  return (
    <LinkButton
      {...props}
      document={undefined}
      field={
        user?.id
          ? undefined
          : {
              link_type: "Web",
              url: imisLoginUrl,
              text: signInText,
            }
      }
      onClick={(e) => {
        if (user?.id) {
          e.preventDefault();
          signOut();
        }
        props.onClick?.(e);
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

  return (
    <TransitionLink
      {...props}
      document={undefined}
      field={
        user?.id
          ? undefined
          : {
              link_type: "Web",
              url: imisLoginUrl,
              text: signInText,
            }
      }
      onClick={(e) => {
        if (user?.id) {
          e.preventDefault();
          signOut();
        }
        props.onClick?.(e);
      }}
    />
  );
}

