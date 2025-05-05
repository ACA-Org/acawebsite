"use client";

import { PathMap } from "@/lib/prismicPathMap";
import { atom } from "jotai";

export const pathMapAtom = atom<PathMap | null>(null);
