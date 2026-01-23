"use client";
import React from 'react';
import CollegeCard from './CollegeCard';
import { getFeaturedColleges } from '../config/colleges';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const FeaturedColleges: React.FC = () => {
  const featuredColleges = getFeaturedColleges(4);

  return (
    <section className="py-20 px-6 bg-[#F8F9F9]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white text-[#922B21] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#D4AC0D]">
            <span className="w-2 h-2 bg-[#D4AC0D] rounded-full animate-pulse" />
            FEATURED COLLEGES
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1B] leading-tight">
            Top MBA Colleges in <span className="text-[#922B21]">India</span>
          </h2>
          
          <p className="text-[#2C3E50] text-xl max-w-3xl mx-auto leading-relaxed">
            Explore our handpicked selection of premier management institutions 
            that offer world-class education and exceptional career opportunities.
          </p>
        </div>

        {/* Colleges Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {featuredColleges.map((college) => (
            <CollegeCard key={college._id} college={college} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link 
            href="/colleges"
            className="inline-flex items-center gap-3 bg-[#922B21] hover:bg-[#7A2318] text-white px-8 py-4 rounded-xl text-lg font-bold transition-all active:scale-95 shadow-lg hover:shadow-[#922B21]/20"
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
