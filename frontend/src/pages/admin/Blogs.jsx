import { useEffect, useMemo, useState } from "react";
import AdminLayout from "../../components/admin/AdminLayout.jsx";
import BlogCard from "../../components/admin/BlogCard.jsx";
import BlogFormModal from "../../components/admin/BlogFormModal.jsx";
import api from "../../utils/serviceAPI";
import {
  Plus,
  Trash2,
  FolderPlus,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ListOrdered,
  ArrowUp,
  ArrowDown,
  ChevronsUp,
} from "lucide-react";

const SORT_KEY = "adminBlogSort";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]); // Category State cache
  const [newCategoryName, setNewCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [error, setError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);

  // "newest" | "oldest" | "custom"
  const [sortOrder, setSortOrder] = useState(
    () => localStorage.getItem(SORT_KEY) || "newest",
  );

  // Working copy while arranging site order; null when not arranging.
  const [draftOrder, setDraftOrder] = useState(null);
  const [savingOrder, setSavingOrder] = useState(false);
  const [orderNotice, setOrderNotice] = useState("");

  useEffect(() => {
    localStorage.setItem(SORT_KEY, sortOrder);
  }, [sortOrder]);

  /**
   * The API returns blogs in insertion order — GET /api/blog does not sort —
   * so ordering is applied here. Sorting a copy keeps `blogs` as the untouched
   * server response, and undated rows fall back to 0 so they group together
   * instead of landing at random positions.
   */
  const sortedBlogs = useMemo(() => {
    // "custom" is the order the server already returned — displayOrder is the
    // primary sort on GET /api/blog — so it is left exactly as fetched.
    if (sortOrder === "custom") return blogs;

    const time = (blog) => new Date(blog.createdAt || 0).getTime() || 0;

    return [...blogs].sort((a, b) =>
      sortOrder === "newest" ? time(b) - time(a) : time(a) - time(b),
    );
  }, [blogs, sortOrder]);

  // What the arrange list renders: the unsaved draft if there is one.
  const orderList = draftOrder ?? sortedBlogs;
  const isDirty = draftOrder !== null;

  const moveBlog = (index, direction) => {
    const target = index + direction;
    const current = draftOrder ?? [...blogs];

    if (target < 0 || target >= current.length) return;

    const next = [...current];
    [next[index], next[target]] = [next[target], next[index]];

    setDraftOrder(next);
    setOrderNotice("");
  };

  const moveToTop = (index) => {
    const current = draftOrder ?? [...blogs];
    if (index === 0) return;

    const next = [...current];
    const [moved] = next.splice(index, 1);
    next.unshift(moved);

    setDraftOrder(next);
    setOrderNotice("");
  };

  const saveOrder = async () => {
    if (!draftOrder) return;

    try {
      setSavingOrder(true);
      setError("");

      await api.patch("/api/blog/reorder", {
        orderedIds: draftOrder.map((blog) => blog._id),
      });

      // Re-read rather than trusting the local array, so what the admin sees
      // next is the order the public site will actually serve.
      setDraftOrder(null);
      await getBlogs();
      setOrderNotice("Order saved — this is what visitors now see.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to save the blog order",
      );
    } finally {
      setSavingOrder(false);
    }
  };

  const discardOrder = () => {
    setDraftOrder(null);
    setOrderNotice("");
  };

  // FETCH 1: Get Blogs
  const getBlogs = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await api.get("/api/blog");
      setBlogs(res.data.blogs || []);
    } catch (error) {
      console.error("Error fetching blogs:", error);
      setError(error.response?.data?.message || "Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  // FETCH 2: Get Existing Categories
  const getCategories = async () => {
    try {
      setCategoryLoading(true);
      const res = await api.get("/api/category");
      setCategories(res.data.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setCategoryLoading(false);
    }
  };

  // FETCH 3: Post New Category
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    try {
      setError("");
      const res = await api.post("/api/category", { name: newCategoryName.trim() });
      if (res.data.success && res.data.category) {
        // Defensive normalization: Ensure an object with valid properties is added
        const freshCategory = {
          _id: res.data.category._id,
          name: res.data.category.name || newCategoryName.trim()
        };
        setCategories((prev) => [...prev, freshCategory]);
        setNewCategoryName("");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      setError(error.response?.data?.message || "Failed to create category");
    }
  };

  // FETCH 4: Delete Category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category? Blogs under this category might lose their link assignment.")) return;

    try {
      setError("");
      const res = await api.delete(`/api/category/${id}`);
      if (res.data.success) {
        setCategories((prev) => prev.filter((cat) => {
          const catId = typeof cat === "object" && cat !== null ? cat._id : cat;
          return catId !== id;
        }));
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      setError(error.response?.data?.message || "Failed to delete category");
    }
  };

  const deleteBlog = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/api/blog/${id}`);
      setError("");
      getBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      setError(error.response?.data?.message || "Failed to delete blog");
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setIsModalOpen(true);
  };

  const handleAddBlog = () => {
    setEditingBlog(null);
    setIsModalOpen(true);
  };

  // Initialize Core Data Sources
  useEffect(() => {
    getBlogs();
    getCategories();
  }, []);

  return (
    <AdminLayout title="Blogs">
      <div>
        <div className="mx-auto max-w-[1600px]">
          {/* HEADER LAYER ELEMENT */}
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="h1 text-[#141C3A]">
                Insights & News
              </h1>
              <p className="mt-2 text-[15px] text-[#6D7487]">
                Manage all blogs, structural articles, and categories.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Segmented sort control — two states, so a pair of buttons
                  reads faster than a dropdown. */}
              <div
                role="group"
                aria-label="Sort blogs by date"
                className="flex h-[52px] shrink-0 items-center rounded-full border border-[#ECECEC] bg-white p-1.5"
              >
                {[
                  { value: "newest", label: "Newest", icon: ArrowDownWideNarrow, hint: "Newest first" },
                  { value: "oldest", label: "Oldest", icon: ArrowUpNarrowWide, hint: "Oldest first" },
                  { value: "custom", label: "Site order", icon: ListOrdered, hint: "Arrange what visitors see" },
                ].map(({ value, label, icon: Icon, hint }) => {
                  const isActive = sortOrder === value;

                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => {
                        // Switching away would silently drop unsaved moves.
                        if (isDirty && value !== "custom") discardOrder();
                        setSortOrder(value);
                      }}
                      aria-pressed={isActive}
                      title={hint}
                      className={`flex h-full items-center gap-2 rounded-full px-4 text-[14px] font-medium transition-all ${
                        isActive
                          ? "bg-[#141C3A] text-white"
                          : "text-[#6D7487] hover:text-[#141C3A]"
                      }`}
                    >
                      <Icon size={16} />
                      {label}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={handleAddBlog}
                className="h-[52px] shrink-0 rounded-full bg-[#141C3A] px-7 text-[15px] font-medium text-white transition-all hover:bg-[#1f2a52] sm:w-auto"
              >
                Add Blog
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-100 p-4 text-red-700 font-medium">
              {error}
            </div>
          )}

          {/* SPLIT MANAGE GRID DESIGN */}
          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">

            {/* LEFT COLUMN PANEL: Categories Inline Manager tool */}
            <div className="bg-white border border-[#ECECEC] rounded-[24px] p-6 shadow-sm lg:col-span-4">
              <div className="flex items-center gap-2 mb-4">
                <FolderPlus size={18} className="text-[#141C3A]" />
                <h2 className="h2 text-[#141C3A]">Blog Categories</h2>
              </div>

              {/* Quick Post Submission form input */}
              <form onSubmit={handleCreateCategory} className="flex gap-2 mb-5">
                <input
                  type="text"
                  placeholder="New category..."
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="flex-1 px-4 h-[44px] rounded-xl border border-[#ECECEC] text-[14px] font-medium text-[#141C3A] focus:outline-none focus:border-slate-400"
                />
                <button
                  type="submit"
                  className="w-[44px] h-[44px] flex items-center justify-center rounded-xl bg-[#141C3A] text-white transition-transform active:scale-95"
                  title="Add Category"
                >
                  <Plus size={18} />
                </button>
              </form>

              {/* Render lists dynamically */}
              <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
                {categoryLoading && categories.length === 0 ? (
                  <p className="text-[13px] text-[#8A8FA3] animate-pulse py-2">Syncing categories...</p>
                ) : categories.length > 0 ? (
                  categories.map((cat) => {
                    // CRITICAL DEFENSIVE FIX: Extract key values safely to prevent child rendering failures
                    const categoryId = typeof cat === "object" && cat !== null ? cat._id : cat;
                    const categoryName = typeof cat === "object" && cat !== null ? (cat.name || "Unnamed") : String(cat);

                    return (
                      <div
                        key={categoryId || Math.random().toString()}
                        className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#FAFAFA] hover:bg-[#F3F3F3] transition-colors"
                      >
                        {/* Guaranteed clean text primitive injection */}
                        <span className="text-[14px] font-semibold text-[#5F6472]">
                          {categoryName}
                        </span>
                        
                        <button
                          type="button"
                          onClick={() => handleDeleteCategory(categoryId)}
                          className="text-[#8A8FA3] hover:text-red-600 p-1 transition-colors"
                          title="Delete Category"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-[13px] text-[#8A8FA3] py-2 italic">No categories yet.</p>
                )}
              </div>
            </div>

            {/* RIGHT COLUMN PANEL: Blogs Grid Output Renderer */}
            <div className="lg:col-span-8">
              {loading ? (
                <div className="flex h-[300px] items-center justify-center rounded-[28px] border border-dashed bg-white">
                  <p className="text-[#6D7487] font-medium animate-pulse">Loading blogs container matrix...</p>
                </div>
              ) : blogs.length > 0 ? (
                sortOrder === "custom" ? (
                  /* Arranging is a vertical list, not the two-column card
                     grid — "move up" is meaningless when the row above is
                     actually the item to the left. */
                  <div>
                    <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-[#ECECEC] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                      <p className="text-[14px] leading-[21px] text-[#5F6472]">
                        {isDirty ? (
                          <span className="font-semibold text-[#141C3A]">
                            Unsaved changes — save to publish this order.
                          </span>
                        ) : orderNotice ? (
                          <span className="font-semibold text-emerald-600">
                            {orderNotice}
                          </span>
                        ) : (
                          "Top to bottom is the order visitors see on the site."
                        )}
                      </p>

                      <div className="flex shrink-0 gap-3">
                        <button
                          type="button"
                          onClick={discardOrder}
                          disabled={!isDirty || savingOrder}
                          className="h-[42px] rounded-full border border-[#ECECEC] bg-white px-5 text-[14px] font-medium text-[#141C3A] transition-all hover:bg-[#F5F5F5] disabled:opacity-40"
                        >
                          Discard
                        </button>
                        <button
                          type="button"
                          onClick={saveOrder}
                          disabled={!isDirty || savingOrder}
                          className="h-[42px] rounded-full bg-[#141C3A] px-6 text-[14px] font-medium text-white transition-all hover:bg-[#1f2a52] disabled:opacity-40"
                        >
                          {savingOrder ? "Saving..." : "Save Order"}
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      {orderList.map((blog, index) => (
                        <div
                          key={blog._id}
                          className="flex items-center gap-4 rounded-2xl border border-[#ECECEC] bg-white p-4 shadow-sm"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#141C3A] text-[14px] font-bold text-white">
                            {index + 1}
                          </span>

                          <img
                            src={blog.image}
                            alt=""
                            className="hidden h-14 w-20 shrink-0 rounded-lg object-cover sm:block"
                          />

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-[15px] font-semibold text-[#141C3A]">
                              {blog.title}
                            </p>
                            <p className="mt-0.5 text-[13px] text-[#8A8FA3]">
                              {blog.category?.name || "Uncategorised"}
                            </p>
                          </div>

                          <div className="flex shrink-0 items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => moveToTop(index)}
                              disabled={index === 0}
                              aria-label={`Move "${blog.title}" to top`}
                              title="Move to top"
                              className="rounded-lg border border-[#ECECEC] p-2 text-[#141C3A] transition-colors hover:bg-[#F5F5F5] disabled:opacity-30 disabled:hover:bg-white"
                            >
                              <ChevronsUp size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveBlog(index, -1)}
                              disabled={index === 0}
                              aria-label={`Move "${blog.title}" up`}
                              title="Move up"
                              className="rounded-lg border border-[#ECECEC] p-2 text-[#141C3A] transition-colors hover:bg-[#F5F5F5] disabled:opacity-30 disabled:hover:bg-white"
                            >
                              <ArrowUp size={16} />
                            </button>
                            <button
                              type="button"
                              onClick={() => moveBlog(index, 1)}
                              disabled={index === orderList.length - 1}
                              aria-label={`Move "${blog.title}" down`}
                              title="Move down"
                              className="rounded-lg border border-[#ECECEC] p-2 text-[#141C3A] transition-colors hover:bg-[#F5F5F5] disabled:opacity-30 disabled:hover:bg-white"
                            >
                              <ArrowDown size={16} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {sortedBlogs.map((blog) => (
                      <BlogCard
                        key={blog._id}
                        blog={blog}
                        onDelete={deleteBlog}
                        onEdit={handleEdit}
                      />
                    ))}
                  </div>
                )
              ) : (
                <div className="flex h-[300px] items-center justify-center rounded-[28px] border border-dashed bg-white">
                  <p className="text-[#8A8FA3] font-medium">No blogs available</p>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      <BlogFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        getBlogs={getBlogs}
        editingBlog={editingBlog}
        categories={categories}
      />
    </AdminLayout>
  );
};

export default Blogs;