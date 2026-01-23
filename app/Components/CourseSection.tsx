import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CourseCardProps {
  title: string;
  description: string;
  image: string;
  predictorName: string;
  href: string;
}

const CourseCard = ({ title, description, image, predictorName, href }: CourseCardProps) => (
  <div className="relative group overflow-hidden rounded-[2rem] shadow-xl h-[500px] w-full bg-[#1A1A1B]">
    {/* Background Image */}
    <Image 
      src={image} 
      alt={title}
      fill
      className="object-cover transition-transform duration-500 group-hover:scale-105"
    />
    
    {/* Dark Overlay with Content */}
    <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1B]/90 via-[#1A1A1B]/40 to-transparent flex flex-col justify-end p-6">
      <div className="space-y-2 mb-6">
        <h3 className="text-white text-2xl font-bold">{title}</h3>
        <p className="text-gray-200 text-sm leading-snug">
          {description}
        </p>
      </div>

      {/* Buttons */}
      <div className="space-y-3">
        <Link 
          href={href}
          className="block w-full bg-white text-[#1A1A1B] py-2.5 rounded-xl font-semibold text-sm hover:bg-[#F8F9F9] transition-colors border border-[#922B21]/20 text-center"
        >
          Explore Exams
        </Link>
        <button className="w-full bg-[#D4AC0D] text-[#1A1A1B] py-2.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#922B21] hover:text-white transition-colors">
          {predictorName} Rank Predictor
          <span className="bg-[#922B21] text-white text-[10px] px-1.5 py-0.5 rounded italic">NEW</span>
        </button>
      </div>
    </div>
  </div>
);

const CourseSection = () => {
  const courses = [
    {
      title: "Engineering",
      description: "Explore best paths to build your future in tech.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg", // Replace with your engineering img
      predictorName: "JEE",
      href: "/engineering"
    },
    {
      title: "Medical Sciences",
      description: "Guidance to secure seats in leading medical colleges.",
      image: "https://images.pexels.com/photos/3985170/pexels-photo-3985170.jpeg", // Replace with your doctor img
      predictorName: "NEET",
      href: "/medical"
    },
    {
      title: "Management Studies",
      description: "Explore best paths to build your future in management.",
      image: "https://images.pexels.com/photos/7129713/pexels-photo-7129713.jpeg", // Replace with your business img
      predictorName: "CAT",
      href: "/management"
    }
  ];

  return (
    <section className="bg-[#F8F9F9] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Text */}
        <div className="text-center mb-12 space-y-2">
          <h2 className="text-4xl font-extrabold text-[#1A1A1B]">Explore Top Courses</h2>
          <p className="text-[#2C3E50] font-medium">
            Get guidance, rankings, and tools to choose the right college & course for your career.
          </p>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={index} {...course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;