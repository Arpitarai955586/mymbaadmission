"use client"
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import {
    Calendar,
    ChevronRight,
    Home,
    MessageCircle,
    ThumbsUp,
    Clock,
    User
} from 'lucide-react';
import { BlogPost } from '@/app/Context/BlogContext';

// This would typically come from your data file or a database

export default function BlogPostPage() {

     const { slug } = useParams<{ slug: string }>();
    // const { slug } = await params;
const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])


 useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("/api/blogs");
      const data = await res.json();

      setBlogPosts(
        Array.isArray(data.blogs)
          ? data.blogs.map((post: any) => ({
              ...post,
              tags: Array.isArray(post.tags) ? post.tags : [],
            }))
          : []
      );
    };

    fetchBlogs();
  }, []);


    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        return (
            <div className="min-h-screen bg-[#F8F9F9] pb-12 text-[#2C3E50] flex items-center justify-center">
                <p className="text-xl text-gray-600">Blog post not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8F9F9] to-white pb-16">
            <main className="max-w-4xl mx-auto px-4 mt-8">
                <article className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header with background */}
                    <div className="bg-gradient-to-r from-[#922B21] to-[#7A2318] p-8 text-white">
                        <div className="text-center">
                            <div className="flex items-center justify-center gap-2 mb-4">
                                <Calendar size={16} />
                                <span className="text-sm font-medium">
                                    {new Date(post.created_at || post.date || "").toLocaleDateString('en-US', { 
                                        year: 'numeric', 
                                        month: 'long', 
                                        day: 'numeric' 
                                    })}
                                </span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold leading-tight mb-4">
                                {post.title}
                            </h1>
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <span className="text-white font-bold text-sm">MA</span>
                                </div>
                                <div>
                                    <p className="font-semibold text-white">MyMBA Admission Team</p>
                                    <p className="text-sm text-white/80">Educational Experts</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="relative h-64 md:h-96 overflow-hidden">
                        <img
                            src={post.image || "https://images.unsplash.com/photo-1523050853064-85a201460596?q=80&w=1200&auto=format&fit=crop"}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12">
                        <div className="prose prose-lg prose-slate max-w-none">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
                                {post.body || post.content}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <div className="flex items-center justify-center gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#922B21] to-[#D4AC0D] flex items-center justify-center shadow-lg">
                                        <span className="text-white font-bold text-lg">MA</span>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">MyMBA Admission Team</p>
                                        <p className="text-sm text-gray-600">Your trusted educational guide</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
            </main>
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