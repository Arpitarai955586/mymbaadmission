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
          <div className="inline-flex items-center gap-2 bg-[#F8F9F9] text-[#922B21] px-4 py-1.5 rounded-full text-[11px] font-bold tracking-wider border border-[#D4AC0D]">
            <span className="w-2 h-2 bg-[#D4AC0D] rounded-full animate-pulse" />
            GETADMISSIONINFO • SMART ADMISSION SUPPORT
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold text-[#1A1A1B] leading-[1.15]">
            Get into the <span className="text-[#922B21]">Right College</span> <br />
            without the <span className="text-[#D4AC0D]">Admission Stress.</span>
          </h1>

          <p className="text-[#2C3E50] text-lg leading-relaxed max-w-lg">
            From university shortlisting to form filling and follow-ups – 
            <span className="font-semibold text-[#1A1A1B]"> GetAdmissionInfo</span> stays with you till your admission is done.
          </p>

          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 bg-[#F8F9F9] text-[#922B21] px-4 py-2 rounded-full text-sm font-semibold border border-[#D4AC0D]">
              <Users size={16} /> Personal counsellor for every student
            </div>
            <div className="flex items-center gap-2 bg-[#F8F9F9] text-[#D4AC0D] px-4 py-2 rounded-full text-sm font-semibold border border-[#922B21]">
              <GraduationCap size={16} /> Tie-ups with top universities
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <button 
              onClick={openModal}
              className="bg-[#922B21] hover:bg-[#7A2318] text-white px-8 py-4 rounded-xl text-lg font-bold flex items-center gap-3 transition-transform active:scale-95 shadow-lg shadow-[#922B21]/20"
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
            <div className="absolute -top-6 -right-4 bg-[#F8F9F9] border border-[#D4AC0D] px-4 py-2 rounded-full shadow-lg flex items-center gap-2 z-20">
              <span className="w-2 h-2 bg-[#D4AC0D] rounded-full animate-ping" />
              <span className="text-[11px] font-bold text-[#1A1A1B]">Live admission help available today</span>
            </div>

            {/* Main Image */}
            <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden">
              <Image 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Happy University Students"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Bottom Live Badge */}
            <div className="absolute -bottom-6 -left-10 bg-white border border-[#922B21] px-5 py-2.5 rounded-full shadow-xl flex items-center gap-2 z-20">
              <span className="w-2.5 h-2.5 bg-[#D4AC0D] rounded-full" />
              <span className="text-[11px] font-bold text-[#1A1A1B]">Live admission help available today</span>
            </div>
          </div>

          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#922B21]/10 rounded-full blur-3xl -z-0" />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;