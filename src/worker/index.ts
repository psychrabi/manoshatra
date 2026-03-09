import { Hono } from "hono";
import { cors } from "hono/cors";
import { jwt, sign } from "hono/jwt";
import { zValidator } from "@hono/zod-validator";
import { Env, cleanDoc, makeId, nowUtc } from "./db";
import { seedData } from "./seed";
import {
  AdminLoginSchema,
  AppointmentCreateSchema,
  BlogPostCreateSchema,
  BlogPostUpdateSchema,
  ResearchCreateSchema,
  ContactCreateSchema,
  TestimonialCreateSchema,
  StatusUpdateSchema,
} from "./schema";

const app = new Hono<{ Bindings: Env }>();

let seeded = false;

// Middleware for CORS
app.use("*", async (c, next) => {
  const origins = c.env.CORS_ORIGINS ? c.env.CORS_ORIGINS.split(",") : ["*"];
  const corsMiddleware = cors({
    origin: origins,
    allowHeaders: ["*"],
    allowMethods: ["*"],
    credentials: true,
  });
  return corsMiddleware(c, next);
});

// Middleware for Seeding
app.use("*", async (c, next) => {
  if (!seeded) {
    await seedData(c.env.DB);
    seeded = true;
  }
  await next();
});

// JWT Middleware wrapper
const verifyToken = async (c: any, next: any) => {
  const secret = c.env.JWT_SECRET_KEY || "manoshastra-default-secret";
  const jwtMiddleware = jwt({
    secret: secret,
    alg: "HS256",
  });
  return jwtMiddleware(c, next);
};

// ==================== ROUTES ====================

app.get("/api/", (c) => {
  return c.json({ message: "ManoShastra API is running", status: "ok" });
});

// Auth
app.post(
  "/api/admin/login",
  zValidator("json", AdminLoginSchema),
  async (c) => {
    const data = c.req.valid("json");
    const adminPassword = c.env.ADMIN_PASSWORD || "ManoShastra@2024";
    const secret = c.env.JWT_SECRET_KEY || "manoshastra-default-secret";

    if (data.password !== adminPassword) {
      return c.json({ detail: "Invalid credentials" }, 401);
    }

    const payload = {
      sub: "admin",
      exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
    };
    const token = await sign(payload, secret);

    return c.json({ token, message: "Login successful" });
  }
);

// Appointments
app.post(
  "/api/appointments",
  zValidator("json", AppointmentCreateSchema),
  async (c) => {
    const data = c.req.valid("json");
    const db = c.env.DB;

    const id = makeId();
    const created_at = nowUtc();

    await db
      .prepare(
        "INSERT INTO appointments (id, name, email, phone, service, preferred_date, message, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        id,
        data.name,
        data.email,
        data.phone,
        data.service,
        data.preferred_date,
        data.message || null,
        "pending",
        created_at
      )
      .run();

    const result = await db
      .prepare("SELECT * FROM appointments WHERE id = ?")
      .bind(id)
      .first();
    return c.json(cleanDoc(result));
  }
);

app.get("/api/admin/appointments", verifyToken, async (c) => {
  const db = c.env.DB;
  const { results } = await db
    .prepare("SELECT * FROM appointments ORDER BY created_at DESC")
    .all();
  return c.json(results || []);
});

app.patch(
  "/api/admin/appointments/:appt_id",
  verifyToken,
  zValidator("json", StatusUpdateSchema),
  async (c) => {
    const appt_id = c.req.param("appt_id");
    const body = c.req.valid("json");
    const db = c.env.DB;

    await db
      .prepare("UPDATE appointments SET status = ? WHERE id = ?")
      .bind(body.status, appt_id)
      .run();
    const result = await db
      .prepare("SELECT * FROM appointments WHERE id = ?")
      .bind(appt_id)
      .first();
    return c.json(cleanDoc(result));
  }
);

