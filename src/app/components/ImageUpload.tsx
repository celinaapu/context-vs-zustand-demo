"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  uploadPreset: string;
  cloudName: string;
  type: "image" | "video";
  multiple?: boolean;
  error?: string;
  onErrorClear?: () => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  uploadPreset,
  cloudName,
  type,
  error,
  onErrorClear,
}) => {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`,
        { method: "POST", body: formData }
      );
      const data = await res.json();
      if (data.secure_url) {
        onChange(data.secure_url);
      }
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="relative w-full">
      {value ? (
        <div className="relative">
          {type === "image" ? (
            <Image
              src={value}
              alt="Uploaded"
              width={400}
              height={250}
              className="rounded-lg w-full object-cover"
            />
          ) : (
            <video
              src={value}
              controls
              className="rounded-lg w-full max-h-[150px] object-cover"
            />
          )}
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 bg-black/60 hover:bg-black text-white rounded-full p-1 transition"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <label
          className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer ${
            error ? "border-red-500" : "border-gray-300 hover:border-gray-400"
          }`}
        >
          <span className="text-gray-500 text-sm">
            {uploading ? "Uploading..." : "Click to upload or drag & drop"}
          </span>
          <input
            type="file"
            accept={type === "image" ? "image/*" : "video/*"}
            className="hidden"
            onChange={handleUpload}
            onClick={onErrorClear}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;
