"use client";

import { atom } from "jotai";
import { PageData } from "../actions/getSearchData";

export const pageInfoAtom = atom<PageData[]>([]);

