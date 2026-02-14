/**
 * Image utility functions for blogs
 */

export const DEFAULT_BLOG_IMAGE = "https://via.placeholder.com/600x400?text=Blog+Image"

export function getImageUrl(imageUrl?: string): string {
  if (!imageUrl) {
    return DEFAULT_BLOG_IMAGE
  }

  // If it's already a full URL, return it
  if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
    return imageUrl
  }

  // If it's a relative URL from our uploads, prepend the base URL if needed
  if (imageUrl.startsWith("/")) {
    return imageUrl
  }

  // Otherwise, prepend /uploads/blogs/
  return `/uploads/blogs/${imageUrl}`
}

export function getImageAlt(title?: string): string {
  return title ? `${title} image` : "Blog image"
}

export function formatImageForDisplay(blob: Blob): string {
  return URL.createObjectURL(blob)
}
