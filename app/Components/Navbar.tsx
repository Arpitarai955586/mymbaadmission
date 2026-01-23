"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Menu, X, Home, Info, Mail, BookOpen, GraduationCap } from 'lucide-react';
import { useModal } from '../Context/ModalContext';
import { siteIdentity } from '../config/site';
import { DynamicIcon } from '../config/icons';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { openModal } = useModal();

  const navLinks = [
    { name: 'Home', href: '/', icon: 'home' },
    { name: 'About', href: '/about', icon: 'info' },
    { name: 'Exams', href: '/exams', icon: 'graduationCap' },
    { name: 'Blogs', href: '/blogs', icon: 'bookOpen' },
    { name: 'Colleges', href: '/colleges', icon: 'bookOpen' }, 
    { name: 'Courses', href: '/courses', icon: 'bookOpen' },
  ];

  return (
    <nav className="w-full text-black bg-white border-b border-gray-100 sticky top-0 z-50">
      {/* Top Contact Bar */}
      <div className="hidden sm:flex bg-[#1A1A1B] text-white px-6 py-2.5 justify-between text-[12px] font-medium tracking-wide">
        <div className="flex gap-6">
          <span className="flex items-center gap-1.5 opacity-90">
            <DynamicIcon name="phone" size={12} className="text-[#D4AC0D]" /> 
            {siteIdentity.contact.phone[0]}
          </span>
          <span className="flex items-center gap-1.5 opacity-90">
            <DynamicIcon name="mail" size={12} className="text-[#D4AC0D]" /> 
            {siteIdentity.contact.email}
          </span>
        </div>
        <div className="hidden lg:block opacity-70">
          <span>{siteIdentity.contact.address}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center h-20">
          
          {/* 1. Left: Logo Section */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-14 h-14 md:w-16 md:h-16 transition-transform group-hover:scale-105">
                <Image 
                  src={siteIdentity.logo} 
                  alt={siteIdentity.name} 
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-extrabold text-base md:text-lg text-[#1A1A1B] tracking-tight">{siteIdentity.name}</span>
                <span className="text-[8px] text-[#922B21] font-bold tracking-[0.15em] uppercase italic">{siteIdentity.tagline}</span>
              </div>
            </Link>
          </div>

            <div className="hidden lg:flex justify-center items-center">
            <div className="flex gap-8 text-[14px] font-bold text-gray-700 uppercase tracking-wide">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="hover:text-[#922B21] transition-all relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#922B21] transition-all group-hover:w-full"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* 3. Right: CTA Button & Mobile Toggle */}
          <div className="flex justify-end items-center gap-4">
            <button 
              onClick={openModal} 
              className="hidden sm:flex bg-[#922B21] hover:bg-[#1A1A1B] text-white px-6 py-2.5 rounded-full items-center gap-2 text-[13px] font-bold transition-all shadow-md active:scale-95"
            >
              <DynamicIcon name="phone" size={14} /> Get Guidance
            </button>

            {/* Mobile Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-800 p-2 hover:bg-gray-50 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 bg-white border-t border-gray-100 shadow-2xl h-screen overflow-y-auto animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="p-6 space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between p-4 bg-gray-50 text-gray-800 font-bold text-lg rounded-2xl hover:bg-[#922B21]/5 hover:text-[#922B21] transition-all"
              >
                <div className="flex items-center gap-4">
                  <DynamicIcon name={link.icon as any} size={22} className="text-gray-400" />
                  {link.name}
                </div>
                <DynamicIcon name="x" size={16} className="opacity-0 group-hover:opacity-100" />
              </Link>
            ))}
            
            <div className="pt-6">
              <button 
                onClick={() => {
                  openModal();
                  setIsMobileMenuOpen(false);
                }} 
                className="bg-[#922B21] text-white w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-[#922B21]/20"
              >
                <DynamicIcon name="phone" size={22} /> Get Admission Support
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;