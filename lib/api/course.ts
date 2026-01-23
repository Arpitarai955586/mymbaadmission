import axios from 'axios';
import { Course, CourseFormData, ApiResponse } from '@/types/course';

const API_BASE = '/api/courses';

export const courseApi = {
  // Get all courses
  getAll: async (): Promise<Course[]> => {
    const response = await axios.get<ApiResponse<Course[]>>(API_BASE);
    return response.data.course || [];
  },

  // Get single course
  getById: async (id: string): Promise<Course> => {
    const response = await axios.get<ApiResponse<Course>>(`${API_BASE}/${id}`);
    if (!response.data.course) throw new Error('Course not found');
    return response.data.course;
  },

  // Create course
  create: async (data: CourseFormData): Promise<Course> => {
    const response = await axios.post<ApiResponse<Course>>(API_BASE, data);
    if (!response.data.course) throw new Error('Failed to create course');
    return response.data.course;
  },

  // Update course
  update: async (id: string, data: Partial<CourseFormData>): Promise<Course> => {
    const response = await axios.put<ApiResponse<Course>>(`${API_BASE}/${id}`, data);
    if (!response.data.course) throw new Error('Failed to update course');
    return response.data.course;
  },

  // Delete (deactivate) course
  delete: async (id: string): Promise<void> => {
    await axios.delete<ApiResponse<void>>(`${API_BASE}/${id}`);
  },
};