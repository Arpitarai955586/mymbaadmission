"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, Users, FileText, ChevronRight, Phone, MessageCircle } from 'lucide-react';
import { useExam } from '@/app/Context/ExamContext';
import { useModal } from '@/app/Context/ModalContext';


export default function ManagementPage() {
  const { exams, loading, error, fetchExams, setFilter } = useExam();
  const {openModal} = useModal();

  useEffect(() => {
    setFilter({ category: 'management' });
  }, [setFilter]);

  const managementExams = [
    {
      id: '1',
      title: 'CAT 2026',
      fullName: 'Common Admission Test',
      conductingBody: 'IIMs',
      examDate: '2026-11-24',
      lastDate: '2026-09-15',
      mode: 'Online',
      duration: '2 Hours',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      featured: true,
    },
    {
      id: '2',
      title: 'XAT 2026',
      fullName: 'Xavier Aptitude Test',
      conductingBody: 'XLRI Jamshedpur',
      examDate: '2026-01-03',
      lastDate: '2025-11-30',
      mode: 'Online',
      duration: '3 Hours',
      image: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      featured: true,
    },
    {
      id: '3',
      title: 'CMAT 2026',
      fullName: 'Common Management Admission Test',
      conductingBody: 'NTA',
      examDate: '2026-04-09',
      lastDate: '2026-03-17',
      mode: 'Online',
      duration: '3 Hours',
      image: 'https://images.pexels.com/photos/5490006/pexels-photo-5490006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      featured: false,
    },
    {
      id: '4',
      title: 'MAT 2026',
      fullName: 'Management Aptitude Test',
      conductingBody: 'AIMA',
      examDate: '2026-02-25',
      lastDate: '2026-02-10',
      mode: 'Online',
      duration: '2.5 Hours',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      featured: false,
    },
    {
      id: '5',
      title: 'SNAP 2026',
      fullName: 'Symbiosis National Aptitude Test',
      conductingBody: 'Symbiosis International',
      examDate: '2026-12-10',
      lastDate: '2026-11-24',
      mode: 'Online',
      duration: '2 Hours',
      image: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      featured: false,
    },
    {
      id: '6',
      title: 'NMAT 2026',
      fullName: 'NMIMS Management Aptitude Test',
      conductingBody: 'NMIMS',
      examDate: '2026-10-15',
      lastDate: '2026-10-03',
      mode: 'Online',
      duration: '2 Hours',
      image: 'https://images.pexels.com/photos/5490006/pexels-photo-5490006.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9F9]">
      {/* Announcement Bar */}
      <div className="bg-[#1A1A1B] text-white py-2 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm">
            <span className="text-yellow-400 font-semibold">📢 Latest:</span>
            <span>CAT 2026 Registration Started</span>
            <span className="text-gray-400">•</span>
            <span>XAT 2026 Mock Test Available</span>
          </div>
          <button className="bg-[#D4AC0D] hover:bg-[#B8941F] text-black font-bold px-4 py-1 rounded text-sm transition-colors">
            ADMISSION
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#8E44AD] to-[#6C3483] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 right-20 w-24 h-24 border-4 border-white rounded-lg transform rotate-45"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-white rounded-full"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Top Management
                <br />
                <span className="text-[#D4AC0D]">Entrance Exams</span>
              </h1>
              <p className="text-lg lg:text-xl mb-8 text-gray-200 leading-relaxed">
                Explore premier management entrance examinations for MBA and PGDM programs. 
                Get detailed insights into top B-schools and preparation strategies.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/exams" className="bg-[#922B21] hover:bg-[#7A2318] text-white font-bold px-6 py-3 rounded-lg transition-colors flex items-center gap-2">
                  <FileText size={20} />
                  Explore All Exams
                </Link>
                <button className="border-2 border-white hover:bg-white hover:text-[#8E44AD] text-white font-bold px-6 py-3 rounded-lg transition-colors">
                  Download Brochure
                </button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Management Students"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="bg-[#8E44AD] rounded-full p-2">
                    <Users className="text-white" size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">5000+</p>
                    <p className="text-sm text-gray-600">B-Schools</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Exams Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#2C3E50] mb-4">
            Featured Management Exams
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most prestigious management entrance examinations for admission to top business schools
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {managementExams.map((exam) => (
            <div key={exam.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={exam.image}
                  alt={exam.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {exam.featured && (
                  <div className="absolute top-4 left-4 bg-[#8E44AD] text-white px-3 py-1 rounded-full text-xs font-bold">
                    FEATURED
                  </div>
                )}
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-[#2C3E50] mb-1">{exam.title}</h3>
                    <p className="text-sm text-gray-600">{exam.fullName}</p>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Calendar size={16} className="text-[#8E44AD]" />
                    <span>Exam: {new Date(exam.examDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Clock size={16} className="text-[#8E44AD]" />
                    <span>Last Date: {new Date(exam.lastDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <Users size={16} className="text-[#8E44AD]" />
                    <span>{exam.conductingBody}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="text-sm text-gray-500">
                    {exam.mode} • {exam.duration}
                  </span>
                  <Link 
                    href={`/exams/${exam.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-[#8E44AD] hover:text-[#6C3483] font-semibold text-sm flex items-center gap-1 transition-colors"
                  >
                    View Details
                    <ChevronRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-[#8E44AD] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Need Help with MBA Admissions?
          </h2>
          <p className="text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            Get expert guidance from our MBA counselors to choose the right business school and exam preparation strategy.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={openModal} className="bg-white text-[#8E44AD] hover:bg-gray-100 font-bold px-8 py-4 rounded-lg transition-colors flex items-center gap-2">
              <Phone size={20} />
              Talk to Counselor
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-[#8E44AD] font-bold px-8 py-4 rounded-lg transition-colors">
              Download Free Guide
            </button>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <div className="fixed bottom-6 left-6 z-50 cursor-pointer hover:scale-110 transition-transform">
        <div className="bg-green-500 p-3 rounded-full shadow-lg border-2 border-white">
          <MessageCircle className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
}
