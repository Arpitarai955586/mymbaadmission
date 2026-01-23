"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Search, Filter, Calendar, Clock, User, ChevronRight, Heart, MessageCircle, Share2, Bookmark, TrendingUp } from 'lucide-react';
import { siteIdentity } from '../config/site';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  body: string;
  type: string;
  created_by: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  image?: string;
  // Legacy fields for UI compatibility
  excerpt?: string;
  author?: {
    name: string;
    avatar: string;
    role: string;
  };
  category?: string;
  tags?: string[];
  readTime?: string;
  date?: string;
  likes?: number;
  comments?: number;
  featured?: boolean;
  trending?: boolean;
}

// const blogPosts: BlogPost[] = [
//   {
//     id: 1,
//     title: "Complete Guide to JEE Main 2026: Eligibility, Pattern & Preparation Tips",
//     slug: "complete-guide-to-jee-main-2026-eligibility-pattern-preparation-tips",
//     excerpt: "Everything you need to know about JEE Main 2026 examination including eligibility criteria, exam pattern, syllabus, and expert preparation strategies to secure your seat in top engineering colleges.",
//     author: {
//       name: "Dr. Rajesh Kumar",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
//       role: "Education Expert"
//     },
//     category: "Engineering",
//     tags: ["JEE Main", "Engineering", "Preparation"],
//     readTime: "8 min read",
//     date: "Jan 15, 2026",
//     likes: 245,
//     comments: 32,
//     featured: true,
//     trending: true,
//     image: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg"
//   },
//   {
//     id: 2,
//     title: "NEET UG 2026: Latest Updates and Preparation Strategy",
//     slug: "neet-ug-2026-latest-updates-and-preparation-strategy",
//     excerpt: "Stay updated with the latest changes in NEET UG 2026 examination pattern, important dates, and proven preparation strategies recommended by toppers and medical education experts.",
//     author: {
//       name: "Dr. Priya Sharma",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
//       role: "Medical Counselor"
//     },
//     category: "Medical",
//     tags: ["NEET", "Medical", "Strategy"],
//     readTime: "6 min read",
//     date: "Jan 14, 2026",
//     likes: 189,
//     comments: 28,
//     featured: true,
//     trending: false,
//     image: "https://images.pexels.com/photos/3938022/pexels-photo-3938022.jpeg"
//   },
//   {
//     id: 3,
//     title: "CAT 2025: Section-wise Preparation Tips for 99+ Percentile",
//     slug: "cat-2025-section-wise-preparation-tips-for-99-percentile",
//     excerpt: "Expert strategies to crack CAT 2025 with detailed section-wise preparation tips, time management techniques, and recommended study resources for MBA aspirants.",
//     author: {
//       name: "Prof. Amit Verma",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Amit",
//       role: "MBA Expert"
//     },
//     category: "Management",
//     tags: ["CAT", "MBA", "Preparation"],
//     readTime: "10 min read",
//     date: "Jan 13, 2026",
//     likes: 156,
//     comments: 19,
//     featured: false,
//     trending: true,
//     image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
//   },
//   {
//     id: 4,
//     title: "Top Engineering Colleges in India 2026: NIRF Rankings",
//     slug: "top-engineering-colleges-in-india-2026-nirf-rankings",
//     excerpt: "Complete list of top engineering colleges in India based on NIRF 2026 rankings, with detailed information about placement records, cutoffs, and admission process.",
//     author: {
//       name: "Anjali Nair",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjali",
//       role: "Education Writer"
//     },
//     category: "College",
//     tags: ["Colleges", "Rankings", "Engineering"],
//     readTime: "12 min read",
//     date: "Jan 12, 2026",
//     likes: 203,
//     comments: 41,
//     featured: false,
//     trending: false,
//     image: "https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg"
//   },
//   {
//     id: 5,
//     title: "GATE 2026: Complete Syllabus and Study Plan",
//     slug: "gate-2026-complete-syllabus-and-study-plan",
//     excerpt: "Comprehensive guide to GATE 2026 syllabus for all branches, recommended study materials, and month-wise preparation plan for high scores.",
//     author: {
//       name: "Dr. Suresh Reddy",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh",
//       role: "Technical Expert"
//     },
//     category: "Engineering",
//     tags: ["GATE", "Syllabus", "Study Plan"],
//     readTime: "15 min read",
//     date: "Jan 11, 2026",
//     likes: 134,
//     comments: 22,
//     featured: false,
//     trending: false,
//     image: "https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg"
//   },
//   {
//     id: 6,
//     title: "Career Options After 12th: Science, Commerce & Arts",
//     slug: "career-options-after-12th-science-commerce-and-arts",
//     excerpt: "Explore various career options available after 12th standard in Science, Commerce, and Arts streams with detailed information about courses, colleges, and future prospects.",
//     author: {
//       name: "Rohit Gupta",
//       avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rohit",
//       role: "Career Counselor"
//     },
//     category: "Career",
//     tags: ["Career", "12th", "Guidance"],
//     readTime: "7 min read",
//     date: "Jan 10, 2026",
//     likes: 298,
//     comments: 56,
//     featured: false,
//     trending: true,
//     image: "https://images.pexels.com/photos/3184365/pexels-photo-3184365.jpeg"
//   }
// ];

