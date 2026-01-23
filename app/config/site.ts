import { themeColors } from './theme';

export const siteIdentity = {
  name: "MyMbaAdmission",
  tagline: "Search • Explore • Achieve",
  description: "Get expert guidance for MBA admissions. Search colleges, compare courses, and get personalized counseling for your dream career.",
  logo: "/logo.png",
  colors: themeColors,
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