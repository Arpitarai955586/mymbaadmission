"use client";
import React from 'react';
import { Check, Users, Phone } from 'lucide-react';
import Image from 'next/image';
import { useModal } from '../Context/ModalContext';
import { themeColors, colorCombos, themeClasses } from '../config/theme';

const DreamCollegeCTA: React.FC = () => {
  const { openModal } = useModal();

  const points = [
    "One-to-one expert guidance for course & college selection",
    "Compare multiple universities before you apply",
    "No extra charges for counselling & application support"
  ];

  return (
    <section className="bg-[#F8F9F9] py-20 px-6">
      <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl relative bg-gradient-to-r from-[#1E40AF] via-[#1E3A8A] to-[#1A1A1B] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left Column: Text Content */}
        <div className="flex-1 space-y-8 text-white z-10">
          <div className="space-y-1">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Your Dream College Won't Wait.
            </h2>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#F97316] tracking-tight leading-tight">
              Why Should You?
            </h2>
          </div>

          <p className="text-white/90 text-lg mb-8 leading-relaxed max-w-2xl font-medium">
            Thousands of students have already trusted us to secure admission in their desired courses. Get personalised guidance and choose the right college for your career.
          </p>

          <div className="font-bold text-sm tracking-wide uppercase border-b border-white/20 pb-4 inline-block">
            100% Online Counselling • Flexible Options • Govt. & UGC Approved Programs
          </div>

          {/* Benefits List */}
          <ul className="space-y-4">
            {points.map((point, i) => (
              <li key={i} className="flex items-center gap-3 group">
                <Check className="w-5 h-5 text-[#F97316] flex-shrink-0 mt-0.5" />
                <span className="text-white font-medium">{point}</span>
              </li>
            ))}
          </ul>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
            <button onClick={openModal} className="relative bg-gradient-to-r from-[#F97316] to-[#EA580C] hover:from-[#EA580C] hover:to-[#DC2626] text-white px-10 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-[#F97316]/30 group">
              <span className="relative z-10 flex items-center gap-3">
                Talk to an Expert Today
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <div className="flex items-center gap-2 text-white/80 text-sm font-semibold">
              <Users size={20} className="text-[#F97316]" />
              <span>Trusted by 10,000+ students</span>
            </div>
          </div>
        </div>

        {/* Right Column: Image with Floating Badge */}
        <div className="flex-shrink-0 relative">
          <div className="bg-white/10 p-5 rounded-[1.5rem] backdrop-blur-md border border-white/20 shadow-inner">
            <div className="bg-white rounded-[1.5rem] shadow-2xl border border-[#1E40AF]/10 relative h-[300px] w-[260px] md:h-[450px] md:w-[380px] overflow-hidden">
              <Image 
                src="/hero/dream-image.png" 
                alt="Graduate Student"
                fill
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Floating Live Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-4 rounded-[1.5rem] shadow-[0_10px_40px_rgba(30,64,175,0.15)] flex items-center gap-3 min-w-[200px] border border-[#1E40AF]/10 z-20">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F97316] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#F97316]"></span>
              </div>
              <div className="leading-tight">
                <p className="text-[11px] font-black text-[#1A1A1B] uppercase tracking-tighter">Live counselling</p>
                <p className="text-[11px] font-bold text-[#2C3E50] capitalize">available today</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DreamCollegeCTA;