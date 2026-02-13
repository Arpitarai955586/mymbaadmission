"use client";
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

// Types for Exam Management
export interface Exam {
  id: string;
  slug: string;
  title: string;
  fullName: string;
  category: string;
  subcategory?: string;
  description: string;
  conductingBody: string;
  examLevel: 'National' | 'State' | 'University' | 'International';
  examType: 'Entrance' | 'Semester' | 'Competitive' | 'Certification';
  frequency: 'Once' | 'Twice' | 'Yearly' | 'Bi-yearly';
  mode: 'Online' | 'Offline' | 'Hybrid';
  duration: number; // in minutes
  maxMarks: number;
  negativeMarking: boolean;
  languages: string[];
  officialWebsite: string;
  applicationFee: {
    general: number;
    sc: number;
    st: number;
    pwd: number;
  };
  eligibility: {
    age: {
      min?: number;
      max?: number;
    };
    education: string[];
    nationality: string[];
    minPercentage?: number;
  };
  importantDates: {
    notificationDate?: string;
    applicationStart?: string;
    applicationEnd?: string;
    examDate?: string;
    resultDate?: string;
    counselingStart?: string;
  };
  syllabus: string[];
  pattern: {
    sections: ExamSection[];
    totalQuestions: number;
    totalMarks: number;
    duration: number;
  };
  preparation: {
    tips: string[];
    recommendedBooks: string[];
    samplePapers: string[];
  };
  colleges: string[];
  image: string;
  featured: boolean;
  active: boolean;
  viewCount: number;
  bookmarkCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ExamSection {
  name: string;
  questions: number;
  marks: number;
  negativeMarking?: number;
}

export interface ExamCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  examCount: number;
  color: string;
  icon: string;
}

export interface ExamFilter {
  category?: string;
  subcategory?: string;
  level?: string;
  type?: string;
  mode?: string;
  conductingBody?: string;
  featured?: boolean;
  active?: boolean;
  search?: string;
  upcoming?: boolean;
  applicationOpen?: boolean;
}

export interface ExamState {
  exams: Exam[];
  categories: ExamCategory[];
  currentExam: Exam | null;
  featuredExams: Exam[];
  upcomingExams: Exam[];
  popularExams: Exam[];
  applicationOpenExams: Exam[];
  loading: boolean;
  error: string | null;
  filter: ExamFilter;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalExams: number;
    examsPerPage: number;
  };
  bookmarks: string[];
}

export interface ExamContextType extends ExamState {
  // Actions
  fetchExams: (page?: number, filter?: ExamFilter) => Promise<void>;
  fetchExamBySlug: (slug: string) => Promise<Exam | null>;
  fetchCategories: () => Promise<void>;
  setFilter: (filter: ExamFilter) => void;
  clearFilter: () => void;
  incrementViewCount: (examId: string) => Promise<void>;
  toggleBookmark: (examId: string) => Promise<void>;
  searchExams: (query: string) => Promise<Exam[]>;
  getExamsByCategory: (categorySlug: string) => Promise<Exam[]>;
  getExamsByConductingBody: (body: string) => Promise<Exam[]>;
  getUpcomingExams: (days?: number) => Promise<Exam[]>;
  getApplicationOpenExams: () => Promise<Exam[]>;
  getRelatedExams: (examId: string, limit?: number) => Promise<Exam[]>;
  // Admin actions
  createExam: (exam: Omit<Exam, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'bookmarkCount'>) => Promise<Exam>;
  updateExam: (id: string, updates: Partial<Exam>) => Promise<Exam>;
  deleteExam: (id: string) => Promise<void>;
  activateExam: (id: string) => Promise<void>;
  deactivateExam: (id: string) => Promise<void>;
  updateImportantDates: (id: string, dates: Partial<Exam['importantDates']>) => Promise<void>;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

interface ExamProviderProps {
  children: ReactNode;
}

export const ExamProvider: React.FC<ExamProviderProps> = ({ children }) => {
  const [sampleExams, setSampleExams] = useState<Exam[]>([]); // This will hold our sample exams data
  useEffect(() => {
    // Initialize sample exams data here or fetch from an API
    const fetchExamsData = async () => {
      try {
        const res = await fetch('/api/exams');
        const data = await res.json();
        setSampleExams(data.exams);
        console.log("hullallalal",data.exams)
      } catch(error) {
        console.error('Failed to fetch exams:', error);
      }
    };
    fetchExamsData();
  }, []);
  const [state, setState] = useState<ExamState>({
    exams: [],
    categories: [],
    currentExam: null,
    featuredExams: [],
    upcomingExams: [],
    popularExams: [],
    applicationOpenExams: [],
    loading: false,
    error: null,
    filter: {},
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalExams: 0,
      examsPerPage: 12,
    },
    bookmarks: [],
  });

