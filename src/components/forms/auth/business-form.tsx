"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegistrationStore } from "@/zustand/stores/registration.store";

// Modified schema for the business form (excluding fields already collected)
const BusinessFormSchema = z.object({
  // Contact person info
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
  ctryCode: z.string().min(1, { message: "Country code is required." }),
  phone: z
    .string()
    .min(1, { message: "Phone number is required." })
    .regex(/^\d+$/, { message: "Phone number can only contain digits." }),

  // Business specific info
  bizName: z.string().min(1, { message: "Business name is required." }),
  bizType: z.string().min(1, { message: "Business type is required." }),
  website: z.string().optional(),
  tags: z.string().optional(),

  // Address
  country: z.string().min(1, { message: "Country is required." }),
  postalCode: z.string().min(1, { message: "Postal code is required." }),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),

  // How did you find us
  findUsId: z.number().optional(),
});

type BusinessInfoStepProps = {
  onSubmit: (data: z.infer<typeof BusinessFormSchema>) => void;
};

const BusinessForm = ({ onSubmit }: BusinessInfoStepProps) => {
  const registrationData = useRegistrationStore();
  console.log({ registrationData });

  const form = useForm<z.infer<typeof BusinessFormSchema>>({
    resolver: zodResolver(BusinessFormSchema),
    defaultValues: {
      firstName: registrationData.firstName || "",
      lastName: registrationData.lastName || "",
      ctryCode: registrationData.ctryCode || "+1",
      phone: registrationData.phone || "",
      country: registrationData.country || "US",
      postalCode: registrationData.postalCode || "",
      addressLine1: registrationData.addressLine1 || "",
      addressLine2: registrationData.addressLine2 || "",
      city: registrationData.city || "",
      state: registrationData.state || "",
      bizName: registrationData.bizInfo?.bizName || "",
      bizType: registrationData.bizInfo?.bizType || "",
      website: registrationData.bizInfo?.website || "",
      tags: registrationData.bizInfo?.tags || "",
      findUsId: registrationData.findUsId || 1,
    },
  });

  const handleSubmit = (values: z.infer<typeof BusinessFormSchema>) => {
    // Extract bizInfo fields
    const { bizName, bizType, website, tags, findUsId, ...rest } = values;

    // Structure data according to the expected format
    const formattedData = {
      ...rest,
      bizInfo: {
        bizName,
        bizType,
        website,
        tags,
      },
      findUsId,
      accountStatus: "PENDING", // Business accounts start as pending
      // Add geolocation data (in a real app, you'd use a geocoding service)
      lat: 37.7749, // Example coordinates (San Francisco)
      lng: -122.4194,
    };

    onSubmit(formattedData);
  };

  // Country codes for dropdown
  const countryCodes = [
    { value: "+1", label: "US (+1)" },
    { value: "+44", label: "UK (+44)" },
    { value: "+91", label: "India (+91)" },
    // Add more as needed
  ];

  // Countries for dropdown
  const countries = [
    { value: "US", label: "United States" },
    { value: "UK", label: "United Kingdom" },
    { value: "IN", label: "India" },
    // Add more as needed
  ];

  // States for US (example)
  const usStates = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "CA", label: "California" },
    { value: "MN", label: "Minnesota" },
    // Add more states
  ];

  // Business types
  const businessTypes = [
    { value: "Accounting", label: "Accounting" },
    { value: "Consulting", label: "Consulting" },
    { value: "Retail", label: "Retail" },
    { value: "Technology", label: "Technology" },
    { value: "Manufacturing", label: "Manufacturing" },
    { value: "Healthcare", label: "Healthcare" },
    // Add more as needed
  ];

  // How did you find us options
  const findUsOptions = [
    { value: 1, label: "Search Engine" },
    { value: 2, label: "Social Media" },
    { value: 3, label: "Referral" },
    { value: 4, label: "Advertisement" },
    { value: 5, label: "Blog Post" },
    { value: 6, label: "Conference/Event" },
    { value: 7, label: "Email" },
    { value: 8, label: "Other" },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="mt-8 space-y-6"
      >
        <h3 className="mb-2 text-xl font-semibold text-light-900">
          Business Information
        </h3>

        <FormField
          control={form.control}
          name="bizName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-medium text-light-900">
                Business Name
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter your business name" />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="bizType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-medium text-light-900">
                  Business Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {businessTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-medium text-light-900">
                  Website (Optional)
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your business website" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <h3 className="mb-2 mt-6 text-xl font-semibold text-light-900">
          Contact Person
        </h3>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-medium text-light-900">
                  First Name
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter first name" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-medium text-light-900">
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter last name" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="ctryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-medium text-light-900">
                  Country Code
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Code" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countryCodes.map((code) => (
                      <SelectItem key={code.value} value={code.value}>
                        {code.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel className="paragraph-medium text-light-900">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your phone number"
                    type="tel"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <h3 className="mb-2 mt-6 text-xl font-semibold text-light-900">
          Business Address
        </h3>

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-medium text-light-900">
                Country
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem key={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine1"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-medium text-light-900">
                Address Line 1
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter street address" />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="addressLine2"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-medium text-light-900">
                Address Line 2 (Optional)
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Suite, floor, etc." />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-medium text-light-900">
                  City
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter city" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-medium text-light-900">
                  State
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {usStates.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="postalCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-medium text-light-900">
                  Postal Code
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter postal code" />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="findUsId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-medium text-light-900">
                How did you find us?
              </FormLabel>
              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {findUsOptions.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value.toString()}
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-medium text-light-900">
                Tags (Optional, comma separated)
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="e.g. retail, ecommerce, fashion"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="paragraph-medium min-h-12 w-full rounded-[10px] bg-primary-500 px-4 py-3 !text-light-900 hover:bg-primary-500"
        >
          Complete Registration
        </Button>
      </form>
    </Form>
  );
};

export default BusinessForm;
