"use server";

import { v2 as cloudinary } from "cloudinary";

// Cloudinary automatically picks up CLOUDINARY_URL from your .env file
export async function uploadToCloudinary(formData: FormData): Promise<string> {
  const file = formData.get("file") as File;
  if (!file) {
    throw new Error("No file provided");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ resource_type: "auto" }, (error, result) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          reject(error);
        } else {
          resolve(result?.secure_url as string);
        }
      })
      .end(buffer);
  });
}
