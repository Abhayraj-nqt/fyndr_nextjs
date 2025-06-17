import Image from "next/image";
import React from "react";
import { UseFormReturn } from "react-hook-form";

import UnitDropdown from "@/app/(dashboard)/business/catalogue/categories/_components/unit-dropdown";
import Button from "@/components/global/buttons";
import CustomEditor from "@/components/global/editor/custom-editor";
import Input from "@/components/global/input";
import Switch from "@/components/global/input/switch";
import ImageUploader from "@/components/global/uploader/image-uploader";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProcessedFileProps } from "@/lib/utils/files/upload.utils";

import { ItemFormValues } from "./item-form";

type Props = {
  form: UseFormReturn<ItemFormValues>;
  uploadedFiles: ProcessedFileProps[];
  handleFileUpload: (files: ProcessedFileProps[]) => void;
  onCancel: () => void;
};

const ItemFormContent = ({
  form,
  uploadedFiles,
  handleFileUpload,
  onCancel,
}: Props) => {
  return (
    <>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-4">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
              Name:
            </FormLabel>
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input {...field} placeholder="Enter item name" />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="flex flex-row gap-4">
            <FormLabel className="paragraph-medium mt-2 w-40 min-w-40 text-base text-black-70">
              Description:
            </FormLabel>
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <CustomEditor value={field.value} onChange={field.onChange} />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="image"
        render={() => (
          <FormItem className="flex-center">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70"></FormLabel>
            <div className="flex-between gap-5">
              {uploadedFiles.map((item) => (
                <Image
                  key={item.name}
                  height={200}
                  width={200}
                  src={item.base64Url}
                  alt="bjdbw"
                />
              ))}
              <div className="flex flex-col gap-1">
                <FormControl>
                  <ImageUploader
                    maxFileSizeMB={5}
                    onImageUpload={handleFileUpload}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </div>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="unit"
        render={() => (
          <FormItem className="flex-center">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
              Unit:
            </FormLabel>
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <UnitDropdown />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="sku"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-4">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
              SKU:
            </FormLabel>
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input {...field} placeholder="Item-SKU-12345" />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="stdTax"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center gap-4">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
              Standard Tax:
            </FormLabel>
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(checked)}
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
          <FormItem className="flex flex-row items-center gap-4">
            <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
              Tax Percentage:
            </FormLabel>
            <div className="flex w-full flex-col gap-1">
              <FormControl>
                <Input
                  {...field}
                  placeholder="Tax Percentage"
                  disabled={form.getValues("stdTax")}
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </div>
          </FormItem>
        )}
      />

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          onClick={onCancel}
          className="rounded bg-gray-300 px-4 py-2 text-black"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="rounded bg-primary px-4 py-2 text-white"
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default ItemFormContent;
