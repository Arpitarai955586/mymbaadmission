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

export interface CollegeData {
  id?: number
  name: string
  type: string
  location: string
  description: string
  ranking: string
  establishedYear: string
  website: string
}

interface AddNewCollegeModalProps {
  isOpen: boolean
  onClose: () => void
  onAddCollege: (college: CollegeData) => void
}

export function AddNewCollegeModal({ isOpen, onClose, onAddCollege }: AddNewCollegeModalProps) {
  const [formData, setFormData] = useState<Omit<CollegeData, "id">>({
    name: "",
    type: "",
    location: "",
    description: "",
    ranking: "",
    establishedYear: "",
    website: "",
  })

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()

  const token = localStorage.getItem("token")
  if (!token) {
    alert("You are not logged in")
    return
  }

  if (!formData.name || !formData.type || !formData.location) {
    alert("Please fill required fields")
    return
  }

  try {
    // ✅ split location safely
    const parts = formData.location.split(",")
    const city = parts[0]?.trim() || ""
    const state = parts[1]?.trim() || ""

    // ✅ BACKEND-MATCHING PAYLOAD
    const payload = {
      name: formData.name,
      slug: formData.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, ""),
      city,
      state,
      type: formData.type === "Government" ? "Govt" : "Private",
      overview: formData.description,
      fees: "TBD",
      admission_process: "TBD",
      is_active: true,
    }

    const res = await fetch("/api/colleges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    })

    // ✅ SAFE RESPONSE HANDLING
    const text = await res.text()
    const data = text ? JSON.parse(text) : null

    if (!res.ok) {
      throw new Error(data?.message || "Failed to create college")
    }

    // ✅ update UI instantly
    onAddCollege(data.college ?? data)

    // ✅ reset form
    setFormData({
      name: "",
      type: "",
      location: "",
      description: "",
      ranking: "",
      establishedYear: "",
      website: "",
    })

    onClose()
  } catch (err: any) {
    console.error("❌ Failed to add college:", err)
    alert(err.message)
  }
}



  const handleInputChange = (field: keyof CollegeData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New College</DialogTitle>
          <DialogDescription>
            Add a new college with all the necessary details.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">College Name</Label>
              <Input
                id="name"
                placeholder="Enter college name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="type">College Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select college type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Government">Government</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Autonomous">Autonomous</SelectItem>
                  <SelectItem value="Deemed">Deemed University</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                placeholder="Enter college location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter college description..."
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="ranking">Ranking</Label>
                <Input
                  id="ranking"
                  placeholder="e.g., #1 in India"
                  value={formData.ranking}
                  onChange={(e) => handleInputChange("ranking", e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="establishedYear">Established Year</Label>
                <Input
                  id="establishedYear"
                  placeholder="e.g., 1960"
                  value={formData.establishedYear}
                  onChange={(e) => handleInputChange("establishedYear", e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                placeholder="https://college-website.com"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add College</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
