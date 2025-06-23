import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type Params = {
  tier_one_uid: string;
  tier_two_uid: string;
  tier_three_uid: string;
  tier_four_uid: string;
};