  // Sample data - replace with actual API calls
  // const sampleExams: Exam[] = [
  //   {
  //     id: '1',
  //     slug: 'aiims-msc-courses-answer-key-2026',
  //     title: 'AIIMS MSc Courses Answer Key 2026',
  //     fullName: 'All India Institute of Medical Sciences Master of Science Courses Entrance Examination',
  //     category: 'Medical',
  //     subcategory: 'MSc',
  //     description: 'AIIMS MSc entrance exam for admission to various postgraduate science courses in AIIMS institutions across India.',
  //     conductingBody: 'AIIMS New Delhi',
  //     examLevel: 'National',
  //     examType: 'Entrance',
  //     frequency: 'Once',
  //     mode: 'Online',
  //     duration: 180,
  //     maxMarks: 200,
  //     negativeMarking: true,
  //     languages: ['English', 'Hindi'],
  //     officialWebsite: 'aiimsexams.ac.in',
  //     applicationFee: {
  //       general: 1500,
  //       sc: 1200,
  //       st: 1200,
  //       pwd: 0,
  //     },
  //     eligibility: {
  //       age: {
  //         min: 17,
  //       },
  //       education: ['BSc in relevant subject', 'MBBS', 'BDS'],
  //       nationality: ['Indian', 'NRI', 'Foreign'],
  //       minPercentage: 60,
  //     },
  //     importantDates: {
  //       notificationDate: '2026-02-01',
  //       applicationStart: '2026-02-15',
  //       applicationEnd: '2026-03-31',
  //       examDate: '2026-06-13',
  //       resultDate: '2026-07-15',
  //       counselingStart: '2026-08-01',
  //     },
  //     syllabus: ['Physics', 'Chemistry', 'Biology', 'Mathematics', 'General Knowledge'],
  //     pattern: {
  //       sections: [
  //         { name: 'Physics', questions: 60, marks: 60, negativeMarking: -1 },
  //         { name: 'Chemistry', questions: 60, marks: 60, negativeMarking: -1 },
  //         { name: 'Biology', questions: 60, marks: 60, negativeMarking: -1 },
  //         { name: 'General Knowledge', questions: 20, marks: 20, negativeMarking: 0 },
  //       ],
  //       totalQuestions: 200,
  //       totalMarks: 200,
  //       duration: 180,
  //     },
  //     preparation: {
  //       tips: [
  //         'Focus on NCERT textbooks for basics',
  //         'Practice previous year question papers',
  //         'Time management is crucial',
  //         'Regular revision of important topics',
  //       ],
  //       recommendedBooks: [
  //         'NCERT Biology Class 11 & 12',
  //         'Physics for Medical Entrance by H.C. Verma',
  //         'Organic Chemistry by O.P. Tandon',
  //       ],
  //       samplePapers: [
  //         'AIIMS MSc Previous 5 Years Papers',
  //         'Mock Test Series by Various Coaching Centers',
  //       ],
  //     },
  //     colleges: [
  //       'AIIMS New Delhi',
  //       'AIIMS Bhopal',
  //       'AIIMS Bhubaneswar',
  //       'AIIMS Jodhpur',
  //       'AIIMS Raipur',
  //       'AIIMS Rishikesh',
  //     ],
  //     image: 'https://images.pexels.com/photos/5490006/pexels-photo-5490006.jpeg',
  //     featured: true,
  //     active: true,
  //     viewCount: 2500,
  //     bookmarkCount: 120,
  //     createdAt: '2025-10-10T10:00:00Z',
  //     updatedAt: '2025-10-10T10:00:00Z',
  //   },
  //   {
  //     id: '2',
  //     slug: 'cat-2026',
  //     title: 'CAT 2026',
  //     fullName: 'Common Admission Test 2026',
  //     category: 'Management',
  //     subcategory: 'MBA',
  //     description: 'CAT is the premier national-level management entrance exam for admission to IIMs and other top B-schools in India.',
  //     conductingBody: 'IIMs (Rotating)',
  //     examLevel: 'National',
  //     examType: 'Entrance',
  //     frequency: 'Once',
  //     mode: 'Online',
  //     duration: 120,
  //     maxMarks: 198,
  //     negativeMarking: true,
  //     languages: ['English'],
  //     officialWebsite: 'iimcat.ac.in',
  //     applicationFee: {
  //       general: 2400,
  //       sc: 1200,
  //       st: 1200,
  //       pwd: 1200,
  //     },
  //     eligibility: {
  //       age: {},
  //       education: ['Graduate in any discipline'],
  //       nationality: ['Indian'],
  //       minPercentage: 50,
  //     },
  //     importantDates: {
  //       notificationDate: '2026-07-30',
  //       applicationStart: '2026-08-01',
  //       applicationEnd: '2026-09-15',
  //       examDate: '2026-11-24',
  //       resultDate: '2027-01-05',
  //     },
  //     syllabus: ['Quantitative Aptitude', 'Data Interpretation', 'Logical Reasoning', 'Verbal Ability'],
  //     pattern: {
  //       sections: [
  //         { name: 'Verbal Ability & Reading Comprehension', questions: 24, marks: 72, negativeMarking: -1 },
  //         { name: 'Data Interpretation & Logical Reasoning', questions: 20, marks: 60, negativeMarking: -1 },
  //         { name: 'Quantitative Ability', questions: 22, marks: 66, negativeMarking: -1 },
  //       ],
  //       totalQuestions: 66,
  //       totalMarks: 198,
  //       duration: 120,
  //     },
  //     preparation: {
  //       tips: [
  //         'Strengthen your basics in mathematics',
  //         'Read extensively to improve vocabulary',
  //         'Practice mental calculations',
  //         'Take regular mock tests',
  //       ],
  //       recommendedBooks: [
  //         'How to Prepare for Quantitative Aptitude by Arun Sharma',
  //         'Word Power Made Easy by Norman Lewis',
  //         'Logical Reasoning by R.S. Aggarwal',
  //       ],
  //       samplePapers: [
  //         'CAT Previous Year Papers',
  //         'TIME Mock Test Series',
  //         'Career Launcher Test Series',
  //       ],
  //     },
  //     colleges: [
  //       'IIM Ahmedabad',
  //       'IIM Bangalore',
  //       'IIM Calcutta',
  //       'IIM Lucknow',
  //       'IIM Kozhikode',
  //     ],
  //     image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
  //     featured: true,
  //     active: true,
  //     viewCount: 5000,
  //     bookmarkCount: 300,
  //     createdAt: '2025-10-10T10:00:00Z',
  //     updatedAt: '2025-10-10T10:00:00Z',
  //   },
  //   // Add more sample exams as needed
  // ];

