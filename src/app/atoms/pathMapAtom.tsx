"use client";

import { atom } from "jotai";
import { PathMapData } from "../actions/getPathMap";

// Simple atom that stores the path map object
// This is hydrated from server-side in the layout
export const pathMapAtom = atom<PathMapData>({});
