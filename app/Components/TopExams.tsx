"use client";
import React from "react";
import { ArrowRight, Calendar, Globe, ExternalLink } from "lucide-react";
import { useModal } from "../Context/ModalContext";
import Link from "next/link";
import { getActiveExams, Exam } from "../config/exams";
import { themeColors, colorCombos, themeClasses } from "../config/theme";

interface ExamCardProps {
  exam: Exam;
  openModal?: () => void;
}

const ExamCard = ({ exam, openModal }: ExamCardProps) => {
  const handleCardClick = () => {
    // Card click is handled by the Link wrapper
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#1E40AF]/10 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group">
      <div className="p-4 border-b border-[#1E40AF]/10">
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-[#F97316] text-white text-xs font-bold rounded-full">
            {exam.type}
          </span>
          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
            {exam.status}
          </span>
        </div>
        <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 group-hover:text-[#1E40AF] transition-colors">
          {exam.name}
        </h3>
        <p className="text-[#2C3E50] text-sm leading-relaxed">
          {exam.full_name}
        </p>
        <p className="text-[#2C3E50] text-sm leading-relaxed">
          {exam.description}
        </p>
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-[#1E40AF]" />
            <div>
              <p className="text-xs text-[#2C3E50]">Exam Month</p>
              <p className="text-sm font-bold text-[#1A1A1A]">
                {exam.exam_month}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Globe size={14} className="text-[#1E40AF]" />
            <div>
              <p className="text-xs text-[#2C3E50]">Exam Type</p>
              <p className="text-sm font-bold text-[#1A1A1A]">{exam.type}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <a
            href={exam.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#1E40AF] hover:text-[#1E3A8A] text-sm font-medium flex items-center gap-1 transition-colors"
          >
            {exam.website.replace("https://", "").replace("http://", "")}
            <ExternalLink size={12} />
          </a>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              if (openModal) openModal();
            }}
            className="flex-1 bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-bold py-2 rounded-lg transition-colors text-sm"
          >
            Apply Now
          </button>
          <a
            href={exam.website}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center px-3 py-2 border border-[#1E40AF]/30 text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white rounded-lg transition-colors"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  );
};

const TopExams = () => {
  const { openModal } = useModal();
  const examData = getActiveExams().slice(0, 6);

  return (
    <section className="bg-[#F8F9F9] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 space-y-6">
          <div className="inline-flex items-center gap-2 bg-white text-[#1E40AF] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#F97316]">
            <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
            TOP EXAMS
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] leading-tight">
            Upcoming <span className="text-[#1E40AF]">Entrance Exams</span>
          </h2>

          <p className="text-[#2C3E50] text-xl max-w-3xl mx-auto leading-relaxed">
            Stay updated with the most important management entrance exams. Get
            detailed information and apply directly through our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {examData.map((exam) => (
            <Link href={`/exams/${exam.slug}`} key={exam.exam_id} className="block">
              <ExamCard exam={exam} openModal={openModal} />
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/exams"
            className="bg-[#1E40AF] hover:bg-[#1E3A8A] text-white px-8 py-4 rounded-xl text-lg font-bold inline-flex items-center gap-3 transition-all active:scale-95 shadow-lg hover:shadow-[#1E40AF]/20"
          >
            View All Exams
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopExams;
