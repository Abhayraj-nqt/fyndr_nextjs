"use client";

import React, { useState } from "react";

import FileUploader from "./_components/FileUploader";
import { ProcessedFileProps } from "./_components/ImageCropper";

const App: React.FC = () => {
  const [processedFile, setProcessedFile] = useState<ProcessedFileProps | null>(
    null
  );

  const handleFileProcessed = (file: ProcessedFileProps) => {
    setProcessedFile(file);
    console.log("Processed file:", file);
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-bold">File Upload Demo</h1>

      <FileUploader
        onFileProcessed={handleFileProcessed}
        enableCrop={true}
        cropAspectRatio={1}
        maxFileSizeMB={5}
        allowedFileTypes={["image/jpeg", "image/png", "image/gif"]}
      />

      {processedFile && (
        <div className="mt-6 rounded-md border p-4">
          <h2 className="mb-2 text-lg font-semibold">Processed File</h2>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {processedFile.name}
            </p>
            <p>
              <strong>Type:</strong> {processedFile.type}
            </p>
            {processedFile.type.startsWith("image/") && (
              <div>
                <p>
                  <strong>Preview:</strong>
                </p>
                <img
                  src={processedFile.base64Url}
                  alt="Preview"
                  className="mt-2 max-h-64 rounded border"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
