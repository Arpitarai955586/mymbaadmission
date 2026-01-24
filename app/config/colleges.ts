// Centralized college data
export interface College {
  college_id: string;
  slug: string;
  name: string;
  short_name: string;
  type: string;
  location: {
    city: string;
    state: string;
    street_address: string;
    pincode: string;
    google_map_link: string;
  };
  approved_by: string[];
  exams_accepted: string[];
  courses_offered: string[];
  highlights: string[];
  status: string;
  media?: {
    cover: string;
  };
  content?: {
    overview: string;
    admission: string;
  };
  meta?: {
    seo_title: string;
    last_updated: string;
  };
}

export const collegesData: College[] = [
  {
    "college_id": "sibm-pune",
    "slug": "sibm-pune",
    "name": "Symbiosis Institute of Business Management, Pune",
    "short_name": "SIBM Pune",
    "type": "Private",
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "street_address": "Symbiosis Knowledge Village, Gram Lavale, Taluka Mulshi",
      "pincode": "412115",
      "google_map_link": "https://maps.app.goo.gl/9ZpS9y6M6V2b7"
    },
    "approved_by": ["UGC", "AICTE", "NAAC (A++ Grade)"],
    "exams_accepted": ["SNAP"],
    "courses_offered": ["MBA", "MBA (I&E)", "Executive MBA"],
    "highlights": ["100% Residential MBA", "Average Package ₹28+ LPA", "Bloomberg Lab Facility"],
    "status": "active",
    "media": {
      "cover": "https://assets.kollegeapply.com/collegeImage/7050139-1763555033332-SIBM%20view.jpg/1763555033332-SIBM%20view.jpg"
    },
    "content": {
      "overview": "SIBM Pune is one of the premier B-schools in India, known for its excellence in management education and industry integration. Established in 1978, it has consistently ranked among the top MBA colleges in the country.",
      "admission": "Admission to SIBM Pune is through SNAP exam followed by GE-PI (Group Exercise - Personal Interview) process. The institute looks for candidates with strong academic background, leadership qualities, and communication skills."
    }
  },
  {
    "college_id": "nmims-mumbai",
    "slug": "nmims-mumbai",
    "name": "Narsee Monjee Institute of Management Studies",
    "short_name": "NMIMS Mumbai",
    "type": "Deemed-to-be University",
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "street_address": "V. L. Mehta Road, Vile Parle (West)",
      "pincode": "400056",
      "google_map_link": "https://maps.app.goo.gl/nmims-vile-parle"
    },
    "approved_by": ["UGC", "AACSB Accredited"],
    "exams_accepted": ["NMAT by GMAC"],
    "courses_offered": ["MBA", "MBA Core", "MBA HR", "MBA Business Analytics"],
    "highlights": ["Prime Location in Mumbai", "AACSB Global Accreditation", "Strong Finance Placements"],
    "status": "active",
    "media": {
      "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6VDJS5l_Q6ET1R4KQGOS7xg4BTMaYH5u7ag&s"
    },
    "content": {
      "overview": "NMIMS Mumbai is a premier management institute offering world-class education with global accreditation. Located in the heart of Mumbai, it provides excellent placement opportunities and industry exposure.",
      "admission": "Admission through NMAT by GMAC followed by case discussion and personal interview. The institute seeks candidates with strong analytical skills and leadership potential."
    }
  },
  {
    "college_id": "simsree-mumbai",
    "slug": "simsree-mumbai",
    "name": "Sydenham Institute of Management (SIMSREE)",
    "short_name": "SIMSREE",
    "type": "Government",
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "street_address": "B Road, Churchgate",
      "pincode": "400020",
      "google_map_link": "https://maps.app.goo.gl/simsree-churchgate"
    },
    "approved_by": ["AICTE", "University of Mumbai"],
    "exams_accepted": ["MAH MBA CET", "CAT", "CMAT"],
    "courses_offered": ["MMS", "PGDBM"],
    "highlights": ["Extremely Low Fees (ROI King)", "Churchgate Location", "Legacy Alumni Network"],
    "status": "active",
    "media": {
      "cover": "https://timess3spore.s3.amazonaws.com/ndata/media/Counsellor/CollegeImage/3a6e2ed580d93c16461f24e65682b93f2.webp"
    },
    "content": {
      "overview": "SIMSREE is one of the oldest management institutes in India, offering quality education at extremely affordable fees. Located in the prime Churchgate area, it provides excellent ROI.",
      "admission": "Admission through MAH MBA CET, CAT, or CMAT scores. The institute follows the centralized admission process of Maharashtra state."
    }
  },
  {
    "college_id": "kj-somaiya-mumbai",
    "slug": "kj-somaiya-mumbai",
    "name": "K J Somaiya Institute of Management",
    "short_name": "KJSIM",
    "type": "Private",
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "street_address": "Vidyanagar, Vidyavihar (East)",
      "pincode": "400077",
      "google_map_link": "https://maps.app.goo.gl/kjsim-vidyavihar"
    },
    "approved_by": ["UGC", "AACSB Member"],
    "exams_accepted": ["CAT", "XAT", "NMAT", "GMAT"],
    "courses_offered": ["MBA", "MBA (Sports Management)", "MBA (Health Care Management)"],
    "highlights": ["Large Green Campus in Mumbai", "Diverse Specialized MBA Programs", "High Industry Engagement"],
    "status": "active",
    "media": {
      "cover": "https://newsletter.somaiya.edu/wp-content/uploads/2023/08/KJ-SIM.gif"
    },
    "content": {
      "overview": "KJ Somaiya offers a unique blend of academic excellence and practical exposure with specialized MBA programs. The green campus provides an ideal learning environment.",
      "admission": "Accepts CAT, XAT, NMAT, and GMAT scores. Selection based on entrance exam scores, academic performance, and personal interview."
    }
  },
  {
    "college_id": "weschool-mumbai",
    "slug": "weschool-mumbai",
    "name": "Prin. L. N. Welingkar Institute of Management (WeSchool)",
    "short_name": "WeSchool",
    "type": "Private",
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "street_address": "L.N. Road, Matunga (Central)",
      "pincode": "400019",
      "google_map_link": "https://maps.app.goo.gl/weschool-matunga"
    },
    "approved_by": ["AICTE"],
    "exams_accepted": ["CAT", "XAT", "ATMA", "CMAT", "MAH CET"],
    "courses_offered": ["PGDM", "PGDM (Business Design)", "PGDM (Retail)"],
    "highlights": ["Focus on Design Thinking", "Innovative Global Internships", "Centrally Located"],
    "status": "active",
    "media": {
      "cover": "https://drupal.mbauniverse.com/sites/default/files/2025-11/We-School-Bangalore-Campus-01.jpg"
    },
    "content": {
      "overview": "WeSchool is known for its innovative approach to management education with emphasis on design thinking and global exposure. Located centrally in Mumbai.",
      "admission": "Accepts multiple entrance exams including CAT, XAT, ATMA, CMAT, and MAH CET. Selection includes group discussion and personal interview."
    }
  },
  {
    "college_id": "spjimr-mumbai",
    "slug": "spjimr-mumbai",
    "name": "S.P. Jain Institute of Management & Research",
    "short_name": "SPJIMR",
    "type": "Private",
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "street_address": "Bhavan's Campus, Munshi Nagar, Andheri (West)",
      "pincode": "400058",
      "google_map_link": "https://maps.app.goo.gl/spjimr-andheri"
    },
    "approved_by": ["AICTE", "AACSB Accredited"],
    "exams_accepted": ["CAT", "GMAT"],
    "courses_offered": ["PGDM", "PGPM", "GMP"],
    "highlights": ["Top 10 B-School in India", "Autumn Internships", "Global Fast Track Program"],
    "status": "active",
    "media": {
      "cover": "https://drupal.mbauniverse.com/sites/default/files/2025-06/college_gallery_71291719634667.jpg"
    },
    "content": {
      "overview": "SPJIMR is consistently ranked among the top 10 B-schools in India, known for its innovative pedagogy and excellent placement record. Offers unique autumn internship program.",
      "admission": "Admission through CAT or GMAT scores followed by group discussion and personal interview. Emphasis on work experience and leadership qualities."
    }
  },
  {
    "college_id": "ximb-bhubaneswar",
    "slug": "ximb-bhubaneswar",
    "name": "Xavier Institute of Management, Bhubaneswar",
    "short_name": "XIMB",
    "type": "Private",
    "location": {
      "city": "Bhubaneswar",
      "state": "Odisha",
      "street_address": "Xavier Square, Jayadev Vihar",
      "pincode": "751013",
      "google_map_link": "https://maps.app.goo.gl/ximb-bbsr"
    },
    "approved_by": ["UGC", "NBA"],
    "exams_accepted": ["XAT", "CAT", "GMAT", "X-GMT"],
    "courses_offered": ["MBA (BM)", "Executive MBA"],
    "highlights": ["Iconic Brand in Management", "Strong Rural Management Focus", "Excellent Campus Culture"],
    "status": "active",
    "media": {
      "cover": "https://xim.edu.in/wp-content/uploads/2020/04/Xavier-University-Bhubaneswar.jpg"
    },
    "content": {
      "overview": "XIMB is an iconic management institute known for its academic excellence and strong focus on rural management. Offers excellent campus culture and industry exposure.",
      "admission": "Accepts XAT, CAT, GMAT, and X-GMT scores. Selection based on entrance exam performance, academic record, and personal interview."
    }
  },
  {
    "college_id": "christ-university-bangalore",
    "slug": "christ-university-bangalore",
    "name": "Christ (Deemed to be University)",
    "short_name": "Christ University",
    "type": "Deemed University",
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "street_address": "Hosur Road, Bhavani Nagar, S.G. Palya",
      "pincode": "560029",
      "google_map_link": "https://maps.app.goo.gl/christ-hosur-road"
    },
    "approved_by": ["UGC", "NAAC (A+ Grade)"],
    "exams_accepted": ["CAT", "XAT", "MAT", "CMAT", "CUET"],
    "courses_offered": ["MBA (General)", "MBA (Business Analytics)"],
    "highlights": ["Strict Discipline & Academic Rigor", "Beautiful Urban Campus", "Holistic Development"],
    "status": "active",
    "media": {
      "cover": "https://zolostays.com/blog/wp-content/uploads/2025/05/christ-university-y-1160x852.jpg"
    },
    "content": {
      "overview": "Christ University is known for its academic rigor, discipline, and holistic development approach. The beautiful urban campus provides an excellent learning environment.",
      "admission": "Accepts CAT, XAT, MAT, CMAT, and CUET scores. Selection based on entrance exam, academic performance, and personal interview."
    }
  },
  {
    "college_id": "alliance-university-bangalore",
    "slug": "alliance-university-bangalore",
    "name": "Alliance University",
    "short_name": "Alliance",
    "type": "Private University",
    "location": {
      "city": "Bangalore",
      "state": "Karnataka",
      "street_address": "Chikkahagade Cross, Chandapura - Anekal Main Road",
      "pincode": "562106",
      "google_map_link": "https://maps.app.goo.gl/alliance-anekal"
    },
    "approved_by": ["UGC", "IACBE (USA)"],
    "exams_accepted": ["AMAT", "CAT", "NMAT", "XAT", "MAT"],
    "courses_offered": ["MBA", "MBA (Digital Transformation)"],
    "highlights": ["60+ Acre Lush Green Campus", "International Faculty Exchange", "Modern Infrastructure"],
    "status": "active",
    "media": {
      "cover": "https://www.alliance.edu.in/uploads/infra_gallery/1.webp"
    },
    "content": {
      "overview": "Alliance University offers a sprawling 60+ acre campus with modern infrastructure and international faculty exchange programs. Focus on digital transformation.",
      "admission": "Accepts AMAT, CAT, NMAT, XAT, and MAT scores. Selection based on entrance exam performance, academic record, and personal interview."
    }
  },
  {
    "college_id": "isb-hyderabad",
    "slug": "isb-hyderabad",
    "name": "Indian School of Business",
    "short_name": "ISB",
    "type": "Private",
    "location": {
      "city": "Hyderabad",
      "state": "Telangana",
      "street_address": "Gachibowli",
      "pincode": "500111",
      "google_map_link": "https://maps.app.goo.gl/isb-hyderabad"
    },
    "approved_by": ["AACSB", "EQUIS Accredited"],
    "exams_accepted": ["GMAT", "GRE"],
    "courses_offered": ["PGP", "PGPpro", "PGPMAX"],
    "highlights": ["Global Ranking in Top 50", "1-Year Fast Track MBA", "World-Class Faculty"],
    "status": "active",
    "media": {
      "cover": "https://admitexpert.com/wp-content/uploads/2022/06/ISB-Indian-School-of-Business.webp"
    },
    "content": {
      "overview": "ISB is globally ranked among the top 50 business schools, offering a 1-year MBA program with world-class faculty and excellent global exposure.",
      "admission": "Accepts GMAT and GRE scores. Selection based on entrance exam, work experience, academic performance, and personal interview."
    }
  },
  {
    "college_id": "coep-pune",
    "slug": "coep-pune",
    "name": "COEP Technological University",
    "short_name": "COEP Tech",
    "type": "Government Unitary University",
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "street_address": "Wellesley Road, Shivajinagar",
      "pincode": "411005",
      "google_map_link": "https://maps.app.goo.gl/coep-pune"
    },
    "approved_by": ["AICTE", "Govt. of Maharashtra"],
    "exams_accepted": ["MAH MBA CET"],
    "courses_offered": ["MBA"],
    "highlights": ["150+ Year Legacy", "Strong Tech-Management Interface", "Low Fees Structure"],
    "status": "active",
    "media": {
      "cover": "https://www.coeptech.ac.in/wp-content/uploads/elementor/thumbs/COEP-Website-Pic-6-r4qfmbqfe8bwc0r15m898t1radkhlgc2hsiukrh0uw.jpg"
    },
    "content": {
      "overview": "COEP Technological University has a 150+ year legacy offering MBA with strong technology-management interface at affordable fees.",
      "admission": "Admission through MAH MBA CET. Follows the centralized admission process of Maharashtra state."
    }
  },
  {
    "college_id": "pumba-pune",
    "slug": "pumba-pune",
    "name": "Department of Management Sciences (PUMBA)",
    "short_name": "PUMBA",
    "type": "University Department",
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "street_address": "Savitribai Phule Pune University, Ganeshkhind",
      "pincode": "411007",
      "google_map_link": "https://maps.app.goo.gl/pumba-sppu"
    },
    "approved_by": ["UGC", "AICTE"],
    "exams_accepted": ["MAH MBA CET", "CAT", "CMAT"],
    "courses_offered": ["MBA (General)", "MBA (Pharma)"],
    "highlights": ["Prestigious University Department", "Top Choice for Pharma MBA", "Excellent ROI"],
    "status": "active",
    "media": {
      "cover": "https://e2pconsultancy.com/wp-content/uploads/2019/03/pumba.jpg"
    },
    "content": {
      "overview": "PUMBA is a prestigious university department known for its excellent ROI and specialized Pharma MBA program. Part of Savitribai Phule Pune University.",
      "admission": "Accepts MAH MBA CET, CAT, and CMAT scores. Selection based on entrance exam performance and academic record."
    }
  },
  {
    "college_id": "sda-bocconi-mumbai",
    "slug": "sda-bocconi-mumbai",
    "name": "SDA Bocconi Asia Center",
    "short_name": "SDA Bocconi",
    "type": "Private International Center",
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "street_address": "9th Floor, Hiranandani Knowledge Park, Powai",
      "pincode": "400076",
      "google_map_link": "https://maps.app.goo.gl/sda-bocconi-powai"
    },
    "approved_by": ["Triple Crown Accredited (Italy Parent)"],
    "exams_accepted": ["Bocconi Test", "CAT", "NMAT", "GMAT", "GRE"],
    "courses_offered": ["IMB (International Master in Business)"],
    "highlights": ["Semester in Milan, Italy", "International Faculty", "Powai Start-up Hub Location"],
    "status": "active",
    "media": {
      "cover": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbQJuzLCwnbZsv--1Y24JgCO_Mjc2xwILhkQ&s"
    },
    "content": {
      "overview": "SDA Bocconi offers international business education with a semester in Milan, Italy. Located in the Powai start-up hub with international faculty.",
      "admission": "Accepts Bocconi Test, CAT, NMAT, GMAT, and GRE scores. Selection based on entrance exam, academic performance, and personal interview."
    }
  },
  {
    "college_id": "tapmi-manipal",
    "slug": "tapmi-manipal",
    "name": "T.A. Pai Management Institute",
    "short_name": "TAPMI",
    "type": "Private",
    "location": {
      "city": "Manipal",
      "state": "Karnataka",
      "street_address": "Badagabettu, Manipal",
      "pincode": "576104",
      "google_map_link": "https://maps.app.goo.gl/tapmi-manipal"
    },
    "approved_by": ["AACSB", "AMBA Accredited"],
    "exams_accepted": ["CAT", "XAT", "GMAT", "NMAT"],
    "courses_offered": ["MBA", "MBA (BKFS)", "MBA (HRM)"],
    "highlights": ["Dual Global Accreditation", "Experiential Learning Focus", "Rich Alumni Base"],
    "status": "active",
    "media": {
      "cover": "https://www.tapmi.edu.in/wp-content/uploads/2024/11/C78A6510-1.webp"
    },
    "content": {
      "overview": "TAPMI has dual global accreditation and focuses on experiential learning with a rich alumni base. Located in the educational hub of Manipal.",
      "admission": "Accepts CAT, XAT, GMAT, and NMAT scores. Selection based on entrance exam performance, academic record, and personal interview."
    }
  },
  {
    "college_id": "ibs-mumbai",
    "slug": "ibs-mumbai",
    "name": "ICFAI Business School (IBS)",
    "short_name": "IBS Mumbai",
    "type": "Private",
    "location": {
      "city": "Mumbai",
      "state": "Maharashtra",
      "street_address": "Hiranandani Knowledge Park, Powai",
      "pincode": "400076",
      "google_map_link": "https://maps.app.goo.gl/ibs-mumbai-powai"
    },
    "approved_by": ["Independent Professional Institute"],
    "exams_accepted": ["IBSAT", "CAT", "NMAT", "GMAT"],
    "courses_offered": ["PGPM"],
    "highlights": ["Case-Study Based Learning", "Large Batch Size (Strong Networking)", "Strategic Corporate Location"],
    "status": "active",
    "media": {
      "cover": "https://static.boostmytalent.com/img/univ/icfai-ibs-jaipur-campus-admission.webp"
    },
    "content": {
      "overview": "IBS Mumbai offers case-study based learning with large batch size for strong networking. Located strategically in Powai corporate hub.",
      "admission": "Accepts IBSAT, CAT, NMAT, and GMAT scores. Selection based on entrance exam performance and personal interview."
    }
  },
  {
    "college_id": "soil-gurgaon",
    "slug": "soil-gurgaon",
    "name": "SOIL Institute of Management",
    "short_name": "SOIL",
    "type": "Private",
    "location": {
      "city": "Gurgaon",
      "state": "Haryana",
      "street_address": "Plot No. 76, Sector 44",
      "pincode": "122003",
      "google_map_link": "https://static.boostmytalent.com/img/univ/soil-gurgaon-campus-admission.webp"
    },
    "approved_by": ["AICTE"],
    "exams_accepted": ["CAT", "XAT", "GMAT", "NMAT", "MAT"],
    "courses_offered": ["PGDM", "PGPM (1 Year)"],
    "highlights": ["Focus on Values & Ethics", "Small Batch Size", "Gurgaon Corporate Hub"],
    "status": "active",
    "media": {
      "cover": "https://images.shiksha.com/mediadata/images/1662364835phpPh8QUd.jpeg"
    },
    "content": {
      "overview": "SOIL focuses on values and ethics with small batch size for personalized attention. Located in the Gurgaon corporate hub.",
      "admission": "Accepts CAT, XAT, GMAT, NMAT, and MAT scores. Selection based on entrance exam, academic performance, and personal interview."
    }
  },
  {
    "college_id": "flame-university-pune",
    "slug": "flame-university-pune",
    "name": "FLAME University",
    "short_name": "FLAME",
    "type": "Private University",
    "location": {
      "city": "Pune",
      "state": "Maharashtra",
      "street_address": "Gat No. 1270, Lavale, Off Pune-Bangalore Highway",
      "pincode": "412115",
      "google_map_link": "https://maps.app.goo.gl/flame-pune"
    },
    "approved_by": ["UGC"],
    "exams_accepted": ["FEAT", "CAT", "XAT", "MAT", "CMAT", "NMAT"],
    "courses_offered": ["MBA", "MBA (Communications Management)"],
    "highlights": ["Liberal Education Foundation", "High Faculty-Student Ratio", "World-class Sports Infra"],
    "status": "active",
    "media": {
      "cover": "https://image-static.collegedunia.com/public/college_data/images/campusimage/1464681315flame_1459398202.jpg"
    },
    "content": {
      "overview": "FLAME University offers liberal education foundation with high faculty-student ratio and world-class sports infrastructure.",
      "admission": "Accepts FEAT, CAT, XAT, MAT, CMAT, and NMAT scores. Selection based on entrance exam performance and personal interview."
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

// Helper function to get unique cities
export const getUniqueCities = (): string[] => {
  const cities = collegesData.map(college => college.location.city);
  return Array.from(new Set(cities)).sort();
};

// Helper function to get unique states
export const getUniqueStates = (): string[] => {
  const states = collegesData.map(college => college.location.state);
  return Array.from(new Set(states)).sort();
};

// Helper function to get unique types
export const getUniqueTypes = (): string[] => {
  const types = collegesData.map(college => college.type);
  return Array.from(new Set(types)).sort();
};
