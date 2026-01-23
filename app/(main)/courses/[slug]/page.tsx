"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useModal } from '../../../Context/ModalContext';
import { getCourseById, Course, formatFees } from '../../../config/courses';
import { getExamNames } from '../../../config/exams';
import { 
  Clock, 
  DollarSign, 
  GraduationCap, 
  BookOpen, 
  Users, 
  Award,
  AlertCircle,
  Home,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';

export default function CourseDynamicPage() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  useEffect(() => {
    const fetchCourse = () => {
      try {
        const found = getCourseById(slug || '');
        setCourse(found || null);
      } catch (err) {
        console.error("Failed to fetch course", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  /* Loading State */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9F9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#922B21] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading course details...</p>
        </div>
      </div>
    );
  }

  /* Error State */
  if (!course) {
    return (
      <div className="min-h-screen bg-[#F8F9F9] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Course Not Found</h1>
          <p className="text-gray-600 mb-4">The course you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-[#922B21] text-white rounded-lg hover:bg-[#7A231A] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9F9]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#922B21] via-[#7A2318] to-[#1A1A1B] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-8">
            <Home size={14} />
            <span>Home</span>
            <ChevronRight size={12} />
            <span>Courses</span>
            <ChevronRight size={12} />
            <span className="text-white">{course.name}</span>
          </nav>

          {/* Course Header */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-4 py-2 bg-[#D4AC0D] text-white rounded-full text-sm font-bold">
                  {course.degree}
                </span>
                <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold">
                  {course.duration_years} Years
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                {course.name}
              </h1>

              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {course.degree} Program with comprehensive curriculum designed for excellence.
              </p>
            </div>

            {/* Quick Info Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <GraduationCap className="text-[#D4AC0D]" />
                Course Info
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="text-[#D4AC0D]" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Duration</p>
                    <p className="font-semibold">{course.duration_years} Years</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <DollarSign className="text-[#D4AC0D]" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Average Fees</p>
                    <p className="font-semibold">{formatFees(course.default_fees)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Award className="text-[#D4AC0D]" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Degree</p>
                    <p className="font-semibold">{course.degree}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={openModal}
                className="w-full mt-6 px-6 py-3 bg-[#D4AC0D] text-white font-bold rounded-lg hover:bg-[#B8940F] transition-colors flex items-center justify-center gap-2"
              >
                <BookOpen size={18} />
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <section className="bg-white rounded-2xl shadow-sm border border-[#922B21]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                <BookOpen className="text-[#922B21]" size={28} />
                About {course.name}
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">
                  The {course.name} program is a comprehensive {course.degree.toLowerCase()} course 
                  designed to provide students with strong foundational knowledge and practical skills 
                  in management and business administration. This {course.duration_years}-year program 
                  combines theoretical learning with practical applications, preparing students for 
                  successful careers in the corporate world.
                </p>
                
                <p className="text-gray-700 leading-relaxed mt-4">
                  Students will gain expertise in various areas including business strategy, financial management, 
                  marketing, human resources, and operations management. The curriculum is regularly updated 
                  to reflect current industry trends and requirements.
                </p>
              </div>
            </section>

            {/* Entrance Exams */}
            {course.entrance_exams.length > 0 && (
              <section className="bg-white rounded-2xl shadow-sm border border-[#922B21]/10 p-8">
                <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                  <Award className="text-[#922B21]" size={28} />
                  Accepted Entrance Exams
                </h2>
                <div className="flex flex-wrap gap-3">
                  {course.entrance_exams.map((examId, index) => (
                    <span 
                      key={index}
                      className="px-4 py-2 bg-[#F8F9F9] text-[#922B21] font-bold rounded-lg border border-[#D4AC0D]/20"
                    >
                      {examId.toUpperCase()}
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 mt-4">
                  Admission to this program is based on performance in the mentioned entrance exams. 
                  Candidates must qualify in at least one of these exams to be eligible for admission.
                </p>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-[#D4AC0D] to-[#B8940F] rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BookOpen size={24} />
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button 
                  onClick={openModal}
                  className="w-full bg-white text-[#922B21] px-4 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  Apply Now
                </button>
                <Link 
                  href="/colleges"
                  className="w-full bg-white/20 backdrop-blur-sm text-white px-4 py-3 rounded-lg font-bold hover:bg-white/30 transition-colors block text-center"
                >
                  View Colleges
                </Link>
              </div>
            </div>

            {/* Course Stats */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#922B21]/10 p-6">
              <h3 className="text-xl font-bold text-[#1A1A1B] mb-4">Program Highlights</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="text-[#922B21]" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold">{course.duration_years} Years</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <DollarSign className="text-[#D4AC0D]" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Total Fees</p>
                    <p className="font-semibold">{formatFees(course.default_fees)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <GraduationCap className="text-[#922B21]" size={20} />
                  <div>
                    <p className="text-sm text-gray-500">Degree Level</p>
                    <p className="font-semibold">{course.degree}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Need Help? */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#922B21]/10 p-6">
              <h3 className="text-xl font-bold text-[#1A1A1B] mb-4">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Our admission counselors are here to help you with the application process and course selection.
              </p>
              <button 
                onClick={openModal}
                className="w-full bg-[#922B21] text-white px-4 py-3 rounded-lg font-bold hover:bg-[#7A231A] transition-colors"
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
