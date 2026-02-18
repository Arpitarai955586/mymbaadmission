"use client";

import { useState } from "react";
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
  name: string;
  category: string;
  duration: string;
  level: string;
  fees: string;
  description: string;
  eligibility: string;
  image?: string;
  is_active?: boolean;
}
interface AddNewCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCourse: (course: CourseData) => void;
  collegeId: string; // ✅ ADD THIS
}

export function AddNewCourseModal({
  isOpen,
  onClose,
  onAddCourse,
  collegeId,
}: AddNewCourseModalProps) {
  const [formData, setFormData] = useState<CourseData>({
    name: "",
    category: "",
    duration: "",
    level: "",
    fees: "",
    description: "",
    eligibility: "",
    image: "",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!collegeId) {
      alert("College ID missing");
      return;
    }

    if (
      !formData.name ||
      !formData.duration ||
      !formData.level ||
      !formData.fees
    ) {
      alert("All required fields must be filled");
      return;
    }

    const generatedSlug = formData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    try {
      const res = await fetch("/api/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: generatedSlug,
          name: formData.name,
          college_id: collegeId, // ✅ VERY IMPORTANT
          duration_years: Number(formData.duration),
          degree: formData.level,
          default_fees: {
            currency: "INR",
            total_fee: Number(formData.fees),
          },
          status: "Active",
          media: {
            cover: formData.image || null,
          },
          entrance_exams: [],
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      onAddCourse(data.course);

      setFormData({
        name: "",
        category: "",
        duration: "",
        level: "",
        fees: "",
        description: "",
        eligibility: "",
        image: "",
      });
      setPreviewImage(null);
      onClose();
    } catch (error: any) {
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
          <DialogTitle>Add New Course</DialogTitle>
          <DialogDescription>
            Create a new course with all necessary details.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                placeholder="Enter course name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="image">Course Image URL</Label>
              <Input
                type="url"
                id="image"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={(e) => {
                  handleInputChange("image", e.target.value);
                  setPreviewImage(e.target.value);
                }}
              />
              {previewImage && (
                <div className="mt-2 relative">
                  <img
                    src={previewImage}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-lg"
                    onError={() => setPreviewImage(null)}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, image: "" }));
                      setPreviewImage(null);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course category" />
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
                <Label htmlFor="duration">Duration</Label>
                <Input
                  type="number"
                  placeholder="e.g., 4"
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="level">Level</Label>
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
              <Label htmlFor="fees">Fees</Label>
              <Input
                type="number"
                placeholder="e.g., 250000"
                value={formData.fees}
                onChange={(e) => handleInputChange("fees", e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter course description..."
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="eligibility">Eligibility</Label>
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
            <Button type="submit">Add Course</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
