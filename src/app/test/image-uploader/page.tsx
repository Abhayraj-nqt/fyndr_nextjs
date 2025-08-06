"use client";

import Image from "next/image";
import React, { useState } from "react";

import ImageUploader, {
  ImageUploaderOutput,
} from "@/components/global/uploader/image-uploader";

const ImageUploaderTest = () => {
  const [uploadedFiles, setUploadedFiles] = useState<ImageUploaderOutput[]>([]);

  const handleFileUpload = (files: ImageUploaderOutput[]) => {
    console.log(files);
    setUploadedFiles(files);
  };

  return (
    <div className="flex-center min-h-screen flex-col">
      <ImageUploader
        maxFileSizeMB={11}
        onImageUpload={handleFileUpload}
        canUploadVideo={true}
        className="mb-4"
        restrictPosition={false}
      />
      {uploadedFiles.map((item) =>
        item.type.startsWith("image") ? (
          <div key={item.name} className="flex gap-4">
            <div className="flex flex-col gap-4">
              <h1>Image</h1>
              <Image
                height={200}
                width={200}
                src={item.base64Url}
                alt="bjdbw"
              />
            </div>
            <div className="flex flex-col gap-4">
              <h2>Thumbnail</h2>
              <Image
                alt="lwmdw"
                height={200}
                width={200}
                src={item.thumbnailBase64Url!}
              />
            </div>
          </div>
        ) : (
          <video key={item.name} controls className="w-72">
            <source src={item.base64Url} type={item.type} />
          </video>
        )
      )}
    </div>
  );
};

export default ImageUploaderTest;
