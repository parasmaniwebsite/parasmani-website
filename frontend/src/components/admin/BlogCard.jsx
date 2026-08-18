import { Pencil, Trash2 } from "lucide-react";
import api from "../../utils/serviceAPI";

const BlogCard = ({ blog, onDelete, onEdit }) => {
  return (
    <div className="overflow-hidden rounded-[24px] border border-[#ECECEC] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Blog Image */}
      <img
        src={
          blog.image &&
          (blog.image.startsWith("http://") ||
            blog.image.startsWith("https://"))
            ? blog.image
            : `${api.defaults.baseURL}/uploads/${blog.image}`
        }
        alt={blog.title}
        className="h-[220px] w-full object-cover"
      />

      {/* Content */}
      <div className="p-5">
        {/* Date */}
        <p className="text-[12px] text-[#8E94A3]">
          {new Date(blog.createdAt).toDateString()}
        </p>

        {/* Title */}
        <h2 className="h2 mt-2 line-clamp-2 leading-[32px] text-[#141C3A]">
          {blog.title}
        </h2>

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-[15px] leading-[26px] text-[#5E6472]">
          {blog.description}
        </p>

        {/* Category (Safe Uncaught Object Render Prevention) */}
        {blog.category && (
          <div className="mt-4">
            <span className="inline-block rounded-full bg-[#F3E8DF] px-4 py-1.5 text-[12px] font-semibold text-[#C67D55]">
              {typeof blog.category === "object" && blog.category !== null
                ? blog.category.name
                : blog.category}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3">
          {/* Edit */}
          <button
            onClick={() => onEdit(blog)}
            className="flex h-[42px] items-center gap-2 rounded-full bg-[#141C3A] px-5 text-[14px] font-medium text-white transition-all hover:bg-[#1E2B5C] active:scale-95"
          >
            <Pencil size={15} />
            Edit
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(blog._id)}
            className="flex h-[42px] items-center gap-2 rounded-full border border-red-200 px-5 text-[14px] font-medium text-red-500 transition-all hover:bg-red-50 hover:border-red-500 active:scale-95"
          >
            <Trash2 size={15} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
