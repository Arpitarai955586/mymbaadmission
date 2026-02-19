// Centralized college data
export interface College {
  college_id: string;
  slug: string;
  name: string;
  short_name?: string;
  type: string;
  location: {
    city: string;
    state?: string;
    street_address?: string;
    pincode?: string;
    google_map_link?: string;
  };
  approved_by?: string[] | string;
  exams_accepted?: string[];
  courses_offered?: string[];
  highlights?: string[];
  status: string;
  media?: {
    cover?: string;
  };
  content?: {
    overview?: string;
    admission?: string;
  };
  fees?: {
    annual_fee?: number;
    currency?: string;
    fee_structure?: string;
  };
  meta?: {
    seo_title?: string;
    last_updated?: string;
  };
  coursesCount?: number;
  examsCount?: number;
}

// Helper function to get course names for college
export const getCourseNames = (courseIds: string[]): string[] => {
  return courseIds.map(id => {
    // Simple mapping for now - in real app, this would use getCourseById
    const courseMap: { [key: string]: string } = {
      'mba': 'MBA',
      'bba': 'BBA',
      'executive-mba': 'Executive MBA',
      'pgdm': 'PGDM',
      'bcom': 'B.Com',
      'mca': 'MCA'
    };
    return courseMap[id] || id;
  });
};
