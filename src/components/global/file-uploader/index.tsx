"use client";

import {
  Upload,
  X,
  Check,
  Crop,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  RotateCw,
} from "lucide-react";
import React, { useState, useRef, useCallback } from "react";

import { toast } from "@/components/global/toast";

// Helper function to compress images
const compressImage = (file, maxSizeMB) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        // Calculate the ratio to keep aspect ratio
        const quality = 0.9;
        const maxSize = maxSizeMB * 1024 * 1024;

        // If file is already small enough
        if (file.size <= maxSize) {
          resolve(event.target.result);
          return;
        }

        // Try with decreasing quality until file size is under limit
        const compressRecursive = (q) => {
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL("image/jpeg", q);

          // Estimate size (base64 is ~33% larger than binary)
          const estimatedSize = Math.round(
            (dataUrl.length - "data:image/jpeg;base64,".length) * 0.75
          );

          if (estimatedSize > maxSize && q > 0.1) {
            // Try with lower quality
            return compressRecursive(q - 0.1);
          } else if (estimatedSize > maxSize) {
            // If still too big, reduce dimensions
            width *= 0.9;
            height *= 0.9;
            return compressRecursive(0.7);
          } else {
            return dataUrl;
          }
        };

        const result = compressRecursive(quality);
        resolve(result);
      };
      img.onerror = (error) => reject(error);
    };
    reader.onerror = (error) => reject(error);
  });
};

