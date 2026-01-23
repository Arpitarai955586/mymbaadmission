// Centralized course data
export interface Course {
  _id: string;
  name: string;
  duration_years: number;
  degree: string;
  default_fees: {
    currency: string;
    total_fee: number;
  };
  entrance_exams: string[]; // Referral IDs to exams
}

export const coursesData: Course[] = [
  {
    _id: "mba",
    name: "MBA",
    duration_years: 2,
    degree: "Postgraduate",
    default_fees: {
      currency: "INR",
      total_fee: 1200000
    },
    entrance_exams: ["snap", "cat"]
  },
  {
    _id: "bba",
    name: "BBA",
    duration_years: 3,
    degree: "Undergraduate",
    default_fees: {
      currency: "INR",
      total_fee: 600000
    },
    entrance_exams: ["cat"]
  },
  {
    _id: "executive-mba",
    name: "Executive MBA",
    duration_years: 1,
    degree: "Postgraduate",
    default_fees: {
      currency: "INR",
      total_fee: 800000
    },
    entrance_exams: ["cat", "xat"]
  },
  {
    _id: "pgdm",
    name: "PGDM",
    duration_years: 2,
    degree: "Postgraduate",
    default_fees: {
      currency: "INR",
      total_fee: 1000000
    },
    entrance_exams: ["xat", "mat", "cmat"]
  },
  {
    _id: "bcom",
    name: "B.Com",
    duration_years: 3,
    degree: "Undergraduate",
    default_fees: {
      currency: "INR",
      total_fee: 300000
    },
    entrance_exams: []
  },
  {
    _id: "mca",
    name: "MCA",
    duration_years: 2,
    degree: "Postgraduate",
    default_fees: {
      currency: "INR",
      total_fee: 400000
    },
    entrance_exams: ["cat"]
  }
];

// Helper function to get course by ID
export const getCourseById = (id: string): Course | undefined => {
  return coursesData.find(course => course._id === id);
};

// Helper function to get all courses
export const getAllCourses = (): Course[] => {
  return coursesData;
};

// Helper function to get courses by degree
export const getCoursesByDegree = (degree: string): Course[] => {
  return coursesData.filter(course => course.degree === degree);
};

// Helper function to get courses by exam
export const getCoursesByExam = (examId: string): Course[] => {
  return coursesData.filter(course => course.entrance_exams.includes(examId));
};

// Helper function to format fees
export const formatFees = (fees: { currency: string; total_fee: number }): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: fees.currency,
    maximumFractionDigits: 0
  }).format(fees.total_fee);
};