  const sampleCategories: ExamCategory[] = [
    {
      id: '1',
      name: 'Management',
      slug: 'management',
      description: 'MBA and other management entrance exams',
      examCount: 15,
      color: '#922B21',
      icon: 'briefcase',
    },
    {
      id: '2',
      name: 'Engineering',
      slug: 'engineering',
      description: 'Engineering entrance examinations',
      examCount: 20,
      color: '#2C3E50',
      icon: 'calculator',
    },
    {
      id: '3',
      name: 'Medical',
      slug: 'medical',
      description: 'Medical and healthcare entrance exams',
      examCount: 12,
      color: '#27AE60',
      icon: 'heart-pulse',
    },
    {
      id: '4',
      name: 'Law',
      slug: 'law',
      description: 'Law entrance examinations',
      examCount: 8,
      color: '#8E44AD',
      icon: 'balance-scale',
    },
  ];

  // Actions
  const fetchExams = useCallback(async (page = 1, filter?: ExamFilter) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredExams = [...sampleExams];
      
      if (filter) {
        if (filter.category) {
          filteredExams = filteredExams.filter(exam => exam.category.toLowerCase() === filter.category?.toLowerCase());
        }
        if (filter.level) {
          filteredExams = filteredExams.filter(exam => exam.examLevel.toLowerCase() === filter.level?.toLowerCase());
        }
        if (filter.type) {
          filteredExams = filteredExams.filter(exam => exam.examType.toLowerCase() === filter.type?.toLowerCase());
        }
        if (filter.mode) {
          filteredExams = filteredExams.filter(exam => exam.mode.toLowerCase() === filter.mode?.toLowerCase());
        }
        if (filter.conductingBody) {
          filteredExams = filteredExams.filter(exam => 
            exam.conductingBody.toLowerCase().includes(filter.conductingBody!.toLowerCase())
          );
        }
        if (filter.search) {
          filteredExams = filteredExams.filter(exam => 
            exam.title.toLowerCase().includes(filter.search!.toLowerCase()) ||
            exam.fullName.toLowerCase().includes(filter.search!.toLowerCase()) ||
            exam.conductingBody.toLowerCase().includes(filter.search!.toLowerCase())
          );
        }
        if (filter.featured) {
          filteredExams = filteredExams.filter(exam => exam.featured);
        }
        if (filter.active) {
          filteredExams = filteredExams.filter(exam => exam.active);
        }
        if (filter.upcoming) {
          const today = new Date();
          filteredExams = filteredExams.filter(exam => 
            exam.importantDates.examDate && new Date(exam.importantDates.examDate) > today
          );
        }
        if (filter.applicationOpen) {
          const today = new Date();
          filteredExams = filteredExams.filter(exam => 
            exam.importantDates.applicationStart && 
            exam.importantDates.applicationEnd &&
            new Date(exam.importantDates.applicationStart) <= today &&
            new Date(exam.importantDates.applicationEnd) >= today
          );
        }
      }

      const startIndex = (page - 1) * state.pagination.examsPerPage;
      const endIndex = startIndex + state.pagination.examsPerPage;
      const paginatedExams = filteredExams.slice(startIndex, endIndex);

      setState(prev => ({
        ...prev,
        exams: paginatedExams,
        pagination: {
          ...prev.pagination,
          currentPage: page,
          totalPages: Math.ceil(filteredExams.length / prev.pagination.examsPerPage),
          totalExams: filteredExams.length,
        },
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch exams',
        loading: false,
      }));
    }
  }, [state.pagination.examsPerPage]);

  const fetchExamBySlug = async (slug: string): Promise<Exam | null> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const exam = sampleExams.find(e => e.slug === slug);
      return exam || null;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch exam',
      }));
      return null;
    }
  };

  const fetchCategories = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setState(prev => ({ ...prev, categories: sampleCategories }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch categories',
      }));
    }
  };

  const setFilter = useCallback((filter: ExamFilter) => {
    setState(prev => ({ ...prev, filter }));
    fetchExams(1, filter);
  }, [fetchExams]);

  const clearFilter = () => {
    setState(prev => ({ ...prev, filter: {} }));
    fetchExams(1);
  };

  const incrementViewCount = async (examId: string) => {
    setState(prev => ({
      ...prev,
      exams: prev.exams.map(exam => 
        exam.id === examId ? { ...exam, viewCount: exam.viewCount + 1 } : exam
      ),
    }));
  };

  const toggleBookmark = async (examId: string) => {
    setState(prev => {
      const isBookmarked = prev.bookmarks.includes(examId);
      const newBookmarks = isBookmarked
        ? prev.bookmarks.filter(id => id !== examId)
        : [...prev.bookmarks, examId];
      
      return {
        ...prev,
        bookmarks: newBookmarks,
        exams: prev.exams.map(exam => 
          exam.id === examId 
            ? { ...exam, bookmarkCount: exam.bookmarkCount + (isBookmarked ? -1 : 1) }
            : exam
        ),
      };
    });
  };

  const searchExams = async (query: string): Promise<Exam[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return sampleExams.filter(exam => 
        exam.title.toLowerCase().includes(query.toLowerCase()) ||
        exam.fullName.toLowerCase().includes(query.toLowerCase()) ||
        exam.conductingBody.toLowerCase().includes(query.toLowerCase()) ||
        exam.category.toLowerCase().includes(query.toLowerCase())
      );
    } catch (error) {
      return [];
    }
  };

  const getExamsByCategory = async (categorySlug: string): Promise<Exam[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return sampleExams.filter(exam => exam.category.toLowerCase() === categorySlug.toLowerCase());
    } catch (error) {
      return [];
    }
  };

  const getExamsByConductingBody = async (body: string): Promise<Exam[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return sampleExams.filter(exam => 
        exam.conductingBody.toLowerCase().includes(body.toLowerCase())
      );
    } catch (error) {
      return [];
    }
  };

  const getUpcomingExams = async (days = 90): Promise<Exam[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const today = new Date();
      const futureDate = new Date(today.getTime() + days * 24 * 60 * 60 * 1000);
      
      return sampleExams.filter(exam => 
        exam.importantDates.examDate && 
        new Date(exam.importantDates.examDate) > today &&
        new Date(exam.importantDates.examDate) <= futureDate
      );
    } catch (error) {
      return [];
    }
  };

  const getApplicationOpenExams = async (): Promise<Exam[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const today = new Date();
      
      return sampleExams.filter(exam => 
        exam.importantDates.applicationStart && 
        exam.importantDates.applicationEnd &&
        new Date(exam.importantDates.applicationStart) <= today &&
        new Date(exam.importantDates.applicationEnd) >= today
      );
    } catch (error) {
      return [];
    }
  };

  const getRelatedExams = async (examId: string, limit = 3): Promise<Exam[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const currentExam = sampleExams.find(e => e.id === examId);
      if (!currentExam) return [];
      
      return sampleExams
        .filter(exam => exam.id !== examId && exam.category === currentExam.category)
        .slice(0, limit);
    } catch (error) {
      return [];
    }
  };

  // Admin actions
  const createExam = async (examData: Omit<Exam, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'bookmarkCount'>): Promise<Exam> => {
    const newExam: Exam = {
      ...examData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewCount: 0,
      bookmarkCount: 0,
    };
    
    setState(prev => ({
      ...prev,
      exams: [newExam, ...prev.exams],
    }));
    
    return newExam;
  };

  const updateExam = async (id: string, updates: Partial<Exam>): Promise<Exam> => {
    const updatedExam = { ...sampleExams.find(e => e.id === id)!, ...updates, updatedAt: new Date().toISOString() };
    
    setState(prev => ({
      ...prev,
      exams: prev.exams.map(exam => exam.id === id ? updatedExam : exam),
    }));
    
    return updatedExam;
  };

  const deleteExam = async (id: string): Promise<void> => {
    setState(prev => ({
      ...prev,
      exams: prev.exams.filter(exam => exam.id !== id),
    }));
  };

  const activateExam = async (id: string): Promise<void> => {
    setState(prev => ({
      ...prev,
      exams: prev.exams.map(exam => exam.id === id ? { ...exam, active: true } : exam),
    }));
  };

  const deactivateExam = async (id: string): Promise<void> => {
    setState(prev => ({
      ...prev,
      exams: prev.exams.map(exam => exam.id === id ? { ...exam, active: false } : exam),
    }));
  };

  const updateImportantDates = async (id: string, dates: Partial<Exam['importantDates']>): Promise<void> => {
    setState(prev => ({
      ...prev,
      exams: prev.exams.map(exam => 
        exam.id === id 
          ? { 
              ...exam, 
              importantDates: { ...exam.importantDates, ...dates },
              updatedAt: new Date().toISOString()
            } 
          : exam
      ),
    }));
  };

  // Initialize data
  useEffect(() => {
    fetchExams();
    fetchCategories();
  }, []);

  const contextValue: ExamContextType = {
    ...state,
    fetchExams,
    fetchExamBySlug,
    fetchCategories,
    setFilter,
    clearFilter,
    incrementViewCount,
    toggleBookmark,
    searchExams,
    getExamsByCategory,
    getExamsByConductingBody,
    getUpcomingExams,
    getApplicationOpenExams,
    getRelatedExams,
    createExam,
    updateExam,
    deleteExam,
    activateExam,
    deactivateExam,
    updateImportantDates,
  };

  return (
    <ExamContext.Provider value={contextValue}>
      {children}
    </ExamContext.Provider>
  );
};

export const useExam = (): ExamContextType => {
  const context = useContext(ExamContext);
  if (!context) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};
