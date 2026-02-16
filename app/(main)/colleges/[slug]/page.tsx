"use client";

import React, { useEffect, useState } from "react";
import {
  Home,
  ChevronRight,
  MapPin,
  Award,
  BookOpen,
  Clock,
  CheckCircle,
  AlertCircle,
  Target,
  Star,
  GraduationCap,
  Zap,
  TrendingUp,
  DollarSign,
  Users,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useModal } from "../../../Context/ModalContext";
import { getCollegeCoverUrl } from "@/lib/utils";

interface College {
  _id?: string;
  college_id: string;
  slug: string;
  name: string;
  short_name?: string;
  type: string;
  location: {
    city: string;
    state?: string;
  };
  approved_by: string[];
  exams_accepted: string[];
  courses_offered?: string[];
  highlights?: string[];
  status: string;
  content?: {
    overview?: string;
    admission?: string;
  };
  established_year?: number;
  ranking?: string;
  media?: {
    cover?: string;
  };
  fees?: {
    annual_fee?: number;
    currency?: string;
    fee_structure?: string;
  };
}

interface Course {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
  college_id?: string;
  degree?: string;
  duration_years?: number;
  default_fees?: {
    total_fee?: number;
    currency?: string;
  };
  entrance_exams?: string[];
}

export default function CollegeDynamicPage() {
  const { slug } = useParams<{ slug: string }>();
  const [college, setCollege] = useState<College | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { openModal } = useModal();

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/colleges/slug/${slug}`);
        const data = await res.json();

        if (data.success && data.college) {
          setCollege(data.college);
          if (data.courses && Array.isArray(data.courses)) {
            setCourses(data.courses);
          }
        }
      } catch (err) {
        console.error("Failed to fetch college", err);
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchCollegeData();
    }
  }, [slug]);

  /* 🔒 LOADING STATE */
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8F9F9] to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1E40AF] mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-semibold">
            Loading college details...
          </p>
        </div>
      </div>
    );
  }

  /* 🔒 ERROR STATE */
  if (!college) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#F8F9F9] to-white flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            College Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The college you're looking for doesn't exist or has been removed.
          </p>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white rounded-lg hover:shadow-lg transition-all font-bold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9F9] to-white">
      {/* Hero Section with Full-Width Image */}
      <div className="relative w-full h-96 md:h-[500px] overflow-hidden bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A]">
        <img
          src={
            college.media?.cover
              ? getCollegeCoverUrl(college.media.cover)
              : "/colleges/default-cover.jpg"
          }
          alt={college.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "/colleges/default-cover.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Breadcrumb */}
        <nav className="absolute top-6 left-6 flex items-center gap-2 text-sm text-white/80">
          <Home size={14} />
          <span>Home</span>
          <ChevronRight size={12} />
          <span>Colleges</span>
          <ChevronRight size={12} />
          <span className="text-white font-semibold truncate max-w-xs">
            {college.name}
          </span>
        </nav>

        {/* Header Info Over Image */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-4 py-2 bg-[#F97316] text-white rounded-full text-sm font-bold backdrop-blur-sm">
                {college.type}
              </span>
              <span className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-bold">
                📍 {college.location.city}, {college.location.state}
              </span>
              {college.ranking && (
                <span className="px-4 py-2 bg-yellow-400 text-yellow-900 rounded-full text-sm font-bold flex items-center gap-1 backdrop-blur-sm">
                  <Star size={14} fill="currentColor" />
                  Rank: {college.ranking}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              {college.name}
            </h1>

            <p className="text-lg text-white/90 max-w-3xl">
              {college.content?.overview ||
                "A premier management institution offering world-class education and excellent career opportunities."}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Courses Count */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg border border-blue-200 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <BookOpen className="text-[#1E40AF]" size={36} />
              <span className="text-xs font-bold text-[#1E40AF] bg-white px-3 py-1 rounded-full">
                Active
              </span>
            </div>
            <div className="text-4xl font-bold text-[#1E40AF] mb-1">
              {courses.length}
            </div>
            <p className="text-gray-700 font-semibold">Total Courses</p>
          </div>

          {/* Exams Count */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 shadow-lg border border-orange-200 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="text-[#F97316]" size={36} />
              <span className="text-xs font-bold text-[#F97316] bg-white px-3 py-1 rounded-full">
                Accepted
              </span>
            </div>
            <div className="text-4xl font-bold text-[#F97316] mb-1">
              {college.exams_accepted.length}
            </div>
            <p className="text-gray-700 font-semibold">Entrance Exams</p>
          </div>

          {/* Approvals */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 shadow-lg border border-purple-200 hover:shadow-xl transition-all">
            <div className="flex items-center justify-between mb-4">
              <Award className="text-purple-600" size={36} />
              <span className="text-xs font-bold text-purple-600 bg-white px-3 py-1 rounded-full">
                Certified
              </span>
            </div>
            <div className="text-4xl font-bold text-purple-600 mb-1">
              {college.approved_by.length}
            </div>
            <p className="text-gray-700 font-semibold">Approvals</p>
          </div>

          {/* Fees - if available, else Established */}
          {college.fees?.annual_fee ? (
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-6 shadow-lg border border-emerald-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <DollarSign className="text-emerald-600" size={36} />
                <span className="text-xs font-bold text-emerald-600 bg-white px-3 py-1 rounded-full">
                  Per Year
                </span>
              </div>
              <div className="text-4xl font-bold text-emerald-600 mb-1">
                ₹{(college.fees.annual_fee / 100000).toFixed(1)}L
              </div>
              <p className="text-gray-700 font-semibold">Annual Fees</p>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 shadow-lg border border-green-200 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between mb-4">
                <Clock className="text-green-600" size={36} />
                <span className="text-xs font-bold text-green-600 bg-white px-3 py-1 rounded-full">
                  Since
                </span>
              </div>
              <div className="text-4xl font-bold text-green-600 mb-1">
                {college.established_year || "2020"}
              </div>
              <p className="text-gray-700 font-semibold">Established</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-10">
            {/* About Section */}
            <section className="bg-white rounded-2xl shadow-lg border border-[#1E40AF]/10 p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A] rounded-lg flex items-center justify-center">
                  <BookOpen className="text-white" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1B]">
                  About College
                </h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
                {college.content?.overview ||
                  "A premier management institution offering world-class education and excellent career opportunities."}
              </p>
            </section>

            {/* Fees Section */}
            {college.fees?.annual_fee && (
              <section className="bg-white rounded-2xl shadow-lg border border-[#1E40AF]/10 p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-lg flex items-center justify-center">
                    <DollarSign className="text-white" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-[#1A1A1B]">
                    Fees & Cost
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Annual Fee Card */}
                  <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-6 border-2 border-[#F97316] hover:shadow-lg transition-all">
                    <p className="text-xs text-gray-600 font-bold uppercase mb-2">
                      Annual Fees
                    </p>
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-xl text-[#F97316] font-bold">
                        {college.fees.currency || "₹"}
                      </span>
                      <span className="text-4xl font-bold text-[#1A1A1B]">
                        {(college.fees.annual_fee / 100000).toFixed(2)}
                      </span>
                      <span className="text-xl text-gray-600 font-semibold">
                        L
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Per year (approximate)
                    </p>
                  </div>

                  {/* Fee Structure Card */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-[#1E40AF] hover:shadow-lg transition-all">
                    <p className="text-xs text-gray-600 font-bold uppercase mb-2">
                      Fee Structure
                    </p>
                    <p className="text-base text-gray-800 font-semibold leading-relaxed">
                      {college.fees.fee_structure ||
                        "Includes tuition, facility, and other academic charges"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-[#1E40AF] rounded">
                  <p className="text-sm text-gray-700">
                    <span className="font-bold text-[#1E40AF]">💡 Tip:</span>{" "}
                    Contact the college for detailed breakup of fees including
                    hostel, mess, and other charges.
                  </p>
                </div>
              </section>
            )}

            {/* Courses Section */}
            {courses.length > 0 && (
              <section className="bg-white rounded-2xl shadow-lg border border-[#1E40AF]/10 p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-lg flex items-center justify-center">
                    <GraduationCap className="text-white" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-[#1A1A1B]">
                    Courses Offered ({courses.length})
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {courses.slice(0, 8).map((course, index) => (
                    <div
                      key={course._id || course.id || index}
                      className="p-5 bg-gradient-to-br from-[#F8F9F9] to-white border-2 border-[#F97316]/20 rounded-xl hover:border-[#F97316] hover:shadow-md transition-all group"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="font-bold text-[#1A1A1B] text-lg group-hover:text-[#F97316] transition-colors line-clamp-2 flex-1">
                          {course.name}
                        </h3>
                        <Zap
                          className="text-[#F97316] flex-shrink-0 ml-2"
                          size={20}
                        />
                      </div>

                      <div className="space-y-3 text-sm">
                        {course.degree && (
                          <div className="flex items-center gap-2 text-gray-700">
                            <span className="w-2 h-2 bg-[#1E40AF] rounded-full" />
                            <span>
                              <strong className="text-[#1A1A1B]">
                                Degree:
                              </strong>{" "}
                              {course.degree}
                            </span>
                          </div>
                        )}

                        {course.duration_years && (
                          <div className="flex items-center gap-2 text-gray-700">
                            <span className="w-2 h-2 bg-[#1E40AF] rounded-full" />
                            <span>
                              <strong className="text-[#1A1A1B]">
                                Duration:
                              </strong>{" "}
                              {course.duration_years} Year
                              {course.duration_years > 1 ? "s" : ""}
                            </span>
                          </div>
                        )}

                        {course.default_fees?.total_fee && (
                          <div className="flex items-center gap-2 text-gray-700">
                            <span className="w-2 h-2 bg-[#1E40AF] rounded-full" />
                            <div className="flex items-center gap-1">
                              <DollarSign size={14} />
                              <span>
                                <strong className="text-[#1A1A1B]">
                                  Yearly Fee:
                                </strong>{" "}
                                ₹
                                {(
                                  course.default_fees.total_fee / 100000
                                ).toFixed(2)}
                                L
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {course.entrance_exams &&
                        course.entrance_exams.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
                            {course.entrance_exams
                              .slice(0, 2)
                              .map((exam, idx) => (
                                <span
                                  key={idx}
                                  className="text-xs bg-[#1E40AF]/10 text-[#1E40AF] px-3 py-1 rounded-full font-bold"
                                >
                                  {exam}
                                </span>
                              ))}
                            {course.entrance_exams.length > 2 && (
                              <span className="text-xs text-gray-500 px-2 py-1">
                                +{course.entrance_exams.length - 2} more
                              </span>
                            )}
                          </div>
                        )}
                    </div>
                  ))}
                </div>

                {courses.length > 8 && (
                  <div className="mt-8 text-center pt-6 border-t border-gray-200">
                    <p className="text-gray-600 text-sm mb-3 font-semibold">
                      +{courses.length - 8} more courses available
                    </p>
                    <button
                      onClick={openModal}
                      className="inline-block px-6 py-2 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white font-bold rounded-lg hover:shadow-lg transition-all"
                    >
                      View All Courses
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* Admission Process */}
            <section className="bg-white rounded-2xl shadow-lg border border-[#1E40AF]/10 p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-[#922B21] to-[#7A2318] rounded-lg flex items-center justify-center">
                  <Target className="text-white" size={24} />
                </div>
                <h2 className="text-3xl font-bold text-[#1A1A1B]">
                  Admission Process
                </h2>
              </div>

              <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line mb-6">
                {college.content?.admission ||
                  "Admission is based on entrance exam scores and performance in the personal interview round."}
              </p>

              <div className="bg-gradient-to-r from-[#922B21]/5 to-[#F97316]/5 p-6 rounded-xl border-2 border-[#922B21]/20">
                <h3 className="font-bold text-[#1A1A1B] mb-4 flex items-center gap-2 text-lg">
                  <CheckCircle className="text-[#922B21]" size={24} />
                  Accepted Entrance Exams
                </h3>
                <div className="flex flex-wrap gap-3">
                  {college.exams_accepted.map((exam, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-[#922B21] to-[#7A2318] text-white rounded-full text-sm font-bold hover:shadow-lg transition-all"
                    >
                      {exam}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* Approvals Section */}
            {college.approved_by.length > 0 && (
              <section className="bg-white rounded-2xl shadow-lg border border-[#1E40AF]/10 p-8 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center">
                    <Award className="text-white" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-[#1A1A1B]">
                    Approvals & Recognition
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {college.approved_by.map((approval, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border-2 border-purple-200 flex items-center gap-3 hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="text-white" size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-[#1A1A1B]">{approval}</p>
                        <p className="text-xs text-gray-600">
                          Approved & Recognized
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply CTA */}
            <div className="bg-gradient-to-br from-[#F97316] via-[#EA580C] to-[#D84315] rounded-2xl p-8 text-white shadow-xl  top-6">
              <div className="flex items-center gap-3 mb-4">
                <Zap className="text-white" size={28} />
                <h3 className="text-2xl font-bold">Apply Now</h3>
              </div>
              <p className="text-white/90 text-sm mb-6 leading-relaxed">
                Start your journey to success! Apply to {college.name} today and
                shape your future.
              </p>
              <button
                onClick={openModal}
                className="w-full bg-white text-[#F97316] px-6 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Fill Application Form
              </button>
            </div>

            {/* Quick Info Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-[#1E40AF]/10 p-6">
              <h3 className="text-xl font-bold text-[#1A1A1B] mb-5 flex items-center gap-2">
                <Users className="text-[#1E40AF]" size={24} />
                Quick Info
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                  <MapPin
                    className="text-[#F97316] flex-shrink-0 mt-0.5"
                    size={20}
                  />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">
                      Location
                    </p>
                    <p className="font-semibold text-gray-800">
                      {college.location.city}, {college.location.state}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                  <Award
                    className="text-[#F97316] flex-shrink-0 mt-0.5"
                    size={20}
                  />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">
                      Type
                    </p>
                    <p className="font-semibold text-gray-800">
                      {college.type}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                  <Clock
                    className="text-[#F97316] flex-shrink-0 mt-0.5"
                    size={20}
                  />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">
                      Established
                    </p>
                    <p className="font-semibold text-gray-800">
                      {college.established_year || "2020"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-4 border-b border-gray-200">
                  <Star
                    className="text-[#F97316] flex-shrink-0 mt-0.5"
                    size={20}
                  />
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase">
                      Ranking
                    </p>
                    <p className="font-semibold text-gray-800">
                      {college.ranking || "Top Ranked"}
                    </p>
                  </div>
                </div>

                {college.fees?.annual_fee && (
                  <div className="flex items-start gap-3">
                    <DollarSign
                      className="text-[#F97316] flex-shrink-0 mt-0.5"
                      size={20}
                    />
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase">
                        Annual Fees
                      </p>
                      <p className="font-semibold text-gray-800">
                        ₹{(college.fees.annual_fee / 100000).toFixed(2)}L
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 border-2 border-blue-200">
              <h3 className="text-lg font-bold text-[#1A1A1B] mb-3 flex items-center gap-2">
                <Award className="text-[#1E40AF]" size={24} />
                Need Guidance?
              </h3>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                Our admission counselors are here to help you with the complete
                process and answer all your questions.
              </p>
              <button
                onClick={openModal}
                className="w-full bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white px-4 py-3 rounded-lg font-bold hover:shadow-lg transition-all"
              >
                Get Free Counseling
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
