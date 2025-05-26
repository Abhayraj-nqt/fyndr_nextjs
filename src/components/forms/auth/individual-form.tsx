"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegistrationStore } from "@/zustand/stores/registration.store";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-menubar";
import { Checkbox } from "@/components/ui/checkbox";

// Modified schema for the form (excluding fields already collected)
const IndividualFormSchema = z.object({
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
  country: z.string().min(1, { message: "Country is required." }),
  postalCode: z.string().min(1, { message: "Postal code is required." }),
  addressLine1: z.string().optional(),
  addressLine2: z.string().optional(),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
});

type IndividualInfoStepProps = {
  onSubmit: (data: z.infer<typeof IndividualFormSchema>) => void;
};

const IndividualForm = ({ onSubmit }: IndividualInfoStepProps) => {
  const registrationData = useRegistrationStore();
  console.log({ registrationData });

  const form = useForm<z.infer<typeof IndividualFormSchema>>({
    resolver: zodResolver(IndividualFormSchema),
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
    },
  });

  const handleSubmit = (values: z.infer<typeof IndividualFormSchema>) => {
    // Add geolocation data (in a real app, you'd use a geocoding service)
    const dataWithGeo = {
      ...values,
      lat: 37.7749, // Example coordinates (San Francisco)
      lng: -122.4194,
    };

    onSubmit(dataWithGeo);
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
    { value: "CO", label: "Colorado" },
    // Add more states
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-medium text-light-900">
                First Name
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter your first name"
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
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
                <Input
                  {...field}
                  placeholder="Enter your last name"
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
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
                <Input
                  {...field}
                  placeholder="Year of Birth (YYYY)"
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
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
                <Input
                  {...field}
                  placeholder="Gender"
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  <SelectTrigger className="input-field">
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
              <FormMessage />
            </FormItem>
          )}
        />

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
                    <SelectTrigger className="input-field">
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
                <FormMessage />
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
                    className="input-field"
                    type="tel"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-medium text-light-900">
                Postal Code
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter zip code"
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
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
                <Input
                  {...field}
                  placeholder="Address Line 1"
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
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
                <Input
                  {...field}
                  placeholder="Address Line 2"
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-medium text-light-900">
                City
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Enter city"
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="input-field">
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
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="paragraph-medium text-light-900">
                City
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Referral Code"
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <p>Where did you find us?</p>
          <RadioGroup defaultValue="comfortable">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="default" id="r1" />
              <Label htmlFor="r1">Default</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="comfortable" id="r2" />
              <Label htmlFor="r2">Comfortable</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="compact" id="r3" />
              <Label htmlFor="r3">Compact</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
        </div>

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

export default IndividualForm;
