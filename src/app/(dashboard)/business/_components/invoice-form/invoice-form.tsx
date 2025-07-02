/* eslint-disable max-lines */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { RadioGroup, RadioGroupItem } from "@radix-ui/react-radio-group";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Tooltip } from "recharts";
import { custom, z } from "zod";

import Button from "@/components/global/buttons";
import DatePicker from "@/components/global/date-picker";
import Input from "@/components/global/input";
import Switch from "@/components/global/input/switch";
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
import { fetchInvoice } from "@/types/api-response/transaction.response";

import { InvoiceFormSchema } from "./schema";

export type InvoiceFormValues = z.infer<typeof InvoiceFormSchema>;

const defaultValues: InvoiceFormValues = {
  type: "email",
  email: "",
  mobile: "",
  title: "",
  firstName: "",
  lastName: "",
  serviceName: "",
  invoiceId: "",
  serverName: "",
  msg: "",
  baseAmount: "",
  duedate: "",
  tipAllowed: false,
  isTaxIncluded: false,
  isImageIncluded: "",
};

type InvoiceFormType = {
  edit?: boolean;
  inv?: fetchInvoice[] | null;
};

const InvoiceForm = ({ edit }: InvoiceFormType) => {
  const [type, setType] = useState<"email" | "mobile">("email");
  const [ctryCode, setCtryCode] = useState("+1");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [uploadedFiles, setUploadedFiles] = useState<ImageUploaderOutput[]>([]);

  const handleFileUpload = (files: ImageUploaderOutput[]) => {
    console.log(files);
    setUploadedFiles(files);
  };
  const form = useForm<InvoiceFormValues>({
    resolver: zodResolver(InvoiceFormSchema),
    defaultValues,
  });

  const onSubmit = (data: InvoiceFormValues) => {
    console.log("Form submitted:", data);
    // Handle form submission
  };
  
  const email  = form.getFieldState("email");
  console.log(email);
  const handleVerify = (data: any) => {
    console.log("Verifying:", data);
    // Your verification logic here
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
     <div>
      This is form
     </div>
  );
};

export default InvoiceForm;
