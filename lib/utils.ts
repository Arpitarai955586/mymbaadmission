import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Backend/database se cover image URL: full URL, /uploads/filename, ya sirf filename */
export function getCollegeCoverUrl(cover: string | undefined): string {
  if (!cover || !cover.trim()) return "https://via.placeholder.com/300"
  const c = cover.trim()
  if (c.startsWith("http://") || c.startsWith("https://")) return c
  if (c.startsWith("/")) return c
  if (c.startsWith("uploads/")) return `/${c}`
  return `/uploads/${c}`
}