// Blog
app.get("/api/blog", async (c) => {
  const page = parseInt(c.req.query("page") || "1");
  const limit = parseInt(c.req.query("limit") || "9");
  const offset = (page - 1) * limit;
  const db = c.env.DB;

  const { results: docs } = await db
    .prepare(
      "SELECT * FROM blog_posts WHERE published = 1 ORDER BY created_at DESC LIMIT ? OFFSET ?"
    )
    .bind(limit, offset)
    .all();

  const totalRes = (await db
    .prepare("SELECT COUNT(*) as count FROM blog_posts WHERE published = 1")
    .first("count")) as number;

  return c.json({ posts: docs || [], total: totalRes || 0, page, limit });
});

app.get("/api/blog/:post_id", async (c) => {
  const post_id = c.req.param("post_id");
  const db = c.env.DB;

  const doc = await db
    .prepare("SELECT * FROM blog_posts WHERE id = ? AND published = 1")
    .bind(post_id)
    .first();
  if (!doc) {
    return c.json({ detail: "Post not found" }, 404);
  }
  return c.json(doc);
});

app.get("/api/admin/blog", verifyToken, async (c) => {
  const db = c.env.DB;
  const { results } = await db
    .prepare("SELECT * FROM blog_posts ORDER BY created_at DESC")
    .all();
  return c.json(results || []);
});

app.post(
  "/api/admin/blog",
  verifyToken,
  zValidator("json", BlogPostCreateSchema),
  async (c) => {
    const data = c.req.valid("json");
    const db = c.env.DB;

    const id = makeId();
    const created_at = nowUtc();
    const updated_at = nowUtc();
    const published = data.published ? 1 : 0;

    await db
      .prepare(
        "INSERT INTO blog_posts (id, title, content, excerpt, author, category, image_url, tags, published, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        id,
        data.title,
        data.content,
        data.excerpt,
        data.author,
        data.category,
        data.image_url || null,
        data.tags || null,
        published,
        created_at,
        updated_at
      )
      .run();

    const result = await db
      .prepare("SELECT * FROM blog_posts WHERE id = ?")
      .bind(id)
      .first();
    return c.json(cleanDoc(result));
  }
);

app.put(
  "/api/admin/blog/:post_id",
  verifyToken,
  zValidator("json", BlogPostUpdateSchema),
  async (c) => {
    const post_id = c.req.param("post_id");
    const data = c.req.valid("json");
    const db = c.env.DB;

    const current = await db
      .prepare("SELECT * FROM blog_posts WHERE id = ?")
      .bind(post_id)
      .first();
    if (!current) return c.json({ detail: "Not found" }, 404);

    const title = data.title !== undefined ? data.title : current.title;
    const content = data.content !== undefined ? data.content : current.content;
    const excerpt = data.excerpt !== undefined ? data.excerpt : current.excerpt;
    const author = data.author !== undefined ? data.author : current.author;
    const category =
      data.category !== undefined ? data.category : current.category;
    const image_url =
      data.image_url !== undefined ? data.image_url : current.image_url;
    const tags = data.tags !== undefined ? data.tags : current.tags;
    const published =
      data.published !== undefined
        ? data.published
          ? 1
          : 0
        : current.published;

    const updated_at = nowUtc();

    await db
      .prepare(
        "UPDATE blog_posts SET title = ?, content = ?, excerpt = ?, author = ?, category = ?, image_url = ?, tags = ?, published = ?, updated_at = ? WHERE id = ?"
      )
      .bind(
        title,
        content,
        excerpt,
        author,
        category,
        image_url,
        tags,
        published,
        updated_at,
        post_id
      )
      .run();

    const updated = await db
      .prepare("SELECT * FROM blog_posts WHERE id = ?")
      .bind(post_id)
      .first();
    return c.json(cleanDoc(updated));
  }
);

app.delete("/api/admin/blog/:post_id", verifyToken, async (c) => {
  const post_id = c.req.param("post_id");
  const db = c.env.DB;

  await db.prepare("DELETE FROM blog_posts WHERE id = ?").bind(post_id).run();
  return c.json({ message: "Deleted" });
});

