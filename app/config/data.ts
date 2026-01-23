import { siteIdentity } from './site';

// Helper function to get brand colors
export const colors = siteIdentity.colors;

// Company and Team Data
export const companyData = {
  name: siteIdentity.name,
  founded: 2009,
  studentsHelped: "25,000+",
  partnerColleges: "850+",
  successRate: "98%",
  yearsExperience: "15+",
  studentRating: "4.9/5",
  story: {
    title: "From a Small Dream to India's Trusted Platform",
    description: [
      `${siteIdentity.name} started in 2009 with a simple mission: to make college admissions stress-free and accessible for every student. What began as a small counselling center has now grown into India's leading education consulting platform.`,
      "Over the years, we've helped over 25,000 students secure admissions in their dream colleges. Our journey has been built on trust, transparency, and our unwavering commitment to putting students first."
    ]
  },
  hero: {
    title: `About ${siteIdentity.name}`,
    subtitle: siteIdentity.description,
    badges: [
      { text: "15+ Years of Excellence", icon: "check" },
      { text: "4.9/5 Student Rating", icon: "star" }
    ]
  }
};

export const teamMembers = [
  {
    id: 1,
    name: "Dr. Rajesh Kumar",
    role: "Founder & CEO",
    expertise: "15+ years in education consulting",
    image: "https://images.pexels.com/photos/5438692/pexels-photo-5438692.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Head of Counselling",
    expertise: "12+ years helping students find right colleges",
    image: "https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    name: "Amit Patel",
    role: "Operations Director",
    expertise: "10+ years in education management",
    image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 4,
    name: "Neha Gupta",
    role: "Senior Counsellor",
    expertise: "8+ years in career guidance",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];

export const coreValues = [
  {
    id: 1,
    title: "Trust & Transparency",
    description: "We believe in complete transparency in our processes and honest guidance for every student.",
    icon: "shield"
  },
  {
    id: 2,
    title: "Student First Approach",
    description: "Every decision we make is centered around what's best for the student's future.",
    icon: "users"
  },
  {
    id: 3,
    title: "Result Oriented",
    description: "Our focus is on delivering actual admissions and career success, not just advice.",
    icon: "target"
  },
  {
    id: 4,
    title: "Excellence in Service",
    description: "We maintain the highest standards in education consulting and student support.",
    icon: "award"
  }
];

export const achievements = [
  { id: 1, number: "25,000+", label: "Students Guided", icon: "users" },
  { id: 2, number: "850+", label: "Partner Colleges", icon: "bookOpen" },
  { id: 3, number: "98%", label: "Success Rate", icon: "target" },
  { id: 4, number: "15+", label: "Years Experience", icon: "award" }
];

export const contactMethods = [
  {
    id: 1,
    type: "phone",
    title: "Call Us",
    subtitle: "24/7 Helpline Available",
    value: siteIdentity.contact.phone[0],
    description: "Immediate support for urgent admission queries"
  },
  {
    id: 2,
    type: "email",
    title: "Email Us",
    subtitle: "Quick Response Guaranteed",
    value: siteIdentity.contact.email,
    description: "Detailed queries and document submissions"
  },
  {
    id: 3,
    type: "location",
    title: "Visit Us",
    subtitle: "Head Office",
    value: "Delhi, India",
    description: "Face-to-face counselling sessions"
  }
];

export const whyChooseUsFeatures = [
  {
    id: 1,
    title: "Personalized Guidance",
    description: "1-on-1 counselling with expert mentors who understand your career goals",
    benefits: ["Proven results", "Expert verified"],
    icon: "users",
    color: "primary"
  },
  {
    id: 2,
    title: "100% Verified Information",
    description: "All college data and admission details verified by our expert team",
    benefits: ["Proven results", "Expert verified"],
    icon: "shield",
    color: "secondary"
  },
  {
    id: 3,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your admission queries",
    benefits: ["Proven results", "Expert verified"],
    icon: "clock",
    color: "primary"
  },
  {
    id: 4,
    title: "98% Success Rate",
    description: "Highest admission success rate in the industry with proven track record",
    benefits: ["Proven results", "Expert verified"],
    icon: "trendingUp",
    color: "secondary"
  },
  {
    id: 5,
    title: "Complete Application Help",
    description: "From form filling to document preparation, we handle everything",
    benefits: ["Proven results", "Expert verified"],
    icon: "bookOpen",
    color: "primary"
  },
  {
    id: 6,
    title: "Dedicated Support Manager",
    description: "Single point of contact for all your admission needs",
    benefits: ["Proven results", "Expert verified"],
    icon: "headphones",
    color: "secondary"
  }
];

export const benefits = [
  "Save 40+ hours of research time",
  "Avoid common admission mistakes", 
  "Get access to exclusive college networks",
  "Expert essay and SOP guidance",
  "Scholarship and financial aid assistance",
  "Visa and accommodation support"
];

export const stats = [
  { id: 1, number: "15+", label: "Years of Experience" },
  { id: 2, number: "50+", label: "Expert Counsellors" },
  { id: 3, number: "200+", label: "Partner Universities" },
  { id: 4, number: "4.9/5", label: "Student Rating" }
];

export const faqData = [
  { 
    id: 1,
    category: "General", 
    question: "How does GetAdmissionInfo help?", 
    answer: "We provide end-to-end support from shortlisting to final admission." 
  },
  { 
    id: 2,
    category: "Pricing", 
    question: "Is your service free?", 
    answer: "Yes! Basic guidance is free. Premium services like visa aid may have fees." 
  },
  { 
    id: 3,
    category: "Colleges", 
    question: "Which colleges do you work with?", 
    answer: "850+ top universities including IITs, NITs, and IIMs." 
  },
  { 
    id: 4,
    category: "Process", 
    question: "How quickly can I get help?", 
    answer: "We assign a personal counsellor within 24 hours of registration." 
  },
  { 
    id: 5,
    category: "Documents", 
    question: "What documents are needed?", 
    answer: "Mark sheets, ID proof, entrance scores, and photographs." 
  },
  { 
    id: 6,
    category: "Financial", 
    question: "Do you help with scholarships?", 
    answer: "Yes, we guide you through merit and need-based scholarship applications." 
  },
  { 
    id: 7,
    category: "Results", 
    question: "What is your success rate?", 
    answer: "98% success rate with 25,000+ happy students placed." 
  },
  { 
    id: 8,
    category: "Guidance", 
    question: "Confused about which course?", 
    answer: "We use psychometric tests to find the best career fit for you." 
  }
];

export type TeamMember = typeof teamMembers[0];
export type CoreValue = typeof coreValues[0];
export type Achievement = typeof achievements[0];
export type ContactMethod = typeof contactMethods[0];
export type WhyChooseFeature = typeof whyChooseUsFeatures[0];
export type FAQ = typeof faqData[0];
