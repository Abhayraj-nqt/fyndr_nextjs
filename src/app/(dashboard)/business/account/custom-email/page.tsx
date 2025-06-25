/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Info } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { fetchCustomEmail, onCustomEmail } from "@/actions/custom-email.action";
import Button from "@/components/global/buttons";
import ContainerWrapper from "@/components/global/ContainerWrapper";
import Switch from "@/components/global/input/switch";
import { Modal } from "@/components/global/modal";
import toast from "@/components/global/toast";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useUser } from "@/hooks/auth";
import { formUrlQuery } from "@/lib/utils/url";

type ModeTypes = "withImg" | "withoutImg";

function CustomMail() {
  const [checked, setChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [withImg, setWithImg] = useState(true);
  const [withoutImg, setWithoutImg] = useState(false);
  console.log("withImg", withImg, withoutImg);
  const [message, setMessage] = useState("");
  const user = useUser();
  const router = useRouter();

  const searchParams = useSearchParams();
  const activeMode: ModeTypes =
    (searchParams.get("mode") as ModeTypes) || "withImg";

  useEffect(() => {
    if (activeMode === "withImg") {
      setWithImg(true);
      setWithoutImg(false);
    } else {
      setWithImg(false);
      setWithoutImg(true);
    }
  }, [activeMode]);

  console.log("onCustomEmail", checked, message, user.user);
  const CustomEmail = async () => {
    const data = await onCustomEmail({
      bizId: user?.user?.bizid ?? 0,
      text: message,
      showOfferImages: checked,
    });
    console.log("dataRes", data);
    if (data.success) {
      toast.success({
        message:
          "Post-purchase custom email details have been updated successfully.",
      });
    } else {
      toast.error({
        message: data.error?.message as string,
      });
    }
  };
  const setActiveMode = (mode: ModeTypes) => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "mode",
      value: mode,
    });

    router.replace(newUrl);
  };
  useEffect(() => {
    if (user.user?.bizid) {
      customEmailData();
    }
  }, [user.user?.bizid]);

  const customEmailData = async () => {
    const response = await fetchCustomEmail({
      bizId: user.user?.bizid ?? 0,
    });
    if (response.success && response.data) {
      setMessage(response.data.text ?? "");
      setChecked(response.data.showOfferImages ?? false);
    }
  };

  return (
    <ContainerWrapper title="Custom Email">
      <div className="mb-5 text-xl text-black-80">
        Add custom description for your post purchase emails.
      </div>

      <div className="flex flex-row">
        <div>
          <div className="focus-visible::outline-none mb-2 rounded-md border p-4">
            <p className="mb-2 text-gray-400">Dear (Customer’s Name),</p>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="focus:outline-none"
              placeholder="Type your message here..."
              rows={10}
            />
            <p className="mt-2 text-gray-400">Regards,</p>
          </div>

          <p className="mb-4 text-xs text-gray-500">
            Note: Use maximum 500 words and please ensure it remains
            professional, respectful, and free of offensive content
          </p>

          <div className="mb-6 flex items-center justify-between">
            <label className="flex items-center gap-2 text-sm text-black-80">
              Show the offer image in the post purchase email.
              <span className="cursor-help text-blue-500">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span>
                      <Info className=" size-4 cursor-pointer" />
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="cursor-pointer">
                    <p onClick={() => setModalOpen(true)}>Know more</p>
                  </TooltipContent>
                </Tooltip>
              </span>
            </label>
            <Switch
              checked={checked}
              checkedTitle="Enable"
              uncheckedTitle="Disable"
              onCheckedChange={setChecked}
              className="bg-gray-300"
            ></Switch>
          </div>

          <Button variant="primary" onClick={CustomEmail}>
            Save
          </Button>
        </div>
        <div className="flex-1"></div>
        <div className="rounded-10 border border-gray-100">
          <Image
            src={"/images/custom-email/email-img.svg"}
            width={500}
            height={500}
            alt="email"
            className="rounded-10"
          />
        </div>
        <Modal
          title="Email Template Example"
          open={modalOpen}
          onOpenChange={setModalOpen}
        >
          <div>
            Enabling this toggle will ensure that the image you upload for the
            offer is not only used in the offer itself but also included in the
            post-purchase email template sent to customers. However, please note
            that if the email template contains multiple images, it may increase
            the chances of the email being marked as spam.
          </div>

          <div className="mt-5 grid h-fit w-full grid-cols-2 rounded-10 border border-secondary-20">
            <Button
              variant={
                activeMode === "withImg" ? "primary" : "primary-outlined"
              }
              onClick={() => setActiveMode("withImg")}
            >
              With image
            </Button>
            <Button
              variant={
                activeMode === "withoutImg" ? "primary" : "primary-outlined"
              }
              onClick={() => setActiveMode("withoutImg")}
            >
              Without image
            </Button>
          </div>

          {withImg && (
            <div className="mt-5 flex justify-center">
              <Image
                src={"/images/custom-email/email-with-offer-img.svg"}
                alt="email"
                width={400}
                height={400}
              />
            </div>
          )}
          {withoutImg && (
            <div className="mt-5 flex justify-center">
              <Image
                src={"/images/custom-email/email-without-offer-img.svg"}
                alt="email"
                width={400}
                height={400}
              />
            </div>
          )}
        </Modal>
      </div>
    </ContainerWrapper>
  );
}

export default CustomMail;
