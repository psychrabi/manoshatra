DROP TABLE IF EXISTS appointments;
CREATE TABLE appointments (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    preferred_date TEXT NOT NULL,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TEXT NOT NULL
);

DROP TABLE IF EXISTS blog_posts;
CREATE TABLE blog_posts (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT NOT NULL,
    author TEXT NOT NULL,
    category TEXT NOT NULL,
    image_url TEXT,
    tags TEXT,
    published INTEGER NOT NULL DEFAULT 1,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

DROP TABLE IF EXISTS research;
CREATE TABLE research (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    authors TEXT NOT NULL,
    abstract TEXT NOT NULL,
    journal TEXT,
    year INTEGER NOT NULL,
    doi TEXT,
    created_at TEXT NOT NULL
);

DROP TABLE IF EXISTS contact_messages;
CREATE TABLE contact_messages (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT NOT NULL,
    read INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
);

DROP TABLE IF EXISTS testimonials;
CREATE TABLE testimonials (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    rating INTEGER NOT NULL DEFAULT 5,
    created_at TEXT NOT NULL
);
