"use client";

import FileUploader from "@/components/global/file-uploader";

export default function YourPage() {
  const handleFilesSelected = (files) => {
    console.log("Files ready for submission:", files);
    // Each file object contains: { name, type, size, base64 }
    // You can send the base64 directly to your API
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">File Upload</h1>

      <FileUploader
        allowedFileTypes={["image/jpeg", "image/png", "application/pdf"]}
        allowedExtensions={[".jpg", ".jpeg", ".png", ".pdf"]}
        maxFileSizeMB={5}
        multiple={false}
        withCropper={true} // Enable image cropping
        onFilesSelected={handleFilesSelected}
        className="mb-4"
      />
    </div>
  );
}
