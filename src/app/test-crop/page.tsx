"use client";

import { Upload, Image as ImageIcon, File, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import ImageCropper from "@/components/global/image-cropper";
import FileUploader from "@/components/global/uploader/file-uploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { ProcessedFileProps } from "@/lib/file-utils/upload.utils";

export default function ImageUploaderPage() {
  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFileProps[]>([]);
  const [uploadedCroppedImages, setUploadedCroppedImages] = useState<
    ProcessedFileProps[]
  >([]);

  // Handler for regular file uploads
  const handleFileUpload = (files: ProcessedFileProps[]) => {
    setUploadedFiles((prev) => [...prev, ...files]);
    toast({
      title: "Files Uploaded",
      description: `Successfully uploaded ${files.length} file(s)`,
    });
  };

  // Handler for cropped image uploads
  const handleCroppedImageUpload = (files: ProcessedFileProps[]) => {
    setUploadedCroppedImages((prev) => [...prev, ...files]);
    toast({
      title: "Cropped Image Uploaded",
      description: `Successfully uploaded ${files.length} cropped image(s)`,
    });
  };

  // Remove file handler
  const removeFile = (file: ProcessedFileProps, isCropped: boolean) => {
    if (isCropped) {
      setUploadedCroppedImages((prev) =>
        prev.filter((f) => f.base64 !== file.base64)
      );
    } else {
      setUploadedFiles((prev) => prev.filter((f) => f.base64 !== file.base64));
    }
  };

  return (
    <div className="container mx-auto space-y-8 p-6">
      <h1 className="mb-6 text-3xl font-bold">File Upload Demo</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Regular File Uploader */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Regular File Upload</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Upload any file type without cropping
          </p>

          <FileUploader
            onUpload={handleFileUpload}
            allowedFileTypes={[
              "image/jpeg",
              "image/png",
              "image/gif",
              "application/pdf",
            ]}
            multiple={true}
            maxFileSizeMB={5}
            className="h-40"
          >
            <div className="flex h-full flex-col items-center justify-center">
              <Upload className="mb-2 size-10 text-gray-400" />
              <p className="text-center text-sm font-medium">
                Drag & drop files here or click to browse
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Supported files: JPEG, PNG, GIF, PDF (Max: 5MB)
              </p>
            </div>
          </FileUploader>

          {/* Display uploaded files */}
          {uploadedFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-medium">Uploaded Files</h3>
              <div className="grid grid-cols-1 gap-2">
                {uploadedFiles.map((file, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="flex items-center justify-between p-3">
                      <div className="flex items-center space-x-3">
                        {file.type.startsWith("image/") ? (
                          <div className="size-12 overflow-hidden rounded bg-gray-100">
                            <Image
                              src={file.base64Url}
                              alt={file.name}
                              className="size-full object-cover"
                              height={100}
                              width={200}
                            />
                          </div>
                        ) : (
                          <div className="flex size-12 items-center justify-center rounded bg-gray-100">
                            <File className="size-6 text-gray-500" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium">
                            {file.name}
                          </p>
                          <p className="text-xs text-gray-500">{file.type}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(file, false)}
                      >
                        <X className="size-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Image Cropper */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Image Upload with Cropping</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Upload and crop images before saving
          </p>

          <ImageCropper
            onCropComplete={handleCroppedImageUpload}
            aspectRatio={2 / 1}
            rotationSlider={true}
            zoomSlider={true}
            imageQuality={0.8}
          >
            <FileUploader
              allowedFileTypes={["image/jpeg", "image/png", "image/gif"]}
              multiple={false}
              maxFileSizeMB={10}
              className="h-40"
            >
              <div className="flex h-full flex-col items-center justify-center">
                <ImageIcon className="mb-2 size-10 text-gray-400" />
                <p className="text-center text-sm font-medium">
                  Drag & drop an image here or click to browse
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Supported files: JPEG, PNG, GIF (Max: 10MB)
                </p>
              </div>
            </FileUploader>
          </ImageCropper>

          {/* Display cropped images */}
          {uploadedCroppedImages.length > 0 && (
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-medium">Cropped Images</h3>
              <div className="grid grid-cols-2 gap-2">
                {uploadedCroppedImages.map((file, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="aspect-square w-full overflow-hidden bg-gray-100">
                      <Image
                        src={file.base64Url}
                        alt={file.name}
                        className="size-full object-cover"
                        height={100}
                        width={200}
                      />
                    </div>
                    <CardContent className="flex items-center justify-between p-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium">
                          {file.name}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFile(file, true)}
                      >
                        <X className="size-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
