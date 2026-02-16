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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export interface CollegeData {
  id?: number;
  name: string;
  type: string;
  location: string;
  description: string;
  ranking: string;
  establishedYear: string;
  website: string;
  coverImageUrl?: string;
  fees?: {
    annual_fee?: number;
    currency?: string;
    fee_structure?: string;
  };
}

interface AddNewCollegeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCollege: (college: CollegeData) => void;
}

export function AddNewCollegeModal({
  isOpen,
  onClose,
  onAddCollege,
}: AddNewCollegeModalProps) {
  const [formData, setFormData] = useState<Omit<CollegeData, "id">>({
    name: "",
    type: "",
    location: "",
    description: "",
    ranking: "",
    establishedYear: "",
    website: "",
    coverImageUrl: "",
    fees: {
      annual_fee: 0,
      currency: "INR",
      fee_structure: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }

    if (!formData.name || !formData.type || !formData.location) {
      alert("Please fill required fields");
      return;
    }

    const parts = formData.location.split(",");

    if (parts.length < 2) {
      alert("Please enter location as: City, State");
      return;
    }

    const city = parts[0].trim();
    const state = parts[1].trim();

    if (!city || !state) {
      alert("Both city and state are required");
      return;
    }

    const payload = {
      college_id: `COL-${Date.now()}`,
      name: formData.name,
      type: formData.type,
      location: {
        city,
        state,
      },
      media: {
        cover: (formData.coverImageUrl || "").trim() || undefined,
      },
      ranking: formData.ranking,
      established_year: Number(formData.establishedYear),
      content: {
        overview: formData.description,
      },
      fees: {
        annual_fee: formData.fees?.annual_fee
          ? Number(formData.fees.annual_fee)
          : undefined,
        currency: formData.fees?.currency || "INR",
        fee_structure: formData.fees?.fee_structure || undefined,
      },
      status: "active",
    };

    const res = await fetch("/api/colleges", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Failed to create college");
    }

    onAddCollege(data.college);
    onClose();
  };

  const handleInputChange = (key: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader className="pb-3 border-b">
          <DialogTitle className="text-xl font-bold">Add New College</DialogTitle>
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
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
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
                  onChange={(e) =>
                    handleInputChange("establishedYear", e.target.value)
                  }
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

            <div className="grid gap-2">
              <Label htmlFor="coverImageUrl">Cover Image (URL)</Label>
              <Input
                id="coverImageUrl"
                type="url"
                placeholder="https://example.com/college-cover.jpg"
                value={formData.coverImageUrl || ""}
                onChange={(e) =>
                  handleInputChange("coverImageUrl", e.target.value)
                }
              />
              <p className="text-xs text-muted-foreground">
                Optional. Full image URL so the college image saves in database
                and shows on site.
              </p>
            </div>

            {/* Fees Section */}
            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-bold mb-3">Fees Information</h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Annual Fees (₹)</Label>
                  <Input
                    type="number"
                    placeholder="e.g., 500000"
                    value={formData.fees?.annual_fee ?? ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        fees: {
                          ...formData.fees,
                          annual_fee: e.target.value
                            ? Number(e.target.value)
                            : 0,
                        },
                      })
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    Amount in rupees (e.g., 500000 for 5 Lakhs)
                  </p>
                </div>

                <div className="grid gap-2">
                  <Label>Currency</Label>
                  <Select
                    value={formData.fees?.currency || "INR"}
                    onValueChange={(value) =>
                      setFormData({
                        ...formData,
                        fees: { ...formData.fees, currency: value },
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="INR">INR (₹)</SelectItem>
                      <SelectItem value="USD">USD ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-2 mt-4">
                <Label>Fee Structure Details</Label>
                <Input
                  placeholder="e.g., Includes tuition, facility, and other academic charges"
                  value={formData.fees?.fee_structure ?? ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      fees: {
                        ...formData.fees,
                        fee_structure: e.target.value,
                      },
                    })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Brief description of what's included in the fees
                </p>
              </div>
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
  );
}
