"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for Blog Management
export interface BlogPost {
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
  content?: string;
  author?: string;
  date?: string;
  category?: string;
  readTime?: string;
  tags?: string[];
  featured?: boolean;
  published?: boolean;
  viewCount?: number;
  likes?: number;
  createdAt?: string;
  updatedAt?: string;
  id?: string; // Legacy compatibility
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  postCount: number;
  color: string;
}

export interface BlogFilter {
  category?: string;
  tag?: string;
  author?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  featured?: boolean;
  search?: string;
}

export interface BlogState {
  posts: BlogPost[];
  categories: BlogCategory[];
  currentPost: BlogPost | null;
  featuredPosts: BlogPost[];
  recentPosts: BlogPost[];
  popularPosts: BlogPost[];
  loading: boolean;
  error: string | null;
  filter: BlogFilter;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalPosts: number;
    postsPerPage: number;
  };
}

export interface BlogContextType extends BlogState {
  // Actions
  fetchPosts: (page?: number, filter?: BlogFilter) => Promise<void>;
  fetchPostBySlug: (slug: string) => Promise<BlogPost | null>;
  fetchCategories: () => Promise<void>;
  setFilter: (filter: BlogFilter) => void;
  clearFilter: () => void;
  incrementViewCount: (postId: string) => Promise<void>;
  toggleLike: (postId: string) => Promise<void>;
  searchPosts: (query: string) => Promise<BlogPost[]>;
  getPostsByCategory: (categorySlug: string) => Promise<BlogPost[]>;
  getRelatedPosts: (postId: string, limit?: number) => Promise<BlogPost[]>;
  // Admin actions
  createPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'likes'>) => Promise<BlogPost>;
  updatePost: (id: string, updates: Partial<BlogPost>) => Promise<BlogPost>;
  deletePost: (id: string) => Promise<void>;
  publishPost: (id: string) => Promise<void>;
  unpublishPost: (id: string) => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

interface BlogProviderProps {
  children: ReactNode;
}

