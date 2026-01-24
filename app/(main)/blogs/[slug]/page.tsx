"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
    Calendar,
    ChevronRight,
    Home,
    Search,
    TrendingUp
} from 'lucide-react';
import { BlogPost, getBlogBySlug, getPublishedBlogs, getTrendingBlogs } from '../../../config/blogs';
import Link from 'next/link';

// This would typically come from your data file or a database

export default function BlogPostPage() {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [trendingBlogs, setTrendingBlogs] = useState<BlogPost[]>([]);

    useEffect(() => {
        // Get the specific blog post by slug
        const blogPost = getBlogBySlug(slug || '');
        setPost(blogPost || null);
        
        // Get trending blogs for sidebar
        const trending = getTrendingBlogs(3);
        setTrendingBlogs(trending);
    }, [slug]);

    if (!post) {
        return (
            <div className="min-h-screen bg-[#F8F9F9] pb-12 text-[#2C3E50] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-20 h-20 bg-[#F8F9F9] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="text-gray-400" size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-[#1A1A1B] mb-2">Blog post not found</h3>
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

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    return (
        <div className="min-h-screen bg-[#F8F9F9]">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/" className="text-gray-500 hover:text-[#1E40AF] transition-colors">
                            <Home size={16} />
                        </Link>
                        <ChevronRight size={16} className="text-gray-400" />
                        <Link href="/blogs" className="text-gray-500 hover:text-[#1E40AF] transition-colors">
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
                            <div className="relative h-64 md:h-80 overflow-hidden">
                                <img
                                    src={post.featured_image || "/blogs/default-blog.jpg"}
                                    alt={post.title}
                                    className="w-full h-full object-cover"
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
                                {/* Meta Info */}
                                <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">{formatDate(post.created_at)}</p>
                                        <p className="text-sm text-gray-500">{post.readTime}</p>
                                    </div>
                                </div>

                                {/* Blog Body */}
                                <div className="prose prose-lg max-w-none">
                                    <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                                        {post.body}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-[#F8F9F9] text-[#1E40AF] text-sm font-medium rounded-full"
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
                                    <h3 className="text-lg font-bold text-[#1A1A1B]">Trending Blogs</h3>
                                </div>
                                <div className="space-y-4">
                                    {trendingBlogs.map((blog) => (
                                        <Link key={blog.blog_id} href={`/blogs/${blog.slug}`}>
                                            <div className="group py-[20px] cursor-pointer">
                                                <div className="flex gap-3">
                                                    <img
                                                        src={blog.featured_image || "/blogs/default-blog.jpg"}
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
                                                            <span className="text-xs text-gray-500">{blog.readTime}</span>
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
                            <h3 className="text-lg font-bold text-[#1A1A1B] mb-4">Categories</h3>
                            <div className="space-y-2">
                                <Link href="/blogs?category=Exam Preparation" className="block px-3 py-2 rounded-lg hover:bg-[#F8F9F9] text-gray-700 hover:text-[#1E40AF] transition-colors">
                                    Exam Preparation
                                </Link>
                                <Link href="/blogs?category=Career Guidance" className="block px-3 py-2 rounded-lg hover:bg-[#F8F9F9] text-gray-700 hover:text-[#1E40AF] transition-colors">
                                    Career Guidance
                                </Link>
                                <Link href="/blogs?category=College Rankings" className="block px-3 py-2 rounded-lg hover:bg-[#F8F9F9] text-gray-700 hover:text-[#1E40AF] transition-colors">
                                    College Rankings
                                </Link>
                                <Link href="/blogs?category=Interview Preparation" className="block px-3 py-2 rounded-lg hover:bg-[#F8F9F9] text-gray-700 hover:text-[#1E40AF] transition-colors">
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

function SidebarItem({ title, date, img }: { title: string; date: string; img: string }) {
    return (
        <div className="flex gap-4 group cursor-pointer">
            <img src={img} alt="" className="w-20 h-16 rounded-lg object-cover border border-gray-100 group-hover:opacity-80 transition-opacity" />
            <div className="flex flex-col justify-center">
                <h4 className="text-sm font-bold leading-snug group-hover:text-[#922B21] transition-colors line-clamp-2">
                    {title}
                </h4>
                <span className="text-xs text-gray-400 mt-1">{date} • Latest News</span>
            </div>
        </div>
    );
}
