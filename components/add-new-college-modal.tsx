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

  const parts = formData.location.split(",")

  if (parts.length < 2) {
    alert("Please enter location as: City, State")
    return
  }

  const city = parts[0].trim()
  const state = parts[1].trim()

  if (!city || !state) {
    alert("Both city and state are required")
    return
  }

  const payload = {
    college_id: `COL-${Date.now()}`,
    name: formData.name,
    type: formData.type,
    location: {
      city,
      state,
    },
    ranking: formData.ranking,
    established_year: Number(formData.establishedYear),
    content: {
      overview: formData.description,
    },
    status: "active",
  }

  const res = await fetch("/api/colleges", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(data.message || "Failed to create college")
  }

  onAddCollege(data.college)
  onClose()
}

const handleInputChange = (key: string, value: string) => {
  setFormData((prev) => ({
    ...prev,
    [key]: value,
  }))
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
