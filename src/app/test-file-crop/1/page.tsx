"use client";

import { useState } from "react";

import FileUploader from "@/components/global/image-cropper/file-uploader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function FileUploadDemo() {
  const [uploadedFile, setUploadedFile] = useState<File | Blob | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [enableCropping, setEnableCropping] = useState(true);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [aspectRatio, setAspectRatio] = useState<number>(2); // Default 2:1

  const handleFileUpload = async (file: File | Blob, fileUrl?: string) => {
    // In a real application, you would upload the file to your server here
    setUploadStatus("uploading");

    // Simulate file upload with a delay
    setTimeout(() => {
      setUploadedFile(file);
      if (fileUrl) {
        setUploadedImageUrl(fileUrl);
      } else if (file instanceof File || file instanceof Blob) {
        // Create URL for non-image files
        setUploadedImageUrl(URL.createObjectURL(file));
      }
      setUploadStatus("success");
    }, 1500);
  };

  const handleReset = () => {
    if (uploadedImageUrl) {
      URL.revokeObjectURL(uploadedImageUrl);
    }
    setUploadedFile(null);
    setUploadedImageUrl(null);
    setUploadStatus("idle");
  };

  return (
    <div className="container mx-auto space-y-8 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-6 text-3xl font-bold">File Upload Demo</h1>

        {uploadStatus !== "success" ? (
          <>
            <div className="mb-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold">Upload Settings</h2>
                  <p className="text-sm text-gray-500">
                    Configure your upload preferences
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="crop-mode"
                  checked={enableCropping}
                  onCheckedChange={setEnableCropping}
                />
                <Label htmlFor="crop-mode">Enable image cropping</Label>
              </div>

              {enableCropping && (
                <div className="space-y-2">
                  <Label>Aspect Ratio</Label>
                  <Tabs defaultValue="2:1" className="w-full max-w-md">
                    <TabsList className="w-full">
                      <TabsTrigger
                        value="2:1"
                        className="flex-1"
                        onClick={() => setAspectRatio(2)}
                      >
                        2:1
                      </TabsTrigger>
                      <TabsTrigger
                        value="1:1"
                        className="flex-1"
                        onClick={() => setAspectRatio(1)}
                      >
                        1:1
                      </TabsTrigger>
                      <TabsTrigger
                        value="16:9"
                        className="flex-1"
                        onClick={() => setAspectRatio(16 / 9)}
                      >
                        16:9
                      </TabsTrigger>
                      <TabsTrigger
                        value="4:3"
                        className="flex-1"
                        onClick={() => setAspectRatio(4 / 3)}
                      >
                        4:3
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              )}

              <FileUploader
                onFileUpload={handleFileUpload}
                acceptedFileTypes={[
                  "image/jpeg",
                  "image/png",
                  "image/gif",
                  "image/webp",
                ]}
                maxFileSize={5242880} // 5MB
                cropImage={enableCropping}
                cropAspectRatio={aspectRatio}
              />

              {uploadStatus === "uploading" && (
                <div className="py-4 text-center">
                  <div className="border-primary inline-block size-8 animate-spin rounded-full border-4 border-solid border-r-transparent"></div>
                  <p className="mt-2 text-sm text-gray-600">
                    Uploading your file...
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="border-b bg-gray-50 p-4">
                <h3 className="font-semibold">File Uploaded Successfully</h3>
              </div>
              <div className="p-4">
                {uploadedFile && (
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Name:</span>{" "}
                      {uploadedFile instanceof File
                        ? uploadedFile.name
                        : "Cropped Image"}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Size:</span>{" "}
                      {(uploadedFile.size / 1024).toFixed(1)} KB
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Type:</span>{" "}
                      {uploadedFile.type}
                    </p>
                  </div>
                )}

                {uploadedImageUrl &&
                  uploadedFile?.type.startsWith("image/") && (
                    <div className="mt-4 max-h-96 overflow-hidden rounded-md">
                      <img
                        src={uploadedImageUrl}
                        alt="Uploaded image"
                        className="h-auto w-full object-contain"
                      />
                    </div>
                  )}
              </div>
            </Card>

            <div className="flex justify-center">
              <Button onClick={handleReset}>Upload Another File</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
