// Shared TypeScript types for ManoShastra application

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image_url?: string;
  category: string;
  author: string;
  created_at: string;
  tags?: string;
  published?: boolean;
}

// Appointment Types
export interface Appointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  message?: string;
  status: "pending" | "confirmed" | "cancelled";
  created_at?: string;
}

// Team Member Types
export interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio?: string;
  image_url?: string;
  specialization?: string[];
}

// Service Types
export interface Service {
  id: number;
  title: string;
  description: string;
  icon?: string;
  details?: string[];
  who?: string;
}

// Stats Types
export interface Stat {
  icon?: string;
  number: string;
  label: string;
}

// Testimonial Types
export interface Testimonial {
  id: number;
  text: string;
  author: string;
  rating: number;
}

// Research/Publication Types
export interface Publication {
  id: string;
  title: string;
  authors: string;
  abstract?: string;
  journal?: string;
  year: string;
  doi?: string;
}

// Contact Message Types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  read: boolean;
  created_at: string;
}

// Form Types
export interface AppointmentForm {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  message: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// Admin Types
export interface AdminAuth {
  token: string;
  headers: Record<string, string>;
}

export interface BlogPostFormData {
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image_url?: string;
  tags?: string;
  published: boolean;
}

export interface PublicationFormData {
  title: string;
  authors: string;
  abstract?: string;
  journal?: string;
  year: string;
  doi?: string;
}

// Utility Types
export type IconName =
  | "brain"
  | "user"
  | "users"
  | "heart"
  | "shield"
  | "clipboard"
  | "users-round"
  | "calendar"
  | "award";

export type LucideIconType = React.ElementType;

export interface IconMap {
  [key: string]: LucideIconType;
}

// API Response Types
export interface PaginatedResponse<T> {
  posts: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success?: boolean;
}
