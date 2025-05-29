"use client";
import { AddItems, EditItems } from "@/actions/catalogue.actions";
import UnitDropdown from "@/app/(dashboard)/business/catalogue/categories/_components/unitDropdown";
import Button from "@/components/global/buttons";
import CustomEditor from "@/components/global/editor/customEditor";
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
import ROUTES from "@/constants/routes";
import { ProcessedFileProps } from "@/lib/file-utils/upload.utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "@/components/global/toast";
import { z } from "zod";
import { Switch } from "@/components/ui/switch";
import {
  StoreCategory,
  StoreItem,
} from "@/types/api-response/catalogue.response";
import { useItemStore } from "@/zustand/stores/storeItem.store";

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
    if (itemId != undefined) {
      const data = getItemById(itemId);
      setItem(data || null);
    }
  }, [itemId, setItem]);
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
        className="space-y-4 min-w-[100%] p-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex flex-row gap-4 items-center">
              <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                Name:
              </FormLabel>
              <div className="w-full flex flex-col gap-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter item name"
                    className="input-field"
                  />
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
              <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base mt-2">
                Description:
              </FormLabel>
              <div className="w-full flex flex-col gap-1">
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
          render={({ field }) => (
            <FormItem className="flex-center">
              <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base"></FormLabel>
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
          render={({ field }) => (
            <FormItem className="flex-center">
              <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                Unit:
              </FormLabel>
              <div className="w-full flex flex-col gap-1">
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
            <FormItem className="flex flex-row gap-4 items-center">
              <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                SKU:
              </FormLabel>
              <div className="w-full flex flex-col gap-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Item-SKU-12345"
                    className="input-field"
                  />
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
            <FormItem className="flex flex-row gap-4 items-center">
              <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                Standard Tax:
              </FormLabel>
              <div className="w-full flex flex-col gap-1">
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
            <FormItem className="flex flex-row gap-4 items-center">
              <FormLabel className="paragraph-medium w-40 min-w-40 text-[#4D4D4D] text-base">
                Tax Percentage:
              </FormLabel>
              <div className="w-full flex flex-col gap-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Tax Percentage"
                    className="input-field"
                    disabled={form.getValues("stdTax")}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </div>
            </FormItem>
          )}
        />

        <div className="flex gap-4 justify-end">
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ItemAddForm;
