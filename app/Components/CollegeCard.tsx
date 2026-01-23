"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Award, BookOpen } from 'lucide-react';
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
          <Image
            src={college.media.cover}
            alt={college.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* College Logo Overlay */}
          <div className="absolute bottom-4 left-4">
            <div className="bg-white/95 backdrop-blur-sm p-2 rounded-lg">
              <Image
                src={college.media.logo}
                alt={college.name}
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* College Information */}
        <div className="p-6 space-y-4">
          {/* College Name */}
          <h3 className="text-xl font-bold text-[#1A1A1B] line-clamp-2 group-hover:text-[#922B21] transition-colors">
            {college.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin size={16} className="text-[#D4AC0D]" />
            <span className="text-sm">{college.location.city}, {college.location.state}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {college.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-[#F8F9F9] text-[#922B21] text-xs font-medium rounded-full border border-[#D4AC0D]/20"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Quick Info */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <BookOpen size={14} className="text-[#922B21]" />
              <span>{college.courses_offered.length} Courses</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Award size={14} className="text-[#D4AC0D]" />
              <span>{college.exams_accepted.join(', ').toUpperCase()}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CollegeCard;
