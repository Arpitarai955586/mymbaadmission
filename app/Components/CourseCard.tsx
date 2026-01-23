"use client";
import React from 'react';
import Link from 'next/link';
import { Course, formatFees } from '../config/courses';
import { Clock, DollarSign, GraduationCap, BookOpen } from 'lucide-react';

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link href={`/courses/${course._id}`}>
      <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#922B21] to-[#7A2318] p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1 bg-[#D4AC0D] text-white text-xs font-bold rounded-full">
              {course.degree}
            </span>
            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              <span className="text-xs font-bold uppercase">{course.duration_years} Years</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-2 group-hover:text-[#D4AC0D] transition-colors">
            {course.name}
          </h3>
          
          <p className="text-white/90 text-sm">
            {course.degree} Program
          </p>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {/* Duration */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F8F9F9] rounded-lg flex items-center justify-center">
              <Clock className="text-[#922B21]" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Duration</p>
              <p className="font-semibold text-[#1A1A1B]">{course.duration_years} Years</p>
            </div>
          </div>

          {/* Fees */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F8F9F9] rounded-lg flex items-center justify-center">
              <DollarSign className="text-[#D4AC0D]" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Average Fees</p>
              <p className="font-semibold text-[#1A1A1B]">{formatFees(course.default_fees)}</p>
            </div>
          </div>

          {/* Degree */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#F8F9F9] rounded-lg flex items-center justify-center">
              <GraduationCap className="text-[#922B21]" size={18} />
            </div>
            <div>
              <p className="text-sm text-gray-500">Degree Type</p>
              <p className="font-semibold text-[#1A1A1B]">{course.degree}</p>
            </div>
          </div>

          {/* Entrance Exams */}
          {course.entrance_exams.length > 0 && (
            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500 mb-2">Accepted Entrance Exams:</p>
              <div className="flex flex-wrap gap-2">
                {course.entrance_exams.map((examId, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-[#F8F9F9] text-[#922B21] text-xs font-bold rounded-full border border-[#D4AC0D]/20"
                  >
                    {examId.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-4">
            <button className="w-full bg-[#F8F9F9] hover:bg-[#922B21] hover:text-white text-[#922B21] font-semibold py-3 rounded-lg transition-all duration-300 group-hover:shadow-md flex items-center justify-center gap-2">
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
