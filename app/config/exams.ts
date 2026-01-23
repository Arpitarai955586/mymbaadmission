// Centralized exam data
export interface Exam {
  _id: string;
  name: string;
  full_name: string;
  type: string;
  exam_month: string;
  website: string;
  status: string;
}

export const examsData: Exam[] = [
  {
    _id: "snap",
    name: "SNAP",
    full_name: "Symbiosis National Aptitude Test",
    type: "National",
    exam_month: "December",
    website: "https://snaptest.org",
    status: "active"
  },
  {
    _id: "cat",
    name: "CAT",
    full_name: "Common Admission Test",
    type: "National",
    exam_month: "November",
    website: "https://iimcat.ac.in",
    status: "active"
  },
  {
    _id: "xat",
    name: "XAT",
    full_name: "Xavier Aptitude Test",
    type: "National",
    exam_month: "January",
    website: "https://xatonline.in",
    status: "active"
  },
  {
    _id: "nmat",
    name: "NMAT",
    full_name: "NMIMS Management Aptitude Test",
    type: "National",
    exam_month: "October",
    website: "https://nmat.nmims.edu",
    status: "active"
  },
  {
    _id: "cmat",
    name: "CMAT",
    full_name: "Common Management Admission Test",
    type: "National",
    exam_month: "March",
    website: "https://cmat.nta.nic.in",
    status: "active"
  },
  {
    _id: "mat",
    name: "MAT",
    full_name: "Management Aptitude Test",
    type: "National",
    exam_month: "Multiple",
    website: "https://mat.aima.in",
    status: "active"
  },
  {
    _id: "mah-cet",
    name: "MAH CET",
    full_name: "Maharashtra Common Entrance Test",
    type: "State",
    exam_month: "March",
    website: "https://mahacet.org",
    status: "active"
  },
  {
    _id: "karnataka-pgcet",
    name: "Karnataka PGCET",
    full_name: "Karnataka Post Graduate Common Entrance Test",
    type: "State",
    exam_month: "July",
    website: "https://kea.kar.nic.in",
    status: "active"
  }
];

// Helper function to get exam by ID
export const getExamById = (id: string): Exam | undefined => {
  return examsData.find(exam => exam._id === id);
};

// Helper function to get all active exams
export const getActiveExams = (): Exam[] => {
  return examsData.filter(exam => exam.status === 'active');
};

// Helper function to get exams by type
export const getExamsByType = (type: string): Exam[] => {
  return examsData.filter(exam => exam.type === type);
};

// Helper function to get exam names for college
export const getExamNames = (examIds: string[]): string[] => {
  return examIds.map(id => {
    const exam = getExamById(id);
    return exam ? exam.name : id;
  });
};
