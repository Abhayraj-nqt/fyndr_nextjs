"use client";

import { useState, useRef } from "react";

import ImageCropper from "@/components/global/image-cropper/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ImageCropPage() {
  const [image, setImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setImage(reader.result as string);
        setCroppedImage(null);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleCropComplete = (croppedImg: string) => {
    setCroppedImage(croppedImg);
    setIsCropping(false);
  };

  const handleSelectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleStartCropping = () => {
    setIsCropping(true);
  };

  const handleDownload = () => {
    if (croppedImage) {
      const link = document.createElement("a");
      link.download = "cropped-image.jpg";
      link.href = croppedImage;
      link.click();
    }
  };

  return (
    <div className="container mx-auto space-y-6 py-10">
      <h1 className="mb-6 text-3xl font-bold">Image Cropper</h1>

      <div className="flex flex-col space-y-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />

        <div className="flex flex-wrap gap-4">
          <Button onClick={handleSelectFile}>
            {image ? "Change Image" : "Select Image"}
          </Button>

          {image && !isCropping && !croppedImage && (
            <Button onClick={handleStartCropping}>Crop Image</Button>
          )}

          {croppedImage && (
            <Button onClick={handleDownload}>Download Cropped Image</Button>
          )}
        </div>
      </div>

      {image && isCropping && (
        <ImageCropper
          imageSrc={image}
          onCropComplete={handleCropComplete}
          aspectRatio={1} // Change this for different aspect ratios
        />
      )}

      {croppedImage && (
        <div className="mt-6">
          <h2 className="mb-4 text-xl font-semibold">Cropped Result</h2>
          <div className="max-w-md rounded-md border border-gray-200 p-4">
            <img
              src={croppedImage}
              alt="Cropped"
              className="h-auto w-full rounded-md"
            />
          </div>
        </div>
      )}
    </div>
  );
}
