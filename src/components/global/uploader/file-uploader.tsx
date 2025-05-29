"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

import {
  AllowedFileType,
  FileWithPreview,
  ProcessedFileProps,
  defaultAllowedFileTypes,
  processFiles,
  validateFiles,
} from "@/lib/file-utils/upload.utils";
import { cn } from "@/lib/utils";

export type FileUploaderProps = {
  /**
   * Custom content to display in the upload area
   */
  children: React.ReactNode;

  /**
   * Allowed file types (MIME types)
   * @default ["image/jpeg", "image/png", "image/gif", "application/pdf"]
   */
  allowedFileTypes?: AllowedFileType[];

  /**
   * Allow multiple file uploads
   * @default false
   */
  multiple?: boolean;

  /**
   * Minimum number of files required
   * @default 1
   */
  min?: number;

  /**
   * Maximum number of files allowed
   * @default 10
   */
  max?: number;

  /**
   * Additional class name for the uploader container
   */
  className?: string;

  /**
   * Maximum file size in MB
   * @default 10
   */
  maxFileSizeMB?: number;

  /**
   * Image quality for compression (0-1)
   * @default undefined (no compression)
   */
  imageQuality?: number;

  /**
   * Callback when files are successfully processed
   */
  onUpload?: (files: ProcessedFileProps[]) => void;

  /**
   * Callback when files are selected but before processing
   */
  onSelect?: (files: FileWithPreview[]) => void;

  /**
   * Callback when an error occurs
   */
  onError?: (error: string) => void;

  /**
   * Disable the uploader
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional validation function
   */
  additionalValidation?: (files: File[]) => boolean;
};

/**
 * A reusable file uploader component that uses react-dropzone
 * Allows custom UI via children prop
 */
const FileUploader = ({
  children,
  allowedFileTypes = defaultAllowedFileTypes,
  multiple = false,
  min = 1,
  max = 10,
  className,
  maxFileSizeMB = 10,
  imageQuality,
  onUpload,
  onSelect,
  onError,
  disabled = false,
  additionalValidation,
}: FileUploaderProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const mountedRef = useRef(true);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled) return;

      try {
        // setIsProcessing(true);

        // Run additional validation if provided
        if (additionalValidation && !additionalValidation(acceptedFiles)) {
          return;
        }

        // Validate files based on constraints
        const validFiles = validateFiles(acceptedFiles, {
          allowedFileTypes,
          min,
          max,
          maxFileSizeMB,
          onError,
        });

        if (validFiles.length === 0) {
          // setIsProcessing(false);
          return;
        }

        // Notify about valid file selection
        onSelect?.(validFiles);

        // Process files (convert to base64, etc.)
        const processed = await processFiles(validFiles, imageQuality);

        // Ensure component is still mounted before updating state
        if (mountedRef.current) {
          onUpload?.(processed);
          // setIsProcessing(false);
        }
      } catch (error) {
        console.error("File upload error:", error);
        onError?.(error instanceof Error ? error.message : "Unknown error");
      } finally {
        if (mountedRef.current) {
          setIsProcessing(false);
        }
      }
    },
    [
      disabled,
      // isProcessing,
      additionalValidation,
      allowedFileTypes,
      min,
      max,
      maxFileSizeMB,
      onError,
      onSelect,
      imageQuality,
      onUpload,
    ]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    disabled,
    accept: allowedFileTypes.reduce(
      (acc, type) => {
        acc[type] = [];
        return acc;
      },
      {} as Record<string, string[]>
    ),
    multiple,
    maxFiles: multiple ? max : 1,
    // minFiles: min,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "relative cursor-pointer rounded-md border-2 border-dashed border-gray-300 p-6 transition-colors",
        isDragActive && "border-primary bg-primary/5",
        disabled && "cursor-not-allowed opacity-60",
        isProcessing && "cursor-wait",
        className
      )}
    >
      <input {...getInputProps()} />
      {children}
      {/* {isProcessing && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80">
          <div className="text-center">Processing...</div>
        </div>
      )} */}
    </div>
  );
};

export default FileUploader;
