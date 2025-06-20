import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function truncateString({
  input,
  charCount = 60,
}: {
  input: string;
  charCount: number;
}) {
  return input.slice(0, charCount) + "...";
}

export function getRemaining({
  howMuch,
  outOf,
}: {
  outOf: number;
  howMuch: number;
}) {
  return outOf - howMuch;
}
