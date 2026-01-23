"use client";
import React from 'react';
import { TrendingUp, GraduationCap, ShieldCheck, Phone } from 'lucide-react';
import { useModal } from '../Context/ModalContext';
import { themeColors, colorCombos, themeClasses } from '../config/theme';

const CollegeMatchCard = () => {
  const { openModal } = useModal();
  return (
    <div className="max-w-5xl  mx-auto p-4">
      <div className="relative overflow-hidden bg-[#F8F9F9] rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-[#1E40AF]/10">
        
        <div className="flex flex-col gap-6 relative z-10">
          {/* Header Section */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#F97316] flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
              <img 
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=ffcc4d" 
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#1A1A1B] tracking-tight">
              Find Your Perfect College Match
            </h2>
          </div>

          {/* Description */}
          <p className="text-[#2C3E50] text-[15px] md:text-lg max-w-3xl leading-snug">
            Enter your exam details and get colleges where your admission chances are highest — 
            <span className="font-medium text-[#1A1A1B]"> based on real admission cut-offs & trends.</span>
          </p>

          {/* Feature Badges */}
          <div className="flex flex-wrap gap-3 mt-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-[#1E40AF]/20 shadow-sm transition-hover hover:shadow-md cursor-default">
              <TrendingUp className="w-4 h-4 text-[#1E40AF]" />
              <span className="text-sm font-semibold text-[#1A1A1B]">Success Score Based</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-[#F8F9F9] rounded-lg border border-[#F97316]/20 shadow-sm">
              <GraduationCap className="w-4 h-4 text-[#F97316]" />
              <span className="text-sm font-semibold text-[#1A1A1B]">Trusted by 10,000+</span>
            </div>

            <div className="flex items-center gap-2 px-4 py-2 bg-[#F8F9F9] rounded-lg border border-[#1E40AF]/20 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-[#1E40AF]" />
              <span className="text-sm font-semibold text-[#1A1A1B]">Secure & Free</span>
            </div>
          </div>

          {/* Action Button */}
          <button 
  type="button" // Always specify type to prevent accidental form submissions
  onClick={openModal}
  aria-label="Get a free college match consultation"
  className="
    flex items-center justify-center gap-2 
    w-full sm:w-auto 
    px-6 py-3 
    bg-[#1E40AF] hover:bg-[#1E3A8A] 
    text-white font-bold 
    rounded-xl shadow-lg shadow-blue-900/20 
    transition-all duration-200 
    active:scale-95 focus:ring-2 focus:ring-blue-400 focus:outline-none
  "
>
  <Phone size={20} aria-hidden="true" />
  <span>Get Free College Match</span>
</button>
        </div>

        {/* Subtle Decorative Background Element (Optional) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1E40AF]/20 rounded-full -mr-20 -mt-20 blur-3xl" />
      </div>
    </div>
  );
};

export default CollegeMatchCard;