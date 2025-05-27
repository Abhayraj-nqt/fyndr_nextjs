import {
  BusinessFormData,
  BusinessFormSchema,
  IndividualFormData,
  IndividualFormSchema,
} from "@/components/forms/auth/sign-up/schema";
import { CountryData } from "@/components/global/input/select-country";
import { useRegistrationStore } from "@/zustand/stores/registration.store";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DefaultValues,
  FieldPath,
  FieldValues,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { z, ZodType } from "zod";
import { useFindUsOptions } from "../others";
import { useCountryList } from "../location";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { getPlaceDataWithZipcodeAndCountry } from "@/actions/maps.actions";
import { validatePostalAddress } from "@/lib/utils";
import toast from "@/components/global/toast";
import { onVerifyCode } from "@/actions/auth.actions";

interface BaseFormData extends FieldValues {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  ctryCode: string;
  phone: string;
  postalCode: string;
  addressLine1?: string;
  addressLine2?: string;
  city: string;
  state: string;
  referralCode?: string | null;
  promoCode?: string | null;
  findUsId?: number;
}

interface UseBaseRegistrationFormConfig<T extends BaseFormData> {
  schema: ZodType<T>;
  defaultValues?: T;
  onSubmit: (data: T & { isBusiness: boolean }) => void;
  isBusiness: boolean;
}

// Return type for the base hook
interface UseBaseRegistrationFormReturn<T extends BaseFormData> {
  form: UseFormReturn<T>;
  states: {
    isVerifyingCode: boolean;
    isMobileVerified: boolean;
    isCodeVerified: boolean;
    agreeOnTerms: boolean;
    findUsOptionsLoading: boolean;
  };
  setters: {
    setIsMobileVerified: (value: boolean) => void;
    setIsCodeVerified: (value: boolean) => void;
    setAgreeOnTerms: (value: boolean) => void;
  };
  handlers: {
    handleSubmit: () => void;
    handleCountryChange: (country: CountryData) => Promise<void>;
    handleGetCityAndState: () => Promise<void>;
    handleVerifyCode: () => Promise<void>;
  };
  data: {
    findUsOptions: any[];
    email: string;
    regMode: string;
    isBusiness: boolean;
  };
}