// Research
app.get("/api/research", async (c) => {
  const db = c.env.DB;
  const { results } = await db
    .prepare("SELECT * FROM research ORDER BY year DESC")
    .all();
  return c.json(results || []);
});

app.get("/api/admin/research", verifyToken, async (c) => {
  const db = c.env.DB;
  const { results } = await db
    .prepare("SELECT * FROM research ORDER BY year DESC")
    .all();
  return c.json(results || []);
});

app.post(
  "/api/admin/research",
  verifyToken,
  zValidator("json", ResearchCreateSchema),
  async (c) => {
    const data = c.req.valid("json");
    const db = c.env.DB;

    const id = makeId();
    const created_at = nowUtc();

    await db
      .prepare(
        "INSERT INTO research (id, title, authors, abstract, journal, year, doi, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      )
      .bind(
        id,
        data.title,
        data.authors,
        data.abstract,
        data.journal || null,
        data.year,
        data.doi || null,
        created_at
      )
      .run();

    const result = await db
      .prepare("SELECT * FROM research WHERE id = ?")
      .bind(id)
      .first();
    return c.json(cleanDoc(result));
  }
);

app.delete("/api/admin/research/:rid", verifyToken, async (c) => {
  const rid = c.req.param("rid");
  const db = c.env.DB;

  await db.prepare("DELETE FROM research WHERE id = ?").bind(rid).run();
  return c.json({ message: "Deleted" });
});

// Contact
app.post("/api/contact", zValidator("json", ContactCreateSchema), async (c) => {
  const data = c.req.valid("json");
  const db = c.env.DB;

  const id = makeId();
  const created_at = nowUtc();

  await db
    .prepare(
      "INSERT INTO contact_messages (id, name, email, phone, message, read, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)"
    )
    .bind(
      id,
      data.name,
      data.email,
      data.phone || null,
      data.message,
      0,
      created_at
    )
    .run();

  return c.json({ message: "Message sent successfully", id });
});

app.get("/api/admin/contact", verifyToken, async (c) => {
  const db = c.env.DB;
  const { results } = await db
    .prepare("SELECT * FROM contact_messages ORDER BY created_at DESC")
    .all();
  return c.json(results || []);
});

app.patch("/api/admin/contact/:mid/read", verifyToken, async (c) => {
  const mid = c.req.param("mid");
  const db = c.env.DB;

  await db
    .prepare("UPDATE contact_messages SET read = 1 WHERE id = ?")
    .bind(mid)
    .run();
  return c.json({ message: "Marked as read" });
});

// Testimonials
app.get("/api/testimonials", async (c) => {
  const db = c.env.DB;
  const { results } = await db
    .prepare("SELECT * FROM testimonials ORDER BY created_at DESC")
    .all();
  return c.json(results || []);
});

app.post(
  "/api/admin/testimonials",
  verifyToken,
  zValidator("json", TestimonialCreateSchema),
  async (c) => {
    const data = c.req.valid("json");
    const db = c.env.DB;

    const id = makeId();
    const created_at = nowUtc();

    await db
      .prepare(
        "INSERT INTO testimonials (id, name, title, message, rating, created_at) VALUES (?, ?, ?, ?, ?, ?)"
      )
      .bind(id, data.name, data.title, data.message, data.rating, created_at)
      .run();

    const result = await db
      .prepare("SELECT * FROM testimonials WHERE id = ?")
      .bind(id)
      .first();
    return c.json(cleanDoc(result));
  }
);

app.delete("/api/admin/testimonials/:tid", verifyToken, async (c) => {
  const tid = c.req.param("tid");
  const db = c.env.DB;

  await db.prepare("DELETE FROM testimonials WHERE id = ?").bind(tid).run();
  return c.json({ message: "Deleted" });
});

export default app;
