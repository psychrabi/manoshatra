import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import type { BlogPost } from "../types";

function formatContent(content: string) {
  if (!content) return "";
  return content
    .split("\n")
    .map((line: string) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return `<h3 style="font-family:Merriweather,serif;font-size:1.25rem;font-weight:700;color:#2C3E50;margin:1.5rem 0 0.5rem">${line.slice(
          2,
          -2
        )}</h3>`;
      }
      if (line.match(/^\d+\.\s/)) {
        return `<p style="margin-bottom:0.5rem;padding-left:1rem">${line}</p>`;
      }
      if (line.startsWith("- ")) {
        return `<p style="margin-bottom:0.5rem;padding-left:1rem">• ${line.slice(
          2
        )}</p>`;
      }
      if (line.trim() === "") return "<br/>";
      return `<p style="margin-bottom:1rem;line-height:1.8">${line}</p>`;
    })
    .join("");
}

const BlogDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/blog/${id}`)
      .then((r) => setPost(r.data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="animate-pulse space-y-4 w-full max-w-2xl mx-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-64 bg-gray-200 rounded-2xl" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    );

  if (error || !post)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="font-heading text-2xl font-bold text-brand-text mb-4">
            Article Not Found
          </h2>
          <Link to="/blog" className="btn-primary" data-testid="back-to-blog">
            Back to Blog
          </Link>
        </div>
      </div>
    );

  return (
    <div className="bg-white min-h-screen" data-testid="blog-detail-page">
      {/* Hero */}
      {post.image_url && (
        <div className="relative h-72 md:h-96 overflow-hidden mt-16">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto max-w-4xl">
              <span className="text-xs font-bold text-white bg-brand-green px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 md:px-6 max-w-4xl py-12">
        {/* Back */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-brand-muted hover:text-brand-green transition-colors duration-200 mb-6 text-sm font-semibold"
          data-testid="back-link"
        >
          <ArrowLeft size={16} /> Back to Blog
        </Link>

        {!post.image_url && (
          <span className="text-xs font-bold text-brand-green bg-green-50 px-3 py-1 rounded-full">
            {post.category}
          </span>
        )}

        <h1 className="font-heading text-3xl md:text-4xl font-bold text-brand-text mt-4 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-5 text-sm text-brand-muted mb-8 pb-8 border-b border-border">
          <span className="flex items-center gap-2">
            <User size={14} className="text-brand-green" /> {post.author}
          </span>
          <span className="flex items-center gap-2">
            <Calendar size={14} className="text-brand-green" />
            {new Date(post.created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
          {post.tags && (
            <span className="flex items-center gap-2">
              <Tag size={14} className="text-brand-green" /> {post.tags}
            </span>
          )}
        </div>

        {/* Content */}
        <div
          className="text-brand-muted leading-relaxed blog-content"
          style={{ fontFamily: "Nunito, sans-serif", fontSize: "1rem" }}
          dangerouslySetInnerHTML={{ __html: formatContent(post.content) }}
          data-testid="blog-content"
        />

        {/* Footer CTA */}
        <div className="mt-12 pt-8 border-t border-border bg-brand-beige rounded-2xl p-6">
          <h3 className="font-heading font-bold text-brand-text text-lg mb-2">
            Need Professional Support?
          </h3>
          <p className="text-brand-muted text-sm mb-4">
            Our team of qualified mental health professionals is here to help.
            Book an appointment today.
          </p>
          <div className="flex gap-3">
            <Link
              to="/appointments"
              className="btn-primary text-sm py-2 px-5"
              data-testid="detail-book-btn"
            >
              Book Appointment
            </Link>
            <Link
              to="/blog"
              className="btn-outline text-sm py-2 px-5"
              data-testid="detail-more-btn"
            >
              More Articles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BlogDetail;