const categories = ["All", "Engineering", "Medical", "Management", "College", "Career"];
const sortOptions = ["Latest", "Popular", "Trending", "Most Liked"];

function BlogsPageContent() {
  const searchParams = useSearchParams();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Latest");
  const [showFilters, setShowFilters] = useState(false);

  // Update search term when URL params change
  useEffect(() => {
    const searchFromUrl = searchParams.get('search');
    if (searchFromUrl !== null) {
      setSearchTerm(searchFromUrl);
    }
  }, [searchParams]);
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs") // 👈 also fixed (see Issue 2)
        const data = await res.json()

        if (data.success && Array.isArray(data.blogs)) {
          setBlogPosts(data.blogs)
        } else {
          setBlogPosts([])
        }
      } catch (err) {
        console.error("Failed to fetch blogs", err)
        setBlogPosts([])
      }
    }

    fetchBlogs()
  }, [])
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.body || post.excerpt || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (post.tags || []).some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    switch (sortBy) {
      case "Popular":
        return ((b.likes || 0) + (b.comments || 0)) - ((a.likes || 0) + (a.comments || 0));
      case "Trending":
        return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
      case "Most Liked":
        return (b.likes || 0) - (a.likes || 0);
      default: // Latest
        return new Date(b.created_at || b.date || "").getTime() - new Date(a.created_at || a.date || "").getTime();
    }
  });

  const featuredPosts = filteredPosts.filter(post => post.featured);
  const regularPosts = filteredPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-[#F8F9F9]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#922B21] via-[#7A2318] to-[#1A1A1B] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Educational Blog & Resources
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Expert insights, exam preparation guides, career advice, and latest updates
              to help you make informed educational decisions.
            </p>
          </div>


          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-4 text-[#1A1A1B]" size={20} />
              <input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-[#1A1A1B] placeholder-gray-400 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#D4AC0D]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* {/* Filters Section */}


      {/* Regular Posts Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Results Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-[#1A1A1B] mb-2">
              {regularPosts.length} Articles Found
            </h2>
            <p className="text-[#2C3E50]">
              Expert insights and educational resources for your academic journey
            </p>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-xl shadow-sm border border-[#922B21]/10 overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {post.trending && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-[#922B21] text-white text-xs font-bold rounded-full flex items-center gap-1">
                        <TrendingUp size={10} />
                        Trending
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-[#F8F9F9] text-[#922B21] text-xs font-bold rounded-md">
                      {post.category}
                    </span>
                    {/* <div className="flex items-center gap-1 text-[#2C3E50] text-xs">
                      <Clock size={10} />
                      {post.readTime}
                    </div> */}
                  </div>

                  <Link href={`/blogs/${post.slug}`} className="text-lg font-bold text-[#1A1A1B] mb-2 line-clamp-2 group-hover:text-[#922B21] transition-colors">
                    {post.title}
                  </Link>

                  <p className="text-[#2C3E50] text-sm leading-relaxed mb-3 line-clamp-2">
                    {post.body || post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {Array.isArray(post.tags) &&
                      post.tags.slice(0, 2).map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-[#F8F9F9] text-[#2C3E50] text-xs rounded-md"
                        >
                          #{tag}
                        </span>
                      ))}
                  </div>


                  {/* Author & Actions */}
                  <div className="flex items-center justify-between pt-3 border-t border-[#922B21]/10">
                    {/* <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full overflow-hidden">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1A1A1B]">{post.author.name}</p>
                        <p className="text-xs text-[#2C3E50]">{post.date}</p>
                      </div>
                    </div> */}

                    {/* <div className="flex items-center gap-2">
                      <button className="flex items-center gap-1 text-[#2C3E50] hover:text-[#D4AC0D] transition-colors">
                        <Heart size={14} />
                        <span className="text-xs">{post.likes || 0}</span>
                      </button>
                      <button className="text-[#2C3E50] hover:text-[#D4AC0D] transition-colors">
                        <Bookmark size={14} />
                      </button>
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-[#F8F9F9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-[#922B21]" />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">No Articles Found</h3>
              <p className="text-[#2C3E50] mb-4">Try adjusting your search or filters to find what you're looking for.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                  setSortBy("Latest");
                }}
                className="px-6 py-2 bg-[#D4AC0D] hover:bg-[#B8940F] text-white font-bold rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          )}

          {/* Load More */}
          {regularPosts.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 bg-[#922B21] hover:bg-[#7A2318] text-white font-bold rounded-xl transition-colors flex items-center gap-2 mx-auto">
                Load More Articles
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

const BlogsPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8F9F9] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#922B21]"></div>
      </div>
    }>
      <BlogsPageContent />
    </Suspense>
  );
};

export default BlogsPage;