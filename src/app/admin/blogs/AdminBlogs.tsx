"use client";

import { useState } from "react";
import { addBlog, removeBlog, updateBlog, BlogPost } from "@/actions/content";
import { uploadToCloudinary } from "@/actions/upload";
import { Trash2, FileText, Plus, Upload } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ConfirmModal } from "@/components/ui/ConfirmModal";
import Image from "next/image";

export default function AdminBlogs({ initialBlogs }: { initialBlogs: BlogPost[] }) {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Brain Health");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !excerpt || !content || !author || !category) return;
    if (!editingId && !imageFile) return;

    setIsSubmitting(true);
    try {
      let finalImageUrl = existingImageUrl;
      
      // Upload new image if provided
      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await uploadToCloudinary(formData);
        if (typeof uploadRes === 'string') {
          finalImageUrl = uploadRes;
        } else {
          throw new Error("Failed to upload image");
        }
      }

      // Generate slug and other fields
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
      const paragraphs = content.split("\n\n").filter((p) => p.trim());
      const readTime = `${Math.ceil(paragraphs.join(" ").split(" ").length / 200)} min read`;
      const date = editingId 
        ? initialBlogs.find(b => b.id === editingId)?.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

      const blogData = {
        slug,
        title,
        excerpt,
        content: paragraphs,
        author,
        date,
        readTime,
        category,
        image: finalImageUrl,
      };

      if (editingId) {
        await updateBlog({ ...blogData, id: editingId });
        cancelEdit();
      } else {
        await addBlog(blogData);
        cancelEdit();
      }
    } catch (err) {
      console.error(err);
      alert(editingId ? "Failed to update blog post." : "Failed to publish blog post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelEdit = () => {
    setTitle("");
    setExcerpt("");
    setContent("");
    setAuthor("");
    setCategory("Brain Health");
    setImageFile(null);
    setExistingImageUrl("");
    setEditingId(null);
  };

  const handleEditClick = (blog: BlogPost) => {
    setEditingId(blog.id);
    setTitle(blog.title);
    setExcerpt(blog.excerpt);
    setContent(blog.content.join("\n\n"));
    setAuthor(blog.author);
    setCategory(blog.category);
    setExistingImageUrl(blog.image);
    setImageFile(null);
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRemoveBlog = (id: string) => {
    setBlogToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteBlog = async () => {
    if (!blogToDelete) return;
    setIsDeleting(true);
    try {
      await removeBlog(blogToDelete);
      setDeleteModalOpen(false);
      setBlogToDelete(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete post.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <SectionLabel>Admin Panel</SectionLabel>
          <h1 className="font-display text-4xl font-bold text-brand-navy mt-2">
            Manage Blog Posts
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Add New Blog Form */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-navy-light/10 flex items-center justify-center text-brand-navy">
                  {editingId ? <FileText className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <h2 className="font-display text-xl font-bold text-brand-navy">
                  {editingId ? "Edit Post" : "Add New Post"}
                </h2>
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-brand-gold outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                    <input
                      type="text"
                      required
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-brand-gold outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                      type="text"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-brand-gold outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-brand-navy mb-1.5">Cover Image (Required)</label>
                  {existingImageUrl && (
                    <div className="mb-2 text-sm text-gray-500">
                      Current image: <span className="font-mono text-xs truncate max-w-[200px] inline-block align-bottom">{existingImageUrl.split('/').pop()}</span>
                    </div>
                  )}
                  <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-brand-gold/50 transition-colors bg-gray-50/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      required={!editingId}
                    />
                    <div className="flex flex-col items-center justify-center text-gray-500 gap-2 pointer-events-none">
                      <Upload className="w-6 h-6 text-brand-navy/40" />
                      <span className="text-sm font-medium">
                        {imageFile ? imageFile.name : (editingId ? "Select new image (optional)" : "Click to select image file")}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Excerpt (Short Summary)</label>
                  <textarea
                    required
                    rows={2}
                    value={excerpt}
                    onChange={(e) => setExcerpt(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-brand-gold outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content (Use double line breaks for paragraphs)</label>
                  <textarea
                    required
                    rows={6}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-brand-gold outline-none resize-none"
                  />
                </div>
                <div className="pt-2 flex gap-3">
                  {editingId && (
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 py-3 px-4 rounded-xl font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-brand-navy text-white py-3 px-4 rounded-xl font-semibold hover:bg-brand-navy-light transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      editingId ? "Update Post" : "Publish Post"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Blog List */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-display text-xl font-bold text-brand-navy mb-6">
                Published Posts
              </h2>
              {initialBlogs.length === 0 ? (
                <p className="text-gray-500 text-sm">No blogs found.</p>
              ) : (
                <div className="space-y-4 max-h-[calc(100vh-250px)] min-h-[400px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors">
                  {initialBlogs.map((blog) => (
                    <div key={blog.id} className="border border-gray-200 rounded-xl p-4 group bg-gray-50 hover:bg-white hover:shadow-sm transition-all">
                      <div className="flex gap-4 items-center">
                        <div className="relative w-32 aspect-video rounded-lg overflow-hidden flex-shrink-0">
                          <Image src={blog.image} alt={blog.title} fill sizes="(max-width: 640px) 100vw, 300px" className="object-cover" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded uppercase tracking-wider">{blog.category}</span>
                            <span className="text-xs text-gray-500">{blog.date}</span>
                          </div>
                          <h3 className="font-bold text-brand-navy text-base leading-tight mb-1">{blog.title}</h3>
                          <p className="text-sm text-gray-500 line-clamp-1">{blog.excerpt}</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 pt-5 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-brand-navy-light/10 flex items-center justify-center text-brand-navy font-bold text-xs">
                            {blog.author.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-brand-navy">{blog.author}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditClick(blog)}
                            className="p-2 text-gray-400 hover:text-brand-gold hover:bg-brand-gold/10 rounded-lg transition-colors"
                            title="Edit Blog Post"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleRemoveBlog(blog.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Blog Post"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <ConfirmModal
        open={deleteModalOpen}
        title="Delete Blog Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        isLoading={isDeleting}
        onConfirm={confirmDeleteBlog}
        onCancel={() => {
          setDeleteModalOpen(false);
          setBlogToDelete(null);
        }}
      />
    </div>
  );
}
