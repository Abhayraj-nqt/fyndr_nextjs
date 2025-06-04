"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/global/input";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Button from "@/components/global/buttons";
import { useRouter } from "next/navigation";
import ROUTES from "@/constants/routes";
import CustomEditor from "@/components/global/editor/customEditor";
import ImageUploader from "@/components/global/uploader/image-uploader";
import { ProcessedFileProps } from "@/lib/file-utils/upload.utils";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AddCategories, EditCategories } from "@/actions/catalogue.actions";
import toast from "@/components/global/toast";
import { useCategoryStore } from "@/zustand/stores/storeCategory.store";
import { StoreCategory } from "@/types/api-response/catalogue.response";

const categorySchema = z.object({
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
});

type CategoryFormValues = z.infer<typeof categorySchema>;
const defaultValues: CategoryFormValues = {
  name: "",
  description: "",
  image: [],
};

type UploadedImageData = {
  img: string;
  index: number;
  extn: string;
  imgUri: string;
};

type Props = {
  bizid?: number;
  categoryId?: number;
};

const CategoryAddForm = ({ bizid, categoryId }: Props) => {
  const getCategoryById = useCategoryStore((state) => state.getCategoryById);
  const [category, setCategory] = useState<StoreCategory | null>(null);
  const router = useRouter();
  if (typeof bizid !== "number") {
    throw new Error("bizid is required and must be a number");
  }

  useEffect(() => {
    if (categoryId != undefined) {
      const data = getCategoryById(categoryId);
      setCategory(data || null);
    }
  }, [categoryId, getCategoryById]);
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues,
  });
  useEffect(() => {
    if (categoryId && category) {
      form.reset({
        name: category.name,
        description: category.description ?? "",
        image:
          category.images?.map((img, index) => ({
            imgUri: img.img_url,
            index: img.index ?? index,
          })) ?? [],
      });
      const processedFiles =
        category.images?.map((img, index) => ({
          name: `image-${index}`,
          type: "image/*",
          base64: "",
          base64Url: img.img_url,
          orgFile: null,
        })) ?? [];
      setUploadedFiles(processedFiles);
    }
  }, [categoryId, category, form]);

  const [uploadedFiles, setUploadedFiles] = useState<ProcessedFileProps[]>([]);

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

  const onSubmit = async (data: any) => {
    const payload = {
      name: data?.name,
      description: data?.description,
      images: data?.image,
      bizid,
      ...(categoryId && { objid: categoryId }),
    };
    const { success } = categoryId
      ? await EditCategories(payload)
      : await AddCategories([payload]);

    if (success) {
      toast.success({
        message: categoryId
          ? "Category Updated Successfully"
          : "Category Added Successfully",
      });
      router.push(ROUTES.BUSINESS_STORE_CATEGORY);
    } else {
      toast.error({
        message: "Something went wrong",
      });
    }
  };
  const onCancel = () => {
    router.push(ROUTES.BUSINESS_STORE_CATEGORY);
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
              <FormLabel className="paragraph-medium w-40 min-w-40 text-black-70 text-base">
                Name:
              </FormLabel>
              <div className="w-full flex flex-col gap-1">
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter category name"
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
              <FormLabel className="paragraph-medium w-40 min-w-40 text-black-70 text-base mt-2">
                Description:
              </FormLabel>
              <div className="w-full flex flex-col">
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
              <FormLabel className="paragraph-medium w-40 min-w-40 text-black-70 text-base"></FormLabel>
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

export default CategoryAddForm;
