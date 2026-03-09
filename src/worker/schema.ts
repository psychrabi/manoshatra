import { z } from "zod";

export const AdminLoginSchema = z.object({
  password: z.string(),
});

export const AppointmentCreateSchema = z.object({
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  service: z.string(),
  preferred_date: z.string(),
  message: z.string().optional(),
});

export const BlogPostCreateSchema = z.object({
  title: z.string(),
  content: z.string(),
  excerpt: z.string(),
  author: z.string(),
  category: z.string(),
  image_url: z.string().optional(),
  tags: z.string().optional(),
  published: z.boolean().default(true),
});

export const BlogPostUpdateSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  author: z.string().optional(),
  category: z.string().optional(),
  image_url: z.string().optional(),
  tags: z.string().optional(),
  published: z.boolean().optional(),
});

export const ResearchCreateSchema = z.object({
  title: z.string(),
  authors: z.string(),
  abstract: z.string(),
  journal: z.string().optional(),
  year: z.number().int(),
  doi: z.string().optional(),
});

export const ContactCreateSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
});

export const TestimonialCreateSchema = z.object({
  name: z.string(),
  title: z.string(),
  message: z.string(),
  rating: z.number().int().default(5),
});

export const StatusUpdateSchema = z.object({
  status: z.string(),
});

// Type inference from schemas
export type AdminLoginInput = z.infer<typeof AdminLoginSchema>;
export type AppointmentInput = z.infer<typeof AppointmentCreateSchema>;
export type BlogPostInput = z.infer<typeof BlogPostCreateSchema>;
export type BlogPostUpdateInput = z.infer<typeof BlogPostUpdateSchema>;
export type ResearchInput = z.infer<typeof ResearchCreateSchema>;
export type ContactInput = z.infer<typeof ContactCreateSchema>;
export type TestimonialInput = z.infer<typeof TestimonialCreateSchema>;
export type StatusUpdateInput = z.infer<typeof StatusUpdateSchema>;
