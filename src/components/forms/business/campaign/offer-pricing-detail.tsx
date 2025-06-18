import { UseFormReturn } from "react-hook-form";

import Input from "@/components/global/input";
import Switch from "@/components/global/input/switch";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { OfferFormValues } from "./offer-form";

type Props = {
  form: UseFormReturn<OfferFormValues>;
  checked: boolean;
  setChecked: (value: boolean) => void;
};

const OfferPricingDetails = ({ form, checked, setChecked }: Props) => {
  return (
    <>
      <FormField
        control={form.control}
        name="discount"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-4">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input
                  {...field}
                  label="Discount"
                  topRightNode={
                    <Switch
                      checkedTitle="Cash"
                      uncheckedTitle="Percent"
                      checked={checked}
                      onCheckedChange={setChecked}
                    />
                  }
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="amount"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-4">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input {...field} label="Retail Price" showRequired />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="offerLimit"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start gap-4">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input
                  {...field}
                  label="Offers Limit"
                  showRequired
                  topRightNode={
                    <Switch
                      checkedTitle="Unlimited"
                      uncheckedTitle="limited"
                      checked={checked}
                      onCheckedChange={setChecked}
                    />
                  }
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="offerPrice"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-4">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input {...field} label="Offer Price" showRequired />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="perUserLimit"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start gap-4">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input
                  {...field}
                  label="Per User Limit"
                  showRequired
                  topRightNode={
                    <Switch
                      checkedTitle="Unlimited"
                      uncheckedTitle="limited"
                      checked={checked}
                      onCheckedChange={setChecked}
                    />
                  }
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="taxPercent"
        render={({ field }) => (
          <FormItem>
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input
                  {...field}
                  label="Tax Percentage"
                  info
                  topRightNode={
                    <Switch
                      checkedTitle="Custom"
                      uncheckedTitle="Standard"
                      checked={checked}
                      onCheckedChange={setChecked}
                    />
                  }
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="repurchasePeriod"
        render={({ field }) => (
          <FormItem className="col-span-2">
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input
                  {...field}
                  label="Repurchase Period(Days)"
                  topRightNode={
                    <Switch
                      checkedTitle="Enabled"
                      uncheckedTitle="Disabled"
                      checked={checked}
                      onCheckedChange={setChecked}
                    />
                  }
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />
    </>
  );
};

export default OfferPricingDetails;
