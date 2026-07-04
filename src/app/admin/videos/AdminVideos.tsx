"use client";

import { useState } from "react";
import { addVideo, removeVideo, updateVideo, Video } from "@/actions/content";
import { uploadToCloudinary } from "@/actions/upload";
import { Trash2, Video as VideoIcon, Plus, Upload } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ConfirmModal } from "@/components/ui/ConfirmModal";

export default function AdminVideos({ initialVideos }: { initialVideos: Video[] }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [existingVideoUrl, setExistingVideoUrl] = useState<string | null>(null);
  const [externalVideoUrl, setExternalVideoUrl] = useState("");
  const [duration, setDuration] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !duration) return;
    if (!editingId && !thumbnailFile) {
      alert("Please upload a thumbnail image.");
      return;
    }
    if (!editingId && !videoFile && !externalVideoUrl) {
      alert("Please provide a video file or external URL.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Upload thumbnail if a new file is provided
      let finalThumbnailUrl = existingThumbnailUrl;
      if (thumbnailFile) {
        const thumbFormData = new FormData();
        thumbFormData.append("file", thumbnailFile);
        const thumbUploadRes = await uploadToCloudinary(thumbFormData);
        if (typeof thumbUploadRes === "string") {
          finalThumbnailUrl = thumbUploadRes;
        } else {
          throw new Error("Failed to upload thumbnail");
        }
      }

      // Upload video if a new file is provided
      let finalVideoUrl = existingVideoUrl;
      if (videoFile) {
        const formData = new FormData();
        formData.append("file", videoFile);
        const uploadRes = await uploadToCloudinary(formData);
        if (typeof uploadRes === "string") {
          finalVideoUrl = uploadRes;
        } else {
          throw new Error("Failed to upload video");
        }
      } else if (externalVideoUrl) {
        finalVideoUrl = externalVideoUrl;
      }

      const videoData = {
        title,
        description,
        thumbnail: finalThumbnailUrl,
        videoUrl: finalVideoUrl,
        duration,
      };

      if (editingId) {
        const res = await updateVideo({ ...videoData, id: editingId });
        if (!res.success) alert(res.error);
        else cancelEdit();
      } else {
        const res = await addVideo(videoData);
        if (!res.success) alert(res.error);
        else cancelEdit();
      }
    } catch (err) {
      console.error(err);
      alert(editingId ? "Failed to update video." : "Failed to publish video.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const cancelEdit = () => {
    setTitle("");
    setDescription("");
    setThumbnailFile(null);
    setExistingThumbnailUrl("");
    setThumbnailPreview(null);
    setDuration("");
    setVideoFile(null);
    setExistingVideoUrl(null);
    setExternalVideoUrl("");
    setEditingId(null);
  };

  const handleEditClick = (video: Video) => {
    setEditingId(video.id);
    setTitle(video.title);
    setDescription(video.description);
    setThumbnailFile(null);
    setExistingThumbnailUrl(video.thumbnail);
    setThumbnailPreview(video.thumbnail);
    setDuration(video.duration);
    setExistingVideoUrl(video.videoUrl || null);
    setExternalVideoUrl("");
    setVideoFile(null);
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleRemoveVideo = (id: string) => {
    setVideoToDelete(id);
    setDeleteModalOpen(true);
  };

  const confirmDeleteVideo = async () => {
    if (!videoToDelete) return;
    setIsDeleting(true);
    try {
      await removeVideo(videoToDelete);
      setDeleteModalOpen(false);
      setVideoToDelete(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete video.");
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
            Manage Homepage Videos
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Add New Video Form */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-brand-navy-light/10 flex items-center justify-center text-brand-navy">
                  {editingId ? <VideoIcon className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </div>
                <h2 className="font-display text-xl font-bold text-brand-navy">
                  {editingId ? "Edit Video" : "Add New Video"}
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
                    placeholder="e.g. Understanding NeurOptimal"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    required
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-brand-gold outline-none resize-none"
                    placeholder="Brief description..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail Image</label>
                  {thumbnailPreview && (
                    <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-2 bg-gray-100">
                      <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-brand-gold/50 transition-colors bg-gray-50/50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        setThumbnailFile(file || null);
                        if (file) {
                          const previewUrl = URL.createObjectURL(file);
                          setThumbnailPreview(previewUrl);
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center text-gray-500 gap-2 pointer-events-none">
                      <Upload className="w-6 h-6 text-brand-navy/40" />
                      <span className="text-sm font-medium">
                        {thumbnailFile ? thumbnailFile.name : "Click to select thumbnail image"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="block text-sm font-semibold text-brand-navy mb-1.5">Video Source (Required)</label>
                  {existingVideoUrl && (
                    <div className="text-sm text-gray-500">
                      Current video: <a href={existingVideoUrl} target="_blank" rel="noreferrer" className="text-brand-gold hover:underline font-mono text-xs truncate max-w-[200px] inline-block align-bottom">{existingVideoUrl.split('/').pop() || 'Link'}</a>
                    </div>
                  )}
                  
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">External Video URL (e.g. YouTube, Vimeo)</label>
                    <input
                      type="url"
                      value={externalVideoUrl}
                      onChange={(e) => {
                        setExternalVideoUrl(e.target.value);
                        if (e.target.value) setVideoFile(null);
                      }}
                      className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-brand-gold outline-none"
                      placeholder="https://www.youtube.com/watch?v=..."
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="h-[1px] bg-gray-200 flex-1"></div>
                    <span className="text-xs text-gray-400 font-medium uppercase tracking-wider">OR</span>
                    <div className="h-[1px] bg-gray-200 flex-1"></div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Upload Video File</label>
                    <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-brand-gold/50 transition-colors bg-gray-50/50">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          setVideoFile(file || null);
                          if (file) setExternalVideoUrl("");
                        }}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="flex flex-col items-center justify-center text-gray-500 gap-2 pointer-events-none">
                        <Upload className="w-6 h-6 text-brand-navy/40" />
                        <span className="text-sm font-medium">
                          {videoFile ? videoFile.name : "Click to select video file (.mp4, .webm)"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <input
                    type="text"
                    required
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-4 py-2 rounded-md border border-gray-200 focus:border-brand-gold outline-none"
                    placeholder="e.g. 3:45"
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
                      editingId ? "Update Video" : "Publish Video"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Video List */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-display text-xl font-bold text-brand-navy mb-6">
                Current Videos
              </h2>
              {initialVideos.length === 0 ? (
                <p className="text-gray-500 text-sm">No videos found.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[calc(100vh-250px)] min-h-[400px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-50 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-200 hover:[&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full transition-colors pb-4">
                  {initialVideos.map((video) => (
                    <div key={video.id} className="border border-gray-200 rounded-xl overflow-hidden flex flex-col group">
                      <div className="relative w-full aspect-video bg-gray-100">
                        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-4 flex-grow flex flex-col">
                        <h3 className="font-bold text-brand-navy text-lg mb-2">{video.title}</h3>
                        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">{video.description}</p>
                        <div className="mt-6 pt-5 border-t border-gray-100 flex justify-end gap-2">
                          <button
                            onClick={() => handleEditClick(video)}
                            className="p-2 text-gray-400 hover:text-brand-gold hover:bg-brand-gold/10 rounded-lg transition-colors"
                            title="Edit Video"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleRemoveVideo(video.id)}
                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Video"
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
        title="Delete Video"
        message="Are you sure you want to delete this video? This action cannot be undone."
        isLoading={isDeleting}
        onConfirm={confirmDeleteVideo}
        onCancel={() => {
          setDeleteModalOpen(false);
          setVideoToDelete(null);
        }}
      />
    </div>
  );
}
