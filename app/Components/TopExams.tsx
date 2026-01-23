"use client";
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useModal } from '../Context/ModalContext';
import Link from 'next/link';

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

interface ExamCardProps {
  exam: Exam;
  openModal?: () => void;
}

const ExamCard = ({ exam, openModal }: ExamCardProps) => {
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    } catch {
      return 'Date not available';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'Ongoing':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="relative group bg-gradient-to-br from-white via-white to-[#F8F9F9] border border-[#922B21]/20 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-[#1A1A1B] line-clamp-2">{exam.name}</h3>
        <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(exam.status)}`}>
          {exam.status || 'Upcoming'}
        </span>
      </div>
      
      {/* Category */}
      <div className="mb-3">
        <span className="text-sm font-medium text-[#2C3E50]">Category: </span>
        <span className="text-sm text-[#1A1A1B]">{exam.category || 'Not Specified'}</span>
      </div>

      {/* Description */}
      {exam.description && (
        <div className="mb-4">
          <h4 className="text-sm font-bold text-[#1A1A1B] mb-2">Description:</h4>
          <p className="text-sm text-[#2C3E50] line-clamp-3">{exam.description}</p>
        </div>
      )}

      {/* Exam Date and Duration */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="text-xs font-bold text-[#1A1A1B] mb-1">Exam Date:</h4>
          <p className="text-xs text-[#2C3E50]">
            {exam.exam_date ? formatDate(exam.exam_date) : 'To be announced'}
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold text-[#1A1A1B] mb-1">Duration:</h4>
          <p className="text-xs text-[#2C3E50]">{exam.duration || 'Not specified'}</p>
        </div>
      </div>

      {/* Eligibility Criteria */}
      {exam.eligibility_criteria && (
        <div className="mb-4">
          <h4 className="text-sm font-bold text-[#1A1A1B] mb-2">Eligibility Criteria:</h4>
          <p className="text-sm text-[#2C3E50] line-clamp-2">{exam.eligibility_criteria}</p>
        </div>
      )}

      {/* Info Tags */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="px-3 py-1 bg-[#922B21] text-white text-[10px] font-bold rounded-full">
          {exam.exam_type} Level
        </span>
        <span className="px-3 py-1 bg-[#D4AC0D] text-[#1A1A1B] text-[10px] font-bold rounded-full">
          {exam.exam_pattern || 'Various'}
        </span>
        <span className="px-3 py-1 bg-[#922B21] text-white text-[10px] font-bold rounded-full">
          Updated {formatDate(exam.updated_at)}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <button 
          onClick={openModal}
          className="flex-1 bg-[#922B21] text-white px-3 py-2 rounded-lg text-xs font-bold hover:bg-[#7A2318] transition-colors"
        >
          Apply Now
        </button>
        <Link 
          href={`/exams/${exam.slug}`}
          className="flex items-center gap-2 text-[#1A1A1B] text-xs font-bold hover:text-[#922B21] transition-colors group"
        >
          View Details 
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

const TopExams = () => {
  const [examData, setExamData] = React.useState<Exam[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [displayCount, setDisplayCount] = React.useState(6);
  const { openModal } = useModal();

  React.useEffect(() => {
    const fetchExams = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/exams');
        if (!response.ok) {
          throw new Error('Failed to fetch exams');
        }
        const data = await response.json();
        if (data.success && data.exams) {
          setExamData(data.exams);
          console.log(data.exams);
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching exam data:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#F8F9F9] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[#1A1A1B] mb-10 ml-2">Top Exams</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white border border-gray-200 rounded-xl p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-24"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#F8F9F9] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[#1A1A1B] mb-10 ml-2">Top Exams</h2>
          <div className="text-center py-12">
            <div className="text-red-500 text-lg mb-2">Error loading exams</div>
            <div className="text-gray-600 text-sm">{error}</div>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[#922B21] text-white rounded-lg hover:bg-[#7A231A] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (examData.length === 0) {
    return (
      <section className="bg-[#F8F9F9] py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-[#1A1A1B] mb-10 ml-2">Top Exams</h2>
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No exams available at the moment</div>
          </div>
        </div>
      </section>
    );
  }
  
  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 12);
  };

  const displayedExams = examData.slice(0, displayCount);
  const hasMore = examData.length > displayCount;

  return (
    <section className="bg-[#F8F9F9] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-[#1A1A1B] mb-10 ml-2">Top Exams</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedExams.map((exam) => (
            <ExamCard 
              key={exam._id}
              exam={exam}
              openModal={openModal}
            />
          ))}
        </div>

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
      </div>
    </section>
  );
};

export default TopExams;