export const BlogProvider: React.FC<BlogProviderProps> = ({ children }) => {
  const [state, setState] = useState<BlogState>({
    posts: [],
    categories: [],
    currentPost: null,
    featuredPosts: [],
    recentPosts: [],
    popularPosts: [],
    loading: false,
    error: null,
    filter: {},
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalPosts: 0,
      postsPerPage: 12,
    },
  });

  // Sample data - replace with actual API calls
  const samplePosts: BlogPost[] = [
    {
      _id: '1',
      slug: 'top-management-colleges-in-india-2025-ranking-admission-fee',
      title: 'Top Management Colleges in India 2025: Ranking, Admission, Fee',
      body: 'India has a long list of management colleges that offer leading courses such as BBA, MBA, PGDM, PGP, and EMBA. Full content here...',
      type: 'blog',
      created_by: 'education-expert',
      is_published: true,
      created_at: '2025-10-10T10:00:00Z',
      updated_at: '2025-10-10T10:00:00Z',
      image: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg',
      // Legacy fields for UI compatibility
      excerpt: 'India has a long list of management colleges that offer leading courses such as BBA, MBA, PGDM, PGP, and EMBA.',
      content: 'Full content here...',
      author: 'Education Expert',
      date: 'Oct 10, 2025',
      category: 'Management',
      readTime: '12 min read',
      tags: ['MBA', 'Colleges', 'Ranking'],
      featured: true,
      published: true,
      viewCount: 1250,
      likes: 45,
      createdAt: '2025-10-10T10:00:00Z',
      updatedAt: '2025-10-10T10:00:00Z',
      id: '1', // Legacy compatibility
    },
    // Add more sample posts as needed
  ];

  const sampleCategories: BlogCategory[] = [
    {
      id: '1',
      name: 'Management',
      slug: 'management',
      description: 'Management studies and MBA programs',
      postCount: 32,
      color: '#922B21',
    },
    {
      id: '2',
      name: 'Engineering',
      slug: 'engineering',
      description: 'Engineering courses and colleges',
      postCount: 30,
      color: '#2C3E50',
    },
    {
      id: '3',
      name: 'Medical',
      slug: 'medical',
      description: 'Medical education and healthcare',
      postCount: 25,
      color: '#27AE60',
    },
  ];

  // Actions
  const fetchPosts = async (page = 1, filter?: BlogFilter) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let filteredPosts = [...samplePosts];
      
      if (filter) {
        if (filter.category) {
          filteredPosts = filteredPosts.filter(post => post.category?.toLowerCase() === filter.category?.toLowerCase());
        }
        if (filter.tag) {
          filteredPosts = filteredPosts.filter(post => post.tags?.includes(filter.tag!));
        }
        if (filter.search) {
          filteredPosts = filteredPosts.filter(post => 
            post.title.toLowerCase().includes(filter.search!.toLowerCase()) ||
            post.excerpt?.toLowerCase().includes(filter.search!.toLowerCase())
          );
        }
        if (filter.featured) {
          filteredPosts = filteredPosts.filter(post => post.featured);
        }
      }

      const startIndex = (page - 1) * state.pagination.postsPerPage;
      const endIndex = startIndex + state.pagination.postsPerPage;
      const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

      setState(prev => ({
        ...prev,
        posts: paginatedPosts,
        pagination: {
          ...prev.pagination,
          currentPage: page,
          totalPages: Math.ceil(filteredPosts.length / prev.pagination.postsPerPage),
          totalPosts: filteredPosts.length,
        },
        loading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch posts',
        loading: false,
      }));
    }
  };

  const fetchPostBySlug = async (slug: string): Promise<BlogPost | null> => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const post = samplePosts.find(p => p.slug === slug);
      return post || null;
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch post',
      }));
      return null;
    }
  };

  const fetchCategories = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setState(prev => ({ ...prev, categories: sampleCategories }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to fetch categories',
      }));
    }
  };

  const setFilter = (filter: BlogFilter) => {
    setState(prev => ({ ...prev, filter }));
    fetchPosts(1, filter);
  };

  const clearFilter = () => {
    setState(prev => ({ ...prev, filter: {} }));
    fetchPosts(1);
  };

  const incrementViewCount = async (postId: string) => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.map(post => 
        post._id === postId ? { ...post, viewCount: (post.viewCount || 0) + 1 } : post
      ),
    }));
  };

  const toggleLike = async (postId: string) => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.map(post => 
        post._id === postId ? { ...post, likes: (post.likes || 0) + ((post.likes || 0) > 0 ? -1 : 1) } : post
      ),
    }));
  };

  const searchPosts = async (query: string): Promise<BlogPost[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return samplePosts.filter(post => 
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(query.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    } catch (error) {
      return [];
    }
  };

  const getPostsByCategory = async (categorySlug: string): Promise<BlogPost[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return samplePosts.filter(post => post.category?.toLowerCase() === categorySlug.toLowerCase());
    } catch (error) {
      return [];
    }
  };

  const getRelatedPosts = async (postId: string, limit = 3): Promise<BlogPost[]> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const currentPost = samplePosts.find(p => p.id === postId);
      if (!currentPost) return [];
      
      return samplePosts
        .filter(post => post._id !== postId && post.category === currentPost.category)
        .slice(0, limit);
    } catch (error) {
      return [];
    }
  };

  // Admin actions
  const createPost = async (postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'likes'>): Promise<BlogPost> => {
    const newPost: BlogPost = {
      ...postData,
      _id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewCount: 0,
      likes: 0,
    };
    
    setState(prev => ({
      ...prev,
      posts: [newPost, ...prev.posts],
    }));
    
    return newPost;
  };

  const updatePost = async (id: string, updates: Partial<BlogPost>): Promise<BlogPost> => {
    const updatedPost = { ...samplePosts.find(p => p._id === id)!, ...updates, updatedAt: new Date().toISOString() };
    
    setState(prev => ({
      ...prev,
      posts: prev.posts.map(post => post._id === id ? updatedPost : post),
    }));
    
    return updatedPost;
  };

  const deletePost = async (id: string): Promise<void> => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.filter(post => post._id !== id),
    }));
  };

  const publishPost = async (id: string): Promise<void> => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.map(post => post._id === id ? { ...post, published: true } : post),
    }));
  };

  const unpublishPost = async (id: string): Promise<void> => {
    setState(prev => ({
      ...prev,
      posts: prev.posts.map(post => post._id === id ? { ...post, published: false } : post),
    }));
  };

  // Initialize data
  useEffect(() => {
    fetchPosts();
    fetchCategories();
  }, []);

  const contextValue: BlogContextType = {
    ...state,
    fetchPosts,
    fetchPostBySlug,
    fetchCategories,
    setFilter,
    clearFilter,
    incrementViewCount,
    toggleLike,
    searchPosts,
    getPostsByCategory,
    getRelatedPosts,
    createPost,
    updatePost,
    deletePost,
    publishPost,
    unpublishPost,
  };

  return (
    <BlogContext.Provider value={contextValue}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
