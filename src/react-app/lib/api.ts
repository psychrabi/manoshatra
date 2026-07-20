const API_BASE = "";

class ApiError extends Error {
  status: number;
  detail?: string;

  constructor(status: number, message: string, detail?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.detail = detail;
  }
}

async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  const { headers: customHeaders, ...restOptions } = options;
  const res = await fetch(`${API_BASE}${url}`, {
    ...restOptions,
    headers: {
      "Content-Type": "application/json",
      ...customHeaders,
    },
  });

  if (!res.ok) {
    let detail = `Request failed: ${res.status}`;
    try {
      const body = await res.json();
      if (typeof body.detail === "string") {
        detail = body.detail;
      } else if (typeof body.error === "string") {
        detail = body.error;
      } else if (body.error?.issues) {
        detail = body.error.issues.map((i: any) => i.message).join(", ");
      }
    } catch {
      // ignore parse errors
    }
    throw new ApiError(res.status, detail, detail);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

export function apiGet<T>(url: string, token?: string): Promise<T> {
  return request<T>(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export function apiPost<T>(url: string, data: unknown, token?: string): Promise<T> {
  return request<T>(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export function apiPut<T>(url: string, data: unknown, token?: string): Promise<T> {
  return request<T>(url, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export function apiPatch<T>(url: string, data?: unknown, token?: string): Promise<T> {
  return request<T>(url, {
    method: "PATCH",
    body: data ? JSON.stringify(data) : undefined,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export function apiDelete<T>(url: string, token?: string): Promise<T> {
  return request<T>(url, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
}

export { ApiError };
