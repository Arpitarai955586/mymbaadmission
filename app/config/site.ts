export const siteIdentity = {
  name: "MyMbaAdmission",
  tagline: "Search • Explore • Achieve",
  description: "Get expert guidance for MBA admissions. Search colleges, compare courses, and get personalized counseling for your dream career.",
  logo: "/logo.jpg",
  colors: {
    primary: "#922B21",      // Brand color for CTAs, headers, icons
    secondary: "#ffffffff",    // Footer, headings, bold text
    accent: "#D4AC0D",       // Highlights, "Apply Now" buttons, star icons
    background: "#F8F9F9",   // Main page sections (off-white)
    text: "#2C3E50",         // Body paragraphs for high readability
  },
  contact: {
    // Updated with the new contact numbers
    phone: ["+91 6239311536"],
    email: "info@mbaadmission.in",
    // Added the new office address
    address: "Third Floor, US Complex Jasola Opp Apollo Hospital, New Delhi, Delhi, India - 110076"
  },
  social: {
    facebook: "Facebook",
    twitter: "Twitter"
  },
  seo: {
    title: "My MBA Admission - College Admission Guidance",
    description: "Get expert guidance for MBA admissions. Search colleges, compare courses, and get personalized counseling for your dream career."
  }
};

export type SiteIdentity = typeof siteIdentity;