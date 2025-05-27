import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useRegistrationStore } from "@/zustand/stores/registration.store";
import { useFindUsOptions } from "@/hooks/others";
import { useCountryList } from "@/hooks/location";
import { CountryData } from "@/components/global/input/select-country";
import { getPlaceDataWithZipcodeAndCountry } from "@/actions/maps.actions";
import { onVerifyCode } from "@/actions/auth.actions";
import toast from "@/components/global/toast";
import { validatePostalAddress } from "@/lib/utils";

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
    .regex(/^\d+$/)
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

export type IndividualFormData = z.infer<typeof IndividualFormSchema>;

interface UseIndividualFormProps {
  onSubmit: (data: IndividualFormData) => void;
}

export const useIndividualForm = ({ onSubmit }: UseIndividualFormProps) => {
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

  const form = useForm<IndividualFormData>({
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

  const loadCountryId = () => {
    const country = form.getValues("country");
    const newObject = { isoCode: "Gl", name: "Global", objId: -1 };
    const resultCntry = [...countryList];
    resultCntry.unshift(newObject);

    const filterArray = resultCntry.filter((item) => item.isoCode === country);
    if (filterArray.length > 0) {
      setCountryId(filterArray[0].objId);
    }
  };

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

  const handleCountryChange = async (country: CountryData) => {
    form.setValue("country", country.value);
    form.setValue("ctryCode", country.countryCode);

    if (form.getValues("postalCode").length > 0) {
      await handleGetCityAndState();
    }
    loadCountryId();
  };

  const handleVerifyCode = async () => {
    if (isVerifyingCode || isCodeVerified) return;
    const code = form.getValues("referralCode");

    if (!code) {
      toast.error({ message: "Please enter Referral/Promo code" });
      return;
    }

    startVerifyingCode(async () => {
      const { success, data, error } = await onVerifyCode({
        code: code,
        isBusiness: false,
        codeType: "REGISTRATION",
        countryId: countryId || -1,
      });

      if (!success) {
        toast.error({ message: error?.details?.message });
        setIsCodeVerified(false);
        return;
      }

      if (success && data) {
        toast.success({ message: data.message });
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

  const handleSubmit = (values: IndividualFormData) => {
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
      toast.error({ message: "Please agree to the terms and conditions." });
      return;
    }

    const dataWithGeo = { isBusiness, ...values };
    onSubmit(dataWithGeo);
  };

  useEffect(() => {
    loadCountryId();
  }, [countryListLoading]);

  useEffect(() => {
    if (!useRegistrationStore.persist.hasHydrated) return;
    form.setValue("email", email || "");
  }, [
    useRegistrationStore?.persist?.hasHydrated,
    email,
    isBusiness,
    regMode,
    pwd,
    router,
  ]);

  return {
    form,
    states: {
      isVerifyingCode,
      isMobileVerified,
      isCodeVerified,
      agreeOnTerms,
      findUsOptionsLoading,
    },
    setters: {
      setIsMobileVerified,
      setIsCodeVerified,
      setAgreeOnTerms,
    },
    handlers: {
      handleSubmit: form.handleSubmit(handleSubmit),
      handleCountryChange,
      handleGetCityAndState,
      handleVerifyCode,
    },
    data: {
      findUsOptions,
      email: registrationData.email,
      regMode: registrationData.regMode,
      isBusiness: registrationData.isBusiness,
    },
  };
};
