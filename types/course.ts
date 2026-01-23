export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CourseFormData {
  title: string;
  description: string;
  duration: string;
  level: string;
  category: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  course?: T;
  courses?: T[];
  data?: T;
}
