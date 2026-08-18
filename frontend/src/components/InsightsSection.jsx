import { GoArrowRight, GoArrowLeft } from "react-icons/go";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import api from "../utils/serviceAPI";

const backendURL = import.meta.env.VITE_BACKEND_URI;

const InsightsSection = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const containerRef = useRef(null);

  // Fetch blogs from API
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setIsLoading(true);
        const res = await api.get("/api/blog");
        if (res.data?.success && Array.isArray(res.data.blogs)) {
          // Order comes from the server (admin's displayOrder, newest-first as
          // the tie-break). Re-sorting here would throw that arrangement away.
          const blogs = res.data.blogs.map((b) => ({
            category:
              typeof b.category === "object" && b.category
                ? b.category.name
                : b.category,
            date: new Date(b.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
            title: b.title,
            desc: b.description,
            image: b.image,
            id: b._id,
            slug: b.slug,
          }));
          if (mounted) setArticles(blogs);
        }
      } catch (err) {
        console.error("Failed to load insights:", err);
      } finally {
        if (mounted) setIsLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Handle responsive visible card calculation dynamically
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize(); // Run on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Slider Navigation Handlers
  const maxIndex = Math.max(0, articles.length - visibleCards);

  // Refactored to translate component indexing to sleek horizontal scroll offsets
  const handlePrev = () => {
    const nextIndex = Math.max(0, currentIndex - 1);
    setCurrentIndex(nextIndex);
    if (containerRef.current) {
      const cardElement = containerRef.current.querySelector(".article-card-item");
      if (cardElement) {
        containerRef.current.scrollTo({
          left: nextIndex * cardElement.clientWidth,
          behavior: "smooth",
        });
      }
    }
  };

  const handleNext = () => {
    const nextIndex = Math.min(maxIndex, currentIndex + 1);
    setCurrentIndex(nextIndex);
    if (containerRef.current) {
      const cardElement = containerRef.current.querySelector(".article-card-item");
      if (cardElement) {
        containerRef.current.scrollTo({
          left: nextIndex * cardElement.clientWidth,
          behavior: "smooth",
        });
      }
    }
  };

  // Safe image path parser
  const getImageUrl = (img) => {
    if (!img) return "https://via.placeholder.com/600x400?text=No+Image";
    return img.startsWith("http://") || img.startsWith("https://")
      ? img
      : `${backendURL}/uploads/${img}`;
  };

  return (
    <section className="bg-white py-[80px] px-6 lg:px-10 overflow-hidden">
      <div className="max-w-[1269px] mx-auto">
        {/* Header Area */}
        <div className="mb-[40px] flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <h2 className="h2 tracking-wide text-[#272727] leading-[1.1] mb-4">
              Insights and News 
            </h2>
            <p className="p2 font-albert text-[#272727] opacity-85 max-w-[800px]">
              Latest engineering insights, industry updates, and technical
              articles from Parasmani experts.
            </p>
          </div>
        </div>

        {/* Carousel Window */}
        <div className="relative mb-[40px]">
          <div className="overflow-visible lg:-mx-[15px] px-[15px] -my-4">
            {/* Switched to a beautifully optimized native horizontal track with concealed scrollbars */}
            <div
              ref={containerRef}
              className="flex overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar py-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>{`
                div::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              
              {isLoading ? (
                // Professional Skeleton Loader
                Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={idx}
                    className="px-[15px] shrink-0"
                    style={{ width: `${100 / visibleCards}%` }}
                  >
                    <div className="border-[1.2px] border-gray-200 rounded-[24px] bg-gray-50 h-[520px] animate-pulse" />
                  </div>
                ))
              ) : articles.length === 0 ? (
                <div className="w-full py-12 text-center text-gray-500 font-albert">
                  No insights found. Check back later!
                </div>
              ) : (
                // Render Articles
                articles.map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="article-card-item px-[15px] shrink-0 flex flex-col snap-start"
                    style={{ width: `${100 / visibleCards}%` }}
                  >
                    <Link
                      to={`/blog/${item.slug || item.id}`}
                      className="rounded-[24px] overflow-hidden flex flex-col flex-1 group cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 bg-[#FBFBFB] h-full border border-transparent hover:border-[1.2px] hover:border-[#C68344]"
                    >
                      {/* Image Container */}
                      <div className="relative h-[220px] overflow-hidden shrink-0">
                        <img
                          src={getImageUrl(item.image)}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          loading="lazy"
                        />
                        <div className="absolute top-5 left-5">
                          <span className="bg-white px-4 py-1.5 rounded-full font-albert text-[11px] font-bold uppercase tracking-wider text-[#272727] opacity-65 shadow-sm">
                            {item.category || "General"}
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 flex flex-col flex-1 justify-between">
                        <div>
                          <span className="block font-albert text-[13px] font-medium text-[#272727] opacity-30 mb-4">
                            {item.date}
                          </span>
                          <h3 className="font-albert font-extralight text-[20px] text-[#272727] leading-[1.2] mb-4 group-hover:text-[#C67D55] transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="font-albert text-[14.5px] text-[#272727] opacity-85 leading-5 mb-4 line-clamp-3">
                            {item.desc}
                          </p>
                        </div>

                        {/* Action Link Container */}
                        <div className="flex justify-end mt-auto">
                          <button
                            type="button"
                            aria-label="Read insight"
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#141C3A]/20 text-[#141C3A] transition-all duration-300 group-hover:bg-[#141C3A] group-hover:text-white sm:h-11 sm:w-11 md:h-12 md:w-12"
                          >
                            <GoArrowRight
                              size={20}
                              className="transition-transform duration-300 group-hover:-rotate-45 sm:size-[22px]"
                            />
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Bottom Controls Area */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          <Link
            to="/blogs"
            className="b2 bg-[#19234D] text-white flex items-center gap-3 px-[32px] py-[16px] rounded-full hover:bg-[#1E2749] transition-all group shadow-lg shadow-navy/20"
          >
            <span className="font-albert b2 font-light">
              Explore Insights
            </span>
            <GoArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>

          {/* Carousel Arrows */}
          {articles.length > visibleCards && (
            <div className="flex gap-4">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`w-10 h-10 rounded-full border border-[#141C3A] flex items-center justify-center text-[#141C3A] transition-all duration-300 ${
                  currentIndex === 0
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-[#141C3A] hover:text-white"
                }`}
                aria-label="Previous Slide"
              >
                <GoArrowLeft size={22} />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex >= maxIndex}
                className={`w-10 h-10 rounded-full border border-[#141C3A] flex items-center justify-center text-[#141C3A] transition-all duration-300 ${
                  currentIndex >= maxIndex
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-[#141C3A] hover:text-white"
                }`}
                aria-label="Next Slide"
              >
                <GoArrowRight size={22} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default InsightsSection;
