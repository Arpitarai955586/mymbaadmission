"use client";
import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { themeColors, colorCombos, themeClasses } from '../config/theme';

interface Course {
  _id: string;
  name: string;
  slug: string;
  degree: string;
  duration_years: number;
  default_fees: {
    total_fee: number;
    currency: string;
  };
  entrance_exams: string[];
  media?: {
    cover?: string;
  };
  status: string;
}

const FeaturedCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (response.ok) {
          const data = await response.json();
          // Take first 4 courses for featured section
          setCourses(data.courses.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E40AF] mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 bg-[#F8F9F9] text-[#1E40AF] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#F97316]">
            <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
            FEATURED COURSES
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1B] leading-tight">
            Popular <span className="text-[#1E40AF]">Management Courses</span>
          </h2>
          
          <p className="text-[#2C3E50] text-xl max-w-3xl mx-auto leading-relaxed">
            Explore our most sought-after management programs designed to 
            shape your career and open doors to endless opportunities.
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link 
            href="/courses"
            className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-8 py-4 rounded-xl text-lg font-bold inline-flex items-center gap-3 transition-all active:scale-95 shadow-lg hover:shadow-[#1E40AF]/20"
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
