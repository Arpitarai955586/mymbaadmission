"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Search, Filter, Calendar, Clock, Users, BookOpen, ChevronRight, Star } from 'lucide-react';
import { siteIdentity } from '../config/site';
import Link from 'next/link';
import { useModal } from '../../Context/ModalContext';
import { useSearchParams } from 'next/navigation';

interface Exam {
  id: number;
  name: string;
  slug : string;
  category: string;
  date: string;
  duration: string;
  applicants: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  rating: number;
  description: string;
  eligibility: string[];
  pattern: string[];
}

// const examsData: Exam[] = [
//   {
//     id: 1,
//     name: "JEE Main",
//     slug: "jee-main",
//     category: "Engineering",
//     date: "Jan 24, 2026",
//     duration: "3 Hours",
//     applicants: "12L+",
//     difficulty: "Hard",
//     rating: 4.8,
//     description: "Joint Entrance Examination (Main) for admission to B.E./B.Tech courses in NITs, IIITs, and other centrally funded technical institutions.",
//     eligibility: ["10+2 with Physics, Chemistry, Mathematics", "Minimum 75% aggregate"],
//     pattern: ["Multiple Choice Questions", "Numerical Value Type", "Total Questions: 75", "Total Marks: 300"]
//   },
//   {
//     id: 2,
//     name: "NEET UG",
//     slug: "neet-ug",
//     category: "Medical",
//     date: "May 5, 2026",
//     duration: "3 Hours 20 Minutes",
//     applicants: "20L+",
//     difficulty: "Hard",
//     rating: 4.9,
//     description: "National Eligibility cum Entrance Test for admission to MBBS, BDS, AYUSH, and other medical courses in India.",
//     eligibility: ["10+2 with Physics, Chemistry, Biology", "Minimum 50% for General, 40% for Reserved"],
//     pattern: ["Multiple Choice Questions", "Total Questions: 180", "Total Marks: 720", "Negative Marking: -1"]
//   },
//   {
//     id: 3,
//     name: "CAT",
//     slug: "cat",
//     category: "Management",
//     date: "Nov 24, 2026",
//     duration: "2 Hours",
//     applicants: "2.5L+",
//     difficulty: "Hard",
//     rating: 4.7,
//     description: "Common Admission Test for admission to MBA programs in IIMs and other top B-schools in India.",
//     eligibility: ["Bachelor's Degree with 50%", "Final year students can apply"],
//     pattern: ["Verbal Ability", "Quantitative Aptitude", "Logical Reasoning", "Data Interpretation"]
//   },
//   {
//     id: 4,
//     name: "GATE",
//     slug: "gate",
//     category: "Engineering",
//     date: "Feb 3-4, 2026",
//     duration: "3 Hours",
//     applicants: "8L+",
//     difficulty: "Hard",
//     rating: 4.6,
//     description: "Graduate Aptitude Test in Engineering for admission to M.Tech programs and PSU recruitments.",
//     eligibility: ["Bachelor's in Engineering/Technology", "Final year students can apply"],
//     pattern: ["Multiple Choice Questions", "Numerical Answer Type", "Total Questions: 65", "Total Marks: 100"]
//   },
//   {
//     id: 5,
//     name: "CLAT",
//     slug: "clat",
//     category: "Law",
//     date: "Dec 3, 2026",
//     duration: "2 Hours",
//     applicants: "70K+",
//     difficulty: "Medium",
//     rating: 4.5,
//     description: "Common Law Admission Test for admission to integrated LL.B and LL.M programs in NLUs.",
//     eligibility: ["10+2 with 45% aggregate", "Age limit: 20 years (General)"],
//     pattern: ["English Language", "Current Affairs", "Legal Reasoning", "Logical Reasoning", "Quantitative Techniques"]
//   },
//   {
//     id: 6,
//     name: "NDA",
//     slug: "nda",
//     category: "Defense",
//     date: "Apr 21, 2026",
//     duration: "5 Hours",
//     applicants: "5L+",
//     difficulty: "Medium",
//     rating: 4.4,
//     description: "National Defense Academy examination for admission to Army, Navy, and Air Force wings of NDA.",
//     eligibility: ["10+2 passed/appearing", "Age: 16.5-19.5 years", "Unmarried male candidates"],
//     pattern: ["Mathematics (300 marks)", "General Ability Test (600 marks)", "SSB Interview for qualified candidates"]
//   }
// ];

const categories = ["All", "Medical", "Management", "Law", "Defense"];
const difficulties = ["All", "Medium", "Hard"];

function ExamsPageContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [showFilters, setShowFilters] = useState(false);
  const [displayCount, setDisplayCount] = useState(6);
  const [examsData , setExamsData] = useState<Exam[]>([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { openModal } = useModal();
  
  // Update search term when URL params change
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl !== null) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchParams]);
React.useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('/api/exams');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.success && Array.isArray(data.exams)) {
          setExamsData(data.exams);
        } else {
          console.warn('Unexpected API response format:', data);
          setExamsData([]);
        }
      } catch (error) {
        console.error('Error fetching exam data:', error);
        setError('Failed to load exams. Please try again.');
        setExamsData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);
  const filteredExams = examsData.filter(exam => {
    if (!exam) return false;
    
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      (exam.name && exam.name.toLowerCase().includes(searchLower)) ||
      (exam.description && exam.description.toLowerCase().includes(searchLower)) ||
      (exam.category && exam.category.toLowerCase().includes(searchLower));
    
    const matchesCategory = selectedCategory === "All" || exam.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || exam.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  const displayedExams = filteredExams.slice(0, displayCount);
  const hasMore = filteredExams.length > displayCount;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Medium": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "Hard": return "bg-red-100 text-red-700 border-red-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9F9]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#922B21] via-[#7A2318] to-[#1A1A1B] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Competitive Exams Portal
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Explore comprehensive information about all major competitive exams in India. 
              Get detailed insights, eligibility criteria, and preparation strategies.
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
                className="w-full pl-12 pr-4 py-4 rounded-xl text-[#1A1A1B] placeholder-gray-400 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D4AC0D]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white border-b border-[#922B21]/10 py-6 px-6 sticky top-0 z-40">
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
                      ? "bg-[#922B21] text-white"
                      : "bg-[#F8F9F9] text-[#2C3E50] border border-[#922B21]/20 hover:bg-[#922B21] hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Difficulty Filters & Toggle */}
            <div className="flex items-center gap-4">
              <div className="hidden lg:flex gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedDifficulty === difficulty
                        ? "bg-[#D4AC0D] text-white"
                        : "bg-[#F8F9F9] text-[#2C3E50] border border-[#D4AC0D]/20 hover:bg-[#D4AC0D] hover:text-white"
                    }`}
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#922B21] text-white rounded-lg"
              >
                <Filter size={16} />
                Filters
              </button>
            </div>
          </div>

          {/* Mobile Filters */}
          {showFilters && (
            <div className="lg:hidden mt-4 pt-4 border-t border-[#922B21]/10">
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedDifficulty === difficulty
                        ? "bg-[#D4AC0D] text-white"
                        : "bg-[#F8F9F9] text-[#2C3E50] border border-[#D4AC0D]/20 hover:bg-[#D4AC0D] hover:text-white"
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
              {loading ? 'Loading...' : `${filteredExams.length} Exams Found`}
            </h2>
            <p className="text-[#2C3E50]">
              {error ? error : 'Comprehensive information about competitive exams for your career guidance'}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#922B21]"></div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-600 text-2xl">!</span>
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">Error Loading Exams</h3>
              <p className="text-[#2C3E50] mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-[#922B21] hover:bg-[#7A2318] text-white font-bold rounded-lg transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Exam Cards Grid */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedExams.map((exam, index) => (
              <div
                key={`${exam.slug || exam.name}-${index}`}
                className="bg-white rounded-xl shadow-sm border border-[#922B21]/10 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="p-4 border-b border-[#922B21]/10">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-[#D4AC0D] text-white text-xs font-bold rounded-full">
                      {exam.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-[#D4AC0D] text-[#D4AC0D]" />
                      <span className="text-sm font-bold text-[#1A1A1B]">{exam.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-[#1A1A1B] mb-2">{exam.name}</h3>
                  <p className="text-[#2C3E50] text-sm leading-relaxed line-clamp-2">{exam.description}</p>
                </div>

                {/* Card Body - Stats */}
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-[#922B21]" />
                      <div>
                        <p className="text-xs text-[#2C3E50]">Exam Date</p>
                        <p className="text-sm font-bold text-[#1A1A1B]">{exam.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-[#922B21]" />
                      <div>
                        <p className="text-xs text-[#2C3E50]">Duration</p>
                        <p className="text-sm font-bold text-[#1A1A1B]">{exam.duration}</p>
                      </div>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-[#922B21]" />
                      <span className="text-sm text-[#2C3E50]">{exam.applicants} Applicants</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 text-xs font-bold rounded-md border ${getDifficultyColor(exam.difficulty)}`}>
                        {exam.difficulty}
                      </span>
                      <span className="text-xs text-[#2C3E50]">Difficulty Level</span>
                    </div>
                  </div>

                  {/* Key Features */}
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-[#1A1A1B] mb-2">Key Features:</h4>
                    <ul className="space-y-1">
  {Array.isArray(exam.eligibility) &&
    exam.eligibility.slice(0, 2).map((item, index) => (
      <li
        key={`${exam.id}-eligibility-${index}`}
        className="text-xs text-[#2C3E50] flex items-start gap-1"
      >
        <span className="text-[#D4AC0D] mt-0.5">•</span>
        <span className="line-clamp-1">{item}</span>
      </li>
    ))}
</ul>

                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button 
                      onClick={openModal}
                      className="flex-1 bg-[#922B21] hover:bg-[#7A2318] text-white font-bold py-2 rounded-lg transition-colors text-sm"
                    >
                      Apply Now
                    </button>
                    <Link 
                      href={`/exams/${exam.slug}`}
                      className="flex items-center justify-center px-3 py-2 border border-[#922B21]/30 text-[#922B21] hover:bg-[#922B21] hover:text-white rounded-lg transition-colors"
                    >
                      <BookOpen size={16} />
                    </Link>
                  </div>
                </div>
              </div>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={handleLoadMore}
                className="px-8 py-3 bg-[#922B21] text-white font-bold rounded-lg hover:bg-[#7A231A] transition-colors duration-200 transform hover:scale-105"
              >
                Load More Exams
              </button>
            </div>
          )}

          {/* No Results */}
          {displayedExams.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-[#F8F9F9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-[#922B21]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">No Exams Found</h3>
              <p className="text-[#2C3E50] mb-4">Try adjusting your search or filters to find what you're looking for.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSelectedDifficulty("All");
                }}
                className="px-6 py-2 bg-[#D4AC0D] hover:bg-[#B8940F] text-white font-bold rounded-lg transition-colors"
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
