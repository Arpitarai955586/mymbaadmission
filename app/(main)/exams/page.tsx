"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Search, Filter, Calendar, Clock, Users, BookOpen, ChevronRight, Star, Globe } from 'lucide-react';
import { siteIdentity } from '../config/site';
import Link from 'next/link';
import { useModal } from '../../Context/ModalContext';
import { useSearchParams } from 'next/navigation';
import { examsData, Exam } from '../../config/exams';
import { themeColors, colorCombos, themeClasses } from '../../config/theme';

const categories = ["All", "National", "State"];
const difficulties = ["All", "Active"];

function ExamsPageContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [displayCount, setDisplayCount] = useState(6);
  const { openModal } = useModal();
  
  // Update search term when URL params change
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl !== null) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchParams]);

  const filteredExams = examsData.filter(exam => {
    if (!exam) return false;
    
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      (exam.name && exam.name.toLowerCase().includes(searchLower)) ||
      (exam.full_name && exam.full_name.toLowerCase().includes(searchLower)) ||
      (exam.type && exam.type.toLowerCase().includes(searchLower));
    
    const matchesCategory = selectedCategory === "All" || exam.type === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || exam.status === selectedDifficulty.toLowerCase();
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  const displayedExams = filteredExams.slice(0, displayCount);
  const hasMore = filteredExams.length > displayCount;

  return (
    <div className="min-h-screen bg-[#F8F9F9]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#1A1A1B] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-[#F97316] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#F97316] mb-4">
              <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
              EXAMS
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Competitive Exams & Tests
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Complete information about entrance exams, dates, eligibility, and preparation resources
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-4 text-[#1A1A1B]" size={20} />
              <input
                type="text"
                placeholder="Search for exams, courses, or categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-[#1A1A1B] placeholder-gray-400 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-[#1E40AF]/10 py-6 px-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-[#1E40AF] text-white"
                      : "bg-[#F8F9F9] text-[#2C3E50] border border-[#1E40AF]/20 hover:bg-[#1E40AF] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Difficulty Filters */}
            <div className="flex items-center gap-2">
              {difficulties.map((difficulty) => (
                <button
                  key={difficulty}
                  onClick={() => setSelectedDifficulty(difficulty)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                    selectedDifficulty === difficulty
                      ? "bg-[#F97316] text-white"
                      : "bg-[#F8F9F9] text-[#2C3E50] border border-[#F97316]/20 hover:bg-[#F97316] hover:text-white"
                  }`}
                >
                  {difficulty}
                </button>
              ))}
            </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#1E40AF] text-white rounded-lg"
              >
                <Filter size={16} />
                Filters
              </button>
            </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 pt-4 border-t border-[#1E40AF]/10">
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedDifficulty === difficulty
                        ? "bg-[#F97316] text-white"
                        : "bg-[#F8F9F9] text-[#2C3E50] border border-[#F97316]/20 hover:bg-[#F97316] hover:text-white"
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1A1A1B] mb-2">
              {filteredExams.length} Exams Found
            </h2>
            <p className="text-[#2C3E50]">
              Comprehensive information about competitive exams for your career guidance
            </p>
          </div>

          {/* Exam Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedExams.map((exam, index) => (
            <div
              key={`${exam.exam_id}-${index}`}
              className="bg-white rounded-xl shadow-sm border border-[#1E40AF]/10 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
            >
              {/* Card Header */}
              <div className="p-4 border-b border-[#1E40AF]/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-[#F97316] text-white text-xs font-bold rounded-full">
                    {exam.type}
                  </span>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-[#2C3E50]">Difficulty:</span>
                    <span className="text-xs font-bold text-[#1E40AF]">Active</span>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-[#1A1A1B] mb-2">{exam.name}</h3>
                <p className="text-[#2C3E50] text-sm leading-relaxed">{exam.full_name}</p>
              </div>

              {/* Card Body - Stats */}
              <div className="p-4">
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-[#1E40AF]" />
                    <div>
                      <p className="text-xs text-[#2C3E50]">Exam Month</p>
                      <p className="text-sm font-bold text-[#1A1A1B]">{exam.exam_month}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={14} className="text-[#1E40AF]" />
                    <div>
                      <p className="text-xs text-[#2C3E50]">Type</p>
                      <p className="text-sm font-bold text-[#1A1A1B]">{exam.type}</p>
                    </div>
                  </div>
                </div>

                {/* Website Link */}
                <a
                  href={exam.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1E40AF] hover:text-[#1E3A8A] text-sm font-medium flex items-center gap-1 transition-colors"
                >
                  {exam.website.replace('https://', '').replace('http://', '')}
                  <BookOpen size={12} />
                </a>
              </div>

              {/* Card Footer - Actions */}
              <div className="p-4 pt-0">
                <div className="flex gap-2">
                  <button 
                    onClick={openModal}
                    className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-bold py-2 rounded-lg transition-colors text-sm"
                  >
                    Apply Now
                  </button>
                  <a
                    href={exam.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-3 py-2 border border-[#1E40AF]/30 text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white rounded-lg transition-colors"
                  >
                    <BookOpen size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-[#1E40AF] text-white font-bold rounded-lg hover:bg-[#1E3A8A] transition-colors duration-200 transform hover:scale-105"
              >
                Load More Exams
              </button>
            </div>
          )}

          {/* No Results */}
          {displayedExams.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-[#F8F9F9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-[#1E40AF]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">No Exams Found</h3>
              <p className="text-[#2C3E50] mb-4">Try adjusting your search or filters to find what you're looking for.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedDifficulty("All");
                }}
                className="px-6 py-2 bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const ExamsPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F9F9] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#922B21]"></div>
      </div>
    }>
      <ExamsPageContent />
    </Suspense>
  );
};

export default ExamsPage;
