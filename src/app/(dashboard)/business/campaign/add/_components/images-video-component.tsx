import Image from "next/image";
import React, { useState } from "react";

import DefaultCard from "@/components/global/cards/default-card";
import ImageUploader from "@/components/global/uploader/image-uploader";
import { ProcessedFileProps } from "@/lib/utils/files/upload.utils";

const ImagesVidoesComponent = () => {
  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFileProps[]>([]);

  const handleFileUpload = (files: ProcessedFileProps[]) => {
    console.log(files);
    setUploadedFiles(files);
  };
  return (
    <>
      <DefaultCard className="m-4 h-[500px] min-h-[134px] w-full max-w-[772px] flex-col border-solid bg-white p-[23px] outline-black">
        <div className="flex flex-row gap-8">
          <div className="flex">
            <ImageUploader
              maxFileSizeMB={5}
              onImageUpload={handleFileUpload}
              canUploadVideo={true}
              multiple={true}
              className="h-[420px] w-auto"
            />
          </div>
          <div>
            {uploadedFiles.map((item) =>
              item.type.startsWith("image") ? (
                <Image
                  key={item.name}
                  height={200}
                  width={300}
                  src={item.base64Url}
                  alt="cmpn"
                />
              ) : (
                <video key={item.name} controls className="w-72">
                  <source src={item.base64Url} type={item.type} />
                </video>
              )
            )}
          </div>
        </div>
        <div className="mt-3 flex">
          <span className="text-xs font-normal text-secondary-40">
            Note : Upload 2 Images & 1 Video (up to 5 MB each)
          </span>
        </div>
      </DefaultCard>
    </>
  );
};

export default ImagesVidoesComponent;
