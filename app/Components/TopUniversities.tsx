"use client";

import React, { useState,useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useModal } from '../Context/ModalContext';

interface University {
  _id: string;
  name: string;
  slug: string;
  location: string;
  type: string;
  overview: string;
  fees: string;
  admission_process: string;
  is_active: boolean;
  image: string;
  image_url: string;
  images: string[];
  tags: string[];
  status: string;
  created_by: string;
  createdAt: string;
  updatedAt: string;
}

// const universities: University[] = [
//   {
//     id: 1,
//     name: "DTU",
//     description: "Top-ranked technical university known for innovation and strong placements.",
//     logo: "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg",
//     tag: "Top 10",
//     tagColor: "bg-[#922B21]"
//   },
//   {
//     id: 2,
//     name: "Amity University",
//     description: "Renowned private university offering industry-focused engineering programs.",
//     logo: "https://images.pexels.com/photos/159711/library-la-trobe-university-architecture-building-159711.jpeg",
//     tag: "Featured",
//     tagColor: "bg-[#D4AC0D]"
//   },
//   {
//     id: 3,
//     name: "Galgotias University",
//     description: "Popular choice for engineering with strong academics and placement support.",
//     logo: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg",
//     tag: "Recommended",
//     tagColor: "bg-[#1A1A1B]"
//   },
//   {
//     id: 4,
//     name: "Bharati Vidyapeeth",
//     description: "Known for research-driven programs and excellent engineering facilities.",
//     logo: "https://images.pexels.com/photos/207684/pexels-photo-207684.jpeg",
//     tag: "Top 10",
//     tagColor: "bg-[#922B21]"
//   },
//   {
//     id: 5,
//     name: "Sharda University",
//     description: "Global standard of education with multi-disciplinary engineering courses.",
//     logo: "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg",
//     tag: "Featured",
//     tagColor: "bg-[#D4AC0D]"
//   },
//   {
//     id: 6,
//     name: "LPU",
//     description: "One of the largest private universities with vast campus and placement records.",
//     logo: "https://images.pexels.com/photos/356065/pexels-photo-356065.jpeg",
//     tag: "Recommended",
//     tagColor: "bg-[#1A1A1B]"
//   }
// ];

const TopUniversities = () => {
  const [activeTab, setActiveTab] = useState("Engineering");
  const [universities,setUniversities] = React.useState<University[] >([]);
  const [displayCount, setDisplayCount] = useState(4);
  const { openModal } = useModal();
  
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const res = await fetch("/api/colleges")
        const data = await res.json()

        if (data.success && Array.isArray(data.colleges)) {
          setUniversities(
            data.colleges.map((college: any) => ({
              _id: college._id,
              name: college.name,
              slug: college.slug,
              location: college.location || "India",
              type: college.type || "Private",
              overview: college.overview ? college.overview.substring(0, 100) + "..." : "No overview available",
              fees: college.fees || "TBD",
              admission_process: college.admission_process || "TBD",
              is_active: college.is_active,
              image: college.image || "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg",
              image_url: college.image_url || college.image || "https://images.pexels.com/photos/256490/pexels-photo-256490.jpeg",
              images: college.images || [],
              tags: college.tags || [],
              status: college.status || "Active",
              created_by: college.created_by,
              createdAt: college.createdAt,
              updatedAt: college.updatedAt
            }))
          )
        } else {
          setUniversities([])
        }
      } catch (error) {
        console.error("Failed to fetch universities:", error)
        setUniversities([])
      }
    }

    fetchUniversities()
  }, [])

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 8);
  };

  const displayedUniversities = universities.slice(0, displayCount);
  const hasMore = universities.length > displayCount;

  return (
    <section className="bg-[#F8F9F9] py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-[#1A1A1B] mb-3">
            Top Universities / Colleges in India
          </h2>
          <p className="text-[#2C3E50] max-w-4xl text-sm leading-relaxed">
            Explore India's top-ranked institutions offering exceptional academic programs, modern infrastructure, and strong placement opportunities across various fields such as engineering, management, and medical sciences.
          </p>
        </div>

        {/* Filter Tabs */}
        {/* <div className="flex gap-3 mb-10">
          {["Engineering", "Management", "Medical"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2 rounded-full text-sm font-bold transition-all ${
                activeTab === tab
                  ? "bg-[#922B21] text-white shadow-lg"
                  : "bg-[#F8F9F9] text-[#2C3E50] border border-[#922B21]/30 hover:bg-[#922B21] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div> */}

        {/* Grid Layout - 3-4 Colleges Initially */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedUniversities.map((uni) => (
            <div 
              key={uni._id} 
              className="bg-white rounded-xl shadow-sm border border-[#922B21]/10 overflow-hidden hover:shadow-md transition-all"
            >
              {/* College Image */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={uni.image_url}
                  alt={uni.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span className="bg-[#D4AC0D] text-white text-[10px] font-bold px-2 py-1 rounded-md">
                    {uni.type}
                  </span>
                </div>
              </div>

              {/* College Info */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-[#1A1A1B] mb-1">{uni.name}</h3>
                <p className="text-xs text-[#D4AC0D] font-semibold mb-2">{uni.location}</p>
                <p className="text-sm text-[#2C3E50] mb-4 line-clamp-2">{uni.overview}</p>
                
                <div className="flex gap-2">
                  <button 
                    onClick={openModal}
                    className="flex-1 bg-[#922B21] text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-[#7A2318] transition-colors"
                  >
                    Apply Now
                  </button>
                  <Link 
                    href={`/colleges/${uni.slug}`}
                    className="flex-1 border border-[#1E40AF] text-[#1E40AF] px-3 py-2 rounded-lg text-sm font-bold hover:bg-[#1E40AF] hover:text-white transition-colors text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center mt-12">
            <button
              onClick={handleLoadMore}
              className="px-8 py-3 bg-[#922B21] text-white font-bold rounded-lg hover:bg-[#7A231A] transition-colors duration-200 transform hover:scale-105"
            >
              Load More Colleges
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopUniversities;
