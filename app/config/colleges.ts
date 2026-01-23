// Centralized college data
export interface College {
  _id: string;
  name: string;
  slug: string;
  location: {
    city: string;
    state: string;
    coordinates: { lat: number; lng: number };
  };
  media: {
    logo: string;
    cover: string;
  };
  content: {
    overview: string;
    admission: string;
  };
  exams_accepted: string[];
  courses_offered: string[];
  tags: string[];
  meta: {
    seo_title: string;
    last_updated: string;
  };
}

export const collegesData: College[] = [
  {
    _id: "sibm-pune",
    name: "Symbiosis Institute of Business Management, Pune",
    slug: "sibm-pune",
    location: {
      city: "Pune",
      state: "Maharashtra",
      coordinates: { lat: 18.52, lng: 73.85 }
    },
    media: {
      logo: "/colleges/sibm-pune-logo.png",
      cover: "/colleges/sibm-pune-cover.jpg"
    },
    content: {
      overview: "SIBM Pune is one of the premier B-schools in India, known for its excellence in management education and industry integration. Established in 1978, it has consistently ranked among the top MBA colleges in the country.",
      admission: "Admission to SIBM Pune is through SNAP exam followed by GE-PI (Group Exercise - Personal Interview) process. The institute looks for candidates with strong academic background, leadership qualities, and communication skills."
    },
    exams_accepted: ["snap"],
    courses_offered: ["mba"],
    tags: ["top mba college", "pune", "private"],
    meta: {
      seo_title: "SIBM Pune - Symbiosis Institute of Business Management Admission",
      last_updated: "2026-01-23"
    }
  },
  {
    _id: "iim-ahmedabad",
    name: "Indian Institute of Management, Ahmedabad",
    slug: "iim-ahmedabad",
    location: {
      city: "Ahmedabad",
      state: "Gujarat",
      coordinates: { lat: 23.03, lng: 72.58 }
    },
    media: {
      logo: "/colleges/iim-a-logo.png",
      cover: "/colleges/iim-a-cover.jpg"
    },
    content: {
      overview: "IIM Ahmedabad is India's premier management institute, consistently ranked as the #1 B-school in the country. Known for its rigorous academic curriculum, distinguished faculty, and exceptional alumni network.",
      admission: "Admission through CAT exam followed by WAT-GD-PI process. Requires exceptional academic record and work experience. The selection process is highly competitive with less than 1% acceptance rate."
    },
    exams_accepted: ["cat"],
    courses_offered: ["mba", "executive-mba"],
    tags: ["top mba college", "ahmedabad", "government"],
    meta: {
      seo_title: "IIM Ahmedabad - Indian Institute of Management Admission",
      last_updated: "2026-01-23"
    }
  },
  {
    _id: "xlri-jamshedpur",
    name: "Xavier Labour Relations Institute, Jamshedpur",
    slug: "xlri-jamshedpur",
    location: {
      city: "Jamshedpur",
      state: "Jharkhand",
      coordinates: { lat: 22.80, lng: 86.18 }
    },
    media: {
      logo: "/colleges/xlri-logo.png",
      cover: "/colleges/xlri-cover.jpg"
    },
    content: {
      overview: "XLRI Jamshedpur is one of India's oldest and most prestigious business schools, known for its excellence in HR management and business programs. Established in 1949, it has a legacy of producing industry leaders.",
      admission: "Admission through XAT exam followed by GD-PI process. Known for its rigorous selection criteria and emphasis on ethical leadership and social responsibility."
    },
    exams_accepted: ["xat"],
    courses_offered: ["mba", "hr-mba"],
    tags: ["top mba college", "jamshedpur", "private"],
    meta: {
      seo_title: "XLRI Jamshedpur - Xavier Labour Relations Institute Admission",
      last_updated: "2026-01-23"
    }
  },
  {
    _id: "nmims-mumbai",
    name: "Narsee Monjee Institute of Management Studies, Mumbai",
    slug: "nmims-mumbai",
    location: {
      city: "Mumbai",
      state: "Maharashtra",
      coordinates: { lat: 19.08, lng: 72.88 }
    },
    media: {
      logo: "/colleges/nmims-logo.png",
      cover: "/colleges/nmims-cover.jpg"
    },
    content: {
      overview: "NMIMS Mumbai is a leading private university offering quality management education. Known for its industry connections, practical approach, and strong placement record across various sectors.",
      admission: "Admission through NMAT exam followed by GD-PI process. Multiple intakes throughout the year. Focus on academic excellence and extracurricular achievements."
    },
    exams_accepted: ["nmat"],
    courses_offered: ["mba", "bba", "executive-mba"],
    tags: ["top mba college", "mumbai", "private"],
    meta: {
      seo_title: "NMIMS Mumbai - Narsee Monjee Institute Admission",
      last_updated: "2026-01-23"
    }
  }
];

// Helper function to get college by slug
export const getCollegeBySlug = (slug: string): College | undefined => {
  return collegesData.find(college => college.slug === slug);
};

// Helper function to get featured colleges
export const getFeaturedColleges = (limit: number = 4): College[] => {
  return collegesData.slice(0, limit);
};

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
