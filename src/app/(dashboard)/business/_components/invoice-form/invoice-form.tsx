/* eslint-disable max-lines */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import {
  onCreateInvoice,
  onGetCreateInvoiceDetails,
  onGetInvoiceTaxDetails,
  onUpdateInvoice,
} from "@/actions/invoice.actions";
import Button from "@/components/global/buttons";
import CancelWarning from "@/components/global/cancel-warning";
import DatePicker from "@/components/global/date-picker";
import Input from "@/components/global/input";
import Switch from "@/components/global/input/switch";
import toast from "@/components/global/toast";
import InfoTooltip from "@/components/global/tooltip/info-tooltip";
import ImageUploader, {
  ImageUploaderOutput,
} from "@/components/global/uploader/image-uploader";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import ROUTES from "@/constants/routes";
import { useUser } from "@/hooks/auth";
import { getDecimalNum } from "@/lib/utils/invoice";
import { Biz, fetchInvoice } from "@/types/api-response/transaction.response";
import {
  CancelInvoiceParams,
  CreateInvoiceParams,
  InvoiceCreationParams,
} from "@/types/invoice/create-update-invoice/invoice.params";
import { CreateInvoiceDetails } from "@/types/invoice/create-update-invoice/invoice.types";

import { CreateInvoiceFormSchema, InvoiceFormSchema } from "./schema";

export type InvoiceFormValues = z.infer<typeof InvoiceFormSchema>;
export type CreateInvoiceFormValues = z.infer<typeof CreateInvoiceFormSchema>;

type InvoiceFormType = {
  edit?: boolean;
  inv?: fetchInvoice[] | null;
  onOpenChange?: () => void;
};

