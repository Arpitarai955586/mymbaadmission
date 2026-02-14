"use client";

import React, { useState, useEffect, Suspense } from "react";
import {
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  ChevronRight,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  Grid3x3,
  List,
  Eye,
} from "lucide-react";
import { siteIdentity } from "../config/site";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { themeColors, colorCombos, themeClasses } from "../../config/theme";
import { BlogPost } from "../../config/blogs";

/** Map API blog (DB) to BlogPost shape for UI */
function mapApiBlogToPost(b: any): BlogPost {
  return {
    blog_id: b.blog_id || b._id?.toString?.() || "",
    slug: b.slug || "",
    title: b.title || "",
    excerpt: b.excerpt || "",
    body: b.body || "",
    category: b.category || "General",
    tags: Array.isArray(b.tags) ? b.tags : [],
    created_at: b.created_at || b.createdAt || new Date().toISOString(),
    updated_at: b.updated_at || b.updatedAt || new Date().toISOString(),
    readTime: b.readTime || "5 min read",
    is_published: b.is_published ?? true,
    is_trending: b.is_trending ?? false,
    featured_image: b.featured_image || "",
    views: b.views ?? 0,
    seo: b.seo || { meta_title: "", meta_description: "", keywords: [] },
  };
}

const BlogsPageContent = () => {
  const searchParams = useSearchParams();
  const [blogsFromApi, setBlogsFromApi] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(
    searchParams?.get("search") || "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams?.get("category") || "all",
  );
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [trendingBlogs, setTrendingBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(["all"]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<"latest" | "trending" | "views">(
    "latest",
  );

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/api/blogs?limit=100");
        const data = await response.json();
        if (data.success && Array.isArray(data.blogs)) {
          setBlogsFromApi(data.blogs.map(mapApiBlogToPost));
        } else {
          setBlogsFromApi([]);
        }
      } catch (error) {
        console.error("error fetching blogs:", error);
        setBlogsFromApi([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const published = blogsFromApi.filter((b) => b.is_published !== false);
    const uniqueCats = [
      ...new Set(published.map((b) => b.category).filter(Boolean)),
    ];
    const cats = ["all", ...uniqueCats];
    setCategories(cats);

    let filtered = published;
    if (selectedCategory && selectedCategory !== "all") {
      filtered = published.filter((b) => b.category === selectedCategory);
    }
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (blog) =>
          blog.title.toLowerCase().includes(term) ||
          (blog.excerpt || "").toLowerCase().includes(term) ||
          (blog.tags || []).some((tag) => tag.toLowerCase().includes(term)),
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "trending":
          return (b.views || 0) - (a.views || 0);
        case "views":
          return (b.views || 0) - (a.views || 0);
        case "latest":
        default:
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
      }
    });

    setFilteredBlogs(sorted);

    const trending = published
      .filter((b) => b.is_trending)
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 3);
    setTrendingBlogs(trending);
  }, [blogsFromApi, searchTerm, selectedCategory, sortBy]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F8F9F9]">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1E40AF] via-[#1E3A8A] to-[#1A1A1B] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-[#F97316] px-6 py-3 rounded-full text-sm font-bold tracking-wider border border-[#F97316] mb-4">
              <span className="w-2 h-2 bg-[#F97316] rounded-full animate-pulse" />
              BLOG
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Educational Insights & Resources
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Expert guidance, exam tips, and career advice to help you succeed
              in your academic journey
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search
                className="absolute left-4 top-4 text-[#1A1A1B]"
                size={20}
              />
              <input
                type="text"
                placeholder="Search articles, topics, or authors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-[#1A1A1B] placeholder-gray-400 bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-[#F97316]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-[#1E40AF]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="md:w-48">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-[#1E40AF]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Filter */}
            <div className="md:w-48">
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "latest" | "trending" | "views")
                }
                className="w-full px-4 py-3 border border-[#1E40AF]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
              >
                <option value="latest">Latest</option>
                <option value="trending">Trending</option>
                <option value="views">Most Viewed</option>
              </select>
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 border border-[#1E40AF]/20 rounded-xl p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "grid" ? "bg-[#1E40AF] text-white" : "text-[#1E40AF] hover:bg-[#F8F9F9]"}`}
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg transition-colors ${viewMode === "list" ? "bg-[#1E40AF] text-white" : "text-[#1E40AF] hover:bg-[#F8F9F9]"}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              {loading ? (
                "Loading..."
              ) : (
                <>
                  Found{" "}
                  <span className="font-bold text-[#1E40AF]">
                    {filteredBlogs.length}
                  </span>{" "}
                  blogs
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Trending Blogs */}
      {trendingBlogs.length > 0 && (
        <section className="py-12 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="text-[#F97316]" size={24} />
              <h2 className="text-2xl font-bold text-[#1A1A1B]">
                Trending Blogs
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {trendingBlogs.map((blog) => (
                <Link key={blog.blog_id} href={`/blogs/${blog.slug}`}>
                  <div className="bg-white border border-[#1E40AF]/10 rounded-xl p-6 hover:shadow-lg transition-shadow cursor-pointer group">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="px-3 py-1 bg-[#F97316] text-white text-xs font-bold rounded-full">
                        TRENDING
                      </span>
                      <span className="px-3 py-1 bg-[#F8F9F9] text-[#1E40AF] text-xs font-medium rounded-full">
                        {blog.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-[#1A1A1B] mb-2 line-clamp-2 group-hover:text-[#1E40AF] transition-colors">
                      {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {blog.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Clock size={14} />
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Blogs */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-[#1A1A1B] mb-8">All Blogs</h2>

          {loading ? (
            <div className="text-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E40AF] mx-auto mb-4" />
              <p className="text-gray-500">Loading blogs...</p>
            </div>
          ) : filteredBlogs.length > 0 ? (
            <div
              className={
                viewMode === "grid"
                  ? "grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }
            >
              {filteredBlogs.map((blog) => (
                <Link key={blog.blog_id} href={`/blogs/${blog.slug}`}>
                  {viewMode === "grid" ? (
                    // Grid View
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group h-full flex flex-col">
                      {/* Blog Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={blog.featured_image || "/blogs/default-blog.jpg"}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-[#1E40AF] text-white text-xs font-bold rounded-full">
                            {blog.category}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Blog Content */}
                      <div className="p-6 space-y-4 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold text-[#1A1A1B] line-clamp-2 group-hover:text-[#1E40AF] transition-colors">
                          {blog.title}
                        </h3>

                        <p className="text-gray-600 text-sm line-clamp-3 flex-grow">
                          {blog.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {(blog.tags || []).slice(0, 2).map((tag, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#F8F9F9] text-[#1E40AF] text-xs font-medium rounded text-nowrap"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Meta Info */}
                        <div className="pt-4 border-t border-[#1E40AF]/10 flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-2">
                            <Calendar size={14} />
                            <span>
                              {new Date(blog.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye size={14} />
                            <span>{blog.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List View
                    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group flex">
                      {/* Image */}
                      <div className="w-64 h-40 overflow-hidden flex-shrink-0">
                        <img
                          src={blog.featured_image || "/blogs/default-blog.jpg"}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-grow p-6 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-[#1E40AF] text-white text-xs font-bold rounded-full">
                              {blog.category}
                            </span>
                            {blog.is_trending && (
                              <span className="px-3 py-1 bg-[#F97316] text-white text-xs font-bold rounded-full flex items-center gap-1">
                                <TrendingUp size={12} /> TRENDING
                              </span>
                            )}
                          </div>
                          <h3 className="text-2xl font-bold text-[#1A1A1B] mb-2 group-hover:text-[#1E40AF] transition-colors line-clamp-2">
                            {blog.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {blog.excerpt}
                          </p>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar size={14} />
                              <span>
                                {new Date(blog.created_at).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock size={14} />
                              <span>{blog.readTime}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye size={14} />
                              <span>{blog.views}</span>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-[#1E40AF] text-white rounded-lg font-semibold hover:bg-[#1E3A8A] transition-colors text-sm">
                            Read More
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#1E40AF]/10">
              <div className="w-20 h-20 bg-[#F8F9F9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">
                No blogs found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="px-6 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const BlogsPage = () => {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ backgroundColor: themeColors.background }}
        >
          <div className="text-center">
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
              style={{ borderBottomColor: themeColors.primary }}
            ></div>
            <p className="text-gray-500">Loading blogs...</p>
          </div>
        </div>
      }
    >
      <BlogsPageContent />
    </Suspense>
  );
};

export default BlogsPage;
