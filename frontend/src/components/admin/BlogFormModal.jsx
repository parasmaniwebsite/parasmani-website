import { useEffect, useState } from "react";
import api from "../../utils/serviceAPI";

const BlogFormModal = ({
  isOpen,
  onClose,
  getBlogs,
  editingBlog,
  categories = [],
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "", // Handles assigned category matching standard id values
  });

  const [image, setImage] = useState(null);

  useEffect(() => {
    if (editingBlog) {
      setFormData({
        title: editingBlog.title || "",
        description: editingBlog.description || "",
        category: editingBlog.category?._id || editingBlog.category || "",
        content: editingBlog.content || "",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        category: "",
        content: "",
      });
      setImage(null);
    }
    setError("");
    setSuccess("");
  }, [editingBlog, isOpen]); // Added isOpen dependency to safely clear form data on close operations

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation Layout Layers
    if (!formData.title.trim()) {
      setError("Please enter blog title");
      return;
    }

    if (!formData.description.trim()) {
      setError("Please enter blog description");
      return;
    }

    if (!formData.category) {
      setError("Please select a valid blog category from the options menu");
      return;
    }

    if (!formData.content.trim()) {
      setError("Please enter blog content");
      return;
    }

    if (!editingBlog && !image) {
      setError("Please select an image for the blog");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const blogData = new FormData();
      blogData.append("title", formData.title.trim());
      blogData.append("description", formData.description.trim());
      blogData.append("category", formData.category); // Pushes the selected option's value back safely
      blogData.append("content", formData.content.trim());

      if (image) {
        blogData.append("image", image);
      }

      // Let the browser set the Content-Type with proper boundary for FormData
      const config = {};

      // UPDATE
      if (editingBlog) {
        await api.put(`/api/blog/${editingBlog._id}`, blogData, config);
        setSuccess("Blog updated successfully!");
      } else {
        // CREATE
        await api.post("/api/blog", blogData, config);
        setSuccess("Blog created successfully!");
      }

      setTimeout(() => {
        getBlogs();
        onClose();

        setFormData({
          title: "",
          description: "",
          category: "",
          content: "",
        });
        setImage(null);
        setError("");
        setSuccess("");
      }, 1500);
    } catch (error) {
      console.error(error);
      const errorMsg =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-[700px] rounded-[28px] bg-white p-8 max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="h2 text-[#141C3A]">
            {editingBlog ? "Update Blog" : "Add Blog"}
          </h2>
          <button
            onClick={onClose}
            className="text-[28px] text-[#8A8FA3] hover:text-[#141C3A] transition-colors"
          >
            ×
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-100 p-4 text-red-700 font-medium text-[14px]">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 rounded-xl bg-green-50 border border-green-100 p-4 text-green-700 font-medium text-[14px]">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <input
            type="text"
            name="title"
            placeholder="Blog Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="h-[56px] rounded-2xl border border-[#ECECEC] px-5 outline-none focus:border-[#141C3A] font-medium text-[15px] text-[#141C3A]"
          />

          <textarea
            name="description"
            placeholder="Short Description"
            value={formData.description}
            onChange={handleChange}
            required
            className="min-h-[100px] rounded-2xl border border-[#ECECEC] p-5 outline-none focus:border-[#141C3A] font-medium text-[15px] text-[#141C3A] resize-none"
          />

          {/* DYNAMIC CATEGORIES SELECT DROPDOWN */}
          <div className="flex flex-col gap-1.5 w-full">
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="h-[56px] w-full rounded-2xl border border-[#ECECEC] px-5 bg-white outline-none focus:border-[#141C3A] font-medium text-[15px] text-[#141C3A] cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236D7487' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 20px center",
                backgroundSize: "16px",
              }}
            >
              <option value="" disabled className="text-gray-400">
                Select a Blog Category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id || cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <textarea
            name="content"
            placeholder="Blog Content"
            value={formData.content}
            onChange={handleChange}
            required
            className="min-h-[200px] rounded-2xl border border-[#ECECEC] p-5 outline-none focus:border-[#141C3A] font-medium text-[15px] text-[#141C3A]"
          />

          <div className="rounded-2xl border border-dashed border-[#CBD5E1] p-5 hover:bg-[#FAFAFA] transition-colors">
            <label className="cursor-pointer block">
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                className="hidden"
              />
              <div className="text-center">
                {image ? (
                  <p className="text-emerald-600 font-semibold text-[14px]">
                    ✓ Selected: {image.name}
                  </p>
                ) : (
                  <p className="text-[#6D7487] text-[14px] font-medium">
                    Click to upload alternative thumbnail image file
                  </p>
                )}
              </div>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="h-[56px] rounded-full bg-[#141C3A] text-white text-[15px] font-semibold tracking-wide shadow-md transition-all hover:bg-[#1f2a52] disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
          >
            {loading
              ? "Please wait..."
              : editingBlog
                ? "Update Blog Entry"
                : "Create Blog Entry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BlogFormModal;
