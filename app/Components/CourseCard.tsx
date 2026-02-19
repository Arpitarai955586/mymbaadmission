"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Course, formatFees } from "../config/courses";
import { Clock, DollarSign, GraduationCap, BookOpen } from "lucide-react";
import { themeColors, colorCombos, themeClasses } from "../config/theme";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const [imageError, setImageError] = useState(false);


  return (
    <Link href={`/courses/${course._id}`}>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group h-full flex flex-col">
        {/* Image Section */}
        <div className="relative w-full h-48 bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A] overflow-hidden">
          {course.media?.cover && !imageError ? (
            <>
              <img
                src={course.media.cover}
                alt={course.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                onError={() => setImageError(true)}
              />
              {/* Dark overlay on image */}
              <div className="absolute inset-0 bg-black/20"></div>
            </>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A] flex items-center justify-center">
              <BookOpen className="text-white/50" size={48} />
            </div>
          )}

          {/* Overlay with degree badge */}
          <div className="absolute top-3 left-3 z-10">
            <span className="inline-block px-3 py-1 bg-[#F97316] text-white text-xs font-bold rounded-full shadow-md">
              {course.degree}
            </span>
          </div>

          {/* Duration badge - top right */}
          <div className="absolute top-3 right-3 z-10 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-white drop-shadow-sm">
              {course.duration_years} Years
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-2 group-hover:text-[#F97316] transition-colors line-clamp-2">
              {course.name}
            </h3>

            <p className="text-gray-600 text-sm">{course.degree} Program</p>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
            <div className="w-10 h-10 bg-[#F8F9F9] rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock className="text-[#1E40AF]" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Duration</p>
              <p className="font-semibold text-[#1A1A1B]">
                {course.duration_years} Years
              </p>
            </div>
          </div>

          {/* Fees */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F8F9F9] rounded-lg flex items-center justify-center flex-shrink-0">
              <DollarSign className="text-[#F97316]" size={18} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Average Fees</p>
              <p className="font-semibold text-[#1A1A1B]">
                {formatFees(course.default_fees)}
              </p>
            </div>
          </div>

          {/* Entrance Exams */}
          {course.entrance_exams.length > 0 && (
            <div className="pt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">
                Accepted Entrance Exams:
              </p>
              <div className="flex flex-wrap gap-2">
                {course.entrance_exams.map((examId, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-[#F8F9F9] text-[#1E40AF] text-xs font-bold rounded-full border border-[#F97316]/20"
                  >
                    {examId.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4 mt-auto">
            <button className="w-full bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
              <BookOpen size={16} />
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
