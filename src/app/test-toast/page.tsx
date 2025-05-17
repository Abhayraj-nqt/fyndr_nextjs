"use client";

import React from "react";

import { toast } from "@/components/global/toast";
import { Button } from "@/components/ui/button";

export default function ToastDemo() {
  const showSuccessToast = () => {
    toast.success({
      message: "Success",
      description: "This is a success message",
    });
  };

  const showErrorToast = () => {
    toast.error({
      message: "Error",
      description: "This is an error message",
    });
  };

  const showWarningToast = () => {
    toast.warning({
      message: "Warning",
      description: "This is a warning message",
    });
  };

  const showInfoToast = () => {
    toast.info({
      message: "Info",
      description: "This is an information message",
    });
  };

  const showLoadingToast = () => {
    const id = toast.loading({
      message: "Loading...",
      description: "Please wait",
    });

    // Automatically dismiss after 3 seconds
    setTimeout(() => {
      toast.dismiss(id);
      toast.success({
        message: "Loaded",
        description: "Loading completed",
      });
    }, 3000);
  };

  //   const showPromiseToast = () => {
  //     const promise = new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         // Random success or failure for demo
  //         Math.random() > 0.5
  //           ? resolve("Data loaded")
  //           : reject(new Error("Failed to load"));
  //       }, 2000);
  //     });

  //     toast.promise(promise, {
  //       loading: "Loading data...",
  //       success: (data) => `Success: ${data}`,
  //       error: (err) =>
  //         `Error: ${err instanceof Error ? err.message : "Unknown error"}`,
  //     });
  //   };

  return (
    <div className="space-y-8 p-6">
      <h1 className="text-2xl font-semibold">Ant Design Style Toast Demo</h1>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
        <Button
          className="bg-[#52c41a] hover:bg-[#73d13d]"
          onClick={showSuccessToast}
        >
          Success Toast
        </Button>

        <Button
          className="bg-[#ff4d4f] hover:bg-[#ff7875]"
          onClick={showErrorToast}
        >
          Error Toast
        </Button>

        <Button
          className="bg-[#faad14] hover:bg-[#ffc53d]"
          onClick={showWarningToast}
        >
          Warning Toast
        </Button>

        <Button
          className="bg-[#1677ff] hover:bg-[#4096ff]"
          onClick={showInfoToast}
        >
          Info Toast
        </Button>

        <Button
          className="bg-gray-500 hover:bg-gray-600"
          onClick={showLoadingToast}
        >
          Loading Toast
        </Button>

        {/* <Button
          className="bg-purple-500 hover:bg-purple-600"
          onClick={showPromiseToast}
        >
          Promise Toast
        </Button> */}
      </div>
    </div>
  );
}
