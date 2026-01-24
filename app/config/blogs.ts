// Centralized blog data
export interface BlogPost {
  blog_id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  readTime: string;
  is_published: boolean;
  is_trending: boolean;
  featured_image: string;
  views: number;
  seo: {
    meta_title: string;
    meta_description: string;
    keywords: string[];
  };
}

export const blogsData: BlogPost[] = [
  {
    "blog_id": "cat-2024-preparation-guide",
    "slug": "cat-2024-preparation-guide",
    "title": "Complete CAT 2024 Preparation Guide: Tips, Strategy & Study Plan",
    "excerpt": "Everything you need to know about CAT 2024 preparation, including study timeline, important topics, mock tests, and expert strategies to crack the exam.",
    "body": "CAT 2024 is one of the most competitive MBA entrance exams in India. With over 3 lakh aspirants competing for limited seats in top IIMs and other premier B-schools, a strategic preparation approach is crucial. This comprehensive guide covers everything from understanding the exam pattern to creating an effective study plan, managing time during preparation, and avoiding common mistakes that aspirants make. Learn from CAT toppers and experts about the best resources, mock test strategies, and how to maintain consistency throughout your preparation journey.",
    "category": "Exam Preparation",
    "tags": ["CAT", "MBA Entrance", "Study Plan", "IIM", "Preparation Strategy"],
    "created_at": "2024-01-15T10:00:00Z",
    "updated_at": "2024-01-15T10:00:00Z",
    "readTime": "12 min read",
    "is_published": true,
    "is_trending": true,
    "featured_image": "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    "views": 15420,
    "seo": {
      "meta_title": "CAT 2024 Preparation Guide - Complete Strategy & Study Plan",
      "meta_description": "Complete CAT 2024 preparation guide with expert tips, study strategies, mock test plans, and time management techniques to crack IIM entrance exam.",
      "keywords": ["CAT 2024", "CAT preparation", "MBA entrance", "IIM admission", "CAT study plan"]
    }
  },
  {
    "blog_id": "mba-vs-pgdm-decision-guide",
    "slug": "mba-vs-pgdm-decision-guide",
    "title": "MBA vs PGDM: Which One Should You Choose? Complete Comparison Guide",
    "excerpt": "Understanding the key differences between MBA and PGDM programs, their recognition, career prospects, and how to choose the right option for your career goals.",
    "body": "One of the most common dilemmas faced by MBA aspirants is choosing between MBA and PGDM programs. While both degrees can lead to successful management careers, there are crucial differences in terms of recognition, curriculum flexibility, industry acceptance, and career outcomes. This detailed comparison helps you understand the pros and cons of each option, factors to consider when making your choice, and how these decisions impact your long-term career growth. We also cover specific scenarios where one might be better than the other and insights from industry experts.",
    "category": "Career Guidance",
    "tags": ["MBA vs PGDM", "Program Selection", "Career Guidance", "Management Education"],
    "created_at": "2024-01-12T14:30:00Z",
    "updated_at": "2024-01-12T14:30:00Z",
    "readTime": "8 min read",
    "is_published": true,
    "is_trending": true,
    "featured_image": "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
    "views": 12350,
    "seo": {
      "meta_title": "MBA vs PGDM: Which Program to Choose? Complete Comparison",
      "meta_description": "Detailed comparison between MBA and PGDM programs. Understand differences, recognition, career prospects and make the right choice.",
      "keywords": ["MBA vs PGDM", "program selection", "management education", "career guidance"]
    }
  },
  {
    "blog_id": "top-mba-colleges-2024-ranking",
    "slug": "top-mba-colleges-2024-ranking",
    "title": "Top MBA Colleges in India 2024: NIRF Ranking & Complete Analysis",
    "excerpt": "Latest NIRF 2024 rankings of top MBA colleges in India with detailed analysis of placement records, fee structure, and admission criteria.",
    "body": "The NIRF 2024 rankings have brought some interesting changes in the landscape of MBA education in India. While IIM Ahmedabad continues to lead, several new players have made significant gains. This comprehensive analysis covers not just the rankings but also what makes these colleges stand out - their placement records, faculty quality, industry connections, infrastructure, and most importantly, return on investment. We dive deep into placement statistics, average packages, highest packages, sector-wise placements, and how these numbers translate into actual career outcomes for students.",
    "category": "College Rankings",
    "tags": ["MBA Rankings", "NIRF 2024", "Top Colleges", "IIM", "Placement Records"],
    "created_at": "2024-01-10T09:15:00Z",
    "updated_at": "2024-01-10T09:15:00Z",
    "readTime": "10 min read",
    "is_published": true,
    "is_trending": false,
    "featured_image": "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
    "views": 9876,
    "seo": {
      "meta_title": "Top MBA Colleges India 2024 - NIRF Rankings & Analysis",
      "meta_description": "NIRF 2024 MBA college rankings with complete analysis of placement records, fees, admission criteria and career prospects.",
      "keywords": ["MBA rankings 2024", "NIRF rankings", "top MBA colleges", "IIM rankings", "MBA placement"]
    }
  },
  {
    "blog_id": "cat-mock-test-strategy",
    "slug": "cat-mock-test-strategy",
    "title": "Mastering CAT Mock Tests: Strategy, Analysis & Performance Improvement",
    "excerpt": "Learn how to effectively use CAT mock tests for maximum improvement, including analysis techniques, score optimization, and avoiding common mistakes.",
    "body": "Mock tests are the cornerstone of CAT preparation, but simply taking tests isn't enough. This guide reveals the systematic approach to mock test analysis that separates high scorers from average performers. Learn how to identify your weak areas, track improvement over time, manage test anxiety, and develop strategies for different sections. We cover specific techniques for time management, question selection, and how to simulate actual exam conditions. Plus, insights from previous CAT toppers on their mock test journey and how they used mocks to secure 99+ percentiles.",
    "category": "Exam Preparation",
    "tags": ["CAT Mock Tests", "Test Strategy", "Performance Analysis", "99 Percentile"],
    "created_at": "2024-01-08T16:45:00Z",
    "updated_at": "2024-01-08T16:45:00Z",
    "readTime": "15 min read",
    "is_published": true,
    "is_trending": false,
    "featured_image": "https://images.unsplash.com/photo-1614492898637-435e0f87cef8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "views": 8234,
    "seo": {
      "meta_title": "CAT Mock Test Strategy - Master Performance Analysis & Improvement",
      "meta_description": "Complete guide to CAT mock test strategy, analysis techniques, and performance improvement methods for 99+ percentile.",
      "keywords": ["CAT mock tests", "CAT strategy", "performance analysis", "99 percentile CAT"]
    }
  },
  {
    "blog_id": "mba-interview-preparation",
    "slug": "mba-interview-preparation",
    "title": "MBA Interview Preparation: Common Questions & Expert Tips for Success",
    "excerpt": "Complete guide to MBA interview preparation including common questions, group discussion tips, personal interview strategies, and how to handle stress interviews.",
    "body": "Clearing the written exam is just the first step; the interview round is where many aspirants stumble. This comprehensive guide covers everything from WAT (Written Ability Test) and GD (Group Discussion) to PI (Personal Interview) rounds. Learn about the most commonly asked questions, how to structure your answers, body language tips, and how to handle tricky questions about your career goals and weaknesses. We also include actual interview experiences from previous years, panel expectations, and how to showcase your unique strengths effectively.",
    "category": "Interview Preparation",
    "tags": ["MBA Interview", "GDPI Preparation", "WAT", "Personal Interview", "Group Discussion"],
    "created_at": "2024-01-05T11:20:00Z",
    "updated_at": "2024-01-05T11:20:00Z",
    "readTime": "11 min read",
    "is_published": true,
    "is_trending": false,
    "featured_image": "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80",
    "views": 7654,
    "seo": {
      "meta_title": "MBA Interview Preparation Guide - GDPI, WAT & Personal Interview Tips",
      "meta_description": "Complete MBA interview preparation guide covering GDPI, WAT, personal interview questions and expert tips for success.",
      "keywords": ["MBA interview", "GDPI preparation", "WAT tips", "personal interview", "MBA admission"]
    }
  }
];

// Helper function to get blog by slug
export const getBlogBySlug = (slug: string): BlogPost | undefined => {
  return blogsData.find(blog => blog.slug === slug);
};

// Helper function to get all published blogs
export const getPublishedBlogs = (): BlogPost[] => {
  return blogsData.filter(blog => blog.is_published);
};

// Helper function to get trending blogs
export const getTrendingBlogs = (limit: number = 3): BlogPost[] => {
  return blogsData
    .filter(blog => blog.is_published && blog.is_trending)
    .slice(0, limit);
};

// Helper function to get blogs by category
export const getBlogsByCategory = (category: string): BlogPost[] => {
  return blogsData.filter(blog => blog.is_published && blog.category === category);
};

// Helper function to get unique categories
export const getUniqueCategories = (): string[] => {
  const categories = blogsData.map(blog => blog.category);
  return Array.from(new Set(categories)).sort();
};

// Helper function to get recent blogs
export const getRecentBlogs = (limit: number = 5): BlogPost[] => {
  return blogsData
    .filter(blog => blog.is_published)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
};

// Helper function to get popular blogs by views
export const getPopularBlogs = (limit: number = 5): BlogPost[] => {
  return blogsData
    .filter(blog => blog.is_published)
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);
};
