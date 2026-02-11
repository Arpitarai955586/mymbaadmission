"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export interface BlogData {
  _id?: string
  title: string
  slug?: string
  body: string
  type: string
  created_by?: string
  is_published?: boolean
  created_at?: string
  updated_at?: string
  image?: string
  category?: string
  imageUrl?: string
  description?: string
  readTime?: string
  publishedDate?: string
  author?: string
  status?: string
}

interface AddNewBlogModalProps {
  isOpen: boolean
  onClose: () => void
  onAddBlog: (blog: BlogData) => void
}

export function AddNewBlogModal({ isOpen, onClose, onAddBlog }: AddNewBlogModalProps) {
  const [formData, setFormData] = useState<BlogData>({
    title: "",
    body: "",
    type: "blog",
    category: "",
    imageUrl: "",
    description: "",
    readTime: "",
    publishedDate: "",
    author: "",
    status: "",
  })

  const handleInputChange = (field: keyof BlogData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    if (!token) {
      alert("You are not logged in")
      return
    }

    if (!formData.title || !formData.body) {
      alert("Title and body are required")
      return
    }

    try {
      // Prepare payload
      const payload = {
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        body: formData.body,
        type: formData.type || "blog",
        category: formData.category || "General",
        image: formData.imageUrl || null,
        description: formData.description || "",
        readTime: formData.readTime || "",
        publishedDate: formData.publishedDate || new Date().toISOString(),
        author: formData.author || "Admin",
        status: formData.status || "draft",
      }

      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data?.message || "Failed to create blog")
      }

      // ✅ Update UI with new blog
      onAddBlog(data.blog)

      // ✅ Reset form
      setFormData({
        title: "",
        body: "",
        type: "blog",
        category: "",
        imageUrl: "",
        description: "",
        readTime: "",
        publishedDate: "",
        author: "",
        status: "",
      })

      onClose()
    } catch (err: any) {
      console.error("❌ Blog create error:", err)
      alert(err.message)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Blog</DialogTitle>
          <DialogDescription>
            Create a new blog post with all the necessary details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Enter blog title"
              value={formData.title}
              onChange={e => handleInputChange("title", e.target.value)}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category}
              onValueChange={value => handleInputChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Admissions">Admissions</SelectItem>
                <SelectItem value="Colleges">Colleges</SelectItem>
                <SelectItem value="Exams">Exams</SelectItem>
                <SelectItem value="Preparation">Preparation</SelectItem>
                <SelectItem value="Career">Career</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={formData.imageUrl}
              onChange={e => handleInputChange("imageUrl", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Body Content</Label>
            <Textarea
              id="description"
              placeholder="Enter blog content..."
              value={formData.body}
              onChange={e => handleInputChange("body", e.target.value)}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="readTime">Read Time</Label>
              <Input
                id="readTime"
                placeholder="e.g., 5 min read"
                value={formData.readTime}
                onChange={e => handleInputChange("readTime", e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="publishDate">Publish Date</Label>
              <Input
                id="publishDate"
                type="date"
                value={formData.publishedDate}
                onChange={e => handleInputChange("publishedDate", e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Blog</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
