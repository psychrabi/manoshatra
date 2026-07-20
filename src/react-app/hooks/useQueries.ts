import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "../lib/api";
import { useAuthStore } from "../stores/authStore";
import type {
  Appointment,
  BlogPost,
  ContactMessage,
  Publication,
  Testimonial,
} from "../types";

// ─── Query Keys ───────────────────────────────────────────────

export const queryKeys = {
  testimonials: ["testimonials"] as const,
  blogPreview: (limit: number) => ["blog", "preview", limit] as const,
  blogList: (page: number, limit: number) => ["blog", "list", page, limit] as const,
  blogDetail: (id: string) => ["blog", "detail", id] as const,
  research: ["research"] as const,
  adminAppointments: ["admin", "appointments"] as const,
  adminBlog: ["admin", "blog"] as const,
  adminResearch: ["admin", "research"] as const,
  adminContact: ["admin", "contact"] as const,
};

// ─── Public Queries ───────────────────────────────────────────

export function useTestimonials() {
  return useQuery({
    queryKey: queryKeys.testimonials,
    queryFn: () => apiGet<Testimonial[]>("/api/testimonials"),
    staleTime: 5 * 60 * 1000,
  });
}

export function useBlogPreview(limit = 3) {
  return useQuery({
    queryKey: queryKeys.blogPreview(limit),
    queryFn: () => apiGet<{ posts: BlogPost[]; total: number }>(`/api/blog?limit=${limit}`),
    select: (data) => data.posts || [],
    staleTime: 5 * 60 * 1000,
  });
}

export function useBlogList(page: number, limit = 9) {
  return useQuery({
    queryKey: queryKeys.blogList(page, limit),
    queryFn: () =>
      apiGet<{ posts: BlogPost[]; total: number }>(`/api/blog?page=${page}&limit=${limit}`),
    staleTime: 2 * 60 * 1000,
  });
}

export function useBlogDetail(id: string | undefined) {
  return useQuery({
    queryKey: queryKeys.blogDetail(id ?? ""),
    queryFn: () => apiGet<BlogPost>(`/api/blog/${id}`),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
}

export function useResearch() {
  return useQuery({
    queryKey: queryKeys.research,
    queryFn: () => apiGet<Publication[]>("/api/research"),
    staleTime: 5 * 60 * 1000,
  });
}

// ─── Mutations (Public) ───────────────────────────────────────

export function useSubmitContact() {
  return useMutation({
    mutationFn: (data: { name: string; email: string; phone?: string; message: string }) =>
      apiPost("/api/contact", data),
  });
}

export function useSubmitAppointment() {
  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      phone: string;
      service: string;
      preferred_date: string;
      message?: string;
    }) => apiPost("/api/appointments", data),
  });
}

// ─── Admin Queries ────────────────────────────────────────────

function useAdminToken() {
  return useAuthStore((s) => s.token);
}

export function useAdminAppointments() {
  const token = useAdminToken();
  return useQuery({
    queryKey: queryKeys.adminAppointments,
    queryFn: () => apiGet<Appointment[]>("/api/admin/appointments", token ?? undefined),
    enabled: !!token,
    staleTime: 30 * 1000,
    refetchInterval: 30_000,
  });
}

export function useAdminBlog() {
  const token = useAdminToken();
  return useQuery({
    queryKey: queryKeys.adminBlog,
    queryFn: () => apiGet<BlogPost[]>("/api/admin/blog", token ?? undefined),
    enabled: !!token,
    staleTime: 30 * 1000,
  });
}

export function useAdminResearch() {
  const token = useAdminToken();
  return useQuery({
    queryKey: queryKeys.adminResearch,
    queryFn: () => apiGet<Publication[]>("/api/admin/research", token ?? undefined),
    enabled: !!token,
    staleTime: 30 * 1000,
  });
}

export function useAdminContact() {
  const token = useAdminToken();
  return useQuery({
    queryKey: queryKeys.adminContact,
    queryFn: () => apiGet<ContactMessage[]>("/api/admin/contact", token ?? undefined),
    enabled: !!token,
    staleTime: 30 * 1000,
    refetchInterval: 30_000,
  });
}

// ─── Admin Mutations ──────────────────────────────────────────

export function useUpdateAppointmentStatus() {
  const token = useAdminToken();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Appointment["status"] }) =>
      apiPatch(`/api/admin/appointments/${id}/status`, { status }, token ?? undefined),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminAppointments });
    },
  });
}

export function useRescheduleAppointment() {
  const token = useAdminToken();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, preferred_date }: { id: string; preferred_date: string }) =>
      apiPatch(`/api/admin/appointments/${id}/reschedule`, { preferred_date }, token ?? undefined),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminAppointments });
    },
  });
}

export function useDeleteAppointment() {
  const token = useAdminToken();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete(`/api/admin/appointments/${id}`, token ?? undefined),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminAppointments });
    },
  });
}

export function useCreateBlogPost() {
  const token = useAdminToken();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<BlogPost, "id" | "created_at" | "updated_at">) =>
      apiPost("/api/admin/blog", data, token ?? undefined),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminBlog });
    },
  });
}

export function useUpdateBlogPost() {
  const token = useAdminToken();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: { id: string } & Partial<BlogPost>) =>
      apiPut(`/api/admin/blog/${id}`, data, token ?? undefined),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminBlog });
    },
  });
}

export function useDeleteBlogPost() {
  const token = useAdminToken();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete(`/api/admin/blog/${id}`, token ?? undefined),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminBlog });
    },
  });
}

export function useCreateResearch() {
  const token = useAdminToken();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<Publication, "id">) =>
      apiPost("/api/admin/research", data, token ?? undefined),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminResearch });
    },
  });
}

export function useDeleteResearch() {
  const token = useAdminToken();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete(`/api/admin/research/${id}`, token ?? undefined),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminResearch });
    },
  });
}

export function useMarkMessageRead() {
  const token = useAdminToken();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiPatch(`/api/admin/contact/${id}/read`, {}, token ?? undefined),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.adminContact });
    },
  });
}

export function useAdminLogin() {
  return useMutation({
    mutationFn: (password: string) =>
      apiPost<{ token: string; message: string }>("/api/admin/login", { password }),
  });
}
