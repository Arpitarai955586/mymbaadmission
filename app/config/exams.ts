// Centralized exam data
export interface Exam {
  exam_id: string;
  slug: string;
  name: string;
  full_name: string;
  type: string;
  conducting_body: string;
  exam_month: string;
  website: string;
  status: string;
  duration: string;
  mode: string;
  sections: string[];
  accepted_by: string[];
  eligibility: string;
  application_fee: string;
  highlights: string[];
  media?: {
    logo: string;
    cover: string;
  };
  content?: {
    overview: string;
    pattern: string;
  };
}

export const examsData: Exam[] = [
  {
    "exam_id": "cat",
    "slug": "cat",
    "name": "CAT",
    "full_name": "Common Admission Test",
    "type": "National",
    "conducting_body": "IIMs",
    "exam_month": "November",
    "website": "https://iimcat.ac.in",
    "status": "active",
    "duration": "2 hours",
    "mode": "Computer-based",
    "sections": ["Verbal Ability", "Data Interpretation", "Logical Reasoning", "Quantitative Ability"],
    "accepted_by": ["All IIMs", "FMS Delhi", "MDI Gurgaon", "SPJIMR Mumbai", "IMI Delhi", "200+ B-schools"],
    "eligibility": "Bachelor's degree with 50% marks (45% for SC/ST/PwD)",
    "application_fee": "₹1200 (General), ₹600 (SC/ST/PwD)",
    "highlights": ["Gateway to IIMs", "200+ colleges accept CAT", "Most prestigious MBA exam", "3 lakh+ applicants annually"],
    "media": {
      "logo": "/exams/cat-logo.png",
      "cover": "/exams/cat-cover.jpg"
    },
    "content": {
      "overview": "CAT is the most prestigious MBA entrance exam in India, conducted by IIMs for admission to 20 IIMs and over 200 other B-schools.",
      "pattern": "100 questions across 4 sections, 3 marks each, -1 mark for wrong answer"
    }
  },
  {
    "exam_id": "xat",
    "slug": "xat",
    "name": "XAT",
    "full_name": "Xavier Aptitude Test",
    "type": "National",
    "conducting_body": "XLRI Jamshedpur",
    "exam_month": "January",
    "website": "https://xatonline.in",
    "status": "active",
    "duration": "3.5 hours",
    "mode": "Computer-based",
    "sections": ["Verbal & Logical Ability", "Decision Making", "Quantitative Ability & Data Interpretation", "General Knowledge"],
    "accepted_by": ["XLRI Jamshedpur", "XIMB Bhubaneswar", "XIME Bangalore", "LIBA Chennai", "150+ B-schools"],
    "eligibility": "Bachelor's degree with 50% marks (45% for SC/ST/PwD)",
    "application_fee": "₹2000 (General), ₹1700 (SC/ST/PwD)",
    "highlights": ["XLRI flagship exam", "Unique Decision Making section", "150+ participating institutes", "Essay writing component"],
    "media": {
      "logo": "/exams/xat-logo.png",
      "cover": "/exams/xat-cover.jpg"
    },
    "content": {
      "overview": "XAT is conducted by XLRI for admission to its programs and over 150 other B-schools across India.",
      "pattern": "100 questions + Essay writing, 3.5 hours duration with unique Decision Making section"
    }
  },
  {
    "exam_id": "snap",
    "slug": "snap",
    "name": "SNAP",
    "full_name": "Symbiosis National Aptitude Test",
    "type": "University",
    "conducting_body": "Symbiosis International University",
    "exam_month": "December",
    "website": "https://snaptest.org",
    "status": "active",
    "duration": "1 hour",
    "mode": "Computer-based",
    "sections": ["General English", "Quantitative, Data Interpretation & Data Sufficiency", "Analytical & Logical Reasoning"],
    "accepted_by": ["SIBM Pune", "SCMHRD Pune", "SIOM Nashik", "SICSR Pune", "15 Symbiosis institutes"],
    "eligibility": "Bachelor's degree with 50% marks (45% for SC/ST/PwD)",
    "application_fee": "₹2250 (General), ₹1750 (SC/ST/PwD)",
    "highlights": ["Gateway to Symbiosis institutes", "15+ Symbiosis B-schools", "Shortest duration MBA exam", "60 questions only"],
    "media": {
      "logo": "/exams/snap-logo.png",
      "cover": "/exams/snap-cover.jpg"
    },
    "content": {
      "overview": "SNAP is the entrance exam for admission to all Symbiosis International University MBA programs.",
      "pattern": "60 questions in 60 minutes, no negative marking, 3 sections with equal weightage"
    }
  },
  {
    "exam_id": "nmat",
    "slug": "nmat",
    "name": "NMAT",
    "full_name": "NMIMS Management Aptitude Test",
    "type": "University",
    "conducting_body": "GMAC",
    "exam_month": "October-December",
    "website": "https://nmat.org",
    "status": "active",
    "duration": "2 hours",
    "mode": "Computer-based",
    "sections": ["Language Skills", "Quantitative Skills", "Logical Reasoning"],
    "accepted_by": ["NMIMS Mumbai", "NMIMS Bangalore", "NMIMS Hyderabad", "50+ B-schools"],
    "eligibility": "Bachelor's degree with 50% marks",
    "application_fee": "₹2300 (Early), ₹2800 (Late)",
    "highlights": ["GMAC conducted exam", "3 attempts allowed", "No negative marking", "International acceptance"],
    "media": {
      "logo": "/exams/nmat-logo.png",
      "cover": "/exams/nmat-cover.jpg"
    },
    "content": {
      "overview": "NMAT by GMAC is the entrance exam for NMIMS and other B-schools, conducted by GMAC.",
      "pattern": "120 questions across 3 sections, no negative marking, option for 3 attempts"
    }
  },
  {
    "exam_id": "cet",
    "slug": "mah-mba-cet",
    "name": "MAH MBA CET",
    "full_name": "Maharashtra MBA Common Entrance Test",
    "type": "State",
    "conducting_body": "State CET Cell, Maharashtra",
    "exam_month": "March",
    "website": "https://mbacet2023.mahacet.org",
    "status": "active",
    "duration": "2.5 hours",
    "mode": "Computer-based",
    "sections": ["Logical Reasoning", "Abstract Reasoning", "Quantitative Aptitude", "Verbal Ability"],
    "accepted_by": ["JBIMS Mumbai", "SIMSREE Mumbai", "PUMBA Pune", "KJSIM Mumbai", "300+ Maharashtra colleges"],
    "eligibility": "Bachelor's degree with 50% marks (45% for reserved categories)",
    "application_fee": "₹1000 (General), ₹800 (Reserved)",
    "highlights": ["Maharashtra state exam", "300+ participating colleges", "Lowest fee structure", "Home state advantage"],
    "media": {
      "logo": "/exams/cet-logo.png",
      "cover": "/exams/cet-cover.jpg"
    },
    "content": {
      "overview": "MAH MBA CET is the state-level entrance exam for MBA/MMS programs in Maharashtra.",
      "pattern": "200 questions in 150 minutes, 1 mark each, no negative marking"
    }
  }
];

// Helper function to get exam by ID
export const getExamById = (id: string): Exam | undefined => {
  return examsData.find(exam => exam.exam_id === id);
};

// Helper function to get exam by slug
export const getExamBySlug = (slug: string): Exam | undefined => {
  return examsData.find(exam => exam.slug === slug);
};

// Helper function to get all active exams
export const getActiveExams = (): Exam[] => {
  return examsData.filter(exam => exam.status === 'active');
};

// Helper function to get exams by type
export const getExamsByType = (type: string): Exam[] => {
  return examsData.filter(exam => exam.type === type);
};

// Helper function to get unique exam types
export const getUniqueExamTypes = (): string[] => {
  const types = examsData.map(exam => exam.type);
  return Array.from(new Set(types)).sort();
};

// Helper function to get upcoming exams
export const getUpcomingExams = (): Exam[] => {
  const monthOrder = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return examsData
    .filter(exam => exam.status === 'active')
    .sort((a, b) => monthOrder.indexOf(a.exam_month) - monthOrder.indexOf(b.exam_month));
};

// Helper function to get exam names for college
export const getExamNames = (examIds: string[]): string[] => {
  return examIds.map(id => {
    const exam = getExamById(id);
    return exam ? exam.name : id;
  });
};
