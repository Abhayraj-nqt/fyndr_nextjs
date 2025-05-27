"use client";

import Image from "next/image";
import React, { useState } from "react";

import ImageUploader from "@/components/global/uploader/image-uploader";
import { ProcessedFileProps } from "@/lib/file-utils/upload.utils";

const ImageUploaderTest = () => {
  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFileProps[]>([]);

  const handleFileUpload = (files: ProcessedFileProps[]) => {
    console.log(files);
    setUploadedFiles(files);
  };

  return (
    <div className="flex-center min-h-screen">
      <ImageUploader
        maxFileSizeMB={10}
        onImageUpload={handleFileUpload}
        canUploadVideo={true}
      />
      {uploadedFiles.map((item) =>
        item.type.startsWith("image") ? (
          <Image
            key={item.name}
            height={200}
            width={200}
            src={item.base64Url}
            alt="bjdbw"
          />
        ) : (
          <video controls className="w-72">
            <source src={item.base64Url} type={item.type} />
          </video>
        )
      )}
    </div>
  );
};

export default ImageUploaderTest;
