"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  ChevronRight,
  Home,
  Search,
  TrendingUp,
  Calendar,
  Clock,
  Eye,
  Share2,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
} from "lucide-react";
import {
  BlogPost,
  getBlogBySlug,
  getTrendingBlogs,
} from "../../../config/blogs";
import Link from "next/link";

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

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [trendingBlogs, setTrendingBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/slug/${slug}`);
        const data = await res.json();
        if (data.success && data.blog) {
          setPost(mapApiBlogToPost(data.blog));
          setTrendingBlogs(getTrendingBlogs(3));
          setLoading(false);
          return;
        }
        const fromConfig = getBlogBySlug(slug || "");
        setPost(fromConfig || null);
        setTrendingBlogs(getTrendingBlogs(3));
      } catch (err) {
        console.error("Failed to fetch blog", err);
        const fromConfig = getBlogBySlug(slug || "");
        setPost(fromConfig || null);
        setTrendingBlogs(getTrendingBlogs(3));
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  const handleCopyLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post?.title || "Check out this blog";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9F9] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1E40AF] mx-auto mb-4" />
          <p className="text-gray-500">Loading blog...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#F8F9F9] pb-12 text-[#2C3E50] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#F8F9F9] rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-gray-400" size={32} />
          </div>
          <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">
            Blog post not found
          </h3>
          <p className="text-gray-600 mb-4">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/blogs"
            className="px-6 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] transition-colors"
          >
            Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9F9]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href="/"
              className="text-gray-500 hover:text-[#1E40AF] transition-colors"
            >
              <Home size={16} />
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <Link
              href="/blogs"
              className="text-gray-500 hover:text-[#1E40AF] transition-colors"
            >
              Blogs
            </Link>
            <ChevronRight size={16} className="text-gray-400" />
            <span className="text-gray-900 font-medium truncate max-w-xs">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <article className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Header Image */}
              <div className="relative h-64 md:h-80 overflow-hidden group">
                <img
                  src={post.featured_image || "/blogs/default-blog.jpg"}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#1E40AF] text-white text-xs font-bold rounded-full">
                    {post.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                    {post.title}
                  </h1>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-6 md:p-8">
                {/* Meta Info - Enhanced */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 text-[#2C3E50]">
                      <Calendar size={18} className="text-[#1E40AF]" />
                      <span className="font-semibold text-sm">
                        {formatDate(post.created_at)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#2C3E50]">
                      <Clock size={18} className="text-[#1E40AF]" />
                      <span className="font-semibold text-sm">
                        {post.readTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[#2C3E50]">
                      <Eye size={18} className="text-[#1E40AF]" />
                      <span className="font-semibold text-sm">
                        {post.views} views
                      </span>
                    </div>
                  </div>
                </div>

                {/* Blog Body */}
                <div className="prose prose-lg max-w-none mb-8">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {post.body}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mb-8 pb-8 border-b border-gray-200 flex flex-wrap gap-4">
                  <button
                    onClick={() => setShowShare(!showShare)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#E8EFF7] text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white rounded-lg transition-colors font-semibold"
                  >
                    <Share2 size={18} />
                    Share
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-[#F8F9F9] text-[#1E40AF] hover:bg-[#1E40AF] hover:text-white rounded-lg transition-colors font-semibold border border-[#1E40AF]/20">
                    <Bookmark size={18} />
                    Save
                  </button>
                </div>

                {/* Share Options */}
                {showShare && (
                  <div className="mb-8 p-6 bg-gradient-to-r from-[#E8EFF7] to-[#F0F5FB] rounded-xl border border-[#1E40AF]/20">
                    <h3 className="font-bold text-[#1A1A1B] mb-4">
                      Share this article
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-4">
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#1877F2] text-white rounded-lg hover:opacity-80 transition-opacity"
                      >
                        <Facebook size={18} />
                        Facebook
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white rounded-lg hover:opacity-80 transition-opacity"
                      >
                        <Twitter size={18} />
                        Twitter
                      </a>
                      <a
                        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white rounded-lg hover:opacity-80 transition-opacity"
                      >
                        <Linkedin size={18} />
                        LinkedIn
                      </a>
                      <button
                        onClick={handleCopyLink}
                        className="flex items-center gap-2 px-4 py-2 bg-[#1E40AF] text-white rounded-lg hover:bg-[#1E3A8A] transition-colors"
                      >
                        <LinkIcon size={18} />
                        {copied ? "Copied!" : "Copy Link"}
                      </button>
                    </div>
                  </div>
                )}

                {/* Tags */}
                <div className="mb-8">
                  <div className="flex flex-wrap gap-2">
                    {(post.tags || []).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[#F8F9F9] text-[#1E40AF] text-sm font-medium rounded-full hover:bg-[#E8EFF7] transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Trending Blogs */}
            {trendingBlogs.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <div className="flex items-center gap-2 mb-6">
                  <TrendingUp className="text-[#F97316]" size={20} />
                  <h3 className="text-lg font-bold text-[#1A1A1B]">
                    Trending Blogs
                  </h3>
                </div>
                <div className="space-y-4">
                  {trendingBlogs.map((blog) => (
                    <Link key={blog.blog_id} href={`/blogs/${blog.slug}`}>
                      <div className="group py-[20px] cursor-pointer">
                        <div className="flex gap-3">
                          <img
                            src={
                              blog.featured_image || "/blogs/default-blog.jpg"
                            }
                            alt={blog.title}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0 group-hover:opacity-80 transition-opacity"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-[#1A1A1B] line-clamp-2 group-hover:text-[#1E40AF] transition-colors">
                              {blog.title}
                            </h4>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="px-2 py-0.5 bg-[#F97316] text-white text-xs font-bold rounded-full">
                                TRENDING
                              </span>
                              <span className="text-xs text-gray-500">
                                {blog.readTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-[#1A1A1B] mb-4">
                Categories
              </h3>
              <div className="space-y-2">
                <Link
                  href="/blogs?category=Exam Preparation"
                  className="block px-3 py-2 rounded-lg hover:bg-[#F8F9F9] text-gray-700 hover:text-[#1E40AF] transition-colors"
                >
                  Exam Preparation
                </Link>
                <Link
                  href="/blogs?category=Career Guidance"
                  className="block px-3 py-2 rounded-lg hover:bg-[#F8F9F9] text-gray-700 hover:text-[#1E40AF] transition-colors"
                >
                  Career Guidance
                </Link>
                <Link
                  href="/blogs?category=College Rankings"
                  className="block px-3 py-2 rounded-lg hover:bg-[#F8F9F9] text-gray-700 hover:text-[#1E40AF] transition-colors"
                >
                  College Rankings
                </Link>
                <Link
                  href="/blogs?category=Interview Preparation"
                  className="block px-3 py-2 rounded-lg hover:bg-[#F8F9F9] text-gray-700 hover:text-[#1E40AF] transition-colors"
                >
                  Interview Preparation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  title,
  date,
  img,
}: {
  title: string;
  date: string;
  img: string;
}) {
  return (
    <div className="flex gap-4 group cursor-pointer">
      <img
        src={img}
        alt=""
        className="w-20 h-16 rounded-lg object-cover border border-gray-100 group-hover:opacity-80 transition-opacity"
      />
      <div className="flex flex-col justify-center">
        <h4 className="text-sm font-bold leading-snug group-hover:text-[#922B21] transition-colors line-clamp-2">
          {title}
        </h4>
        <span className="text-xs text-gray-400 mt-1">{date} • Latest News</span>
      </div>
    </div>
  );
}
