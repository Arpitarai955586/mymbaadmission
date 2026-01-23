"use client";

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Landmark, Building, MapPin, TowerControl as Tower } from 'lucide-react';
import { themeColors, colorCombos, themeClasses } from '../config/theme';

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
  const [currentIndex, setCurrentIndex] = useState(0);

  // Responsive items to show
  // Mobile: 2, Tablet: 4, Desktop: 6
  const itemsToShow = {
    mobile: 2,
    tablet: 4,
    desktop: 6
  };

  const nextSlide = () => {
    if (currentIndex < cities.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setCurrentIndex(0); // Loop back to start
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      setCurrentIndex(cities.length - 1); // Loop to end
    }
  };

  return (
    <section className="bg-[#F8F9F9] py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        {/* Header Section */}
        <div className="mb-8 border-b border-[#922B21]/20 pb-6">
          <h2 className="text-3xl font-extrabold text-[#1A1A1B] mb-2">Explore By City</h2>
          <p className="text-sm text-[#2C3E50]">
            Discover <span className="font-bold text-[#1A1A1B]">top colleges</span> and courses in your city
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group px-4">
          {/* Navigation Buttons */}
          <button 
            onClick={prevSlide}
            className="absolute -left-2 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#1E40AF]/20 p-2 rounded-full shadow-md text-[#1A1A1B] hover:bg-[#1E40AF] hover:text-white transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute -right-2 top-1/2 -translate-y-1/2 z-20 bg-white border border-[#1E40AF]/20 p-2 rounded-full shadow-md text-[#1A1A1B] hover:bg-[#1E40AF] hover:text-white transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          {/* Slider Window */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / 6)}%)`,
                // Note: The denominator (6) should ideally match your desktop grid count
              }}
            >
              {cities.map((city, index) => (
                <div
                  key={index}
                  className="min-w-[50%] md:min-w-[25%] lg:min-w-[16.66%] p-2"
                >
                  <div className="flex flex-col items-center justify-center gap-4 py-8 rounded-xl border border-[#F97316]/20 bg-gradient-to-br from-white via-white to-[#F8F9F9]/60 hover:shadow-lg hover:border-[#1E40AF]/40 transition-all cursor-pointer group/card h-full">
                    <div className="text-[#1E40AF] transition-transform group-hover/card:-translate-y-1">
                      {city.icon}
                    </div>
                    <span className="text-[11px] font-black text-[#1A1A1B] tracking-wider text-center px-2">
                      {city.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pagination Dots (Optional) */}
        <div className="flex justify-center gap-2 mt-6">
            {cities.map((_, i) => (
                <div 
                    key={i} 
                    className={`h-1.5 transition-all rounded-full ${currentIndex === i ? "w-6" : "w-2"}`}
                    style={{
                      backgroundColor: currentIndex === i ? themeColors.primary : `${themeColors.accent}30`
                    }}
                />
            ))}
        </div>
      </div>
    </section>
  );
};

export default ExploreByCity;