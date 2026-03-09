export interface Env {
  DB: D1Database;
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

export function cleanDoc(doc: any) {
  if (!doc) return null;
  // In SQLite, maybe we just want to ensure published/read flags are parsed
  return doc;
}
