"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Landmark, Building, MapPin, TowerControl as Tower } from 'lucide-react';

const cities = [
  { name: "INDIA", icon: <Landmark size={32} strokeWidth={1.5} /> },
  { name: "DELHI NCR", icon: <Tower size={32} strokeWidth={1.5} /> },
  { name: "NOIDA", icon: <Tower size={32} strokeWidth={1.5} /> },
  { name: "GHAZIABAD", icon: <Building size={32} strokeWidth={1.5} /> },
  { name: "GREATER NOIDA", icon: <Landmark size={32} strokeWidth={1.5} /> },
  { name: "CHENNAI", icon: <MapPin size={32} strokeWidth={1.5} /> },
  { name: "NEW DELHI", icon: <Tower size={32} strokeWidth={1.5} /> },
  { name: "MUMBAI", icon: <Building size={32} strokeWidth={1.5} /> },
  { name: "KANPUR", icon: <Building size={32} strokeWidth={1.5} /> },
  { name: "HYDERABAD", icon: <MapPin size={32} strokeWidth={1.5} /> },
  { name: "VARANASI", icon: <Tower size={32} strokeWidth={1.5} /> },
  { name: "DEHRADUN", icon: <Landmark size={32} strokeWidth={1.5} /> },
];

const ExploreByCity: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Engineering");


  return (
    <section className="bg-[#F8F9F9] py-16 px-6">
      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="mb-8 border-b border-[#922B21]/20 pb-6">
          <h2 className="text-3xl font-extrabold text-[#1A1A1B] mb-2">Explore By City</h2>
          <p className="text-sm text-[#2C3E50]">
            Discover <span className="font-bold text-[#1A1A1B]">top colleges</span> and courses in your city
          </p>
        </div>

        {/* Category Switcher Tabs */}
        {/* <div className="flex gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat
                  ? "bg-[#922B21] text-white"
                  : "bg-[#F8F9F9] text-[#2C3E50] border border-[#922B21]/30 hover:bg-[#922B21] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div> */}

        {/* Carousel Container */}
        <div className="relative group">
          {/* Navigation Buttons */}
          <button className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#922B21]/20 p-2 rounded-full shadow-md text-[#1A1A1B] hover:bg-[#922B21] hover:text-white transition-colors">
            <ChevronLeft size={24} />
          </button>
          <button className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#922B21]/20 p-2 rounded-full shadow-md text-[#1A1A1B] hover:bg-[#922B21] hover:text-white transition-colors">
            <ChevronRight size={24} />
          </button>

          {/* Grid Layout (2 rows as per image) */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {cities.map((city, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center gap-4 py-8 rounded-xl border border-[#D4AC0D]/20 bg-gradient-to-br from-white via-white to-[#F8F9F9]/60 hover:shadow-lg hover:border-[#922B21]/40 transition-all cursor-pointer group/card"
              >
                <div className="text-[#922B21] transition-transform group-hover/card:-translate-y-1">
                  {city.icon}
                </div>
                <span className="text-[11px] font-black text-[#1A1A1B] tracking-wider">
                  {city.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreByCity;