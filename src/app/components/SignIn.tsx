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
  ...props
}: Omit<TransitionLinkProps, "href" | "field" | "document"> & {
  signInText?: string;
}) {
  const user = useAtomValue(userAtom);
  const { imisLoginUrl } = useSignIn();

  return (
    <LinkButton
      {...props}
      field={
        user?.id
          ? {
              link_type: "Web",
              url: "",
              text: "",
            }
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
  ...props
}: Omit<TransitionLinkProps, "href" | "document" | "field"> & {
  signInText?: string;
}) {
  const user = useAtomValue(userAtom);
  const { imisLoginUrl } = useSignIn();

  return (
    <TransitionLink
      {...props}
      field={
        user?.id
          ? {
              link_type: "Web",
              url: "",
              text: "",
            }
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

