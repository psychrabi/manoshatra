// Shared TypeScript types for ManoShastra application
// These types are used by both the React frontend and Cloudflare Worker backend

import React from "react";

// ==================== DATABASE ENTITY TYPES ====================

// Blog Post entity (matches D1 database schema)
export interface DBBlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  image_url: string | null;
  tags: string | null;
  published: number; // SQLite uses 0/1 for boolean
  created_at: string;
  updated_at: string;
}

// Appointment entity
export interface DBAppointment {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  message: string | null;
  status: string;
  created_at: string;
}

// Research entity
export interface DBResearch {
  id: string;
  title: string;
  authors: string;
  abstract: string;
  journal: string | null;
  year: number;
  doi: string | null;
  created_at: string;
}

// Contact Message entity
export interface DBContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: number; // SQLite uses 0/1 for boolean
  created_at: string;
}

// Testimonial entity
export interface DBTestimonial {
  id: string;
  name: string;
  title: string;
  message: string;
  rating: number;
  created_at: string;
}

// ==================== API REQUEST/RESPONSE TYPES ====================

// Authentication
export interface AdminLoginRequest {
  password: string;
}

export interface AuthResponse {
  token: string;
  message: string;
}

// Appointments
export interface CreateAppointmentRequest {
  name: string;
  email: string;
  phone: string;
  service: string;
  preferred_date: string;
  message?: string;
}

export interface UpdateStatusRequest {
  status: string;
}

// Blog Posts
export interface CreateBlogPostRequest {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  category: string;
  image_url?: string;
  tags?: string;
  published?: boolean;
}

export interface UpdateBlogPostRequest {
  title?: string;
  content?: string;
  excerpt?: string;
  author?: string;
  category?: string;
  image_url?: string;
  tags?: string;
  published?: boolean;
}

// Research
export interface CreateResearchRequest {
  title: string;
  authors: string;
  abstract: string;
  journal?: string;
  year: number;
  doi?: string;
}

// Contact
export interface CreateContactRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Testimonials
export interface CreateTestimonialRequest {
  name: string;
  title: string;
  message: string;
  rating?: number;
}

// ==================== FRONTEND DISPLAY TYPES ====================

// Blog Types (for frontend display)
export interface BlogPost {
  id: number | string;
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
  id: number | string;
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

// Testimonial Types (for frontend display)
export interface Testimonial {
  id: number | string;
  text: string;
  author: string;
  rating: number;
}

// Research/Publication Types (for frontend display)
export interface Publication {
  id: number | string;
  title: string;
  authors: string;
  abstract?: string;
  journal?: string;
  year: string | number;
  doi?: string;
}

// Contact Message Types (for frontend display)
export interface ContactMessage {
  id: number | string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  read: boolean | number;
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
