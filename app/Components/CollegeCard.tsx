"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, BookOpen, Award } from 'lucide-react';
import { themeColors, colorCombos, themeClasses } from '../config/theme';
import { College } from '../config/colleges';

interface CollegeCardProps {
  college: College;
}

const CollegeCard: React.FC<CollegeCardProps> = ({ college }) => {
  return (
    <Link href={`/colleges/${college.slug}`}>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group">
        {/* College Cover Image */}
        <div className="relative h-48 overflow-hidden">
         <img
  src={
    college.media?.cover
      ? college.media.cover.startsWith("http")
        ? college.media.cover
        : `/uploads/${college.media.cover}`
      : "https://via.placeholder.com/300"
  }
  alt={college?.name || "college"}
  className="object-cover group-hover:scale-105 transition-transform duration-500"
/>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* College Logo Overlay */}
          <div className="absolute bottom-4 left-4">
            {/* <div className="bg-white/95 backdrop-blur-sm p-2 rounded-lg">
              <Image
                src={college.media?.logo || '/colleges/default-logo.png'}
                alt={college.name}
                width={40}
                height={40}
                className="object-contain"
              />
            </div> */}
            {/* <Image
  src={
    college.media?.cover
      ? `/uploads/${college.media.cover}`
      : "/placeholder.jpg"
  }
  alt={college.name}
  fill
  className="object-cover"
/> */}

            
          </div>
        </div>

        {/* College Information */}
        <div className="p-6 space-y-4">
          {/* College Name and Type */}
          <div>
            <h3 className="text-xl font-bold text-[#1A1A1B] line-clamp-2 group-hover:text-[#1E40AF] transition-colors mb-2">
              {college.name}
            </h3>
            <p className="text-sm text-[#F97316] font-medium">{college.short_name}</p>
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} className="text-[#F97316]" />
            <span className="text-sm">{college.location.city}, {college.location.state}</span>
          </div>

          {/* Highlights */}
          <div className="flex flex-wrap gap-2">
            {college.highlights.slice(0, 2).map((highlight, index: number) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#F8F9F9] text-[#1E40AF] text-xs font-medium rounded-full border border-[#F97316]/20"
              >
                {highlight}
              </span>
            ))}
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BookOpen size={14} className="text-[#1E40AF]" />
              <span>{college.courses_offered.length} Courses</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Award size={14} className="text-[#F97316]" />
              <span>{college.approved_by.length} Approved</span>
            </div>
          </div>

          {/* Exams Accepted */}
          <div className="flex flex-wrap gap-1">
            {college.exams_accepted.slice(0, 3).map((exam, index: number) => (
              <span
                key={index}
                className="px-2 py-1 bg-[#1E40AF]/10 text-[#1E40AF] text-xs font-medium rounded"
              >
                {exam}
              </span>
            ))}
            {college.exams_accepted.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                +{college.exams_accepted.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollegeCard;
