"use client";

import { UploadCloud } from "lucide-react";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  toBase64,
  extractBase64,
  isImageFile,
  compressImage,
} from "@/lib/file/file-upload";

import ImageCropper, {
  FileUploaderProps,
  ProcessedFileProps,
} from "./ImageCropper";

const FileUploader: React.FC<FileUploaderProps> = ({
  onFileProcessed,
  enableCrop = true,
  cropAspectRatio = 1,
  maxFileSizeMB = 5,
  allowedFileTypes = ["image/jpeg", "image/png", "image/gif"],
  maxWidth = 1920,
  maxHeight = 1080,
  compressQuality = 0.8,
  className,
  label = "Drop files here or click to upload",
}) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileToProcess, setFileToProcess] = useState<File | null>(null);
  const [cropModalVisible, setCropModalVisible] = useState(false);
  const { toast } = useToast();

  const processFile = useCallback(
    async (file: File): Promise<void> => {
      try {
        // Compress file if it's an image and larger than max size
        const processedFile = isImageFile(file.type)
          ? await compressImage(file, {
              quality: compressQuality,
              maxWidth,
              maxHeight,
              maxSizeMB: maxFileSizeMB,
            })
          : file;

        const base64Url = await toBase64(processedFile);

        const result: ProcessedFileProps = {
          name: file.name,
          type: file.type,
          base64: extractBase64(base64Url),
          base64Url,
          orgFile: file,
        };

        if (isImageFile(file.type) && enableCrop) {
          setPreviewUrl(base64Url);
          setFileToProcess(file);
          setCropModalVisible(true);
        } else {
          onFileProcessed(result);
        }
      } catch (error) {
        console.error("Error processing file:", error);
        toast({
          variant: "destructive",
          title: "Error processing file",
          description:
            "There was a problem processing your file. Please try again.",
        });
      }
    },
    [
      compressQuality,
      enableCrop,
      maxFileSizeMB,
      maxHeight,
      maxWidth,
      onFileProcessed,
      toast,
    ]
  );

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;
      processFile(acceptedFiles[0]);
    },
    [processFile]
  );

  const handleCropComplete = useCallback(
    async (croppedImageUrl: string, croppedBlob: Blob) => {
      if (!fileToProcess) return;

      const result: ProcessedFileProps = {
        name: fileToProcess.name,
        type: croppedBlob.type,
        base64: extractBase64(croppedImageUrl),
        base64Url: croppedImageUrl,
        orgFile: fileToProcess,
      };

      onFileProcessed(result);
      setCropModalVisible(false);
      setPreviewUrl(null);
      setFileToProcess(null);
    },
    [fileToProcess, onFileProcessed]
  );

  const handleCropCancel = useCallback(() => {
    setCropModalVisible(false);
    setPreviewUrl(null);
    setFileToProcess(null);
  }, []);

  const validateFile = useCallback(
    (file: File) => {
      // Check file type
      if (!allowedFileTypes.includes(file.type)) {
        toast({
          variant: "destructive",
          title: "Invalid file type",
          description: `Accepted types: ${allowedFileTypes.join(", ")}`,
        });
        return false;
      }

      // Check file size
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        toast({
          variant: "destructive",
          title: "File too large",
          description: `File size exceeds ${maxFileSizeMB}MB limit`,
        });
        return false;
      }

      return true;
    },
    [allowedFileTypes, maxFileSizeMB, toast]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: allowedFileTypes.reduce(
      (acc, type) => {
        acc[type] = [];
        return acc;
      },
      {} as Record<string, string[]>
    ),
    maxSize: maxFileSizeMB * 1024 * 1024,
    maxFiles: 1,
    validator: validateFile,
  });

  return (
    <>
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:bg-muted/50"
        } ${className || ""}`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2">
          <div className="flex justify-center">
            <UploadCloud className="text-muted-foreground size-10" />
          </div>
          <p className="text-base font-medium">
            {isDragActive ? "Drop the file here" : label}
          </p>
          <p className="text-muted-foreground text-sm">
            Supports:{" "}
            {allowedFileTypes
              .map((type) => type.replace("image/", ""))
              .join(", ")}
          </p>
          <p className="text-muted-foreground text-sm">
            Max size: {maxFileSizeMB}MB
          </p>
        </div>
      </div>

      <Dialog open={cropModalVisible} onOpenChange={setCropModalVisible}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Crop Image</DialogTitle>
          </DialogHeader>
          {previewUrl && (
            <ImageCropper
              imageUrl={previewUrl}
              aspectRatio={cropAspectRatio}
              onCropComplete={handleCropComplete}
              onCancel={handleCropCancel}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default FileUploader;
