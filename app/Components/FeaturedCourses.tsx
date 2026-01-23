"use client";
import React from 'react';
import CourseCard from './CourseCard';
import { getAllCourses } from '../config/courses';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FeaturedCourses: React.FC = () => {
  const featuredCourses = getAllCourses().slice(0, 4); // Get first 4 courses

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#F8F9F9] text-[#922B21] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#D4AC0D]">
            <span className="w-2 h-2 bg-[#D4AC0D] rounded-full animate-pulse" />
            FEATURED COURSES
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1B] leading-tight">
            Popular <span className="text-[#922B21">Management Courses</span>
          </h2>
          
          <p className="text-[#2C3E50] text-xl max-w-3xl mx-auto leading-relaxed">
            Explore our most sought-after management programs designed to 
            shape your career and open doors to endless opportunities.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link 
            href="/courses"
            className="inline-flex items-center gap-3 bg-[#922B21] hover:bg-[#7A2318] text-white px-8 py-4 rounded-xl text-lg font-bold transition-all active:scale-95 shadow-lg hover:shadow-[#922B21]/20"
          >
            View All Courses
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
