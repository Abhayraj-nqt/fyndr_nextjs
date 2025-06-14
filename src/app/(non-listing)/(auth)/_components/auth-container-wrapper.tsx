import React from "react";

import ASSETS from "@/constants/assets";

type Props = {
  children: React.ReactNode;
  title: string;
  description: string;
};

const AuthContainerWrapper = ({ children, title, description }: Props) => {
  return (
    <section className="flex min-h-screen items-center justify-center bg-white p-1">
      <main className="relative m-2 my-10 h-screen max-h-[800px] w-full max-w-7xl overflow-hidden rounded-20">
        <video
          autoPlay
          loop
          muted
          preload="none"
          playsInline
          className="absolute inset-0 size-full object-cover"
          aria-hidden="true"
        >
          <source src={ASSETS.VIDEOS.AUTH.OVERLAY_WEB} type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700" />
        </video>

        {/* Overlay */}
        {/* <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" /> */}
        <div className="relative z-10 flex size-full items-center justify-center p-2">
          <div className="flex w-full max-w-3xl flex-col items-center justify-center text-white">
            <header className="mb-8 text-center">
              <h1 className="title-5 sm:title-2 text-white drop-shadow-lg">
                {title}
              </h1>
              <p className="body-5 sm:title-6 mx-auto mt-2 text-gray-200 drop-shadow-md sm:!leading-[30px]">
                {description}
              </p>
            </header>
            <div className="w-full max-w-xl">{children}</div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default AuthContainerWrapper;
