"use client";

import { atom } from "jotai";
import { User } from "next-auth";

export const userAtom = atom<Partial<User> | null>(null);

