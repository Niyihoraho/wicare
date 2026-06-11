"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import {
  addVideoSchema,
  removeVideoSchema,
  addBlogSchema,
  removeBlogSchema,
  updateBlogSchema,
  updateVideoSchema,
  type ActionResult,
} from "@/lib/validation";

// ─── Types (re-exported for client components) ──────────────────────────────

export type Video = {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string | null;
  duration: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
};

// ─── Read ───────────────────────────────────────────────────────────────────

export async function getContentData(): Promise<{
  videos: Video[];
  blogs: BlogPost[];
}> {
  try {
    const [videos, blogs] = await Promise.all([
      prisma.video.findMany({ orderBy: { createdAt: "desc" } }),
      prisma.blogPost.findMany({ orderBy: { createdAt: "desc" } }),
    ]);

    return {
      videos: videos.map((v) => ({
        id: v.id,
        title: v.title,
        description: v.description,
        thumbnail: v.thumbnail,
        videoUrl: v.videoUrl,
        duration: v.duration,
      })),
      blogs: blogs.map((b) => ({
        id: b.id,
        slug: b.slug,
        title: b.title,
        excerpt: b.excerpt,
        content: b.content,
        author: b.author,
        date: b.date,
        readTime: b.readTime,
        category: b.category,
        image: b.image,
      })),
    };
  } catch (error) {
    console.error("[getContentData] Database error:", error);
    return { videos: [], blogs: [] };
  }
}

// ─── Videos ─────────────────────────────────────────────────────────────────

export async function addVideo(
  videoData: Omit<Video, "id">
): Promise<ActionResult<Video>> {
  const parsed = addVideoSchema.safeParse(videoData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const video = await prisma.video.create({ data: parsed.data });

    revalidatePath("/");
    revalidatePath("/admin/videos");

    return {
      success: true,
      data: {
        id: video.id,
        title: video.title,
        description: video.description,
        thumbnail: video.thumbnail,
        videoUrl: video.videoUrl,
        duration: video.duration,
      },
    };
  } catch (error) {
    console.error("[addVideo] Database error:", error);
    return { success: false, error: "Failed to add video. Please try again." };
  }
}

export async function removeVideo(id: string): Promise<ActionResult> {
  const parsed = removeVideoSchema.safeParse({ id });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    await prisma.video.delete({ where: { id: parsed.data.id } });

    revalidatePath("/");
    revalidatePath("/admin/videos");

    return { success: true, data: undefined };
  } catch (error) {
    console.error("[removeVideo] Database error:", error);
    return { success: false, error: "Failed to remove video." };
  }
}

export async function updateVideo(
  videoData: Video
): Promise<ActionResult<Video>> {
  const parsed = updateVideoSchema.safeParse(videoData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const { id, ...data } = parsed.data;
    const video = await prisma.video.update({
      where: { id },
      data,
    });

    revalidatePath("/");
    revalidatePath("/admin/videos");

    return {
      success: true,
      data: {
        id: video.id,
        title: video.title,
        description: video.description,
        thumbnail: video.thumbnail,
        videoUrl: video.videoUrl,
        duration: video.duration,
      },
    };
  } catch (error) {
    console.error("[updateVideo] Database error:", error);
    return { success: false, error: "Failed to update video. Please try again." };
  }
}

// ─── Blogs ──────────────────────────────────────────────────────────────────

export async function addBlog(
  blogData: Omit<BlogPost, "id">
): Promise<ActionResult<BlogPost>> {
  const parsed = addBlogSchema.safeParse(blogData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    // Check for duplicate slug (OWASP A04 — prevent data corruption)
    const existing = await prisma.blogPost.findUnique({
      where: { slug: parsed.data.slug },
    });
    if (existing) {
      return {
        success: false,
        error: "A blog post with this URL slug already exists. Please use a different title.",
      };
    }

    const blog = await prisma.blogPost.create({ data: parsed.data });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/admin/blogs");

    return {
      success: true,
      data: {
        id: blog.id,
        slug: blog.slug,
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        author: blog.author,
        date: blog.date,
        readTime: blog.readTime,
        category: blog.category,
        image: blog.image,
      },
    };
  } catch (error) {
    console.error("[addBlog] Database error:", error);
    return {
      success: false,
      error: "Failed to publish blog post. Please try again.",
    };
  }
}

export async function removeBlog(id: string): Promise<ActionResult> {
  const parsed = removeBlogSchema.safeParse({ id });
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    await prisma.blogPost.delete({ where: { id: parsed.data.id } });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/admin/blogs");

    return { success: true, data: undefined };
  } catch (error) {
    console.error("[removeBlog] Database error:", error);
    return { success: false, error: "Failed to remove blog post." };
  }
}

export async function updateBlog(
  blogData: BlogPost
): Promise<ActionResult<BlogPost>> {
  const parsed = updateBlogSchema.safeParse(blogData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    const { id, ...data } = parsed.data;

    // Check for duplicate slug (excluding the current blog post)
    const existing = await prisma.blogPost.findUnique({
      where: { slug: data.slug },
    });
    if (existing && existing.id !== id) {
      return {
        success: false,
        error: "A blog post with this URL slug already exists. Please use a different title.",
      };
    }

    const blog = await prisma.blogPost.update({
      where: { id },
      data,
    });

    revalidatePath("/");
    revalidatePath("/blog");
    revalidatePath("/admin/blogs");

    return {
      success: true,
      data: {
        id: blog.id,
        slug: blog.slug,
        title: blog.title,
        excerpt: blog.excerpt,
        content: blog.content,
        author: blog.author,
        date: blog.date,
        readTime: blog.readTime,
        category: blog.category,
        image: blog.image,
      },
    };
  } catch (error) {
    console.error("[updateBlog] Database error:", error);
    return {
      success: false,
      error: "Failed to update blog post. Please try again.",
    };
  }
}
