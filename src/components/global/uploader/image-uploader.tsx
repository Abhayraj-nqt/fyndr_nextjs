"use client";

import { ImageIcon } from "lucide-react";
import React from "react";
import Resizer from "react-image-file-resizer";

import { ProcessedFileProps } from "@/lib/utils/files/upload.utils";

import ImageCropper from "../image-cropper";
import FileUploader from "./file-uploader";

type ThumbnailProps = {
  thumbnailBase64?: string;
  thumbnailBase64Url?: string;
};

export type ImageUploaderOutput = ProcessedFileProps & ThumbnailProps;

type Props = {
  children?: React.ReactNode;
  multiple?: boolean;
  className?: string;
  maxFileSizeMB: number;
  aspectRatio?: number;
  onImageUpload: (files: ImageUploaderOutput[]) => void;
  canUploadVideo?: boolean;
  minZoom?: number;
  maxZoom?: number;
  restrictPosition?: boolean;
};

type ResizeOptions = {
  maxWidth: number;
  maxHeight: number;
  quality: number;
  format: string;
  rotation: number;
};

const DEFAULT_RESIZE_OPTIONS: Required<ResizeOptions> = {
  maxWidth: 1920,
  maxHeight: 1080,
  quality: 100,
  format: "image/jpeg",
  rotation: 0,
};
const THUMBNAIL_RESIZE_OPTIONS: Required<ResizeOptions> = {
  maxWidth: 200,
  maxHeight: 200,
  quality: 100,
  format: "image/jpeg",
  rotation: 0,
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

const resize = ({
  file,
  maxHeight,
  maxWidth,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  format,
  quality,
  rotation,
}: ResizeOptions & { file: File }): Promise<
  string | File | Blob | ProgressEvent<FileReader>
> => {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      maxWidth,
      maxHeight,
      // format,
      "JPEG",
      quality,
      rotation,
      (uri) => {
        resolve(uri);
      },
      "base64"
    );
  });
};

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

  const handleImageUpload = async (files: ImageUploaderOutput[]) => {
    const processedFiles = await Promise.all(
      files.map(async (fileItem) => {
        if (fileItem.type.startsWith("video")) {
          return { ...fileItem };
        }

        const thumbnail = (await resize({
          ...THUMBNAIL_RESIZE_OPTIONS,
          file: fileItem.orgFile!,
        })) as string;

        const image = (await resize({
          ...DEFAULT_RESIZE_OPTIONS,
          file: fileItem.orgFile!,
        })) as string;

        return {
          name: fileItem.name,
          type: DEFAULT_RESIZE_OPTIONS.format,
          orgFile: fileItem.orgFile,
          base64: image.substring(image.indexOf("base64,") + 7),
          base64Url: image,
          thumbnailBase64: thumbnail.substring(
            thumbnail.indexOf("base64,") + 7
          ),
          thumbnailBase64Url: thumbnail,
        };
      })
    );

    onImageUpload(processedFiles);
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
        {children || (
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
