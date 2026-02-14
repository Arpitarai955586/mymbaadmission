"use client";
import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Calendar, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  body: string;
  type?: string;
  created_by?: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  image?: string;
  excerpt?: string;
  publishedDate?: string;
  views?: number;
  featured_image?: string;
  category?: string;
  readTime?: string;
}

// const blogPosts: Blog[] = [
//   { id: 1, title: "Top MBA Colleges in Ahmedabad 2025: Ranking and Fees", excerpt: "Top MBA Colleges in Ahmedabad: Pursuing an MBA from Ahmedabad means taking placement...", publishedDate: "19 Jul 2025", views: 921, image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=400&auto=format&fit=crop", slug: "mba-ahmedabad" },
//   { id: 2, title: "Top MBA College in Tamil Nadu 2025: Admission, Ranking &", excerpt: "Top MBA College in Tamil Nadu 2025: In Tamil Nadu, there are almost 600 colleges, and out...", publishedDate: "18 Jul 2025", views: 731, image: "https://images.unsplash.com/photo-1523050853064-85a201460596?q=80&w=400&auto=format&fit=crop", slug: "mba-tamil-nadu" },
//   { id: 3, title: "Top MBA Colleges in Indore 2025: Placements, Fees &", excerpt: "Top MBA Colleges in Indore 2025: Indore has approximately 130+ MBA colleges in total, alon...", publishedDate: "17 Jul 2025", views: 818, image: "https://images.unsplash.com/photo-1541339907198-e08759dfc3ef?q=80&w=400&auto=format&fit=crop", slug: "mba-indore" },
//   { id: 4, title: "Top MBA colleges in Maharashtra 2025: Ranking,", excerpt: "Top MBA Colleges in Maharashtra: There are over 780+ MBA colleges in Maharashtra, with aro...", publishedDate: "14 Jul 2025", views: 990, image: "https://images.unsplash.com/photo-1592280771190-3e2e4d571952?q=80&w=400&auto=format&fit=crop", slug: "mba-maharashtra" },
//   { id: 5, title: "Best Engineering Colleges 2026: Entrance Exams & Dates", excerpt: "Planning for Engineering? Here are the top entrance exams you need to clear this year...", publishedDate: "20 Jul 2025", views: 1240, image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?q=80&w=400&auto=format&fit=crop", slug: "engineering-2026" }
// ];

const LatestBlogs = () => {
  const [blogPosts, setBlogPosts] = useState<Blog[]>([]);

  // 1. Initialize Embla for Blogs
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", skipSnaps: false },
    [Autoplay({ delay: 5000, stopOnInteraction: false })],
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs"); // 👈 also fixed (see Issue 2)
        const data = await res.json();

        if (data.success && Array.isArray(data.blogs)) {
          setBlogPosts(data.blogs);
        } else {
          setBlogPosts([]);
        }
      } catch (err) {
        console.error("Failed to fetch blogs", err);
        setBlogPosts([]);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 bg-white">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-bold text-[#1A1A1B] mb-4">Latest Blogs</h2>
        <button className="bg-[#002147] hover:bg-[#003366] text-white text-xs font-bold py-2 px-6 rounded-md transition-colors">
          View All
        </button>
      </div>

      {/* Slider Container */}
      <div className="relative group">
        {/* Navigation Arrows */}
        <button
          onClick={scrollPrev}
          className="absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#922B21] shadow-lg p-3 rounded-full hidden md:flex hover:bg-[#F8F9F9] transition-all active:scale-90"
        >
          <ChevronLeft className="w-5 h-5 text-[#1A1A1B]" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white border border-[#922B21] shadow-lg p-3 rounded-full hidden md:flex hover:bg-[#F8F9F9] transition-all active:scale-90"
        >
          <ChevronRight className="w-5 h-5 text-[#1A1A1B]" />
        </button>

        {/* Viewport Wrapper */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {blogPosts.map((blog) => (
              <div
                key={blog._id}
                className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_25%] px-3 py-2"
              >
                <div className="h-full bg-white rounded-2xl overflow-hidden border border-[#922B21]/10 shadow-sm hover:shadow-md transition-all flex flex-col">
                  {/* Image Header */}
                  <div className="relative h-44 w-full overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                    <img
                      src={
                        blog.featured_image ||
                        blog.image ||
                        "https://via.placeholder.com/400x300?text=No+Image"
                      }
                      alt={blog.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute bottom-3 right-3 bg-[#922B21] text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md">
                      BLOG
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-sm font-bold text-[#1A1A1B] leading-snug mb-3 line-clamp-2 min-h-[40px]">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-[#2C3E50] line-clamp-3 mb-4 flex-grow">
                      {blog.body || blog.excerpt}
                    </p>

                    {/* Meta: Date */}
                    <div className="flex items-center gap-2 text-[#2C3E50] mb-4">
                      <div className="bg-[#922B21] p-1 rounded">
                        <Calendar className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-[11px] font-semibold">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </span>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between border-t border-gray-50 pt-4 mt-auto">
                      {/* <div className="flex items-center gap-1.5 text-gray-600">
                        <Eye className="w-4 h-4" />
                        <span className="text-xs font-bold">{blog.views}</span>
                      </div> */}
                      <Link href={`/blogs/${blog.slug}`}>
                        <button className="bg-[#922B21] hover:bg-[#7A2318] text-white text-[10px] font-bold py-2 px-4 rounded-full flex items-center gap-1 transition-colors">
                          Read More <span>»</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogs;
