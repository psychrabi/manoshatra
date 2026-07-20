import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useBlogPreview } from "../../hooks/useQueries";

export default function BlogPreview() {
  const { data: posts } = useBlogPreview(3);
  if (!posts || posts.length === 0) return null;
  return (
    <section className="py-16 md:py-24 bg-white" data-testid="blog-preview">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12">
          <span className="section-badge">Latest Articles</span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-brand-text">
            Mental Health Insights
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.slice(0, 3).map((post, i) => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className="group"
              data-testid={`blog-card-${i}`}
            >
              <div className="bg-brand-beige rounded-2xl overflow-hidden card-hover">
                {post.image_url && (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="p-5">
                  <span className="text-xs font-bold text-brand-green uppercase tracking-wide">
                    {post.category}
                  </span>
                  <h3 className="font-heading font-bold text-brand-text text-base mt-2 mb-2 line-clamp-2 group-hover:text-brand-green transition-colors duration-200">
                    {post.title}
                  </h3>
                  <p className="text-brand-muted text-sm line-clamp-2">
                    {post.excerpt}
                  </p>
                  <p className="text-brand-muted text-xs mt-3">
                    By {post.author}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link to="/blog" className="btn-outline" data-testid="all-posts-btn">
            Read All Articles <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
