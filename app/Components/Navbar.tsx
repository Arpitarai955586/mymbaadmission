"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Search, Menu, X } from 'lucide-react';
import { useModal } from '../Context/ModalContext';
import { siteIdentity } from '../config/site';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  const { openModal } = useModal();

  return (
    <nav className="w-full text-black bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top Contact Bar (Optional, based on screenshot) */}
      <div className="hidden sm:flex bg-[#1A1A1B] text-white px-6 py-4 justify-between text-[11px] font-medium">
        <div className="flex gap-4">
          <span className="flex items-center text-[15px] gap-1"><Phone size={10} /> {siteIdentity.contact.phone}</span>
          <span className="text-[15px]">{siteIdentity.contact.email}</span>
        </div>
        <div className="flex gap-3 text-[15px]">
          <span>{siteIdentity.contact.address}</span>
          {/* <span>{siteIdentity.social.twitter}</span> */}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 gap-4">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="relative w-20 h-20">
              <Image 
                src={siteIdentity.logo} 
                alt={siteIdentity.name} 
                fill
                className="object-contain rounded-lg"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-lg text-[#1A1A1B] tracking-tight leading-none">{siteIdentity.name}</span>
              <span className="text-[9px] text-gray-400 font-bold tracking-widest uppercase">{siteIdentity.tagline}</span>
            </div>
          </Link>

          {/* Search Bar - Desktop */}
          {/* Search Bar - Desktop */}
          {/* <div className="hidden md:flex flex-1 max-w-lg px-4">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search for colleges, courses, exams here" 
                className="w-full bg-gray-50 border border-gray-200 rounded-md py-2 px-4 text-sm focus:ring-1 focus:ring-blue-500 focus:bg-white outline-none transition-all"
                onChange={(e) => {
                  // Store search term in localStorage for use in other pages
                  localStorage.setItem('globalSearch', e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const searchTerm = (e.target as HTMLInputElement).value;
                    if (searchTerm.trim()) {
                      // Navigate to appropriate page based on current path
                      const currentPath = window.location.pathname;
                      if (currentPath.includes('/exams')) {
                        // Trigger search on exams page
                        window.location.href = `/exams?search=${encodeURIComponent(searchTerm)}`;
                      } else if (currentPath.includes('/blogs')) {
                        // Trigger search on blogs page
                        window.location.href = `/blogs?search=${encodeURIComponent(searchTerm)}`;
                      } else {
                        // Default to exams page
                        window.location.href = `/exams?search=${encodeURIComponent(searchTerm)}`;
                      }
                    }
                  }
                }}
              />
              <Search className="absolute right-3 top-2.5 text-gray-400" size={16} />
            </div>
          </div> */}

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            <div className="flex gap-6 text-sm font-semibold text-gray-600">
              <Link href="/blogs" className="hover:text-blue-600 transition-colors">Blogs</Link>
              <Link href="/exams" className="hover:text-blue-600 transition-colors">Exams</Link>
            </div>
            
            <button onClick={openModal} className="bg-[#922B21] hover:bg-[#7A2318] text-white px-5 py-2.5 rounded-lg flex items-center gap-2 text-sm font-bold transition-all whitespace-nowrap">
              <Phone size={14} /> Get Guidance
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-600 p-2"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 p-4 space-y-4 shadow-xl">
          <div className="relative w-full mb-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-full bg-gray-50 border rounded-md py-2 px-4 text-sm outline-none"
            />
          </div>
          <div className="flex flex-col gap-4 font-semibold text-gray-700">
            <Link href="/blogs" onClick={() => setIsMobileMenuOpen(false)}>Blogs</Link>
            <Link href="/exams" onClick={() => setIsMobileMenuOpen(false)}>Exams</Link>
            <button onClick={openModal} className="bg-[#922B21] text-white w-full py-3 rounded-lg font-bold">
              Get Guidance
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;