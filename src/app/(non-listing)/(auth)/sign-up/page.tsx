"use client"
import React from "react";

const SignUp = () => {
  return (
    <main className="relative h-screen">
      <video
        autoPlay
        loop
        muted
        preload="none"
        className="absolute inset-0 size-full object-cover"
      >
        <source src="/videos/auth-overlay-web.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative z-10 flex size-full items-center justify-center">
        <div className="flex flex-col items-center justify-center p-4 text-light-900">
          <div className="mb-8  text-center">
            <h1 className="h1-bold text-white">Join Fyndr Today!</h1>
            <p className="paragraph-regular mt-2 text-gray-200">
            Unlock exclusive offers, events, and services tailored just for you. Sign up now to start enjoying amazing experiences!
            </p>
          </div>

         
        </div>
      </div>
    </main>
  )
};

export default SignUp;
