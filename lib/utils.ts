import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Escapes HTML special characters in text content to prevent XSS attacks.
 * This is for escaping text only, not for sanitizing HTML markup.
 * Renamed from sanitizeHtml to clarify its purpose.
 */
export function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .replace(/\//g, "&#x2F;");
}

export function getImageUrl(url: string): string {
  if (!url) return "/placeholder.jpg";
  if (url.startsWith("http")) return url;
  return `${process.env.NEXT_PUBLIC_API_URL || ""}${url}`;
}
