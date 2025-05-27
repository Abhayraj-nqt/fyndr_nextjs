"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import ImageUploader from "@/components/global/uploader/image-uploader";
import { ProcessedFileProps } from "@/lib/file-utils/upload.utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { onBusinessLogoUpload, onQrLogoUpload } from "@/actions/others.action";
import { useUser } from "@/hooks/auth";
import toast from "@/components/global/toast";
import Link from "next/link";
import { QRCode } from "react-qrcode-logo";
import ContainerWrapper from "@/components/global/ContainerWrapper";

export const Qr = () => {
  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFileProps[]>([]);
  const [checked, setChecked] = useState(false);
  const { user, isLoading, error } = useUser();
  const [extension, setExtension] = useState("");
  const handleFileUpload = (files: ProcessedFileProps[]) => {
    setUploadedFiles(files);
    console.log("files", files);
  };
  useEffect(() => {
    console.log("user?.qrLogo:", user?.qrLogo);
  }, [user]);

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      const name = uploadedFiles[0].name;
      const ext = name.substring(name.lastIndexOf(".") + 1);
      setExtension(ext);
    }
    console.log("uploadedFiles", uploadedFiles, user?.qrLogo);
  }, [uploadedFiles]);
  const handleBusinessLogo = async () => {
    if (uploadedFiles.length === 0) {
      toast.error({
        message: "Please upload a QR logo",
      });
      return;
    }

    if (!checked) {
      toast.error({
        message: "Please agree to the terms before proceeding.",
      });
    } else {
      const data = await onQrLogoUpload({
        bizName: user?.bizName!,
        bizid: user?.bizid!,
        extension: extension,
        qrLogo: uploadedFiles[0].base64,
      });
      if (data.success) {
        toast.success({
          message: "QR Logo uploaded successfully",
        });
      }
    }
  };

  return (
    <ContainerWrapper title="Customize QR logo">
      <div className="border border-gray-200 rounded-md bg-white shadow p-4 ">
        <div className="flex items-center bg-blue-50 border-l-4 border-cyan-400 p-4 mb-6 rounded-md">
          <p className="text-gray-600 text-base">
            Please upload the logo here to be placed on the center of QR image
            of your interaction venues.
          </p>
        </div>

        <div className="flex flex-row gap-5 justify-center mt-10">
          <div className="relative w-[200px] h-[200px]">
            <QRCode
              style={{ maxWidth: "100%" }}
              size={160}
              logoWidth={40}
              logoImage={
                //   uploadImage?.indexOf("s3-us-west-1.amazonaws.com") > 0
                //     ? uploadImage?.indexOf("qrLogo") > 0
                //       ? `${uploadImage}?m=${new Date().getTime()}`
                //       : ""
                //     : uploadImage

                uploadedFiles[0]?.base64Url ||
                (user?.qrLogo ? `${user.qrLogo}?v=${Date.now()}` : undefined)
              }
            />
          </div>
          <div className="flex justify-center mb-6">
            <ImageUploader
              maxFileSizeMB={5}
              onImageUpload={handleFileUpload}
              minZoom={0.1}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <label className="flex items-start text-sm text-gray-700">
            <Checkbox
              checked={checked}
              onCheckedChange={() => setChecked(!checked)}
              className="mr-2 mt-1"
            />
            <span>
              I represent and warrant that I have full ownership and/or
              licensing rights to the image and authorize Fyndr to use this
              image as per:
              <Link href="/legal/agreement" className="text-blue-600 ml-1">
                Fyndr Business Agreement
              </Link>
            </span>
          </label>
          <Button
            className={cn(
              `rounded-lg px-6 py-2 capitalize shadow-none`,
              "hover:bg-blue-600 text-white bg-blue-500"
            )}
            onClick={() => handleBusinessLogo()}
          >
            Save
          </Button>
        </div>
      </div>
    </ContainerWrapper>
    // <div className="m-20 flex justify-center w-full">
    //   <div className="w-full max-w-6xl h-full max-h-full">
    //     <h2 className="text-blue-600 text-2xl mb-6">Customize QR logo</h2>

    //   </div>
    // </div>
  );
};
export default Qr;
