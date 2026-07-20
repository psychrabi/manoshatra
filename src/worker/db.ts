export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
  RESEND_API_KEY: string;
  JWT_SECRET_KEY?: string;
  ADMIN_PASSWORD?: string;
  CORS_ORIGINS?: string;
}

export function makeId(): string {
  return crypto.randomUUID();
}

export function nowUtc(): string {
  return new Date().toISOString();
}
