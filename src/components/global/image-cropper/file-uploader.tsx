"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import ImageCropper from "./image-cropper";

interface FileUploaderProps {
  onFileUpload: (file: File | Blob, fileUrl?: string) => void;
  acceptedFileTypes?: string[];
  maxFileSize?: number;
  cropImage?: boolean;
  cropAspectRatio?: number;
  className?: string;
  multiple?: boolean;
}

const FileUploader = ({
  onFileUpload,
  acceptedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"],
  maxFileSize = 10485760, // 10MB default
  cropImage = false,
  cropAspectRatio = 2, // Default 2:1 ratio
  className = "",
  multiple = false,
}: FileUploaderProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear any errors when files change
  const resetState = useCallback(() => {
    setError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setSelectedFile(null);
    setShowCropper(false);
  }, [previewUrl]);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      resetState();

      // Handle rejected files
      if (rejectedFiles.length > 0) {
        const { errors } = rejectedFiles[0];
        if (errors[0]?.code === "file-too-large") {
          setError(
            `File is too large. Max size is ${Math.round(maxFileSize / 1048576)}MB`
          );
        } else if (errors[0]?.code === "file-invalid-type") {
          setError(
            `Invalid file type. Accepted types: ${acceptedFileTypes.join(", ")}`
          );
        } else {
          setError("Error uploading file. Please try again.");
        }
        return;
      }

      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      setSelectedFile(file);

      // For image files, create a proper preview
      if (file.type.startsWith("image/")) {
        // Create a FileReader to properly handle the image
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (typeof result === "string") {
            setPreviewUrl(result);

            if (cropImage) {
              setShowCropper(true);
            } else {
              // If no cropping needed, pass the file directly
              onFileUpload(file, result);
            }
          }
        };
        reader.readAsDataURL(file);
      } else {
        // For non-image files, pass the file directly
        onFileUpload(file);
      }
    },
    [resetState, maxFileSize, acceptedFileTypes, cropImage, onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce(
      (acc, type) => {
        acc[type] = [];
        return acc;
      },
      {} as Record<string, string[]>
    ),
    maxSize: maxFileSize,
    multiple: false, // Only allow one file at a time for cropping
  });

  const handleCropComplete = useCallback(
    (croppedImageUrl: string) => {
      // Convert base64 to blob
      fetch(croppedImageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          // Create a new File object from the blob
          const croppedFile = new File(
            [blob],
            selectedFile?.name || "cropped-image.jpg",
            { type: "image/jpeg" }
          );

          // Pass the cropped file to the parent component
          onFileUpload(croppedFile, croppedImageUrl);

          // Reset the cropper
          setShowCropper(false);
        })
        .catch((err) => {
          console.error("Error processing cropped image:", err);
          setError("Error processing cropped image. Please try again.");
        });
    },
    [selectedFile, onFileUpload]
  );

  const handleCancelCrop = useCallback(() => {
    resetState();
  }, [resetState]);

  if (showCropper && previewUrl) {
    return (
      <ImageCropper
        imageSrc={previewUrl}
        onCropComplete={handleCropComplete}
        onCancel={handleCancelCrop}
        aspectRatio={cropAspectRatio}
        className={className}
      />
    );
  }

  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="p-4">
        <div
          {...getRootProps()}
          className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors
            ${isDragActive ? "border-primary bg-primary/5" : "hover:border-primary border-gray-300 hover:bg-gray-50"}`}
        >
          <input {...getInputProps()} />

          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="text-3xl text-gray-400">
              {/* Upload icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
            </div>

            <div className="text-sm text-gray-600">
              {isDragActive ? (
                <p>Drop the file here...</p>
              ) : (
                <div>
                  <p className="font-medium">
                    Drag & drop your {cropImage ? "image" : "file"} here, or{" "}
                    <span className="text-primary">browse</span>
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {acceptedFileTypes.includes("image/jpeg")
                      ? "Supported formats: JPG, PNG, GIF, WebP"
                      : acceptedFileTypes.join(", ")}
                    <br />
                    Max size: {Math.round(maxFileSize / 1048576)}MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && <div className="mt-3 text-sm text-red-500">{error}</div>}

        {selectedFile && !showCropper && !cropImage && (
          <div className="mt-4 flex items-center justify-between rounded-md border bg-gray-50 p-3">
            <div className="flex items-center space-x-3">
              {previewUrl ? (
                <div className="size-10 overflow-hidden rounded bg-gray-200">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="size-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex size-10 items-center justify-center rounded bg-gray-200 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
                    <polyline points="13 2 13 9 20 9"></polyline>
                  </svg>
                </div>
              )}

              <div className="text-sm">
                <p className="max-w-xs truncate font-medium">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:bg-red-50 hover:text-red-700"
              onClick={resetState}
            >
              Remove
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FileUploader;
