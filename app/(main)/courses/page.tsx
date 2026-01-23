"use client";
import React from 'react';
import CourseCard from '../../Components/CourseCard';
import { getAllCourses, getCoursesByDegree, Course } from '../../config/courses';
import { Search, Filter } from 'lucide-react';
import { themeColors, colorCombos, themeClasses } from '../../config/theme';

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedDegree, setSelectedDegree] = React.useState('all');

  const filteredCourses = getAllCourses().filter(course => {
    const matchesSearch = course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.degree.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDegree = selectedDegree === 'all' || course.degree === selectedDegree;
    
    return matchesSearch && matchesDegree;
  });

  const degrees = ['all', 'Undergraduate', 'Postgraduate'];

  return (
    <div className="min-h-screen bg-[#F8F9F9] py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white text-[#1E40AF] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#F97316]">
            <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
            ALL COURSES
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1B] leading-tight">
            Explore <span className="text-[#1E40AF]">Management Courses</span>
          </h1>
          
          <p className="text-[#2C3E50] text-xl max-w-3xl mx-auto leading-relaxed">
            Discover comprehensive management programs tailored for your career growth 
            and professional development.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#1E40AF]/10 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search courses..."
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
                className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1E40AF]/50 focus:border-[#1E40AF] bg-white"
              >
                {degrees.map((degree) => (
                  <option key={degree} value={degree}>
                    {degree === 'all' ? 'All Degrees' : degree}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-bold text-[#1E40AF]">{filteredCourses.length}</span> courses
          </p>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCourses.map((course) => (
              <CourseCard key={course._id} course={course} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-[#1E40AF]/10">
            <div className="w-20 h-20 bg-[#F8F9F9] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">No courses found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedDegree('all');
              }}
              className="px-6 py-2 bg-[#F97316] text-white rounded-lg hover:bg-[#EA580C] transition-colors"
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
