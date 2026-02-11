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

export interface ExamData {
  _id?: string
  name: string
  category: string
  date: string
  duration: string
  status: string
  description: string
  eligibility: string
  is_active?: boolean
}

interface AddNewExamModalProps {
  isOpen: boolean
  onClose: () => void
  onAddExam: (exam: ExamData) => void
}

export function AddNewExamModal({
  isOpen,
  onClose,
  onAddExam,
}: AddNewExamModalProps) {
  const [formData, setFormData] = useState<ExamData>({
    name: "",
    category: "",
    date: "",
    duration: "",
    status: "Upcoming",
    description: "",
    eligibility: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const token = localStorage.getItem("token")
    if (!token) {
      alert("You are not logged in")
      return
    }

    if (!formData.name || !formData.category || !formData.date) {
      alert("Name, category and date are required")
      return
    }

    try {
      const res = await fetch("/api/exams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          is_active: true,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Failed to create exam")
      }

      // Update UI
      onAddExam(data.exam)

      // Reset form
      setFormData({
        name: "",
        category: "",
        date: "",
        duration: "",
        status: "Upcoming",
        description: "",
        eligibility: "",
      })

      onClose()
    } catch (error: any) {
      console.error("❌ Error:", error)
      alert(error.message)
    }
  }

  const handleInputChange = (field: keyof ExamData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New Exam</DialogTitle>
          <DialogDescription>
            Create a new exam with all the necessary details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Exam Name</Label>
              <Input
                id="name"
                placeholder="Enter exam name"
                value={formData.name}
                onChange={(e) =>
                  handleInputChange("name", e.target.value)
                }
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  handleInputChange("category", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select exam category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MBA Entrance">MBA Entrance</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="International MBA">
                    International MBA
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Exam Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    handleInputChange("date", e.target.value)
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 3 hours"
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) =>
                  handleInputChange("status", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Upcoming">Upcoming</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter exam description..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="eligibility">Eligibility Criteria</Label>
              <Textarea
                id="eligibility"
                placeholder="Enter eligibility criteria..."
                value={formData.eligibility}
                onChange={(e) =>
                  handleInputChange("eligibility", e.target.value)
                }
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add Exam</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
