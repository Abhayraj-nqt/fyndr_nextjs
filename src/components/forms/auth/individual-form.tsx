"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "@/components/global/buttons";
import Input from "@/components/global/input";
import Select from "@/components/global/input/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegistrationStore } from "@/zustand/stores/registration.store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label"; // Fixed import
import { Checkbox } from "@/components/ui/checkbox";
import { COUNTRIES, GENDER } from "@/constants";
import InputWrapper from "@/components/global/input/input-wrapper";
import { useFindUsOptions } from "@/hooks/others";
import SelectCountry, {
  CountryData,
} from "@/components/global/input/select-country";
import { getPlaceDataWithZipcodeAndCountry } from "@/actions/maps.actions";

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
    .optional(),
  gender: z.enum(["M", "F", "ND", "OT"]).nullable().optional(),
  country: z.string().min(1, { message: "Country is required." }),
  ctryCode: z.string().min(1, { message: "Country code is required." }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required." })
    .regex(/^\d+$/, { message: "Phone number can only contain digits." }),
  postalCode: z.string().min(1, { message: "Postal code is required." }),
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
  const registrationData = useRegistrationStore();
  console.log({ registrationData });

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
      findUsId: registrationData.findUsId || undefined,
    },
  });

  const handleSubmit = (values: z.infer<typeof IndividualFormSchema>) => {
    // Add additional payload data
    const dataWithGeo = {
      ...values,
      lat: 37.7749, // Example coordinates (San Francisco)
      lng: -122.4194,
      isBusiness: false,
      regMode: "classic" as const,
    };

    onSubmit(dataWithGeo);
  };

  const handleCountryChange = (country: CountryData) => {
    form.setValue("country", country.value);
    form.setValue("ctryCode", country.countryCode);
  };

  // Reset form values when registrationData changes (fixes email population issue)
  // React.useEffect(() => {
  //   if (registrationData.email) {
  //     form.reset({
  //       email: registrationData.email,
  //       firstName: registrationData.firstName || "",
  //       lastName: registrationData.lastName || "",
  //       yob: registrationData.yob || undefined,
  //       gender: registrationData.gender || null,
  //       country: registrationData.country || "US",
  //       ctryCode: registrationData.ctryCode || "+1",
  //       phone: registrationData.phone || "",
  //       postalCode: registrationData.postalCode || "",
  //       addressLine1: registrationData.addressLine1 || undefined,
  //       addressLine2: registrationData.addressLine2 || undefined,
  //       city: registrationData.city || "",
  //       state: registrationData.state || "",
  //       referralCode: registrationData.referralCode || null,
  //       promoCode: registrationData.promoCode || null,
  //       findUsId: registrationData.findUsId || undefined,
  //     });
  //   }
  // }, [registrationData, form]);

  const handleGetCityAndState = async () => {
    if (form.getFieldState("postalCode").error) return;
    if (form.getFieldState("country").error) return;
    const data = await getPlaceDataWithZipcodeAndCountry({
      country: form.getValues("country"),
      zipcode: form.getValues("postalCode"),
    });
    console.log(data);
  };

  return (
    <>
      {/* <Button onClick={handleTest}>test</Button> */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-4 items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  Email Address <span className="text-red-600">*</span>
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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
              <FormItem className="flex flex-row gap-4 items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  First Name <span className="text-red-600">*</span>
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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
              <FormItem className="flex flex-row gap-4 items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  Last Name <span className="text-red-600">*</span>
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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
              <FormItem className="flex flex-row gap-4 items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  Year of Birth
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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
              <FormItem className="flex flex-row gap-4 items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  Gender
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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
              <FormItem className="flex flex-row gap-4 items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  Country <span className="text-red-600">*</span>
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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

          <div className="flex flex-row gap-4 items-center">
            <FormField
              control={form.control}
              name="ctryCode"
              render={({ field }) => (
                <FormItem className="flex flex-row gap-4 items-center">
                  <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                    Phone Number <span className="text-red-600">*</span>
                  </FormLabel>
                  <div className="w-full flex flex-col gap-1">
                    <FormControl>
                      <Input {...field} className="w-20" disabled />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="flex flex-row gap-4 items-center mt-2 w-full">
                  <div className="w-full flex flex-col gap-1">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your phone number"
                        type="tel"
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem className="flex flex-row gap-4 items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  Zip Code <span className="text-red-600">*</span>
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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
              <FormItem className="flex flex-row gap-4 items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  Address 1
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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
              <FormItem className="flex flex-row gap-4 items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  Address 2
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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
              <FormItem className="flex flex-row gap-4 items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  City <span className="text-red-600">*</span>
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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
              <FormItem className="flex flex-row gap-4 items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  State <span className="text-red-600">*</span>
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
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
              <FormItem className="flex flex-row gap-4 items-center">
                <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                  Referral/Promo Code
                </FormLabel>
                <div className="w-full flex flex-col gap-1">
                  <FormControl>
                    <Input
                      {...field}
                      value={field.value || ""}
                      placeholder="Referral/Promo Code"
                    />
                  </FormControl>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          {!findUsOptionsLoading && findUsOptions.length > 0 && (
            <FormField
              control={form.control}
              name="findUsId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWrapper
                      label="Where did you find us?"
                      className="h-fit p-4 mt-16 text-[#4D4D4D]"
                    >
                      <RadioGroup
                        value={field.value?.toString() || ""}
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        className="flex gap-4 flex-wrap"
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

          <div className="flex items-center space-x-2 mb-4">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#4D4D4D]"
            >
              Accept terms and conditions
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-fit"
            stdWidth
            stdHeight
          >
            Register
          </Button>
        </form>
      </Form>
    </>
  );
};

export default IndividualForm;
