"use client";
import React from 'react';
import { Exam } from '../config/exams';
import { Calendar, Globe, ExternalLink, Tag } from 'lucide-react';

interface ExamCardProps {
  exam: Exam;
}

const ExamCard: React.FC<ExamCardProps> = ({ exam }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer">
      {/* Header with exam type */}
      <div className="bg-gradient-to-r from-[#922B21] to-[#7A2318] p-6 text-white">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="inline-block px-3 py-1 bg-[#D4AC0D] text-white text-xs font-bold rounded-full mb-2">
              {exam.type}
            </span>
            <h3 className="text-2xl font-bold">{exam.name}</h3>
          </div>
          <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
            <span className="text-xs font-bold uppercase">{exam.status}</span>
          </div>
        </div>
        <p className="text-white/90 text-sm leading-relaxed">
          {exam.full_name}
        </p>
      </div>

      {/* Body with exam details */}
      <div className="p-6 space-y-4">
        {/* Exam Month */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F8F9F9] rounded-lg flex items-center justify-center">
            <Calendar className="text-[#922B21]" size={18} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Exam Month</p>
            <p className="font-semibold text-[#1A1A1B]">{exam.exam_month}</p>
          </div>
        </div>

        {/* Website Link */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#F8F9F9] rounded-lg flex items-center justify-center">
            <Globe className="text-[#D4AC0D]" size={18} />
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-500">Official Website</p>
            <a 
              href={exam.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#922B21] hover:text-[#7A2318] text-sm font-medium flex items-center gap-1 transition-colors"
            >
              {exam.website.replace('https://', '').replace('http://', '')}
              <ExternalLink size={12} />
            </a>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-gray-100">
          <button className="w-full bg-[#1E40AF] hover:bg-[#1E3A8A] text-white font-bold py-3 rounded-lg transition-all duration-300 group-hover:shadow-md">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamCard;
