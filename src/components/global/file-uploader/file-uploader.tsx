"use client";

import React, { useRef, useState, useCallback } from "react";

import toast from "../toast";

export type FileWithPreview = File & {
  preview?: string;
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
};

const defaultAllowedFileTypes: AllowedFileType[] = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
];

const FileUploader = ({
  children,
  allowedFileTypes = defaultAllowedFileTypes,
  multiple = false,
  min = 1,
  max = Infinity,
  className = "",
  maxFileSizeMB = 5,
  onFilesSelected,
  onError,
}: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const validateFiles = useCallback(
    (filesToValidate: File[]): FileWithPreview[] => {
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

      // Validate each file
      const validFiles: FileWithPreview[] = [];

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

        // Add preview for images
        const fileWithPreview = file as FileWithPreview;
        if (file.type.startsWith("image/")) {
          fileWithPreview.preview = URL.createObjectURL(file);
        }

        validFiles.push(fileWithPreview);
      }

      return validFiles;
    },
    [allowedFileTypes, max, maxFileSizeMB, min, onError]
  );

  const handleFilesSelected = useCallback(
    (selectedFiles: FileList | null) => {
      if (!selectedFiles) return;

      setIsUploading(true);
      try {
        const fileArray = Array.from(selectedFiles);
        const validatedFiles = validateFiles(fileArray);

        if (validatedFiles.length > 0) {
          setFiles(validatedFiles);
          onFilesSelected?.(validatedFiles);
        }

        console.log({ validatedFiles, fileArray });
      } catch (error) {
        onError?.(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setIsUploading(false);
      }
    },
    [onFilesSelected, validateFiles, onError]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFilesSelected(e.target.files);
  };

  // Drag and drop handlers
  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isDragging) setIsDragging(true);
    },
    [isDragging]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const droppedFiles = e.dataTransfer?.files;
      handleFilesSelected(droppedFiles);
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
      onDragEnter={handleDragEnter}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${isDragging ? "bg-primary-50 ring-2 ring-primary-500" : ""} flex w-fit ${className} `}
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
        className={`flex w-full cursor-pointer ${isUploading ? "cursor-not-allowed opacity-50" : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default FileUploader;
