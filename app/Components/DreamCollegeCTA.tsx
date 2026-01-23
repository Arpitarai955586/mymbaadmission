
"use client";
import React from 'react';
import Image from 'next/image';
import { Check, Users } from 'lucide-react';
import { useModal } from '@/app/Context/ModalContext';

const DreamCollegeCTA: React.FC = () => {

  const { openModal } = useModal();

  const points = [
    "One-to-one expert guidance for course & college selection",
    "Compare multiple universities before you apply",
    "No extra charges for counselling & application support"
  ];

  return (
    <section className="bg-[#F8F9F9] py-20 px-6">
      <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden shadow-2xl relative bg-gradient-to-r from-[#922B21] via-[#7A2318] to-[#1A1A1B] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left Column: Text Content */}
        <div className="flex-1 space-y-8 text-white z-10">
          <div className="space-y-1">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Your Dream College Won't Wait.
            </h2>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#D4AC0D] tracking-tight leading-tight">
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
                <Check className="w-5 h-5 text-[#D4AC0D] flex-shrink-0 mt-0.5" />
                <span className="text-white font-medium">{point}</span>
              </li>
            ))}
          </ul>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
            <button onClick={openModal} className="w-full sm:w-auto bg-[#922B21] hover:bg-[#7A2318] text-white px-10 py-4 rounded-full font-bold text-lg transition-all active:scale-95 shadow-xl hover:shadow-[#922B21]/20">
              Talk to an Expert Today
            </button>
            <div className="flex items-center gap-2 text-white/80 text-sm font-semibold">
              <Users size={20} className="text-[#D4AC0D]" />
              <span>Trusted by 10,000+ students</span>
            </div>
          </div>
        </div>

     <div className="flex-shrink-0 relative">
  <div className="bg-white/10 p-5 rounded-[1.5rem] backdrop-blur-md border border-white/20 shadow-inner">
    <div className="bg-white rounded-[1.5rem] shadow-2xl border border-[#922B21]/10 relative h-[300px] w-[260px] md:h-[450px] md:w-[380px] overflow-hidden">
      <Image 
        src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=800" 
        alt="Graduate Student"
        fill
        className="object-cover object-center" // Changed to cover for a better look with stock photos
        priority
      />
    </div>

    {/* Floating Live Badge */}
    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-4 rounded-[1.5rem] shadow-[0_10px_40px_rgba(146,43,33,0.15)] flex items-center gap-3 min-w-[200px] border border-[#922B21]/10 z-20">
      <div className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D4AC0D] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AC0D]"></span>
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