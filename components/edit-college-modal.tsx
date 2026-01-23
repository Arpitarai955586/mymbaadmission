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

export interface CollegeData {
  id: number
  name: string
  type: string
  location: string
  ranking: string
  establishedYear: string
  website: string
  description: string
}

interface EditCollegeModalProps {
  isOpen: boolean
  onClose: () => void
  onEditCollege: (college: CollegeData) => void
  college: CollegeData | null
}

export function EditCollegeModal({ isOpen, onClose, onEditCollege, college }: EditCollegeModalProps) {
  const [formData, setFormData] = useState<CollegeData>({
    id: 0,
    name: "",
    type: "",
    location: "",
    description: "",
    ranking: "",
    establishedYear: "",
    website: "",
  })

  useEffect(() => {
    if (college) {
      setFormData(college)
    }
  }, [college])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.name && formData.type && formData.location) {
      onEditCollege(formData)
      onClose()
    }
  }

  const handleInputChange = (field: keyof CollegeData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit College</DialogTitle>
          <DialogDescription>
            Update the college information.
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
            <Button type="submit">Update College</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
