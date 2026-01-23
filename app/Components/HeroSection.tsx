"use client";
import React from 'react';
import Image from 'next/image';
import { Phone, Users, GraduationCap, Search } from 'lucide-react';
import { useModal } from '../Context/ModalContext';

const HeroSection: React.FC = () => {
  const { openModal } = useModal();
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#F8F9F9] via-white to-[#F8F9F9] overflow-hidden">
      {/* Top Navbar Area */}


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side: Copy */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-[#F8F9F9] text-[#1E40AF] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider border border-[#F97316]">
            <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
            GETADMISSIONINFO • SMART ADMISSION SUPPORT
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-[#1A1A1B] leading-[1.15]">
            Get into the <span className="text-[#1E40AF]">Right College</span> <br />
            without the <span className="text-[#F97316]">Admission Stress.</span>
          </h1>

          <p className="text-[#2C3E50] text-lg leading-relaxed max-w-lg">
            From university shortlisting to form filling and follow-ups – 
            <span className="font-semibold text-[#1A1A1B]"> GetAdmissionInfo</span> stays with you till your admission is done.
          </p>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-[#F8F9F9] text-[#1E40AF] px-4 py-2 rounded-full text-sm font-semibold border border-[#F97316]">
              <Users size={16} /> Personal counsellor for every student
            </div>
            <div className="flex items-center gap-2 bg-[#F8F9F9] text-[#F97316] px-4 py-2 rounded-full text-sm font-semibold border border-[#1E40AF]">
              <GraduationCap size={16} /> Tie-ups with top universities
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <button 
              onClick={openModal}
              className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-3 transition-all active:scale-95 shadow-lg shadow-[#1E40AF]/20"
            >
              <Phone size={20} fill="currentColor" />
              Get Free Admission Support
            </button>
            <div className="flex items-center gap-2 text-[#2C3E50] text-sm font-medium ml-2">
              <Users size={16} className="text-gray-400" />
              10,000+ students guided
            </div>
          </div>
        </div>

        {/* Right Side: Image with Floating Badges */}
        <div className="relative">
          <div className="relative z-10 bg-white p-5 rounded-[2.5rem] shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
            {/* Top Live Badge */}
            <div className="absolute -top-6 -right-4 bg-[#F8F9F9] border border-[#F97316] px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-20">
              <span className="w-2 h-2 bg-[#F97316] rounded-full animate-ping" />
              <span className="text-[11px] font-bold text-[#1A1A1B]">Live admission help available today</span>
            </div>

            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden">
              <Image 
                src="/hero/hero-image.png"
                alt="Happy University Students"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Bottom Live Badge */}
            <div className="absolute -bottom-6 -left-10 bg-white border border-[#1E40AF] px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 z-20">
              <span className="w-2.5 h-2.5 bg-[#F97316] rounded-full" />
              <span className="text-[11px] font-bold text-[#1A1A1B]">Live admission help available today</span>
            </div>
          </div>

          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#1E40AF]/10 rounded-full blur-3xl -z-0" />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;