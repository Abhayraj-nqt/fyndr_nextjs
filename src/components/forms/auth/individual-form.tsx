"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RotateCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { onVerifyCode } from "@/actions/auth.actions";
import { getPlaceDataWithZipcodeAndCountry } from "@/actions/maps.actions";
import MobileVerificationModal from "@/app/(non-listing)/(auth)/sign-up/complete/_components/mobile-verification-modal";
import Button from "@/components/global/buttons";
import Input from "@/components/global/input";
import InputWrapper from "@/components/global/input/input-wrapper";
import Select from "@/components/global/input/select";
import SelectCountry, {
  CountryData,
} from "@/components/global/input/select-country";
import toast from "@/components/global/toast";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label"; // Fixed import
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GENDER } from "@/constants";
import ROUTES from "@/constants/routes";
import { useCountryList } from "@/hooks/location";
import { useFindUsOptions } from "@/hooks/others";
import { validatePostalAddress } from "@/lib/utils";
import { useRegistrationStore } from "@/zustand/stores/registration.store";

// Updated schema to match payload structure
const IndividualFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required." })
    .email({ message: "Please provide a valid email address." }),
  firstName: z
    .string()
    .min(1, { message: "First name is required." })
    .max(50, { message: "First name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "First name can only contain letters and spaces.",
    }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required." })
    .max(50, { message: "Last name cannot exceed 50 characters." })
    .regex(/^[a-zA-Z\s]+$/, {
      message: "Last name can only contain letters and spaces.",
    }),
  yob: z
    .string()
    .regex(/^\d+$/, { message: "Year of birth can only contain digits." })
    .max(4, { message: "Year of birth can only contain 4 digits" })
    .optional(),
  gender: z.enum(["M", "F", "ND", "OT"]).nullable().optional(),
  country: z.string().min(1, { message: "Country is required." }),
  ctryCode: z.string().min(1, { message: "Country code is required." }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required." })
    .regex(/^\d+$/, { message: "Phone number can only contain digits." }),
  postalCode: z
    .string()
    .min(1, { message: "Zip code is required." })
    .regex(/^\d+$/, { message: "Zip code can only contain digits." }),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
  referralCode: z.string().nullable().optional(),
  promoCode: z.string().nullable().optional(),
  findUsId: z.number().optional(),
});

type IndividualFormProps = {
  onSubmit: (data: z.infer<typeof IndividualFormSchema>) => void;
};

