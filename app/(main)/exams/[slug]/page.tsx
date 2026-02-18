"use client";

import React, { useEffect, useState } from "react";
import { 
  Home, 
  ChevronRight, 
  Calendar, 
  Clock, 
  Users, 
  BookOpen, 
  Award,
  FileText,
  Target,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useParams } from "next/navigation";
import { useModal } from '../../../Context/ModalContext';

interface Exam {
  _id: string;
  name: string;
  slug: string;
  exam_type: "National" | "State";
  category: string;
  exam_date: string;
  duration: string;
  status: "Upcoming" | "Ongoing" | "Completed";
  description: string;
  eligibility_criteria: string;
  exam_pattern: string;
  syllabus: string;
  important_dates: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function ExamDynamicPage() {
  const { slug } = useParams<{ slug: string }>();
  const [exam, setExam] = useState<Exam | null>(null);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const res = await fetch("/api/exams");
        const data = await res.json();

        if (Array.isArray(data.exams)) {
          const found = data.exams.find(
            (e: Exam) => e.slug === slug
          );
          setExam(found || null);
        }
      } catch (err) {
        console.error("Failed to fetch exam", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExam();
  }, [slug]);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return 'Date not available';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Ongoing':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Completed':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getExamTypeColor = (type: string) => {
    return type === 'National' 
      ? 'bg-purple-100 text-purple-800 border-purple-200'
      : 'bg-orange-100 text-orange-800 border-orange-200';
  };

  /* 🔒 LOADING / ERROR STATES */
  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9F9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#922B21] mx-auto mb-4"></div>
          <p className="text-gray-500">Loading exam details...</p>
        </div>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="min-h-screen bg-[#F8F9F9] flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Exam Not Found</h1>
          <p className="text-gray-600 mb-4">The exam you're looking for doesn't exist or has been removed.</p>
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
      {/* Hero Section with Background */}
      <div className="bg-gradient-to-br from-[#1E3A8A] via-[#1E40AF] to-[#0F172A]
 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-16">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-white/80 mb-8">
            <Home size={14} />
            <span>Home</span>
            <ChevronRight size={12} />
            <span>Exams</span>
            <ChevronRight size={12} />
            <span className="text-white">{exam.name}</span>
          </nav>

          {/* Exam Header */}
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(exam.status)}`}>
                  {exam.status}
                </span>
                <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getExamTypeColor(exam.exam_type)}`}>
                  {exam.exam_type} Level
                </span>
                <span className="px-4 py-2 bg-[#D4AC0D] text-white rounded-full text-sm font-bold">
                  {exam.category}
                </span>
              </div>

              <h1 className="text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                {exam.name}
              </h1>

              <p className="text-xl text-white/90 mb-6 leading-relaxed">
                {exam.description}
              </p>
            </div>

            {/* Quick Info Card */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Target className="text-[#D4AC0D]" />
                Exam Info
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="text-[#D4AC0D]" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Exam Date</p>
                    <p className="font-semibold">{exam.exam_date ? formatDate(exam.exam_date) : 'To be announced'}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Clock className="text-[#D4AC0D]" size={20} />
                  <div>
                    <p className="text-sm text-white/70">Duration</p>
                    <p className="font-semibold">{exam.duration || 'Not specified'}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={openModal}
                className="w-full mt-6 px-6 py-3 bg-[#1E40AF] text-white font-bold rounded-lg hover:bg-[#B8940F] transition-colors flex items-center justify-center gap-2"
              >
                <Target size={18} />
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
            {/* Eligibility Criteria */}
            <section className="bg-white rounded-2xl shadow-sm border border-[#922B21]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                <Users className="text-[#922B21]" size={28} />
                Eligibility Criteria
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {exam.eligibility_criteria || 'Eligibility criteria will be updated soon.'}
                </p>
              </div>
            </section>

            {/* Exam Pattern */}
            {/* <section className="bg-white rounded-2xl shadow-sm border border-[#922B21]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                <FileText className="text-[#922B21]" size={28} />
                Exam Pattern
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {exam.exam_pattern || 'Exam pattern will be updated soon.'}
                </p>
              </div>
            </section> */}

            {/* Syllabus */}
            {/* <section className="bg-white rounded-2xl shadow-sm border border-[#922B21]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                <BookOpen className="text-[#922B21]" size={28} />
                Syllabus
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {exam.syllabus || 'Syllabus will be updated soon.'}
                </p>
              </div>
            </section> */}

            {/* Important Dates */}
            <section className="bg-white rounded-2xl shadow-sm border border-[#922B21]/10 p-8">
              <h2 className="text-2xl font-bold text-[#1A1A1B] mb-6 flex items-center gap-3">
                <Calendar className="text-[#922B21]" size={28} />
                Important Dates
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {exam.important_dates || 'Important dates will be updated soon.'}
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preparation Tips */}
            <div className="bg-gradient-to-br from-[#2563EB] to-[#1E40AF]
 rounded-2xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Award size={24} />
                Quick Tips
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Check eligibility criteria</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Prepare required documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <span>Apply before deadline</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
