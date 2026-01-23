"use client"

import { useState, useEffect } from "react"
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
  DialogTrigger,
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
  id: number
  title: string
  category: string
  author: string
  status: string
  publishedDate: string
  imageUrl: string
  description: string
  readTime: string
}

interface EditBlogModalProps {
  isOpen: boolean
  onClose: () => void
  onEditBlog: (blog: BlogData) => void
  blog: BlogData | null
}

export function EditBlogModal({ isOpen, onClose, onEditBlog, blog }: EditBlogModalProps) {
  const [formData, setFormData] = useState<BlogData>({
    id: 0,
    title: "",
    category: "",
    author: "",
    status: "",
    publishedDate: "",
    imageUrl: "",
    description: "",
    readTime: "",
  })

  useEffect(() => {
    if (blog) {
      setFormData(blog)
    }
  }, [blog])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.title && formData.category && formData.description) {
      onEditBlog(formData)
      onClose()
    }
  }

  const handleInputChange = (field: keyof BlogData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Blog</DialogTitle>
          <DialogDescription>
            Update the blog post details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter blog title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
                required
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
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                placeholder="Enter author name"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Draft">Draft</SelectItem>
                  <SelectItem value="Published">Published</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="publishedDate">Publish Date</Label>
              <Input
                id="publishedDate"
                type="date"
                placeholder="dd/mm/yyyy"
                value={formData.publishedDate}
                onChange={(e) => handleInputChange("publishedDate", e.target.value)}
                required
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Update Blog</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