export const useBaseRegistrationForm = <T extends BaseFormData>({
  schema,
  defaultValues,
  onSubmit,
  isBusiness,
}: UseBaseRegistrationFormConfig<T>): UseBaseRegistrationFormReturn<T> => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const { findUsOptions, isLoading: findUsOptionsLoading } = useFindUsOptions();
  const { countryList, isLoading: countryListLoading } = useCountryList();
  const registrationData = useRegistrationStore();
  const { email, regMode } = registrationData;
  const router = useRouter();

  const [isVerifyingCode, startVerifyingCode] = useTransition();
  const [isMobileVerified, setIsMobileVerified] = useState<boolean>(false);
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false);
  const [countryId, setCountryId] = useState<number | null>(null);
  const [agreeOnTerms, setAgreeOnTerms] = useState(false);

  useEffect(() => {
    loadCountryId();
  }, [countryListLoading]);

  useEffect(() => {
    if (!useRegistrationStore.persist.hasHydrated) return;
    form.setValue("email" as FieldPath<T>, (email || "") as any);
  }, [
    useRegistrationStore?.persist?.hasHydrated,
    email,
    isBusiness,
    regMode,
    router,
  ]);

  const loadCountryId = () => {
    const country = form.getValues("country" as FieldPath<T>);
    const newObject = { isoCode: "Gl", name: "Global", objId: -1 };
    const resultCntry = [...countryList];
    resultCntry.unshift(newObject);

    const filterArray = resultCntry.filter((item) => item.isoCode === country);
    if (filterArray.length > 0) {
      setCountryId(filterArray[0].objId);
    }
  };

  const handleGetCityAndState = async () => {
    const country = form.getValues("country" as FieldPath<T>);
    const zipcode = form.getValues("postalCode" as FieldPath<T>);

    // Type guard to ensure zipcode is a string
    const zipcodeStr =
      typeof zipcode === "string" ? zipcode : String(zipcode || "");

    const isValid = await validatePostalAddress(zipcodeStr, country as string);

    if (!isValid) {
      form.setError("postalCode" as FieldPath<T>, {
        message:
          zipcodeStr.length < 1
            ? "Zip Code can not be blank"
            : "Zip code is Invalid",
      });
      form.setValue("city" as FieldPath<T>, "" as any);
      form.setValue("state" as FieldPath<T>, "" as any);
      return;
    }

    form.clearErrors("postalCode" as FieldPath<T>);
    const response = await getPlaceDataWithZipcodeAndCountry({
      country: country as string,
      zipcode: zipcodeStr,
    });
    const {
      data: { city, lat, lng, state },
    } = response;

    form.setValue("city" as FieldPath<T>, city as any);
    form.setValue("state" as FieldPath<T>, state as any);
    form.clearErrors("city" as FieldPath<T>);
    form.clearErrors("state" as FieldPath<T>);

    registrationData.setData({
      lat: lat || undefined,
      lng: lng || undefined,
    });
  };

  const handleCountryChange = async (country: CountryData) => {
    form.setValue("country" as FieldPath<T>, country.value as any);
    form.setValue("ctryCode" as FieldPath<T>, country.countryCode as any);

    const postalCode = form.getValues("postalCode" as FieldPath<T>);
    const postalCodeStr =
      typeof postalCode === "string" ? postalCode : String(postalCode || "");

    if (postalCodeStr.length > 0) {
      await handleGetCityAndState();
    }
    loadCountryId();
  };

  const handleVerifyCode = async () => {
    if (isVerifyingCode || isCodeVerified) return;
    const code = form.getValues("referralCode" as FieldPath<T>);

    if (!code) {
      toast.error({ message: "Please enter Referral/Promo code" });
      return;
    }

    startVerifyingCode(async () => {
      const { success, data, error } = await onVerifyCode({
        code: String(code),
        isBusiness,
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
        const referralCode = form.getValues("referralCode" as FieldPath<T>);

        if (isPromocode) {
          form.setValue("promoCode" as FieldPath<T>, referralCode as any);
        } else {
          form.setValue("referralCode" as FieldPath<T>, referralCode as any);
          form.setValue("promoCode" as FieldPath<T>, null as any);
        }
      }
    });
  };

  const handleSubmit = form.handleSubmit((values: T) => {
    const referralCode = form.getValues("referralCode" as FieldPath<T>);
    const referralCodeStr =
      typeof referralCode === "string"
        ? referralCode
        : String(referralCode || "");

    if (referralCodeStr.length && !isCodeVerified) {
      toast.error({
        message: "Either verify your Referral/Promo code or leave it empty!",
      });
      return;
    }

    // Type-safe handling of promo/referral codes
    const processedValues = { ...values };
    if ("promoCode" in processedValues && processedValues.promoCode) {
      (processedValues as any).referralCode = null;
    }

    if (!agreeOnTerms) {
      toast.error({ message: "Please agree to the terms and conditions." });
      return;
    }

    const dataWithBusiness = { ...processedValues, isBusiness };
    onSubmit(dataWithBusiness);
  });

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
      handleSubmit,
      handleCountryChange,
      handleGetCityAndState,
      handleVerifyCode,
    },
    data: {
      findUsOptions,
      email: registrationData.email || "",
      regMode: registrationData.regMode || "",
      isBusiness: registrationData.isBusiness || false,
    },
  };
};

// Specific hook for individual registration
export const useIndividualForm = ({
  onSubmit,
}: {
  onSubmit: (data: IndividualFormData & { isBusiness: boolean }) => void;
}) => {
  return useBaseRegistrationForm({
    schema: IndividualFormSchema,
    defaultValues: {
      yob: "",
      gender: null,
      email: "",
      firstName: "",
      lastName: "",
      country: "",
      ctryCode: "",
      phone: "",
      postalCode: "",
      city: "",
      state: "",
    },
    onSubmit,
    isBusiness: false,
  });
};

// Specific hook for business registration
export const useBusinessForm = ({
  onSubmit,
}: {
  onSubmit: (data: BusinessFormData & { isBusiness: boolean }) => void;
}) => {
  return useBaseRegistrationForm({
    schema: BusinessFormSchema,
    defaultValues: {
      bizName: "",
      bizType: "",
      website: "",
      accountStatus: "ACTIVE" as const,
      email: "",
      firstName: "",
      lastName: "",
      country: "",
      ctryCode: "",
      phone: "",
      postalCode: "",
      city: "",
      state: "",
      tags: "",
    },
    onSubmit,
    isBusiness: true,
  });
};
