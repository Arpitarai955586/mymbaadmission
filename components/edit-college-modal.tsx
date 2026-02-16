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

export interface CollegeData {
  id: number | string;
  name: string;
  type: string;
  location: {
    city: string;
    state: string;
  };
  ranking: string;
  establishedYear: number;
  website: string;
  description: string;
  media?: { cover?: string };
  fees?: {
    annual_fee?: number;
    currency?: string;
    fee_structure?: string;
  };
}

interface EditCollegeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEditCollege: (college: CollegeData) => void;
  college: CollegeData | null;
}

export function EditCollegeModal({
  isOpen,
  onClose,
  onEditCollege,
  college,
}: EditCollegeModalProps) {
  const [formData, setFormData] = useState<CollegeData>({
    id: "",
    name: "",
    type: "",
    location: { city: "", state: "" },
    ranking: "",
    establishedYear: 0,
    website: "",
    description: "",
    media: { cover: "" },
    fees: { annual_fee: 0, currency: "INR", fee_structure: "" },
  });

  useEffect(() => {
    if (college) {
      setFormData(college);
    }
  }, [college]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }

    const payload = {
      name: formData.name,
      type: formData.type,
      location: {
        city: formData.location.city,
        state: formData.location.state,
      },
      media: {
        cover: (formData.media?.cover ?? "").trim() || undefined,
      },
      ranking: formData.ranking,
      established_year: Number(formData.establishedYear),
      website: formData.website,
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
    };

    const res = await fetch(`/api/colleges/${formData.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    // ❌ DO NOT CALL res.json() if backend returns nothing
    if (!res.ok) {
      const text = await res.text();
      alert(text || "Failed to update college");
      return;
    }

    // ✅ Update UI manually
    onEditCollege(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader  className="pb-3 border-b">
          <DialogTitle className="text-xl font-bold"
    >Edit College</DialogTitle>
          <DialogDescription>Update the college information.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>College Name</Label>
              <Input
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>College Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Government">Government</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                  <SelectItem value="Autonomous">Autonomous</SelectItem>
                  <SelectItem value="Deemed">Deemed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Location (City, State)</Label>
              <Input
                value={`${formData.location.city}, ${formData.location.state}`}
                onChange={(e) => {
                  const parts = e.target.value.split(",");
                  setFormData({
                    ...formData,
                    location: {
                      city: parts[0]?.trim() || "",
                      state: parts[1]?.trim() || "",
                    },
                  });
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Ranking</Label>
                <Input
                  value={formData.ranking}
                  onChange={(e) =>
                    setFormData({ ...formData, ranking: e.target.value })
                  }
                />
              </div>

              <div className="grid gap-2">
                <Label>Established Year</Label>
                <Input
                  value={formData.establishedYear}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      establishedYear: Number(e.target.value),
                    })
                  }
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Website</Label>
              <Input
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
              />
            </div>

            <div className="grid gap-2">
              <Label>Cover Image (URL)</Label>
              <Input
                type="url"
                placeholder="https://example.com/college-cover.jpg"
                value={formData.media?.cover ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    media: { ...formData.media, cover: e.target.value },
                  })
                }
              />
              <p className="text-xs text-muted-foreground">
                Optional. Saves in database and shows on colleges list & detail.
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
            <Button type="submit">Update College</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