const InvoiceForm = ({ edit, inv, onOpenChange }: InvoiceFormType) => {
  const { user, isLoading, error } = useUser();
  console.log(user, "yser");
  const bizName = user?.bizName;
  const postalCode = user?.address.postalCode;
  const country = user?.address.country;
  const bizid = user?.bizid;
  const stripeExpressAccountDetails = user?.stripeExpressAccountDetails;
  const stripeAccountType = user?.stripeAccountType;
  const merchantId = user?.merchantId;
  const invoice = inv?.[0];
  const defaultValues: InvoiceFormValues = {
    type: "email",
    email: "",
    mobile: "",
    title: `Invoice from ${bizName}`,
    firstName: "",
    lastName: "",
    serviceName: "",
    invoiceId:
      (invoice?.invoiceDetails &&
        (invoice?.invoiceDetails as CreateInvoiceDetails)?.invoice_nbr) ||
      "",

    serverName:
      (invoice?.invoiceDetails &&
        (invoice?.invoiceDetails as CreateInvoiceDetails)?.server_name) ||
      "",
    msg:
      (invoice?.invoiceDetails &&
        (invoice?.invoiceDetails as CreateInvoiceDetails)?.cust_message) ||
      "",
    baseAmount: (invoice && invoice?.baseAmount.toString()) || "",
    duedate: (invoice && invoice?.dueDate) || "",
    tipAllowed:
      (invoice?.invoiceDetails &&
        (invoice?.invoiceDetails as CreateInvoiceDetails)?.tip_allowed) ||
      false,
    isTaxIncluded: invoice ? invoice.includesTax : true,
  };
  const initialTaxAmount = invoice?.taxAmount ?? 0;
  const initialTotal =
    invoice && invoice.baseAmount
      ? invoice.baseAmount + (invoice.taxAmount ?? 0)
      : 0;


  const [type, setType] = useState<"email" | "mobile">("email");
  const [ctryCode, setCtryCode] = useState("+1");
  const [total, setTotal] = useState<number | null>(initialTotal);
  const [taxAmount, setTaxAmount] = useState<number | null>(initialTaxAmount);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    invoice?.dueDate ? new Date(invoice.dueDate) : undefined
  );
  const [uploadedFiles, setUploadedFiles] = useState<ImageUploaderOutput[]>([]);
  const [taxRate, setTaxRate] = useState<number | undefined | null>(null);
  const [objid, setObjid] = useState<number | null>(invoice?.objid || null);
  const [currency, setCurrency] = useState<string>(user?.currency || "");
  const [currencySymbol, setCurrencySymbol] = useState<string>(
    user?.currencySymbol || ""
  );
  const [buyerQRId, setBuyerQRId] = useState<number | null | undefined>(null);
  const [mobile, setMobile] = useState<string | null>(null);
  const [editImage, setEditImage] = useState<string>(
    (invoice?.invoiceDetails as CreateInvoiceDetails)?.img_url || ""
  );
  const [loading, setLoading] = useState<boolean>(false);
  const handleFileUpload = (files: ImageUploaderOutput[]) => {
    console.log(files);
    setUploadedFiles(files);
  };
  const schema = edit ? InvoiceFormSchema : CreateInvoiceFormSchema;
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const router = useRouter();

  const handleVerify = async (payload: CreateInvoiceParams) => {
    const pay = payload.payload;

    const res = await onGetCreateInvoiceDetails(pay);
    console.log(res);

    form.setValue("mobile", res.data?.phoneNumber);
    form.setValue("email", res.data?.email);
    form.setValue("firstName", res.data?.firstName);
    form.setValue("lastName", res.data?.lastName);
    setBuyerQRId(res.data?.buyerQrID);
  };

  const getTaxRate = async () => {
    console.log("inside get tax");
    if (taxRate) return taxRate;

    const payload = {
      country,
      postalCode,
    };

    const resp = await onGetInvoiceTaxDetails(payload);
    console.log("this is resp", resp);

    // if (!resp.success) {
    //   toast.error({"Tax could not be obtained");
    //   return false;
    // }
    setTaxRate(resp?.data?.taxRate);

    console.log(resp?.data?.taxRate, "taxrate");
    return resp?.data?.taxRate;
  };

  const handleChangeAmount = async (value?: string) => {
    const baseAmount = Number(value)
      ? Number(value)
      : Number(form.getValues("baseAmount"));

    let tax = 0;
    const taxIncluded = form.getValues("isTaxIncluded");

    if (!taxIncluded) {
      const rate = (await getTaxRate()) ?? 0;

      tax = baseAmount * rate;
      setTaxAmount(getDecimalNum(tax));
    } else {
      setTaxAmount(0);
    }

    if (baseAmount) {
      const tot = tax + baseAmount;
      setTotal(tot);
    }
  };

  const sendInvoice: SubmitHandler<z.infer<typeof InvoiceFormSchema>> = async (
    data
  ) => {
    console.log("inside sendInvoice", data);

    setLoading(true);

    const email = data.email || invoice?.buyerEmail;

    const payload: InvoiceCreationParams["payload"] = {
      objid,
      bizid,
      merchantId:
        stripeAccountType === "BOTH"
          ? stripeExpressAccountDetails.merchantId
          : merchantId,
      baseAmount: data.baseAmount,
      taxAmount,
      currency,
      currencySymbol,
      buyerEmail: email && email.length > 0 ? email : user?.buyerEmail || "",
      invoiceDetails: {
        business_name: bizName,
        business_country: user?.address.country,
        title: data.title,
        invoice_nbr: data.invoiceId,
        server_name: data.serverName,
        cust_message: data.msg,
        item_or_service:
          data.serviceName ||
          (invoice?.invoiceDetails as CreateInvoiceDetails)?.item_or_service,
        tip_allowed: data.tipAllowed,
      },
      includesTax: data.isTaxIncluded,
      channel: user?.channel || "custom",
      dueDate: selectedDate || null,
    };
    if (buyerQRId) {
      payload.buyerQRId = buyerQRId;
    }

    console.log("Form submitied");
    console.log(payload, "payload");
    if (uploadedFiles.length > 0) {
      (payload.invoiceDetails as CreateInvoiceDetails).img =
        uploadedFiles[0]?.base64;
      const trimmed = uploadedFiles[0]?.type.slice(
        0,
        uploadedFiles[0]?.type.indexOf("/")
      );
      (payload.invoiceDetails as CreateInvoiceDetails).invoiceFileExtn =
        trimmed;
    }
    const res = edit
      ? await onUpdateInvoice({ payload })
      : await onCreateInvoice({ payload });

    const action = edit ? "Updated" : "Created";

    if (res.success) {
      toast.success({
        message: `Invoice ${action} Successfully`,
      });

      if (edit) {
        onOpenChange?.();
      } else {
        router.push(ROUTES.BUSINESS_DASHBOARD);
      }
    } else {
      toast.error({
        message:
          res.error?.message || `Failed to ${action.toLowerCase()} invoice`,
      });
    }
    setLoading(false);
  };

  const cancelInvoice = async () => {
    console.log("inside cancelInvoice");
    if (!invoice) {
      toast.error({ message: "No invoice found to cancel" });
      return;
    }

    try {
      const cancelPayload: CancelInvoiceParams["payload"] = {
        ...invoice,
        bizid,
        status: "cancelled",
        totalAmount: total,
      };

      console.log("Cancel Payload:", cancelPayload);
      const res = await onUpdateInvoice({ payload: cancelPayload });

      if (res.success) {
        toast.success({ message: "Invoice Canceled Successfully" });
        onOpenChange?.();
      } else {
        toast.error({
          message: res.error?.message || "Failed to cancel invoice",
        });
      }
    } catch (error) {
      toast.error({
        message: "An error occurred while canceling the invoice",
      });
    }
  };
  const selectBefore = (
    <select
      value={ctryCode}
      onChange={(e) => setCtryCode(e.target.value)}
      style={{ border: "none", background: "transparent" }}
    >
      <option value="+91">+91</option>
      <option value="+1">+1</option>
    </select>
  );

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          (data) => {
            console.log("Form is valid, calling sendInvoice");
            sendInvoice(data);
          },
          (errors) => {
            console.log("Form validation errors:", errors);
          }
        )}
        className=""
      >
    
        <div className="flex gap-4">
          {!edit && (
            <div className="">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <RadioGroup
                        onValueChange={(value) => {
                          field.onChange(value);
                          setType(value as "email" | "mobile");
                          if (value === "email") {
                            form.setValue("mobile", "");
                          } else {
                            form.setValue("email", "");
                          }
                        }}
                        value={field.value}
                        className=" mt-5 h-28 w-20 flex-col "
                      >
                        <div className="flex justify-end">
                          <RadioGroupItem
                            value="email"
                            id="email"
                            className="relative  size-5 rounded-full border border-primary before:absolute before:left-[12.5%] before:top-[12.5%] before:size-3/4 before:rounded-full before:bg-blue-500 before:content-[''] data-[state=unchecked]:before:bg-transparent"
                          />
                        </div>
                        <div className="flex justify-end">
                          <RadioGroupItem
                            value="mobile"
                            id="mobile"
                            className="relative mt-11 size-5 rounded-full border border-primary before:absolute before:left-[12.5%] before:top-[12.5%] before:size-3/4 before:rounded-full before:bg-blue-500 before:content-[''] data-[state=unchecked]:before:bg-transparent"
                          />
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          )}

          <div className="w-full ">

            {!edit && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-[14px] sm:flex-row sm:items-center">
                    <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                      Email
                    </FormLabel>

                    <div className="flex w-full flex-col gap-1">
                      <FormControl>
                        <Input
                          className=""
                          {...field}
                          type="text"
                          placeholder="Email Address"
                          disabled={type !== "email"}
                          onBlur={(e) => {
                            field.onBlur();
                            if (
                              type === "email" &&
                              e.target.value &&
                              !form.formState.errors.email
                            ) {
                              handleVerify({
                                payload: {
                                  email: e.target.value,
                                },
                              });
                            }
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            )}
            {!edit && (
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
                    <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                      Mobile
                    </FormLabel>

                    <div className="flex w-full flex-col gap-1">
                      <FormControl>
                        <div className="flex">
                          {type === "mobile" && (
                            <div className="flex items-center rounded-l-md border border-r-0 bg-gray-50 px-3">
                              {selectBefore}
                            </div>
                          )}
                          <Input
                            {...field}
                            type="text"
                            placeholder="Mobile number"
                            disabled={type !== "mobile"}
                            className={
                              type === "mobile" ? "rounded-l-none" : ""
                            }
                            onBlur={(e) => {
                              field.onBlur();
                              if (
                                type === "mobile" &&
                                e.target.value.length === 10 &&
                                !form.formState.errors.mobile
                              ) {
                                handleVerify({
                                  payload: {
                                    countryCode: ctryCode,
                                    phoneNumber: e.target.value,
                                  },
                                });
                              }
                            }}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
                  <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                    Title
                  </FormLabel>

                  <div className="flex w-full flex-col gap-1">
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            {!edit && (
              <>
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="mt-[14px] flex  flex-col gap-[14px] sm:flex-row sm:items-center">
                      <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                        First Name
                      </FormLabel>

                      <div className="flex w-full flex-col gap-1">
                        <FormControl>
                          <Input {...field} placeholder="First Name" disabled />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
                      <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                        Last Name
                      </FormLabel>

                      <div className="flex w-full flex-col gap-1">
                        <FormControl>
                          <Input {...field} placeholder="Last Name" disabled />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />
              </>
            )}

            {!edit && (
              <FormField
                control={form.control}
                name="serviceName"
                render={({ field }) => (
                  <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
                    <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                      Item/Service
                    </FormLabel>

                    <div className="flex w-full flex-col gap-1">
                      <FormControl>
                        <Input placeholder="Item/Service" {...field} />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="invoiceId"
              render={({ field }) => (
                <FormItem className="mt-[14px] flex  flex-col gap-[14px] sm:flex-row sm:items-center">
                  <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                    Invoice #
                  </FormLabel>

                  <div className="flex w-full flex-col gap-1">
                    <FormControl>
                      <Input placeholder="Invoice #" {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="serverName"
              render={({ field }) => (
                <FormItem className="mt-[14px] flex  flex-col gap-[14px] sm:flex-row sm:items-center">
                  <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                    Associate Name
                  </FormLabel>

                  <div className="flex w-full flex-col gap-1">
                    <FormControl>
                      <Input placeholder="Associate Name" {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="msg"
              render={({ field }) => (
                <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
                  <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                    Message
                  </FormLabel>

                  <div className="flex w-full flex-col gap-1">
                    <FormControl>
                      <Input placeholder="Message to customer" {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="baseAmount"
              render={({ field }) => (
                <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
                  <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                    Amount
                  </FormLabel>

                  <div className="flex w-full flex-col gap-1">
                    <FormControl>
                      <Input
                     
                        {...field}
                        placeholder="Amount"
                        onBlur={(e) => {
                          field.onBlur();
                          handleChangeAmount(e.target.value);
                          
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duedate"
              render={({ field }) => (
                <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
                  <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                    Due Date
                  </FormLabel>

                  <div className="flex w-full flex-col gap-1">
                    <FormControl>
                      <DatePicker
                        className="flex w-full p-6"
                        {...field}
                        value={selectedDate}
                        onChange={setSelectedDate}
                        placeholder="Due Date"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipAllowed"
              render={({ field }) => (
                <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
                  <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                    Tip
                  </FormLabel>

                  <div className="flex items-center gap-[14px]">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        ref={field.ref}
                      />
                    </FormControl>
                    <InfoTooltip>
                      Enabling this option allows customers to include a tip
                      with their payment.
                    </InfoTooltip>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isTaxIncluded"
              render={({ field }) => (
                <FormItem className="mt-[14px] flex flex-col gap-[14px] sm:flex-row sm:items-center">
                  <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                    Invoice includes taxes
                  </FormLabel>
                  <div className="flex items-center gap-[14px]">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          handleChangeAmount();
                        }}
                      />
                    </FormControl>
                    <div />

                    <div className="flex w-60 justify-center gap-14 ">
                      <div className="flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-500">
                          Tax:
                        </span>
                        <span className="ml-1 text-sm">
                          {taxAmount && Number(taxAmount) > 0
                            ? `$${taxAmount}`
                            : ""}
                        </span>
                      </div>

                      <div className="flex items-center justify-center ">
                        <span className="text-sm font-medium text-gray-500">
                          Total:
                        </span>
                        <span className="ml-1 text-sm">
                          {" "}
                          {total ? `$${total}` : ""}
                        </span>
                      </div>
                    </div>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="isImageIncluded"
              render={({ field }) => {
                return (
                  <FormItem className="my-4 mt-[14px]  flex flex-col gap-[14px] sm:flex-row sm:items-center">
                    <FormLabel className="paragraph-medium w-40 min-w-40 text-base text-black-70">
                      Upload Image
                    </FormLabel>
                    <div className="flex items-center gap-2">
                      <FormControl>
                        {uploadedFiles.length === 0 && !editImage && (
                          <ImageUploader
                            className="w-60"
                            maxFileSizeMB={5}
                            onImageUpload={(file) => {
                              handleFileUpload(file);
                              field.onChange(file[0]);
                            }}
                          />
                        )}
                      </FormControl>
                      {uploadedFiles.length > 0 && !editImage && (
                        <div className="relative inline-block">
                          <Image
                            key={uploadedFiles[0]?.name}
                            height={120}
                            width={120}
                            src={uploadedFiles[0]?.base64Url}
                            alt="Create Invoice"
                            className="h-40 w-56 rounded-lg"
                          />
                          <X
                            onClick={() => setUploadedFiles([])}
                            className="absolute right-1 top-1 size-4 cursor-pointer rounded-full bg-white p-1 text-gray-600 shadow-md hover:bg-gray-100"
                          />
                        </div>
                      )}
                      {edit && editImage && (
                        <div className="relative inline-block">
                          <Image
                            height={120}
                            width={120}
                            src={editImage}
                            alt="Invoice Image"
                            className="h-40 w-56 rounded-lg"
                          />
                          <X
                            onClick={() => setEditImage("")}
                            className="absolute right-1 top-1 size-4 cursor-pointer rounded-full bg-white p-1 text-gray-600 shadow-md hover:bg-gray-100"
                          />
                        </div>
                      )}
                    </div>
                  </FormItem>
                );
              }}
            />

            <div className="my-10 flex w-full items-center justify-center gap-5">
              <Button
                type="submit"
                variant="primary"
                stdHeight
                stdWidth
                className="p-5"
                disabled={loading}
              >
                {loading
                  ? edit
                    ? "Updating Invoice..."
                    : "Creating Invoice..."
                  : edit
                    ? "Update Invoice"
                    : "Create Invoice"}
              </Button>

              {edit && (
                <CancelWarning
                  warningText="Are you sure you want to cancel this invoice?"
                  onCancel={cancelInvoice}
                >
                  <Button
                    type="button"
                    className="w-36 rounded-10 border border-[#ED0C10] bg-white p-5 text-[16px] text-[#ED0C10] hover:border-[#ED0C10] hover:bg-white hover:text-[#ED0C10]"
                  >
                    Cancel Invoice
                  </Button>
                </CancelWarning>
              )}
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default InvoiceForm;
