"use client";

import React, { useEffect, useState } from "react";
import { 
  Home, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Users, 
  Award,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  Target
} from "lucide-react";
import { useParams } from "next/navigation";
import { useModal } from '../../../Context/ModalContext';
import { themeColors, colorCombos, themeClasses } from '../../../config/theme';
import { getCollegeBySlug, College } from '../../../config/colleges';

export default function CollegeDynamicPage() {
  const { slug } = useParams<{ slug: string }>();
  const [college, setCollege] = useState<College | null>(null);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  useEffect(() => {
    // Use dummy data instead of API call
    const fetchCollege = () => {
      try {
        const found = getCollegeBySlug(slug || '');
        setCollege(found || null);
      } catch (err) {
        console.error("Failed to fetch college", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollege();
  }, [slug]);

  /* 🔒 LOADING / ERROR STATES */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9F9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E40AF] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading college details...</p>
        </div>
      </div>
    );
  }

  if (!college) {
    return (
      <div className="min-h-screen bg-[#F8F9F9] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">College Not Found</h1>
          <p className="text-gray-600 mb-4">The college you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9F9]">
      {/* Hero Section with Background */}
      <div className="bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#1A1A1B] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-8">
            <Home size={14} />
            <span>Home</span>
            <ChevronRight size={12} />
            <span>Colleges</span>
            <ChevronRight size={12} />
            <span className="text-white">{college.name}</span>
          </nav>

          {/* College Header */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-4 py-2 bg-[#F97316] text-white rounded-full text-sm font-bold">
                  {college.type}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold">
                  {college.location.city}, {college.location.state}
                </span>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-bold">
                  {college.status}
                </span>
                {college.approved_by.map((approval, index) => (
                  <span key={index} className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-bold">
                    {approval}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                {college.name}
              </h1>

              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {college.content?.overview || 'A premier management institution offering world-class education and excellent career opportunities.'}
              </p>
            </div>

            {/* Quick Info Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="text-[#F97316]" />
                Quick Info
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-[#F97316]" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Location</p>
                    <p className="font-semibold">{college.location.city}, {college.location.state}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Award className="text-[#F97316]" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Type</p>
                    <p className="font-semibold">{college.type}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Target className="text-[#F97316]" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Ranking</p>
                    <p className="font-semibold">Top Ranked</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Clock className="text-[#F97316]" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Established</p>
                    <p className="font-semibold">2020</p>
                  </div>
                </div>

              </div>

              <button 
                onClick={openModal}
                className="w-full mt-6 px-6 py-3 bg-[#F97316] text-white font-bold rounded-lg hover:bg-[#EA580C] transition-colors flex items-center justify-center gap-2"
              >
                <Target size={18} />
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* College Image */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 relative z-10">
        <div className="rounded-2xl overflow-hidden shadow-2xl">
          <img
            src={college.media?.cover || '/colleges/default-cover.jpg'}
            alt={college.name}
            className="w-full h-64 object-cover"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                <BookOpen className="text-[#1E40AF]" size={28} />
                About College
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {college.content?.overview || 'A premier management institution offering world-class education and excellent career opportunities.'}
                </p>
              </div>
            </section>

            {/* Courses Offered */}
            <section className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                <BookOpen className="text-[#1E40AF]" size={28} />
                Courses Offered
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {college.courses_offered.map((course, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-[#F8F9F9] rounded-lg border border-[#F97316]/20">
                    <CheckCircle className="text-[#1E40AF]" size={20} />
                    <span className="font-semibold text-[#1A1A1B]">{course.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Admission Process */}
            <section className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                <Target className="text-[#1E40AF]" size={28} />
                Admission Process
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {college.content?.admission || 'Admission based on entrance exam scores and personal interview.'}
                </p>
              </div>
              
              <div className="mt-6 p-4 bg-[#F8F9F9] rounded-lg border border-[#1E40AF]/20">
                <h3 className="font-bold text-[#1A1A1B] mb-3">Accepted Entrance Exams:</h3>
                <div className="flex flex-wrap gap-2">
                  {college.exams_accepted.map((exam, index) => (
                    <span key={index} className="px-4 py-2 bg-[#1E40AF] text-white rounded-full text-sm font-bold">
                      {exam.toUpperCase()}
                    </span>
                  ))}
                </div>
              </div>
            </section>

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target size={24} />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={openModal}
                  className="w-full bg-white text-[#1E40AF] px-4 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Apply Now
                </button>
               
              </div>
            </div>

           

            {/* Need Help? */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-6">
              <h3 className="text-xl font-bold text-[#1A1A1B] mb-4">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Our admission counselors are here to help you with the application process.
              </p>
              <button 
                onClick={openModal}
                className="w-full bg-[#1E40AF] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#1E3A8A] transition-colors"
              >
                Get Counselor Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
