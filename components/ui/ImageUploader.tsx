import { Upload } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useEffect, useState } from "react";

export type PreviewItem = {
  file: File;
  url: string;
};

interface ImageUploaderProps {
  label?: string;
  maxFiles?: number;
  images: PreviewItem[];
  setImages: React.Dispatch<React.SetStateAction<PreviewItem[]>>;
}

export default function ImageUploader({
  label = "upload image here",
  maxFiles = 5,
  images,
  setImages,
}: ImageUploaderProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    const validImages = fileArray.filter((file) =>
      file.type.startsWith("image/")
    );
    if (validImages.length === 0) {
      alert("Please select image files only.");
      return;
    }
    const remainSlots = maxFiles - images.length;
    const selectedImage = validImages.slice(0, remainSlots);

    const newPreviews = selectedImage.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setImages((prev) => [...prev, ...newPreviews]);

    e.target.value = "";
  };

  const handleRemove = (index: number) => {
    setImages((prev) => {
      const copy = [...prev];
      const [removed] = copy.splice(index, 1);
      URL.revokeObjectURL(removed.url);
      return copy;
    });
  };

  useEffect(() => {
    return () => {
      images.forEach((img) => URL.revokeObjectURL(img.url));
    };
  }, [images]);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className="inline-flex items-center rounded-lg border border-dashed border-gray-300 px-4 py-2 cursor-pointer hover:bg-gray-50">
          <span className="text-sm flex items-center justify-between font-medium text-gray-700">
            {label} (max {maxFiles})
            <Upload size={14} />
          </span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        {images.length > 0 && (
          <p className="mt-2 text-xs text-gray-500">
            Selected: <span className="font-medium">{images.length}</span> /{" "}
            {maxFiles}
          </p>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.length === 0 && (
          <div className="col-span-2 sm:col-span-3 flex items-center justify-center border border-gray-200 rounded-lg h-32 bg-gray-50">
            <span className="text-xs text-gray-400">No images selected</span>
          </div>
        )}

        {images.map((item, index) => (
          <div
            key={index}
            className="relative border justify-items-center border-gray-200 rounded-lg overflow-hidden bg-gray-50"
          >
            <Image
              src={item.url}
              alt={item.file.name}
              width={300}
              height={300}
              className="w-auto h-32 object-center origin-center object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className="absolute top-1 right-1 rounded-full bg-black/70 text-white text-[10px] px-2 py-1 hover:bg-black"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
