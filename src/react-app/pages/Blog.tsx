import axios from "axios";
import { Calendar, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { BlogPost } from "../types";

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState("All");
  const LIMIT = 9;

  useEffect(() => {
    axios
      .get(`/api/blog?page=${page}&limit=${LIMIT}`)
      .then((r) => {
        setPosts(r.data.posts || []);
        setTotal(r.data.total || 0);
      })
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [page]);

  const categories = ["All", ...new Set(posts.map((p) => p.category))];
  const filtered =
    category === "All" ? posts : posts.filter((p) => p.category === category);

  return (
    <div data-testid="blog-page">
      <section className="page-hero" data-testid="blog-hero">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl text-center">
          <span className="section-badge">Mental Health Insights</span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-brand-text mt-2 mb-4">
            Our Blog
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto">
            Evidence-based articles and insights on mental health, wellbeing,
            and psychological wellness from our expert team.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white" data-testid="blog-list">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          {/* Category Filter */}
          <div
            className="flex flex-wrap gap-2 mb-10"
            data-testid="blog-categories"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  category === cat
                    ? "bg-brand-green text-white shadow-md"
                    : "bg-brand-beige text-brand-muted hover:bg-brand-beige-dark"
                }`}
                data-testid={`category-${cat}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-brand-beige rounded-2xl overflow-hidden animate-pulse"
                >
                  <div className="h-48 bg-gray-200" />
                  <div className="p-5 space-y-3">
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded" />
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div
              className="text-center py-20 text-brand-muted"
              data-testid="blog-empty"
            >
              <p className="text-xl font-heading font-bold">
                No articles found
              </p>
              <p className="mt-2">Check back soon for new content.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((post, i) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className="group bg-brand-beige rounded-2xl overflow-hidden card-hover flex flex-col"
                  data-testid={`blog-post-${i}`}
                >
                  {post.image_url && (
                    <div className="overflow-hidden h-48">
                      <img
                        src={post.image_url}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs font-bold text-brand-green bg-green-50 px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-brand-text text-base mb-2 line-clamp-2 group-hover:text-brand-green transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="text-brand-muted text-sm line-clamp-3 mb-4 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-brand-muted pt-3 border-t border-border">
                      <span className="flex items-center gap-1">
                        <User size={12} /> {post.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />{" "}
                        {new Date(post.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {total > LIMIT && (
            <div
              className="flex justify-center gap-3 mt-12"
              data-testid="blog-pagination"
            >
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-5 py-2 rounded-full bg-brand-beige text-brand-muted font-semibold text-sm disabled:opacity-40 hover:bg-brand-beige-dark transition-colors duration-200"
                data-testid="prev-page"
              >
                Previous
              </button>
              <span className="px-5 py-2 text-sm text-brand-muted">
                Page {page} of {Math.ceil(total / LIMIT)}
              </span>
              <button
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= Math.ceil(total / LIMIT)}
                className="px-5 py-2 rounded-full bg-brand-green text-white font-semibold text-sm disabled:opacity-40 hover:bg-brand-green-dark transition-colors duration-200"
                data-testid="next-page"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
export default Blog;
