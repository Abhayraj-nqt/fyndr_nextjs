"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { AddItems, EditItems } from "@/actions/catalogue.actions";
import UnitDropdown from "@/app/(dashboard)/business/catalogue/categories/_components/unitDropdown";
import Button from "@/components/global/buttons";
import CustomEditor from "@/components/global/editor/customEditor";
import toast from "@/components/global/toast";
import ImageUploader from "@/components/global/uploader/image-uploader";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ROUTES from "@/constants/routes";
import { StoreItem } from "@/types/api-response/catalogue.response";
import { useItemStore } from "@/zustand/stores/storeItem.store";

import { ProcessedFileProps } from "@/lib/file-utils/upload.utils";

const itemSchema = z.object({
  name: z.string().min(1, "Please Enter Name"),
  description: z.string().optional(),
  image: z
    .array(
      z.object({
        img: z.any(),
        index: z.number(),
        extn: z.string(),
        imgUri: z.string(),
      })
    )
    .optional(),
  sku: z.string().optional(),
  unit: z.string().min(1, "Please Select"),
  stdTax: z.boolean().optional(),
  taxPercent: z
    .string({
      invalid_type_error:
        "Please enter the tax percentage or enable standard tax",
    })
    .min(0, "Tax cannot be negative")
    .optional(),
});
type ItemFormValues = z.infer<typeof itemSchema>;
const defaultValues: ItemFormValues = {
  name: "",
  description: "",
  image: [],
  sku: "",
  unit: "",
  stdTax: false,
  taxPercent: "",
};

type UploadedImageData = {
  img: string;
  index: number;
  extn: string;
  imgUri: string;
};

type Props = {
  bizid: number;
  itemId?: number;
};

const ItemAddForm = ({ bizid, itemId }: Props) => {
  const getItemById = useItemStore((state) => state.getItemById);
  const [item, setItem] = useState<StoreItem | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFileProps[]>([]);
  const router = useRouter();
  useEffect(() => {
    if (itemId !== undefined) {
      const data = getItemById(itemId);
      setItem(data || null);
    }
  }, [getItemById, itemId, setItem]);
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues,
  });
  useEffect(() => {
    if (itemId && item) {
      form.reset({
        name: item.name || "",
        description: item.description || "",
        image:
          item.images?.map((img, index) => ({
            imgUri: img.img_url,
            index: img.index ?? index,
          })) ?? [],
        sku: item.sku || "",
        unit: item.unit || "",
        stdTax: item.stdTax || false,
        taxPercent: item.taxPercent ? String(item.taxPercent) : "",
      });
      const processedFiles =
        item.images?.map((img, index) => ({
          name: `image-${index}`,
          type: "image/*",
          base64: "",
          base64Url: img.img_url,
          orgFile: null,
        })) ?? [];
      setUploadedFiles(processedFiles);
    }
  }, [itemId, item, form]);

  const handleFileUpload = (files: ProcessedFileProps[]) => {
    const newUploadedFiles = [...files];
    setUploadedFiles(newUploadedFiles);

    const transformedForForm: UploadedImageData[] = files.map((file, index) => {
      const fileType = file.type?.split("/")[1] || "";
      return {
        img: file.base64 || "",
        index,
        extn: fileType || "",
        imgUri: file.base64Url || "",
      };
    });

    form.setValue("image", transformedForForm, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const onCancel = () => {
    router.push(ROUTES.BUSINESS_STORE_ITEM);
  };
  const onSubmit = async (data: any) => {
    const payload = {
      name: data?.name,
      description: data?.description,
      images: data?.image,
      sku: data?.sku,
      stdTax: data?.stdTax,
      taxPercent: data?.taxPercent,
      unit: data?.unit,
      bizid,
      ...(itemId && { objid: itemId }),
    };
    const { success } = itemId
      ? await EditItems(payload)
      : await AddItems([payload]);
    if (success) {
      toast.success({
        message: itemId
          ? "Item Updated Successfully"
          : "Item Added Successfully",
      });
      router.push(ROUTES.BUSINESS_STORE_ITEM);
    } else {
      toast.error({
        message: "Something went wrong",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-w-full space-y-4 p-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-4">
              <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
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
              <FormLabel className="paragraph-medium mt-2 w-40 min-w-40 text-base text-[#4D4D4D]">
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
              <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]"></FormLabel>
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
              <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
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
              <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
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
              <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
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
              <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-[#4D4D4D]">
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
            className="rounded bg-blue-600 px-4 py-2 text-white"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ItemAddForm;
