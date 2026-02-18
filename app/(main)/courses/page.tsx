"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  BookOpen,
  Clock,
  DollarSign,
  Zap,
  Award,
  TrendingUp,
  GraduationCap,
  CheckCircle,
} from "lucide-react";

interface Course {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
  college_id?: string;
  duration_years?: number;
  degree: string;
  default_fees?: {
    currency?: string;
    total_fee?: number;
  };
  entrance_exams?: string[];
  media?: {
    cover?: string;
  };
}

const CoursesPage = () => {
  const [coursesData, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDegree, setSelectedDegree] = useState("all");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/courses?limit=1000");
        const data = await res.json();
        setCourses(data.courses || []);
      } catch (error) {
        console.error("error fetching courses data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = coursesData.filter((course) => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.degree?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDegree =
      selectedDegree === "all" || course.degree === selectedDegree;

    return matchesSearch && matchesDegree;
  });

  const degrees = [
    "all",
    "Undergraduate",
    "Postgraduate",
    "Diploma",
    "Certificate",
  ];

  // Get unique degree types
  const uniqueDegrees = Array.from(new Set(coursesData.map((c) => c.degree)));

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F8F9F9] to-white">
      {/* Hero Section */}
      <div className="relative w-full py-16 md:py-24 bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#0F2949] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#F97316] rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-white/30">
              <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
              ALL MANAGEMENT COURSES
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              Explore <span className="text-[#F97316]">Top Management</span>{" "}
              Courses
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover comprehensive professional programs designed to
              accelerate your career growth and professional development in
              management education.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12 pt-12 border-t border-white/20">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#F97316] mb-2">
                  {coursesData.length}
                </div>
                <p className="text-white/80">Total Courses</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#F97316] mb-2">
                  {uniqueDegrees.length}
                </div>
                <p className="text-white/80">Degree Types</p>
              </div>
              <div className="text-center col-span-2 md:col-span-1">
                <div className="text-4xl font-bold text-[#F97316] mb-2">
                  100%
                </div>
                <p className="text-white/80">Industry Relevant</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg border border-[#1E40AF]/10 p-6 mb-12 sticky top-0 z-10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search courses, degrees..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/50 focus:border-[#1E40AF]"
              />
            </div>

            <div className="flex items-center gap-2">
              <Filter className="text-[#1E40AF]" size={20} />
              <select
                value={selectedDegree}
                onChange={(e) => setSelectedDegree(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/50 focus:border-[#1E40AF] bg-white font-semibold"
              >
                {degrees.map((degree) => (
                  <option key={degree} value={degree}>
                    {degree === "all" ? "All Degrees" : degree}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="text-gray-700 text-lg font-semibold">
            Found{" "}
            <span className="text-[#1E40AF] font-bold">
              {filteredCourses.length}
            </span>{" "}
            courses
          </p>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#1E40AF] mx-auto mb-4" />
            <p className="text-gray-600 text-lg font-semibold">
              Loading courses...
            </p>
          </div>
        ) : filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course._id || course.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-[#1E40AF]/10 hover:border-[#F97316]/30"
              >
                {/* Image/Header Section */}
                <div className="relative w-full h-48 bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A] overflow-hidden">
                  {course.media?.cover ? (
                    <>
                      <img
                        src={course.media.cover}
                        alt={course.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                    </>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A]"></div>
                  )}

                  {/* Badge - Degree */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="px-4 py-2 bg-[#F97316] text-white text-xs font-bold rounded-full shadow-md">
                      {course.degree}
                    </span>
                  </div>

                  {/* Badge - Duration */}
                  <div className="absolute top-3 right-3 z-10 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <Clock size={14} className="text-[#F97316]" />
                    <span className="text-xs font-bold text-white drop-shadow-sm">
                      {course.duration_years}y
                    </span>
                  </div>

                  {/* Course Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <h3 className="text-xl font-bold text-white mb-1 line-clamp-2 group-hover:text-[#F97316] transition-colors">
                      {course.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      Professional Development
                    </p>
                  </div>
                </div>

                {/* Info Section */}
                <div className="p-6 space-y-4">
                  {/* Duration */}
                  <div className="flex items-center gap-3 p-3 bg-[#F8F9F9] rounded-lg hover:bg-[#F97316]/5 transition-colors">
                    <div className="w-10 h-10 bg-[#1E40AF]/10 rounded-lg flex items-center justify-center">
                      <Clock className="text-[#1E40AF]" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">
                        DURATION
                      </p>
                      <p className="font-bold text-[#1A1A1B]">
                        {course.duration_years} Years
                      </p>
                    </div>
                  </div>

                  {/* Fees */}
                  {course.default_fees?.total_fee && (
                    <div className="flex items-center gap-3 p-3 bg-[#F8F9F9] rounded-lg hover:bg-[#F97316]/5 transition-colors">
                      <div className="w-10 h-10 bg-[#F97316]/10 rounded-lg flex items-center justify-center">
                        <DollarSign className="text-[#F97316]" size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 font-semibold">
                          YEARLY FEES
                        </p>
                        <p className="font-bold text-[#1A1A1B]">
                          ₹{(course.default_fees.total_fee / 100000).toFixed(2)}
                          L
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Degree Type */}
                  <div className="flex items-center gap-3 p-3 bg-[#F8F9F9] rounded-lg hover:bg-[#F97316]/5 transition-colors">
                    <div className="w-10 h-10 bg-purple-100/50 rounded-lg flex items-center justify-center">
                      <GraduationCap className="text-purple-600" size={20} />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 font-semibold">
                        DEGREE TYPE
                      </p>
                      <p className="font-bold text-[#1A1A1B]">
                        {course.degree}
                      </p>
                    </div>
                  </div>

                  {/* Entrance Exams */}
                  {course.entrance_exams &&
                    course.entrance_exams.length > 0 && (
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-xs text-gray-600 font-bold mb-3">
                          ACCEPTED EXAMS
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {course.entrance_exams
                            .slice(0, 3)
                            .map((exam, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-[#1E40AF]/10 text-[#1E40AF] text-xs font-bold rounded-full border border-[#1E40AF]/20 hover:border-[#1E40AF] transition-colors"
                              >
                                {exam}
                              </span>
                            ))}
                          {course.entrance_exams.length > 3 && (
                            <span className="px-3 py-1 text-gray-600 text-xs font-bold">
                              +{course.entrance_exams.length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                </div>

                {/* Action Button */}
                <div className="px-6 pb-6">
                  <button className="w-full bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] hover:from-[#1E3A8A] hover:to-[#0F2949] text-white font-bold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105">
                    <BookOpen size={18} />
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-[#1E40AF]/20">
            <div className="w-24 h-24 bg-[#F8F9F9] rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="text-gray-400" size={48} />
            </div>
            <h3 className="text-2xl font-bold text-[#1A1A1B] mb-3">
              No Courses Found
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Try adjusting your search terms or degree filters
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedDegree("all");
              }}
              className="px-8 py-3 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white rounded-lg font-bold hover:shadow-lg transition-all"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;
