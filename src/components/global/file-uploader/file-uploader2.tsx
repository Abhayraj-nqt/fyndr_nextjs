"use client";

import React, { useRef, useState, useCallback } from "react";

import toast from "../toast";

export type FileWithPreview = File & {
  preview?: string;
  base64?: string;
};

export type AllowedFileType =
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "application/pdf";

export type FileUploaderProps = {
  children: React.ReactNode;
  allowedFileTypes?: AllowedFileType[];
  multiple?: boolean;
  min?: number;
  max?: number;
  className?: string;
  maxFileSizeMB?: number;
  onFilesSelected?: (files: FileWithPreview[]) => void;
  onError?: (error: string) => void;
  includeBase64?: boolean;
  imageQuality?: number; // 0-1 quality for image compression
};

const defaultAllowedFileTypes: AllowedFileType[] = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
];

const FileUploader2 = ({
  children,
  allowedFileTypes = defaultAllowedFileTypes,
  multiple = false,
  min = 1,
  max = Infinity,
  className = "",
  maxFileSizeMB = 5,
  onFilesSelected,
  onError,
  includeBase64 = true,
  imageQuality = 0.7, // Default compression quality
}: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Track drag events to handle nested elements
  const dragCounter = useRef(0);

  // Convert file to base64 with compression for images
  const processFileToBase64 = async (file: File): Promise<string> => {
    // Handle non-image files with regular base64 conversion
    if (!file.type.startsWith("image/")) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (typeof reader.result === "string") {
            resolve(reader.result);
          } else {
            reject(new Error("Failed to convert file to base64"));
          }
        };
        reader.onerror = (error) => reject(error);
      });
    }

    // For images, compress before converting to base64
    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Calculate maximum dimensions based on file size
          const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024;
          const currentSizeBytes = file.size;

          // If already exceeding the file size, reduce dimensions
          if (currentSizeBytes > maxFileSizeBytes * 0.75) {
            const scaleFactor = Math.sqrt(
              (maxFileSizeBytes * 0.75) / currentSizeBytes
            );
            width = Math.floor(width * scaleFactor);
            height = Math.floor(height * scaleFactor);
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext("2d");
          if (!ctx) {
            reject(new Error("Could not get canvas context"));
            return;
          }

          ctx.drawImage(img, 0, 0, width, height);

          // Use proper mime type from the original file
          const mimeType = file.type;

          // Convert canvas to base64 with compression
          const base64 = canvas.toDataURL(mimeType, imageQuality);
          resolve(base64);
        };

        img.onerror = () => {
          reject(new Error("Failed to load image"));
        };
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  // Checks if a base64 string exceeds the size limit
  const isBase64ExceedingLimit = (base64String: string): boolean => {
    // Base64 size in bytes = (string length * 3) / 4
    const base64SizeBytes = (base64String.length * 3) / 4;
    const maxSizeBytes = maxFileSizeMB * 1024 * 1024;
    return base64SizeBytes > maxSizeBytes;
  };

  // Process files with validation and conversion
  const validateAndProcessFiles = useCallback(
    async (filesToValidate: File[]): Promise<FileWithPreview[]> => {
      // Check if files are selected
      if (filesToValidate.length === 0) {
        toast.error({
          message: "No files selected",
        });
        onError?.("No files selected");
        return [];
      }

      // Check min/max file count
      if (filesToValidate.length < min) {
        toast.error({
          message: `Please select at least ${min} file${min !== 1 ? "s" : ""}`,
        });
        onError?.(`Please select at least ${min} file${min !== 1 ? "s" : ""}`);
        return [];
      }

      if (filesToValidate.length > max) {
        toast.error({
          message: `You can only upload up to ${max} file${max !== 1 ? "s" : ""}`,
        });
        onError?.(
          `You can only upload up to ${max} file${max !== 1 ? "s" : ""}`
        );
        return [];
      }

      // Validate and process each file
      const validFiles: FileWithPreview[] = [];
      const processPromises: Promise<void>[] = [];

      for (const file of filesToValidate) {
        // Check file type
        if (!allowedFileTypes.includes(file.type as AllowedFileType)) {
          toast.error({
            message: `File type '${file.type}' is not allowed. Allowed types: ${allowedFileTypes.join(
              ", "
            )}`,
          });
          onError?.(
            `File type '${file.type}' is not allowed. Allowed types: ${allowedFileTypes.join(
              ", "
            )}`
          );
          continue;
        }

        // Check file size
        const fileSizeMB = file.size / (1024 * 1024);

        if (fileSizeMB > maxFileSizeMB) {
          toast.error({
            message: `File '${file.name}' exceeds the maximum size of ${maxFileSizeMB}MB`,
          });
          onError?.(
            `File '${file.name}' exceeds the maximum size of ${maxFileSizeMB}MB`
          );
          continue;
        }

        // Add file to valid files array
        const fileWithPreview = file as FileWithPreview;

        // Add preview for images
        if (file.type.startsWith("image/")) {
          fileWithPreview.preview = URL.createObjectURL(file);
        }

        // For base64 conversion with potential compression
        if (includeBase64) {
          processPromises.push(
            (async () => {
              try {
                let base64 = await processFileToBase64(file);

                // After initial compression, if still too large, reduce quality more aggressively
                if (
                  file.type.startsWith("image/") &&
                  isBase64ExceedingLimit(base64)
                ) {
                  let currentQuality = imageQuality;
                  // Try up to 3 times with decreasing quality
                  for (let i = 0; i < 3; i++) {
                    currentQuality *= 0.7;

                    const img = new Image();
                    await new Promise((resolve) => {
                      img.onload = resolve;
                      img.src = fileWithPreview.preview || "";
                    });

                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    if (!ctx) continue;

                    ctx.drawImage(img, 0, 0);
                    base64 = canvas.toDataURL(file.type, currentQuality);

                    if (!isBase64ExceedingLimit(base64)) break;
                  }
                }

                fileWithPreview.base64 = base64;
              } catch (error) {
                console.error(`Error processing file ${file.name}:`, error);
                toast.error({
                  message: `Failed to process file ${file.name}`,
                });
                onError?.(`Failed to process file ${file.name}`);
              }
            })()
          );
        }

        validFiles.push(fileWithPreview);
      }

      // Wait for all processing to complete
      await Promise.all(processPromises);
      return validFiles;
    },
    [
      allowedFileTypes,
      max,
      maxFileSizeMB,
      min,
      onError,
      includeBase64,
      imageQuality,
    ]
  );

  const handleFilesSelected = useCallback(
    async (selectedFiles: FileList | null) => {
      if (!selectedFiles) return;

      setIsUploading(true);
      try {
        const fileArray = Array.from(selectedFiles);
        const validatedFiles = await validateAndProcessFiles(fileArray);

        if (validatedFiles.length > 0) {
          setFiles(validatedFiles);
          onFilesSelected?.(validatedFiles);
        }
      } catch (error) {
        console.error("Error processing files:", error);
        onError?.(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsUploading(false);
      }
    },
    [onFilesSelected, validateAndProcessFiles, onError]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilesSelected(e.target.files);
    // Reset input value to allow selecting the same file again
    e.target.value = "";
  };

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current += 1;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      dragCounter.current = 0;

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFilesSelected(e.dataTransfer.files);
        e.dataTransfer.clearData();
      }
    },
    [handleFilesSelected]
  );

  // Cleanup function for URL objects
  React.useEffect(() => {
    return () => {
      files.forEach((file) => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  return (
    <div
      ref={dropZoneRef}
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${
        isDragging ? "bg-primary-50 ring-2 ring-primary-500" : ""
      } flex w-fit ${className}`}
      style={{
        minHeight: "100px",
        minWidth: "200px",
        border: isDragging ? undefined : "2px dashed #e5e7eb",
        position: "relative",
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={handleChange}
        accept={allowedFileTypes.join(",")}
        multiple={multiple}
        disabled={isUploading}
      />
      <div
        onClick={() => {
          if (!isUploading) fileInputRef.current?.click();
        }}
        className={`flex w-full cursor-pointer ${
          isUploading ? "cursor-not-allowed opacity-50" : ""
        }`}
      >
        {children}
      </div>
      {isDragging && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(59, 130, 246, 0.05)",
            zIndex: 10,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className="text-lg font-semibold text-primary-500">
            Drop files here
          </p>
        </div>
      )}
      {isUploading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            zIndex: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className="font-semibold text-primary-500">Processing...</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader2;