// The main FileUploader component
export default function FileUploader({
  allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
  ],
  allowedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".pdf"],
  maxFileSizeMB = 5,
  multiple = false,
  withCropper = false,
  onFilesSelected = () => {},
  className = "",
}) {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [cropperState, setCropperState] = useState({
    active: false,
    file: null,
    image: null,
    rotation: 0,
    zoom: 1,
    croppedAreaPixels: null,
  });

  const inputRef = useRef(null);
  const dropAreaRef = useRef(null);

  // File validation
  const validateFile = (file) => {
    // Check file type
    const validType = allowedFileTypes.includes(file.type);
    const fileExtension = "." + file.name.split(".").pop().toLowerCase();
    const validExtension = allowedExtensions.includes(fileExtension);

    if (!validType && !validExtension) {
      toast.error({
        message: `File type not supported. Allowed types: ${allowedExtensions.join(", ")}`,
      });
      return false;
    }

    // Check file size
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      toast.error({
        message: `File too large. Maximum file size is ${maxFileSizeMB}MB`,
      });
      return false;
    }

    return true;
  };

  // Process files
  const processFiles = async (fileList) => {
    setIsLoading(true);

    try {
      const validFiles = Array.from(fileList).filter(validateFile);
      if (validFiles.length === 0) {
        setIsLoading(false);
        return;
      }

      if (withCropper && validFiles[0].type.startsWith("image/")) {
        // If image cropper is enabled and the file is an image, open cropper
        const reader = new FileReader();
        reader.onload = () => {
          setCropperState({
            active: true,
            file: validFiles[0],
            image: reader.result,
            rotation: 0,
            zoom: 1,
            croppedAreaPixels: null,
          });
          setIsLoading(false);
        };
        reader.readAsDataURL(validFiles[0]);
        return;
      }

      // Process files normally without cropping
      const processedFiles = await Promise.all(
        validFiles.map(async (file) => {
          // If the file is an image, compress if needed
          if (file.type.startsWith("image/")) {
            const base64 = await compressImage(file, maxFileSizeMB);
            return {
              name: file.name,
              type: file.type,
              size: file.size,
              base64,
            };
          } else {
            // For non-image files, just convert to base64
            return new Promise((resolve) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => {
                resolve({
                  name: file.name,
                  type: file.type,
                  size: file.size,
                  base64: reader.result,
                });
              };
            });
          }
        })
      );

      if (multiple) {
        setFiles((prevFiles) => [...prevFiles, ...processedFiles]);
        onFilesSelected([...files, ...processedFiles]);
      } else {
        setFiles(processedFiles);
        onFilesSelected(processedFiles);
      }

      toast.success({
        message: multiple
          ? `${processedFiles.length} files uploaded successfully`
          : "File uploaded successfully",
      });
    } catch (error) {
      toast.error({ message: "Error processing files. Please try again." });
      console.error("Error processing files:", error);
    }

    setIsLoading(false);
  };

  // Handle file input change
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };

  // Handle file drop
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  // Handle crop complete
  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    setCropperState((prev) => ({ ...prev, croppedAreaPixels }));
  };

  // Finalize crop and get the cropped image
  const finalizeCrop = async () => {
    if (!cropperState.croppedAreaPixels) return;

    setIsLoading(true);

    try {
      const canvas = document.createElement("canvas");
      const img = new Image();
      img.src = cropperState.image;

      await new Promise((resolve) => {
        img.onload = resolve;
      });

      // Calculate rotated dimensions
      const rotation = (cropperState.rotation * Math.PI) / 180;
      const { width, height, x, y } = cropperState.croppedAreaPixels;

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");

      // Move to center of canvas
      ctx.translate(width / 2, height / 2);
      ctx.rotate(rotation);
      ctx.translate(-width / 2, -height / 2);

      // Draw the image with crop
      ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

      // Convert to base64 and compress
      const base64 = canvas.toDataURL("image/jpeg", 0.9);
      const compressedBase64 = await compressImage(
        dataURItoBlob(base64),
        maxFileSizeMB
      );

      const processedFile = {
        name: cropperState.file.name,
        type: "image/jpeg",
        size: Math.round(
          (compressedBase64.length - "data:image/jpeg;base64,".length) * 0.75
        ),
        base64: compressedBase64,
      };

      if (multiple) {
        setFiles((prevFiles) => [...prevFiles, processedFile]);
        onFilesSelected([...files, processedFile]);
      } else {
        setFiles([processedFile]);
        onFilesSelected([processedFile]);
      }

      toast.success({ message: "Image cropped and uploaded successfully" });
    } catch (error) {
      toast.error({
        message: "Error processing cropped image. Please try again.",
      });
      console.error("Error processing cropped image:", error);
    }

    setIsLoading(false);
    setCropperState({
      active: false,
      file: null,
      image: null,
      rotation: 0,
      zoom: 1,
      croppedAreaPixels: null,
    });
  };

  // Convert data URI to Blob
  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);

    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  };

  // Cancel cropping
  const cancelCrop = () => {
    setCropperState({
      active: false,
      file: null,
      image: null,
      rotation: 0,
      zoom: 1,
      croppedAreaPixels: null,
    });
  };

  // Remove file
  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  // Drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Image cropper UI
  const renderCropper = () => {
    if (!cropperState.active) return null;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-lg rounded-lg bg-white p-6">
          <h3 className="mb-4 text-lg font-medium">Crop Image</h3>

          <div className="relative mb-4 h-64 w-full overflow-hidden rounded-md">
            <img
              src={cropperState.image}
              alt="Crop preview"
              className="absolute size-full object-contain"
              style={{
                transform: `rotate(${cropperState.rotation}deg) scale(${cropperState.zoom})`,
              }}
            />
            <div className="pointer-events-none absolute inset-0 border-2 border-dashed border-blue-500"></div>
          </div>

          <div className="mb-4 flex justify-between">
            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() =>
                  setCropperState((prev) => ({
                    ...prev,
                    zoom: Math.max(0.5, prev.zoom - 0.1),
                  }))
                }
                className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
              >
                <ZoomOut size={20} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCropperState((prev) => ({
                    ...prev,
                    zoom: Math.min(3, prev.zoom + 0.1),
                  }))
                }
                className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
              >
                <ZoomIn size={20} />
              </button>
            </div>

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={() =>
                  setCropperState((prev) => ({
                    ...prev,
                    rotation: prev.rotation - 90,
                  }))
                }
                className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
              >
                <RotateCcw size={20} />
              </button>
              <button
                type="button"
                onClick={() =>
                  setCropperState((prev) => ({
                    ...prev,
                    rotation: prev.rotation + 90,
                  }))
                }
                className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
              >
                <RotateCw size={20} />
              </button>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={cancelCrop}
              className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={finalizeCrop}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Apply"}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {/* File cropper */}
      {renderCropper()}

      {/* File uploader */}
      <div
        ref={dropAreaRef}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative rounded-lg border-2 border-dashed p-6 transition-colors ${
          dragActive
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 bg-gray-50"
        }`}
      >
        <input
          ref={inputRef}
          id="file-upload"
          type="file"
          multiple={multiple}
          accept={allowedFileTypes.join(",")}
          className="hidden"
          onChange={handleChange}
          disabled={isLoading}
        />

        <div className="text-center">
          <Upload className="mx-auto size-12 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">
            <button
              type="button"
              className="font-medium text-blue-600 hover:text-blue-500"
              onClick={() => inputRef.current?.click()}
              disabled={isLoading}
            >
              Click to upload
            </button>{" "}
            or drag and drop
          </p>
          <p className="mt-1 text-xs text-gray-500">
            {allowedExtensions.join(", ")} up to {maxFileSizeMB}MB
          </p>

          {isLoading && (
            <div className="mt-4">
              <div className="h-2 w-full animate-pulse rounded-full bg-blue-100">
                <div className="h-2 w-3/4 rounded-full bg-blue-500"></div>
              </div>
              <p className="mt-1 text-xs text-gray-500">Processing...</p>
            </div>
          )}
        </div>
      </div>

      {/* File list */}
      {files.length > 0 && (
        <ul className="mt-4 space-y-2">
          {files.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2"
            >
              <div className="flex items-center">
                <Check className="mr-2 size-5 text-green-500" />
                <span className="max-w-xs truncate text-sm">{file.name}</span>
                <span className="ml-2 text-xs text-gray-500">
                  ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                </span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="size-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
