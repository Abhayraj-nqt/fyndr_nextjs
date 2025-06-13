"use client";
import Image from "next/image";
import React, { useState } from "react";

import Button from "@/components/global/buttons";
import ContainerWrapper from "@/components/global/ContainerWrapper";
import { Textarea } from "@/components/ui/textarea";

function CustomMail() {
  const [enabled, setEnabled] = useState(true);
  const [message, setMessage] = useState("");
  return (
    <ContainerWrapper title="Customize QR logo">
      <div className="mb-5 text-xl">
        Add custom description for your post purchase emails.
      </div>

      <div className="flex flex-row">
        <div>
          <div className="mb-2 rounded-md border p-4">
            <p className="mb-2 text-gray-400">Dear (Customer’s Name),</p>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              // className="h-40 w-full resize-none rounded border p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your message here..."
              rows={5}
            />
            <p className="mt-2 text-gray-400">Regards,</p>
          </div>

          <p className="mb-4 text-xs text-gray-500">
            Note: Use maximum 500 words and please ensure it remains
            professional, respectful, and free of offensive content
          </p>

          <div className="mb-6 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm">
              Show the offer image in the post purchase email.
              <span className="cursor-help text-blue-500">ⓘ</span>
            </label>
            <button
              type="button"
              onClick={() => setEnabled(!enabled)}
              className={`relative inline-flex h-6 w-12 items-center rounded-full transition-colors ${
                enabled ? "bg-blue-600" : "bg-gray-300"
              }`}
            >
              <span
                className={`inline-block size-4 rounded-full bg-white transition-transform${
                  enabled ? "translate-x-6" : "translate-x-1"
                }`}
              />
            </button>
          </div>

          <Button variant="primary">Save</Button>
        </div>
        <div className="flex-1"></div>
        <div className="rounded-10 border border-gray-100">
          <Image
            src={"/images/custom-email/email.svg"}
            width={500}
            height={500}
            alt="email"
            className="rounded-10"
          />
        </div>
      </div>
    </ContainerWrapper>
  );
}

export default CustomMail;
