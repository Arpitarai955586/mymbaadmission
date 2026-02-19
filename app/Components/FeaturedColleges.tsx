"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import CollegeCard from './CollegeCard';
import { themeColors, colorCombos, themeClasses } from '../config/theme';
import { ArrowRight } from 'lucide-react';

interface College {
  college_id: string;
  slug: string;
  name: string;
  type: string;
  location: {
    city: string;
    state?: string;
  };
  fees?: {
    annual_fee?: number;
  };
  media?: {
    cover?: string;
  };
  content?: {
    overview?: string;
  };
  highlights?: string[];
  coursesCount?: number;
  examsCount?: number;
  status: string;
}

const FeaturedColleges: React.FC = () => {
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const response = await fetch('/api/colleges');
        if (response.ok) {
          const data = await response.json();
          // Take first 4 colleges for featured section
          setColleges(data.colleges.slice(0, 4));
        }
      } catch (error) {
        console.error('Error fetching colleges:', error);
        // Keep colleges empty if API fails
      } finally {
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 bg-[#F8F9F9]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E40AF] mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-[#F8F9F9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white text-[#1E40AF] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#F97316]">
            <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
            FEATURED COLLEGES
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1B] leading-tight">
            Top MBA Colleges in <span className="text-[#1E40AF]">India</span>
          </h2>
          
          <p className="text-[#2C3E50] text-xl max-w-3xl mx-auto leading-relaxed">
            Explore our handpicked selection of premier management institutions 
            that offer world-class education and exceptional career opportunities.
          </p>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {colleges.map((college: College) => (
            <CollegeCard key={college.college_id} college={college} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link 
            href="/colleges"
            className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-8 py-4 rounded-xl text-lg font-bold inline-flex items-center gap-3 transition-all active:scale-95 shadow-lg hover:shadow-[#1E40AF]/20"
          >
            View All Colleges
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedColleges;
