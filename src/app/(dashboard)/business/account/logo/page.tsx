"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { onBusinessLogoUpload } from "@/actions/others.action";
import ContainerWrapper from "@/components/global/ContainerWrapper";
import toast from "@/components/global/toast";
import ImageUploader from "@/components/global/uploader/image-uploader";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useUser } from "@/hooks/auth";
import { ProcessedFileProps } from "@/lib/utils/files/upload.utils";
import { cn } from "@/lib/utils";

const BusinessLogo = () => {
  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFileProps[]>([]);
  const [checked, setChecked] = useState(false);
  const { user, isLoading, error } = useUser();

  const [extension, setExtension] = useState("");

  const handleFileUpload = (files: ProcessedFileProps[]) => {
    setUploadedFiles(files);
    console.log("files", files);
  };
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      const name = uploadedFiles[0].name;
      const ext = name.substring(name.lastIndexOf(".") + 1);
      setExtension(ext);
    }
  }, [uploadedFiles]);

  const handleBusinessLogo = async () => {
    if (uploadedFiles.length === 0) {
      toast.error({
        message: "Please upload a logo",
      });
      return;
    }

    if (!checked) {
      toast.error({
        message: "Please agree to the terms before proceeding.",
      });
    } else {
      const data = await onBusinessLogoUpload({
        bizName: user?.bizName!,
        bizid: user?.bizid!,
        extension,
        mainLogo: uploadedFiles[0].base64,
      });
      if (data.success) {
        toast.success({
          message: "Logo uploaded successfully",
        });
      }
    }
  };
  const mainLogo = user?.mainLogo
    ? `${user?.mainLogo}?v=${Date.now()}`
    : undefined;

  console.log("mainLogo", mainLogo);
  // if (isLoading) return <div>Loading</div>;
  // if (error) return <div>{"Error"}</div>;
  // if (!user) return <div>Please sign in</div>;
  return (
    // <div className="m-20 flex justify-center w-full">
    //   <div>
    //     <div className=" w-full text-blue-500 text-[1.5rem] ml-10">
    //       Business Logo Upload
    //     </div>
    //     <div className=" p-10 flex justify-center">
    //       <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
    //         <div className="flex rounded-md bg-blue-50 border-l-4 border-cyan-400 p-6">
    //           <p className="text-gray-500 text-lg">
    //             Please upload your business logo here, it will be displayed on
    //             the pages like offer listings, business terms of service etc.
    //           </p>
    //         </div>

    //         <div className="flex flex-row gap-5 justify-center mt-10">
    //           <div className="h-40 rounded-xl">
    //             {uploadedFiles.map((item) => (
    //               <Image
    //                 key={item.name}
    //                 height={320}
    //                 width={320}
    //                 src={item.base64Url}
    //                 alt="Business Logo"
    //                 className="rounded-lg"
    //               />
    //             ))}

    //             {!uploadedFiles.length && typeof mainLogo === "string" && (
    //               <Image
    //                 // key={item.name}
    //                 height={320}
    //                 width={320}
    //                 src={mainLogo}
    //                 alt="Business Logo"
    //                 className="rounded-lg h-[160] w-[300] object-cover"
    //               />
    //             )}
    //           </div>
    //           <div className="flex justify-end">
    //             <ImageUploader
    //               maxFileSizeMB={5}
    //               onImageUpload={handleFileUpload}
    //               minZoom={0.1}
    //             />
    //           </div>
    //         </div>
    //         <div className="flex flex-row justify-between mt-10">
    //           <div className="w-[90%]">
    //             <Checkbox
    //               checked={checked}
    //               onCheckedChange={() => setChecked(true)}
    //               className="mr-4"
    //             />
    //             <span className="">
    //               I represent and warrant that I have full ownership and/or
    //               licensing rights to the image and authorize Fyndr to use this
    //               image as per:{" "}
    //               <Link href="/legal/agreement" className="text-blue-600">
    //                 {" "}
    //                 Fyndr Business Agreement
    //               </Link>
    //             </span>
    //           </div>
    //           <div>
    //             <Button
    //               className={cn(
    //                 `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
    //                 "hover:bg-blue-500 text-white bg-blue-500"
    //               )}
    //               onClick={() => handleBusinessLogo()}
    //             >
    //               Save
    //             </Button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <ContainerWrapper title="Business Logo Upload">
      {/* <div className=" w-full text-blue-500 text-[1.5rem] ml-10">
        Business Logo Upload
      </div> */}
      <div className=" flex ">
        <div className="rounded-md border border-gray-200 bg-white p-4">
          <div className="flex rounded-md bg-blue-50 border-l-4 border-cyan-400 p-4">
            <p className="text-gray-500 text-[1rem]">
              Please upload your business logo here, it will be displayed on the
              pages like offer listings, business terms of service etc.
            </p>
          </div>

          <div className="mt-10 flex flex-row justify-center gap-5">
            <div className="h-40 rounded-xl">
              {uploadedFiles.map((item) => (
                <Image
                  key={item.name}
                  height={320}
                  width={320}
                  src={item.base64Url}
                  alt="Business Logo"
                  className="rounded-lg"
                />
              ))}

              {!uploadedFiles.length && typeof mainLogo === "string" && (
                <Image
                  // key={item.name}
                  height={320}
                  width={320}
                  src={mainLogo}
                  alt="Business Logo"
                  className="h-[160] w-[300] rounded-lg object-cover"
                />
              )}
            </div>
            <div className="flex justify-end">
              <ImageUploader
                maxFileSizeMB={5}
                onImageUpload={handleFileUpload}
                minZoom={0.1}
              />
            </div>
          </div>
          <div className="mt-10 flex flex-row justify-between">
            <div className="w-[90%]">
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
                  <Link href="/legal/agreement" className="ml-1 text-blue-600">
                    Fyndr Business Agreement
                  </Link>
                </span>
              </label>
            </div>
            <div>
              <Button
                className={cn(
                  `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
                  "hover:bg-blue-500 text-white bg-blue-500"
                )}
                onClick={() => handleBusinessLogo()}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      </div>
    </ContainerWrapper>
  );
};

export default BusinessLogo;
