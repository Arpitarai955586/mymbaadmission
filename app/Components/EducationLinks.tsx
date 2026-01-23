import React from 'react';
import Link from 'next/link';

interface LinkGroup {
  category: string;
  links: string[];
}

const educationData: LinkGroup[] = [
  {
    category: "Engineering",
    links: [
      "Top Engineering Colleges in India",
      "Top Engineering Colleges in Delhi NCR",
      "Top Engineering Colleges in Noida",
      "Top Engineering Colleges in Ghaziabad",
      "Top Engineering Colleges in Greater Noida",
      "Top Engineering Colleges in Chennai",
      "Top Engineering Colleges in New Delhi",
      "Top Engineering Colleges in Mumbai",
      "Top Engineering Colleges in Kanpur",
      "Top Engineering Colleges in Hyderabad",
      "Top Engineering Colleges in Varanasi",
      "Top Engineering Colleges in Dehradun",
      "Top Engineering Colleges in Kolkata"
    ]
  },
  {
    category: "Management",
    links: [
      "IIM Ahmedabad",
      "IIM Bangalore",
      "IIM Indore",
      "IIM Kozhikode",
      "IIM Raipur",
      "IIM Ranchi",
      "IIM Sambalpur",
      "IIM Shillong",
      "IIM Rohtak",
      "IIM Nagpur",
      "IIM Sirmaur",
      "IIM Tiruchirappalli"
    ]
  },
  {
    category: "Medical",
    links: [
      "FMGE Exam",
      "NEET PG Exam",
      "AIIMS MSc Courses Exam",
      "AIIMS MSc Biotechnology Exam",
      "AIIMS BSc Nursing Exam",
      "AIIMS MSc Nursing Exam",
      "AIIMS Paramedical Exam",
      "PGIMER BSc Nursing Exam"
    ]
  },
  {
    category: "Top Exams",
    links: [
      "ATMA Exam",
      "TS ICET Exam",
      "TS PGLCET Exam",
      "CLAT Exam",
      "SUAT Exam",
      "NIPER JEE Exam",
      "FMGE Exam",
      "UGC NET Exam",
      "CSIR UGC NET Exam",
      "NEET PG Exam",
      "GRE Exam",
      "UBTER JEEP Exam",
      "AIIMS MSc Courses Exam",
      "TS PGECET Exam",
      "AIAPGET Exam"
    ]
  }
];

const EducationLinks = () => {
  return (
    <section className="bg-[#F8F9F9] py-12 px-6 border-t border-[#922B21]/20">
      <div className="max-w-7xl mx-auto">
        {/* Main Title */}
        <h2 className="text-xl md:text-2xl font-bold text-[#1A1A1B] mb-8">
          Explore Everything About Education
        </h2>

        {/* Link Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {educationData.map((group, idx) => (
            <div key={idx} className="flex flex-col gap-4">
              {/* Category Header */}
              <h3 className="text-lg font-bold text-[#1A1A1B] border-b border-[#D4AC0D] pb-2">
                {group.category}
              </h3>
              
              {/* List of Links */}
              <ul className="flex flex-col gap-2.5">
                {group.links.map((linkText, linkIdx) => (
                  <li key={linkIdx}>
                    <Link 
                      href="#" 
                      className="text-sm text-[#2C3E50] hover:text-[#922B21] hover:underline transition-colors duration-200"
                    >
                      {linkText}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationLinks;