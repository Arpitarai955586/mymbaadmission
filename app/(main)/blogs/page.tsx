"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { Search, Filter, Calendar, Clock, User, ChevronRight, Heart, MessageCircle, Share2, Bookmark, TrendingUp } from 'lucide-react';
import { siteIdentity } from '../config/site';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { themeColors, colorCombos, themeClasses } from '../../config/theme';
import { BlogPost, getPublishedBlogs, getTrendingBlogs, getBlogsByCategory, getUniqueCategories } from '../../config/blogs';

const BlogsPageContent = () => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams?.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams?.get('category') || 'all');
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>([]);
  const [trendingBlogs, setTrendingBlogs] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Get all published blogs
    const published = getPublishedBlogs();
    const trending = getTrendingBlogs(3);
    const cats = ['all', ...getUniqueCategories()];

    // Filter blogs based on search and category
    let filtered = published;
    
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = getBlogsByCategory(selectedCategory);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredBlogs(filtered);
    setTrendingBlogs(trending);
    setCategories(cats);
  }, [searchTerm, selectedCategory]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
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
              Expert guidance, exam tips, and career advice to help you succeed in your academic journey
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
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
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
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-[#1E40AF]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1E40AF] focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-gray-600">
              Found <span className="font-bold text-[#1E40AF]">{filteredBlogs.length}</span> blogs
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
              <h2 className="text-2xl font-bold text-[#1A1A1B]">Trending Blogs</h2>
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
          
          {filteredBlogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.map((blog) => (
                <Link key={blog.blog_id} href={`/blogs/${blog.slug}`}>
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer group">
                    {/* Blog Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.featured_image || '/blogs/default-blog.jpg'}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#1E40AF] text-white text-xs font-bold rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="p-6 space-y-4">
                      <h3 className="text-xl font-bold text-[#1A1A1B] line-clamp-2 group-hover:text-[#1E40AF] transition-colors">
                        {blog.title}
                      </h3>
                      
                      <p className="text-gray-600 text-sm line-clamp-3">
                        {blog.excerpt}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-[#F8F9F9] text-[#1E40AF] text-xs font-medium rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>


                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#1E40AF]/10">
              <div className="w-20 h-20 bg-[#F8F9F9] rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">No blogs found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search terms or filters
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
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
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: themeColors.background }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4" style={{ borderBottomColor: themeColors.primary }}></div>
          <p className="text-gray-500">Loading blogs...</p>
        </div>
      </div>
    }>
      <BlogsPageContent />
    </Suspense>
  );
};

export default BlogsPage;