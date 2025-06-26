"use client";
import Image from "next/image";
import React, { useState } from "react";

import DefaultCard from "@/components/global/cards/default-card";
import ImageUploader from "@/components/global/uploader/image-uploader";
import { ProcessedFileProps } from "@/lib/utils/files/upload.utils";
import { useCampaignStore } from "@/zustand/stores/campaign.store";

const ImagesVidoesComponent = () => {
  const { campaignPayload, updateCampaignPayload } = useCampaignStore();
  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFileProps[]>([]);
  console.log("ppp", campaignPayload);

  const handleFileUpload = (files: ProcessedFileProps[]) => {
    const newFiles = [...uploadedFiles, ...files];

    const images = newFiles
      .filter((f) => f.type.startsWith("image"))
      .slice(0, 2);
    const videos = newFiles
      .filter((f) => f.type.startsWith("video"))
      .slice(0, 1);

    const finalFiles = [...images, ...videos];
    console.log("final", finalFiles);

    setUploadedFiles([...images, ...videos]);
    const formattedPayload = finalFiles.map((file, index) => {
      console.log("Processing file:", file);

      return {
        img: file.base64,
        thumbnail: file.base64,
        index,
      };
    });

    updateCampaignPayload("cmpnImgs", formattedPayload);
    updateCampaignPayload("campaignVideo", []);
    console.log("uploaded", formattedPayload);
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
            {uploadedFiles.map((item) => (
              <Image
                key={item.name}
                height={200}
                width={300}
                src={item.base64Url}
                alt="cmpn"
                className="mb-2"
              />
              // ) : (
              //   <video key={item.name} controls className="w-72">
              //     <source src={item.base64Url} type={item.type} />
              //   </video>
              // )
            ))}
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
