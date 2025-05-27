"use client";

import { ProcessedFileProps } from "@/lib/file-utils/upload.utils";
import React from "react";
import ImageCropper from "../image-cropper";
import FileUploader from "./file-uploader";
import { ImageIcon } from "lucide-react";

type Props = {
  children?: React.ReactNode;
  multiple?: boolean;
  className?: string;
  maxFileSizeMB: number;
  aspectRatio?: number;
  onImageUpload: (files: ProcessedFileProps[]) => void;
  canUploadVideo?: boolean;
  minZoom?: number;
  maxZoom?: number;
  restrictPosition?: boolean;
};

let ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/bmp",
  "image/svg+xml",
  "image/tiff",
  "image/x-icon",
  "image/heif",
  "image/heic",
];

const ImageUploader = ({
  children,
  multiple = false,
  className = "",
  maxFileSizeMB = 5,
  aspectRatio = 2 / 1,
  onImageUpload,
  canUploadVideo = false,
  maxZoom,
  minZoom,
  restrictPosition,
}: Props) => {
  if (canUploadVideo) {
    ALLOWED_FILE_TYPES = [
      ...ALLOWED_FILE_TYPES,

      "video/mp4",
      "video/mkv",
      "video/webm",
      "video/ogg",
      "video/quicktime",
      "video/x-msvideo",
      "video/x-ms-wmv",
      "video/mpeg",
      "video/3gpp",
      "video/3gpp2",
      "video/x-flv",
      "video/avi",
      "video/x-matroska",
    ];
  }

  const handleImageUpload = (files: ProcessedFileProps[]) => {
    onImageUpload(files);
  };

  return (
    <ImageCropper
      onCropComplete={handleImageUpload}
      aspectRatio={aspectRatio}
      rotationSlider={true}
      zoomSlider={true}
      imageQuality={0.8}
      minZoom={minZoom}
      maxZoom={maxZoom}
      restrictPosition={restrictPosition}
    >
      <FileUploader
        allowedFileTypes={ALLOWED_FILE_TYPES}
        multiple={multiple}
        maxFileSizeMB={maxFileSizeMB}
        className={`h-40 ${className}`}
      >
        {children ? (
          children
        ) : (
          <>
            <div className="flex h-full flex-col items-center justify-center">
              <ImageIcon className="mb-2 size-10 text-gray-400" />
              <p className="text-center text-sm font-medium">
                Drag & drop an image here or click to browse
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Maximum file size: {maxFileSizeMB}MB
              </p>
            </div>
          </>
        )}
      </FileUploader>
    </ImageCropper>
  );
};

export default ImageUploader;