const IndividualForm = ({ onSubmit }: IndividualFormProps) => {
  const { findUsOptions, isLoading: findUsOptionsLoading } = useFindUsOptions();
  const { countryList, isLoading: countryListLoading } = useCountryList();
  const registrationData = useRegistrationStore();
  const { isBusiness, email, regMode, pwd } = registrationData;

  const router = useRouter();

  const [isVerifyingCode, startVerifyingCode] = useTransition();
  const [isMobileVerified, setIsMobileVerified] = useState<boolean>(false);
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false);
  const [countryId, setCountryId] = useState<number | null>(null);
  const [agreeOnTerms, setAgreeOnTerms] = useState(false);

  const form = useForm<z.infer<typeof IndividualFormSchema>>({
    resolver: zodResolver(IndividualFormSchema),
    defaultValues: {
      email: registrationData.email || "",
      firstName: registrationData.firstName || "",
      lastName: registrationData.lastName || "",
      yob: registrationData.yob || undefined,
      gender: registrationData.gender || null,
      country: registrationData.country || "US",
      ctryCode: registrationData.ctryCode || "+1",
      phone: registrationData.phone || "",
      postalCode: registrationData.postalCode || "",
      addressLine1: registrationData.addressLine1 || undefined,
      addressLine2: registrationData.addressLine2 || undefined,
      city: registrationData.city || "",
      state: registrationData.state || "",
      referralCode: registrationData.referralCode || null,
      promoCode: registrationData.promoCode || null,
      findUsId: registrationData.findUsId || 8,
    },
  });

  const handleSubmit = (values: z.infer<typeof IndividualFormSchema>) => {
    // if (!isMobileVerified) {
    //   toast.error({
    //     message: "Please verify your mobile number.",
    //   });
    //   return;
    // }

    if (form.getValues("referralCode")?.length && !isCodeVerified) {
      toast.error({
        message: "Either verify your Referral/Promo code or leave it empty!",
      });
      return;
    }

    if (values?.promoCode) {
      values.referralCode = null;
    }

    if (!agreeOnTerms) {
      toast.error({
        message: "Please agree to the terms and conditions.",
      });
      return;
    }

    const dataWithGeo = {
      isBusiness,
      ...values,
    };
    onSubmit(dataWithGeo);
  };

  const handleCountryChange = async (country: CountryData) => {
    form.setValue("country", country.value);
    form.setValue("ctryCode", country.countryCode);

    if (form.getValues("postalCode").length > 0) {
      await handleGetCityAndState();
    }

    loadCountryId();
  };

  const loadCountryId = () => {
    const country = form.getValues("country");
    const newObject = { isoCode: "Gl", name: "Global", objId: -1 };
    const resultCntry: (typeof newObject)[] = countryList;
    resultCntry.unshift(newObject);
    console.log({ countryList, countryListLoading });

    const filterArray = resultCntry.filter((item) => item.isoCode === country);

    if (filterArray.length > 0) {
      const obj = filterArray[0].objId;
      setCountryId(obj);
    }
  };

  useEffect(() => {
    loadCountryId();
  }, [countryListLoading]);

  const handleGetCityAndState = async () => {
    const country = form.getValues("country");
    const zipcode = form.getValues("postalCode");

    const isValid = await validatePostalAddress(zipcode, country);

    if (!isValid) {
      form.setError("postalCode", {
        message:
          zipcode.length < 1
            ? "Zip Code can not be blank"
            : "Zip code is Invalid",
      });

      form.setValue("city", "");
      form.setValue("state", "");
      return;
    }

    form.clearErrors("postalCode");
    const response = await getPlaceDataWithZipcodeAndCountry({
      country,
      zipcode,
    });
    console.log(response);
    const {
      data: { city, lat, lng, state },
    } = response;
    form.setValue("city", city);
    form.setValue("state", state);

    form.clearErrors("city");
    form.clearErrors("state");

    registrationData.setData({
      lat: lat || undefined,
      lng: lng || undefined,
    });
  };

  const handleVerifyCode = async () => {
    if (isVerifyingCode || isCodeVerified) return;
    const code = form.getValues("referralCode");

    if (!code) {
      toast.error({
        message: "Please enter Referral/Promo code",
      });
      return;
    }

    startVerifyingCode(async () => {
      const { success, data, error } = await onVerifyCode({
        code,
        isBusiness: false,
        codeType: "REGISTRATION",
        countryId: countryId || -1,
      });

      if (!success) {
        toast.error({
          message: error?.details?.message,
        });
        setIsCodeVerified(false);
        return;
      }

      if (success && data) {
        toast.success({
          message: data.message,
        });
        setIsCodeVerified(true);
        const { promocode: isPromocode } = data;
        const referralCode = form.getValues("referralCode");

        if (isPromocode) {
          form.setValue("promoCode", referralCode);
        } else {
          form.setValue("referralCode", referralCode);
          form.setValue("promoCode", null);
        }
      }
    });
  };

  useEffect(() => {
    if (!useRegistrationStore.persist.hasHydrated) return;

    // if (!email || !isBusiness || !regMode || !pwd) {
    //   router.push(ROUTES.SIGN_UP);
    // }
    form.setValue("email", email || "");
  }, [
    useRegistrationStore?.persist?.hasHydrated,
    email,
    isBusiness,
    regMode,
    pwd,
    router,
  ]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  Email Address <span className="text-red-600">*</span>
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <Input {...field} disabled placeholder="Email" />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  First Name <span className="text-red-600">*</span>
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <Input {...field} placeholder="Enter your first name" />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  Last Name <span className="text-red-600">*</span>
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <Input {...field} placeholder="Enter your last name" />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="yob"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  Year of Birth
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Year of Birth (YYYY)"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  Gender
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <Select
                      value={field.value || undefined}
                      onValueChange={field.onChange}
                      options={GENDER}
                      placeholder="Select your gender"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  Country <span className="text-red-600">*</span>
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <SelectCountry
                      placeholder="Select your country"
                      value={field.value}
                      onValueChange={handleCountryChange}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <div className="flex flex-row items-center gap-2">
            <FormField
              control={form.control}
              name="ctryCode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-4">
                  <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                    Phone Number <span className="text-red-600">*</span>
                  </FormLabel>
                  <div className="flex w-full flex-col gap-1">
                    <FormControl>
                      <Input {...field} className="w-20" disabled />
                    </FormControl>
                    {form.getFieldState("phone").error && (
                      <div className="mb-[18px]"></div>
                    )}
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mt-2 flex w-full flex-row items-center gap-2">
                  <div className="flex w-full flex-col gap-1">
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isMobileVerified}
                        placeholder="Enter your phone number"
                        type="tel"
                        leftNode={
                          <MobileVerificationModal
                            email={email || ""}
                            countryCode={form.getValues("ctryCode")}
                            phone={form.getValues("phone")}
                            regMode={regMode || "classic"}
                            isBusiness={isBusiness || false}
                            onVerify={(verified) =>
                              setIsMobileVerified(verified)
                            }
                            disabled={isMobileVerified}
                          >
                            <Button
                              variant="primary"
                              type="button"
                              className={`mr-1 ${isMobileVerified ? "cursor-not-allowed bg-green-500 hover:bg-green-500" : ""} `}
                            >
                              {isMobileVerified ? "Verified" : "Verify"}
                            </Button>
                          </MobileVerificationModal>
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                  {isMobileVerified ? (
                    <div
                      onClick={() => setIsMobileVerified(false)}
                      className="cursor-pointer rounded-full bg-primary-500 p-2 text-white"
                    >
                      <RotateCw size={15} />
                    </div>
                  ) : (
                    <></>
                  )}
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  Zip Code <span className="text-red-600">*</span>
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter zip code"
                      onBlur={handleGetCityAndState}
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  Address 1
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <div className="flex flex-col">
                      <Input
                        {...field}
                        value={field.value || ""}
                        placeholder="Address Line 1"
                      />
                      <FormMessage />
                    </div>
                  </FormControl>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="addressLine2"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  Address 2
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Address Line 2"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  City <span className="text-red-600">*</span>
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <Input {...field} placeholder="City" disabled />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  State <span className="text-red-600">*</span>
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <Input {...field} placeholder="State" disabled />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="referralCode"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-4">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
                  Referral/Promo Code
                </FormLabel>
                <div className="flex w-full flex-col gap-1">
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Referral/Promo Code"
                      disabled={isCodeVerified}
                      leftNode={
                        <Button
                          variant="primary"
                          type="button"
                          onClick={handleVerifyCode}
                          className={`mr-1 ${isCodeVerified ? "cursor-not-allowed bg-green-500 hover:bg-green-500" : ""} disabled:cursor-not-allowed`}
                        >
                          {isVerifyingCode
                            ? "Verifying"
                            : isCodeVerified
                              ? "Verified"
                              : "Verify"}
                        </Button>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </div>
                {isCodeVerified ? (
                  <div
                    onClick={() => setIsCodeVerified(false)}
                    className="cursor-pointer rounded-full bg-primary-500 p-2 text-white"
                  >
                    <RotateCw size={15} />
                  </div>
                ) : (
                  <></>
                )}
              </FormItem>
            )}
          />

          {!findUsOptionsLoading && findUsOptions.length > 0 && (
            <FormField
              control={form.control}
              name="findUsId"
              render={({ field }) => (
                <FormItem className="!my-10 flex flex-row items-center gap-4">
                  <div className="w-40 min-w-40"></div>
                  <FormControl>
                    <InputWrapper
                      label="Where did you find us?"
                      className="h-fit p-4 text-[#4D4D4D]"
                    >
                      <RadioGroup
                        value={field.value?.toString() || ""}
                        defaultValue="8"
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        className="flex flex-wrap items-center gap-6 p-4"
                      >
                        {findUsOptions.map(
                          (item) =>
                            item.active && (
                              <div
                                key={item.id}
                                className="flex items-center space-x-2"
                              >
                                <RadioGroupItem
                                  value={item.id.toString()}
                                  id={`findus-${item.id}`}
                                />
                                <Label htmlFor={`findus-${item.id}`}>
                                  {item.options}
                                </Label>
                              </div>
                            )
                        )}
                      </RadioGroup>
                    </InputWrapper>
                  </FormControl>
                </FormItem>
              )}
            />
          )}

          <div className="mb-4 flex items-center gap-4">
            <div className="w-40 min-w-40"></div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                onCheckedChange={(checked) => setAgreeOnTerms(!!checked)}
              />
              <Label
                htmlFor="terms"
                className="text-sm font-medium leading-none text-[#4D4D4D] peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree with{" "}
                <Link href={ROUTES.LEGAL_TERMS} className="text-primary-500">
                  Fyndr's terms of use
                </Link>{" "}
                &{" "}
                <Link href={ROUTES.LEGAL_privacy} className="text-primary-500">
                  Privacy Policy
                </Link>
              </Label>
            </div>
          </div>

          <div className="!mt-10 mb-4 flex items-center gap-4">
            <div className="w-40 min-w-40"></div>
            <Button
              type="submit"
              variant="primary"
              className="w-fit"
              stdWidth
              stdHeight
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Registering..." : "Register"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default IndividualForm;
