import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Folder } from "lucide-react";
import api from "../utils/serviceAPI"; // adjust path to match your configuration
import { BRAND_SUFFIX, SITE_URL } from "../seo/pageMeta";
import { buildArticleGraph } from "../seo/schema";
import JsonLd from "../components/JsonLd";

const checkerPattern = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Crect width='40' height='40' fill='%23F8F9FA' fill-opacity='0.5'/%3E%3Crect x='40' y='40' width='40' height='40' fill='%23F8F9FA' fill-opacity='0.5'/%3E%3C/svg%3E`;

const backendURL = import.meta.env.VITE_BACKEND_URI;

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        setError("");

        // Dynamic endpoint parameter parsing
        const response = await api.get(`/api/blog/${slug}`);

        if (response.data.success) {
          setBlog(response.data.blog);
        } else {
          setError("Failed to load the article details.");
        }
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError(
          err.response?.data?.message ||
            "The article you are looking for could not be retrieved.",
        );
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBlogDetail();
      // Smoothly scroll user up to the top on dynamic mounting
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [slug]);

  // Handle populated or fallback category name cleanly to avoid object runtime issues
  const categoryName =
    typeof blog?.category === "object" && blog?.category !== null
      ? blog.category.name
      : blog?.category;

  // Render Skeleton Loader to match your layout metrics
  if (loading) {
    return (
      <div className="min-h-screen bg-white font-sans animate-pulse">
        <div className="h-[400px] w-full bg-slate-100" />
        <div className="max-w-4xl mx-auto px-6 py-16 space-y-6">
          <div className="h-4 w-32 bg-slate-200 rounded" />
          <div className="h-8 w-3/4 bg-slate-200 rounded" />
          <div className="space-y-3 pt-6">
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-full bg-slate-100 rounded" />
            <div className="h-4 w-5/6 bg-slate-100 rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Handle Error View beautifully
  if (error || !blog) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white p-8 rounded-3xl border border-gray-200 max-w-md shadow-sm">
          <p className="text-red-500 font-medium mb-4">
            {error || "Article not found"}
          </p>
          <button
            onClick={() => navigate("/blogs")}
            className="b2 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#19234D] text-white font-medium hover:bg-opacity-90 transition-all cursor-pointer"
          >
            <ArrowLeft size={16} /> Return to Insights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a1a] antialiased">
      {/* Built here rather than in seo/pageMeta.js because the post is fetched
          at runtime. React 19 hoists these into <head>. */}
      <title>{`${blog.title} | ${BRAND_SUFFIX}`}</title>
      {blog.description && (
        <meta name="description" content={blog.description} />
      )}
      <link rel="canonical" href={`${SITE_URL}/blog/${blog.slug || slug}`} />
      <meta property="og:title" content={`${blog.title} | ${BRAND_SUFFIX}`} />
      {blog.description && (
        <meta property="og:description" content={blog.description} />
      )}
      <meta property="og:url" content={`${SITE_URL}/blog/${blog.slug || slug}`} />
      <meta property="og:type" content="article" />
      <meta name="twitter:title" content={`${blog.title} | ${BRAND_SUFFIX}`} />
      {blog.description && (
        <meta name="twitter:description" content={blog.description} />
      )}

      {/* Article graph. The image is resolved the same way the hero below
          resolves it, so the markup points at the picture actually shown. */}
      <JsonLd
        graph={buildArticleGraph(blog, {
          url: `${SITE_URL}/blog/${blog.slug || slug}`,
          image: blog.image
            ? blog.image.startsWith("http://") || blog.image.startsWith("https://")
              ? blog.image
              : `${backendURL}/uploads/${blog.image}`
            : null,
          category: categoryName,
        })}
      />

      {/* 1. Full-Bleed Hero Banner Section */}
      <section
        className="relative pt-32 pb-24 px-6 md:px-12 flex items-end min-h-[420px] bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(25, 35, 77, 0.4) 0%, rgba(25, 35, 77, 0.85) 100%), url("${
            blog.image &&
            (blog.image.startsWith("http://") ||
              blog.image.startsWith("https://"))
              ? blog.image
              : `${backendURL}/uploads/${blog.image}`
          }")`,
        }}
      >
        {/* Subtle Checkered Overlay Grid */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("${checkerPattern}")`,
            backgroundSize: "60px 60px",
          }}
        />

        <div className="max-w-4xl mx-auto w-full relative z-10 text-white">
          {/* Dynamic Category Tag */}
          {categoryName && (
            <span className="inline-block bg-[#C68345] text-white text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded mb-4 shadow-sm">
              {categoryName}
            </span>
          )}

          {/* Title */}
          <h1
            className="h1 leading-tight text-white mb-6 tracking-tight max-w-3xl"
          >
            {blog.title}
          </h1>

          {/* Date Metadata */}
          <div className="flex items-center gap-2 opacity-80 text-sm font-medium">
            <Calendar size={14} />
            <p style={{ fontFamily: "var(--font-albert)" }}>
              {new Date(blog.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Main Article Content Area */}
      <main className="max-w-4xl mx-auto px-6 md:px-12 py-12 md:py-16">
        {/* Navigation Action */}
        <div className="mb-10">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-[13px] font-bold text-[#C68345] uppercase tracking-wider hover:text-[#19234D] transition-colors group"
          >
            <span className="text-base group-hover:-translate-x-0.5 transition-transform">
              ←
            </span>{" "}
            Back to Insights
          </Link>
        </div>

        {/* Short Description Lead Paragraph */}
        {blog.description && (
          <div className="mb-8">
            <p
              className="text-[18px] md:text-[20px] leading-relaxed text-[#19234D] font-medium opacity-95 max-w-3xl"
              style={{ fontFamily: "var(--font-albert)" }}
            >
              {blog.description}
            </p>
          </div>
        )}

        {/* Core Markdown/Rich Content Render Body */}
        <article
          className="prose prose-slate max-w-none text-[15px] md:text-[16px] leading-[28px] text-[#4a4a4a] tracking-normal space-y-6"
          style={{
            fontFamily: "var(--font-albert)",
            fontWeight: 400,
          }}
        >
          {/* split contents properly by newlines to cleanly preserve paragraphs structurally */}
          {blog.content?.split("\n").map((paragraph, index) => {
            if (!paragraph.trim()) return null;
            return (
              <p key={index} className="opacity-90">
                {paragraph}
              </p>
            );
          })}
        </article>
      </main>

      {/* 3. Footer Accent Line Divider */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-16">
        <hr className="border-t border-gray-100" />
      </div>
    </div>
  );
};

export default BlogDetail;
