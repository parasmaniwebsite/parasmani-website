import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import api from "../utils/serviceAPI";

import heroImg from "../assets/blogs/heroImg.png";

const backendURL = import.meta.env.VITE_BACKEND_URI;

const BlogPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await api.get("/api/blog");
      if (response.data.success) {
        setBlogPosts(response.data.blogs || []);
      }
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    const uniqueCategoryNames = [
      ...new Set(
        blogPosts
          .map((blog) => {
            if (!blog.category) return null;
            return typeof blog.category === "object"
              ? blog.category.name
              : blog.category;
          })
          .filter(Boolean),
    ),
  ];
  return ["All", ...uniqueCategoryNames];
}, [blogPosts]);

  const filteredBlogs = useMemo(() => {
    if (activeFilter === "All") return blogPosts;
    return blogPosts.filter((blog) => {
      if (!blog.category) return false;
      const blogCatName =
        typeof blog.category === "object" ? blog.category.name : blog.category;
      return blogCatName?.toLowerCase() === activeFilter.toLowerCase();
    });
  }, [blogPosts, activeFilter]);

  return (
    <div className="min-h-screen bg-white font-sans text-[#1a1a1a]">
      {/* Header — mobile (stacked, image on top, centered text) */}
      <div className="md:hidden bg-white">
        <div className="relative w-full h-[190px]">
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent z-10" />
          <img
            src={heroImg}
            alt="Insights & News background layout featuring newspapers, coffee, and copper fittings"
            className="w-full h-full object-cover object-center select-none"
          />
        </div>
        <div className="px-5 pt-5 pb-8 text-center">
          <h1 className="h1 text-[#18234D] tracking-tight mb-3">Insights & News</h1>
          <p className="p1 text-[#19234D] font-light leading-relaxed opacity-95 font-albert max-w-[440px] mx-auto">
            Latest engineering insights, industry updates, and technical articles
            from Parasmani experts.
          </p>
        </div>
      </div>

      {/* Header — desktop */}
      <header className="relative w-full bg-white overflow-hidden select-none min-h-[220px] md:min-h-[260px] lg:min-h-[280px] hidden md:flex md:items-center">
        {/* Right Side: Image background with extended soft fade to match image_5ffddd.jpg */}
        <div className="absolute inset-y-0 right-0 w-full md:w-2/3 lg:w-3/5 z-0 pointer-events-none">
          {/* Soft gradient mask blending into the white background */}
          <div className="absolute inset-y-0 left-0 w-full md:w-1/3 bg-gradient-to-r from-white/60 to-transparent z-10" />
          <img
            src={heroImg}
            alt="Insights & News background layout featuring newspapers, coffee, and copper fittings"
            className="w-full h-full object-cover object-right select-none"
          />
        </div>

        {/* Left Side: Typography Content */}
        <div className="relative z-20 w-full max-w-[1360px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-8 md:py-0">
          <div className="max-w-[480px]">
            <h1 className="h1 text-[#18234D] tracking-tight mb-4">
              Insights & News
            </h1>
            <p className="p1 text-[#19234D] font-light leading-5 max-w-[340px] md:max-w-[480px] opacity-95 font-albert">
              Latest engineering insights, industry updates, and technical <br />
              articles from Parasmani experts.
            </p>
          </div>
        </div>
      </header>

      {/* Main */}
      {/* `md:px-0` used to zero the gutter out from 768px up, so between there
         and the point the viewport clears max-w-7xl the cards ran into the
         window edge. The gutter now grows with the breakpoint instead. */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-0">
        <h2 className="h2 text-[#172045] mb-8"></h2>

        {/* Filter Tabs */}
        <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md py-6">
          {/* No gutter of its own -- <main> now owns it, and the extra px-6
             here left the filter bar inset from the cards it filters. */}
          <div className="max-w-[1269px] mx-auto">
            <div className="bg-[#EAEAEA] rounded-full p-1.5 flex items-center gap-1 overflow-x-auto [scrollbar-width:none] font-albert [&::-webkit-scrollbar]:hidden">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2 rounded-full transition-all duration-200 text-[14px] font-medium whitespace-nowrap cursor-pointer
                  ${
                    activeFilter === cat
                      ? "bg-white text-[#141C3A] shadow-sm font-semibold"
                      : "text-[#141C3A]/60 hover:text-[#141C3A]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </nav>

        {/* Loading / Empty States / Grid */}
        {loading ? (
          <div className="text-center py-20 text-lg text-gray-500 font-medium animate-pulse">
            Loading blogs...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20 text-lg text-gray-500">
            No blogs found under this category tab selection
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBlogs.map((post) => {
              const categoryBadge =
                typeof post.category === "object" && post.category !== null
                  ? post.category.name
                  : post.category;

              return (
                /* WRAP THE ENTIRE CONTAINER CARD IN A DECLARATIVE LINK COMPONENT */
                <Link
                  key={post._id}
                  to={`/blog/${post.slug || post._id}`}
                  className="group flex flex-col rounded-[18px] overflow-hidden bg-[#F9F9F9] transition-all duration-300 hover:shadow-lg border border-transparent hover:border-gray-200 w-full pb-8"
                >
                  {/* Image Container */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={
                        post.image &&
                        (post.image.startsWith("http://") ||
                          post.image.startsWith("https://"))
                          ? post.image
                          : `${backendURL}/uploads/${post.image}`
                      }
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />

                    {categoryBadge && (
                      <span className="absolute top-5 left-5 bg-white/20 backdrop-blur-md px-5 py-1.5 rounded-full text-[13px] font-normal text-white border border-white/40 tracking-wide font-albert">
                        {categoryBadge}
                      </span>
                    )}
                  </div>

                  {/* Content Container */}
                  <div className="p-7 flex flex-col flex-grow">
                    {/* Date */}
                    <p className="text-[13px] font-albert text-[#94A3B8] font-normal mb-4">
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>

                    {/* Title */}
                    <h3 className="text-[23px] font-normal text-[#272727] mb-5 leading-[1.3] line-clamp-2 font-albert tracking-tight">
                      {post.title}
                    </h3>

                    {/* Description & Action Button Row */}
                    <div className="flex items-end justify-between gap-4 mt-auto">
                      <p className="text-[#272727] text-[13px] font-albert leading-[1.6] line-clamp-3 max-w-[80%]">
                        {post.description}
                      </p>

                      {/* Action Indicator Icon */}
                      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center border border-[#1E293B] rounded-full text-[#1E293B] bg-transparent group-hover:bg-[#1E293B] group-hover:text-white transition-all duration-300">
                        <ArrowRight size={20} strokeWidth={1.5} />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default BlogPage;