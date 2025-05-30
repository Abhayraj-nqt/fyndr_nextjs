import ContainerWrapper from "@/components/global/ContainerWrapper";
import Image from "next/image";

const StripePage = () => {
  return (
    <>
      <div className="w-[90%] max-w-screen-xl mx-auto space-y-4 ">
        <ContainerWrapper title="Stripe Integration">
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <Image
                src="/images/stripe.png"
                alt="Stripe"
                width={150}
                height={150}
              />
            </div>

            <div className="text-center mb-4">
              <h3>Woohoo! Thank you for setting up your profile with Stripe</h3>
              {/* <h5 className="text-lg font-semibold">
                Businesses can now sell products and collect invoice payments on
                Fyndr.
              </h5>
              <h6 className="text-sm text-gray-600 mt-2">
                Fyndr uses PCI compliant Stripe payment gateway to enable
                payments.
              </h6> */}
            </div>

            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-6 rounded-md w-full max-w-xl">
                <h5 className="font-bold mb-2">Fyndr Fee</h5>
                <div className="mb-4">
                  <h6 className="font-semibold">Offers:</h6>
                  <p>2.5% of sales + $0.30 (this includes Stripe fee)</p>
                </div>
                <div className="mb-4">
                  <h6 className="font-semibold">Stores:</h6>
                  <p>3.0% of sales + $0.30 (this includes Stripe fee)</p>
                </div>
                <div className="mb-2">
                  <h6 className="font-semibold">Invoices:</h6>
                  <p>$0.50 or 1.5% whichever is more + Stripe Fee*</p>
                </div>
                <p className="text-xs text-gray-700">
                  *Stripe Fee: 2.9% + $0.30 for domestic cards. International
                  cards attract additional fee.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center text-sm text-black-800 gap-2">
              {/* <ImCross className="text-red-600 mt-1" /> */}
              <p>
                If you have any questions or need assistance, please get in
                touch with your Fyndr rep or reach us at admin@fyndr.us.
              </p>
              <p>
                You're all set! Your account is ready to start selling your
                products and/or services on Fyndr
              </p>
              <p>
                Your Stripe account is now ready to receive funds directly into
                your bank account
              </p>
            </div>

            <p className="text-sm mt-6">
              Visit:{" "}
              <a
                href="https://stripe.com"
                className="text-blue-500 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stripe Account
              </a>
            </p>

            <p className="text-sm text-gray-700">
              *Please ensure that user has completed their Stripe registration.
            </p>
          </div>
        </ContainerWrapper>
      </div>
    </>
  );
};

export default StripePage;
