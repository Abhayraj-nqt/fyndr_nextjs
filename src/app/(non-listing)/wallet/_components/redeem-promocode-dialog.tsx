"use client";

import Image from "next/image";
import { ChangeEvent, useState } from "react";


import {
  onRedeemPromocode,
  onVerifyPromocode,
} from "@/actions/promo-code.action";
import { Modal } from "@/components/global/modal";
import { toast } from "@/components/global/toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/auth";
import { VerifyPromocodeResponse } from "@/types/api-response/promocode.response";

type Props = {
  children?: React.ReactNode;
};

const RedeemPromocodeDialog = ({ children }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [promoCode, setPromoCode] = useState("");
  const [promocodeDetails, setPromocodeDetails] =
    useState<null | VerifyPromocodeResponse>(null);

  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const { user, isLoading, error, refetch } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading profile</div>;
  if (!user) {
    refetch();

    if (!user) return <div>Please sign in</div>;
  }

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    resetStates();
  };

  const resetStates = () => {
    setModalOpen(false);
    setPromoCode("");
    setPromocodeDetails(null);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPromoCode(e.target.value);
  };

  const handleVerify = async () => {
    if (promoCode.length < 1) {
      return toast.error({
        message: "Promocode is required",
      });
    }

    const { success, data, error } = await onVerifyPromocode({
      code: promoCode,
      isBusiness: user.isBusiness,
      countryId: user.countryId,
      codeType: "REDEEM_PROMOCODE",
    });

    if (!success && error) {
      return toast.error({
        message: `${error.details?.message || "Something went wrong!"}`,
      });
    }

    if (success && data) {
      toast.success({
        message: data.message,
      });

      setPromocodeDetails(data);
    }
  };

  const handleRedeemPromocode = async () => {
    const { countryId, indvid: indvId, isBusiness } = user;
    const { success, data, error } = await onRedeemPromocode(
      { indvId },
      {
        countryId,
        promoCode,
        promoCodeType: "REDEEM_PROMOCODE",
        targetUser: isBusiness ? "BUSINESS" : "INDIVIDUAL",
      }
    );

    if (!success && error) {
      return toast.error({
        message: error.details?.message || "Someting went wrong!",
      });
    }

    if (data) {
      resetStates();
      setSuccessModalOpen(true);
      setTimeout(() => {
        setSuccessModalOpen(false);
      }, 4000);
    }
  };

  return (
    <>
      <div onClick={handleModalOpen}>{children}</div>
      <Modal
        title={"Redeem Promocode"}
        open={modalOpen}
        onOpenChange={(open) => {
          if (!open) handleModalClose();
        }}
        closeOnOutsideClick={false}
      >
        <div className="flex flex-col gap-4">
          <div className="flex min-h-[45px] grow items-center gap-1 rounded-lg border border-secondary-20 bg-white px-2">
            <Input
              placeholder="Enter Promo Code"
              value={promoCode}
              onChange={handleChange}
              className="no-focus paragraph-regular placeholder border-none text-black-30 shadow-none outline-none"
            />
          </div>

          <div className="flex flex-row gap-2">
            <Button className="btn-primary" onClick={handleVerify}>
              Verify
            </Button>
            <Button
              type="button"
              className="btn-primary-outlined"
              onClick={handleModalClose}
            >
              Cancel
            </Button>
          </div>
        </div>

        {promocodeDetails ? (
          <div className="paragraph-regular mt-4 flex flex-col items-center justify-center gap-4 rounded-lg bg-primary p-4 text-white">
            <p>Redeem now and get</p>
            <p className="h2-semibold">
              {promocodeDetails.promoCodeDetails.currencySymbol}
              {promocodeDetails.promoCodeDetails.amount}
            </p>
            <p>Fyndr cash</p>

            <Button
              type="button"
              onClick={handleRedeemPromocode}
              className="btn-primary-outlined border-none"
            >
              Redeem Now
            </Button>
          </div>
        ) : (
          <></>
        )}
      </Modal>

      <Modal
        title={"Success"}
        open={successModalOpen}
        onOpenChange={(open) => {
          if (!open) setSuccessModalOpen(false);
        }}
      >
        <div className="flex-center flex-col gap-4">
          <Image
            src={"/images/successPromo.png"}
            alt="promocode redeemed successfully"
            height={250}
            width={250}
            className="my-4"
          />
          <div className="flex-center flex-col gap-2">
            <p className="h3-semibold">Hurray!!</p>
            <p className="paragraph-regular text-center text-black-30">
              <span className="h3-semibold text-primary">
                {promocodeDetails?.promoCodeDetails.currencySymbol}
                {promocodeDetails?.promoCodeDetails.amount}
              </span>
              Fyndr Cash has been successfully credited in your Fyndr Wallet
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RedeemPromocodeDialog;
