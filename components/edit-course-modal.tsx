"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export interface CourseData {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
  category?: string;
  duration?: string;
  duration_years?: number;
  degree?: string;
  level?: string;
  fees?: string;
  total_fee?: number;
  status: string;
  description?: string;
  eligibility?: string;
}

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditCourse: (course: CourseData) => void;
  course: CourseData | null;
}

export function EditCourseModal({
  isOpen,
  onClose,
  onEditCourse,
  course,
}: EditCourseModalProps) {
  const [formData, setFormData] = useState<CourseData>({
    _id: "",
    name: "",
    category: "",
    duration: "",
    level: "",
    fees: "",
    status: "",
    description: "",
    eligibility: "",
  });

  /* ✅ Properly set full course including _id */
  useEffect(() => {
    if (course && isOpen) {
      setFormData(course);
    }
  }, [course, isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }

    if (!formData._id) {
      alert("Course ID missing");
      return;
    }

    if (!formData.name || !formData.category || !formData.duration) {
      alert("Name, category and duration are required");
      return;
    }

    try {
      const res = await fetch(`/api/courses/${formData._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData), // ✅ send full updated data
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update course");
      }

      onEditCourse(data.course);
      onClose();
    } catch (error: any) {
      console.error("❌ Error:", error);
      alert(error.message);
    }
  };

  const handleInputChange = (field: keyof CourseData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Course</DialogTitle>
          <DialogDescription>Update the course details.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Course Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label>Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Management">Management</SelectItem>
                  <SelectItem value="Medical">Medical</SelectItem>
                  <SelectItem value="Arts">Arts</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Duration</Label>
                <Input
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                  required
                />
              </div>

              <div className="grid gap-2">
                <Label>Level</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) => handleInputChange("level", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                    <SelectItem value="Postgraduate">Postgraduate</SelectItem>
                    <SelectItem value="Diploma">Diploma</SelectItem>
                    <SelectItem value="Certificate">Certificate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Fees</Label>
              <Input
                value={formData.fees}
                onChange={(e) => handleInputChange("fees", e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label>Eligibility</Label>
              <Textarea
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
            <Button type="submit">Update Course</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
