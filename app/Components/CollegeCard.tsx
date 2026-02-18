"use client";
import React from "react";
import Link from "next/link";
import { MapPin, BookOpen, DollarSign } from "lucide-react";
import { College } from "../config/colleges";
import { getCollegeCoverUrl } from "@/lib/utils";

interface CollegeCardProps {
  college: College;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {
  const coverUrl = getCollegeCoverUrl(college.media?.cover);
  const description =
    college.content?.overview ||
    college.highlights?.[0] ||
    "A premier educational institution";
  const displayDescription =
    description.length > 75
      ? description.substring(0, 75) + "..."
      : description;

  // Compute courses count robustly: prefer backend `coursesCount`,
  // fall back to `courses_offered` length or any `courses` array.
  const computedCoursesCount = (() => {
    const raw =
      (college as any).coursesCount ??
      college.courses_offered ??
      (college as any).courses;
    if (typeof raw === "number") return raw;
    if (Array.isArray(raw)) return raw.length;
    if (typeof raw === "string") {
      const n = Number(raw);
      return Number.isNaN(n) ? 0 : n;
    }
    return 0;
  })();

  return (
    <Link href={`/colleges/${college.slug}`}>
      <div className="bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer group h-full flex flex-col">
        {/* College Cover Image */}
        <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A]">
          <img
            src={coverUrl}
            alt={college?.name || "college"}
            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Type Badge */}
          {college.type && (
            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 bg-[#F97316] text-white text-xs font-bold rounded-full">
                {college.type}
              </span>
            </div>
          )}
        </div>

        {/* College Information */}
        <div className="p-5 space-y-3 flex-1 flex flex-col">
          {/* College Name */}
          <div>
            <h3 className="text-lg font-bold text-[#1A1A1B] line-clamp-2 group-hover:text-[#1E40AF] transition-colors">
              {college.name}
            </h3>
          </div>
          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {displayDescription}
          </p>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={14} className="text-[#F97316] flex-shrink-0" />
            <span className="text-xs">
              {college.location.city}
              {college.location.state ? `, ${college.location.state}` : ""}
            </span>
          </div>

          {/* Description
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {displayDescription}
          </p> */}

          {/* Fees Section */}
          {typeof college.fees?.annual_fee === "number" && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#F97316]/10 to-orange-100 p-3 rounded-lg border border-[#F97316]/20">
              <DollarSign size={16} className="text-[#F97316] flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-600 font-semibold">
                  Annual Fee
                </p>
                <p className="text-sm font-bold text-[#1A1A1B]">
                  ₹{(college.fees.annual_fee / 100000).toFixed(1)}L
                </p>
              </div>
            </div>
          )}

          {/* Courses Count */}
          <div className="flex items-center gap-2 text-gray-700 mt-2">
            <BookOpen size={16} className="text-[#1E40AF]" />
            <span className="text-sm font-medium">
              {computedCoursesCount}{" "}
              {computedCoursesCount === 1
                ? "Course Available"
                : "Courses Available"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollegeCard;
