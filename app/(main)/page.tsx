import React from 'react'
import HeroSection from '../Components/HeroSection';
import CourseSection from '../Components/CourseSection';
import Achievements from '../Components/Achievements';
import TopExams from '../Components/TopExams';
import ExploreByCity from '../Components/ExploreByCity';
import DreamCollegeCTA from '../Components/DreamCollegeCTA';
import TopUniversities from '../Components/TopUniversities';
import CollegeMatchCard from '../Components/CollegeMatchCard';
import TestimonialsSection from '../Components/Testimonials';
import EducationLinks from '../Components/EducationLinks';
import BlogSection from '../Components/BlogSection';


const page = () => {
  return (
    <div>
      <HeroSection/>
      <TopExams/>
      <DreamCollegeCTA/>
      <TopUniversities/>
      <ExploreByCity/>
      <BlogSection/>
      {/* <CourseSection/> */}
      <Achievements/>
      <CollegeMatchCard/>
      <TestimonialsSection/>
      {/* <EducationLinks/> */}
    </div>
  )
}

export default page;