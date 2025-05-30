import Image from "next/image";
import Link from "next/link";
import React from "react";

const DownloadFyndr = () => {
  return (
    // <div
    // //  style="margin: auto"
    // >
    //   <div
    //   // style="margin: auto"
    //   >
    //     <div
    //     // style="text-align: center; margin: 20px"
    //     >
    //       {/* <object
    //         type="image/svg+xml"
    //         data="../legal/logo.svg"
    //         width="250"
    //       ></object> */}
    //     </div>
    //     <div
    //     //  style="float: left"
    //     >
    //       <Link href="https://apps.apple.com/us/app/id1528140419">
    //         <Image
    //           src="/images/apple-store.png"
    //           // style="max-height: 100px"
    //           width={300}
    //           height={500}
    //           alt="apple-store"
    //         />
    //       </Link>
    //     </div>
    //     <div
    //     //  style="float: left"
    //     >
    //       <Link href="http://play.google.com/store/apps/details?id=fyndr.us">
    //         <Image
    //           src="/images/google-play-badge.png"
    //           // class="gplay"
    //           width={300}
    //           height={500}
    //           alt="playstore"
    //         />
    //       </Link>
    //     </div>
    //   </div>
    // </div>
    <div className="relative flex min-h-screen items-center justify-center bg-gray-100 px-4">
      {/* White Container with text & store buttons */}
      <div className="relative z-0 flex h-[300] w-full max-w-5xl flex-col items-center justify-center rounded-3xl bg-white p-10 pl-32 shadow-2xl md:flex-row">
        <div className="text-left md:text-right">
          <div className="w-[700] text-left md:text-right">
            <h2 className="mb-6 text-5xl font-semibold text-gray-800">
              Download Fyndr
            </h2>
          </div>
          <div className=" ml-[40] flex w-full justify-end space-x-4 rounded-lg md:justify-end">
            <Link
              href="https://play.google.com/store/apps/details?id=com.fyndr.us"
              rel="noopener noreferrer"
            >
              <div className="rounded-full">
                <Image
                  src="/images/google-play-badge1.png"
                  alt="Google Play"
                  width={200}
                  height={100}
                />
              </div>
            </Link>
            <div className="">
              <Link
                href="https://apps.apple.com/us/app/id1528140419"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/apple-store1.png"
                  alt="Apple Store"
                  width={200}
                  height={100}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Phone Image Positioned Above */}
      <div className="z-999 absolute left-[300]">
        <Image
          src="/images/fyndrMobile.png"
          alt="Mobile Fyndr App"
          width={380}
          height={450}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default DownloadFyndr;
