"use client";

import { Upload } from "lucide-react";
import React, { useState } from "react";

import toast from "@/components/global/toast";
import FileUploader from "@/components/global/uploader/file-uploader";
import { ProcessedFileProps } from "@/lib/utils/files/upload.utils";

const TestUploader = () => {
  const [, setuploadedFiles] = useState<ProcessedFileProps[]>([]);

  const handleFileUpload = (files: ProcessedFileProps[]) => {
    console.log("UPLOADED FILES -> ", files);

    setuploadedFiles((prev) => [...prev, ...files]);
    toast.success({
      message: "Files Uploaded",
    });
  };

  // const removeFile = (file: ProcessedFileProps) => {
  //   setuploadedFiles((prev) => prev.filter((f) => f.base64 !== file.base64));
  // };

  return (
    <div className="flex flex-col gap-8">
      <h1>This is file upload demo</h1>

      <FileUploader
        onUpload={handleFileUpload}
        allowedFileTypes={[
          "image/jpeg",
          "image/png",
          "image/gif",
          "application/pdf",
        ]}
        multiple={true}
        maxFileSizeMB={50}
        className="h-40"
      >
        <div className="flex h-full flex-col items-center justify-center">
          <Upload className="mb-2 size-10 text-gray-400" />
          <p className="text-center text-sm font-medium">
            Drag & drop files here or click to browse
          </p>
        </div>
      </FileUploader>
    </div>
  );
};

export default TestUploader;
