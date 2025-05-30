"use client";

import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { onContactUs } from "@/actions/others.action";
import toast from "@/components/global/toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { Modal } from "../../modal";

type Props = {
  children: React.ReactNode;
};

type ContactFormValues = {
  name: string;
  email: string;
  countryCode: string;
  phone: string;
  subject: string;
  message: string;
};

const ContactUsModal = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      countryCode: "+1",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    const fullPhoneNumber = `${data.countryCode}${data.phone}`;
    const data2 = await onContactUs({
      name: data.name,
      phone: fullPhoneNumber,
      subject: data.subject,
      message: data.message,
      from: data.email,
    });

    if (data2?.success) {
      toast.success({
        message: "Message sent successfully",
      });
      form.reset();
      setIsOpen(false);
    }
  };

  return (
    <Modal
      title="Contact Us"
      trigger={children}
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) form.reset();
      }}
    >
      <div className="flex-center flex gap-2 pb-10 pt-5">
        <Link href={""} className="flex gap-1">
          <div className="flex-center flex text-blue-500">
            <Mail />
            admin@fyndr.us
          </div>
        </Link>

        <Link href={""} className="flex gap-1">
          <div className="flex-center flex text-blue-500">
            <Phone />
            (480) 564-6565
          </div>
        </Link>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <FormField
            control={form.control}
            name="name"
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <FormItem className="flex items-center gap-1">
                <FormLabel className="w-16 text-right">Name: </FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel className="w-16 text-right">Email: </FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone with Code */}
          <div className="flex items-center gap-2">
            <FormField
              control={form.control}
              name="countryCode"
              // rules={{
              //   required: "",
              //   pattern: {
              //     value: /^\d{11}$/,
              //     message: "",
              //   },
              // }}
              render={({ field }) => (
                <FormItem className="flex w-1/4 items-center gap-2">
                  <FormLabel className="w-36 text-right">Phone: </FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Code" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+91">+91</SelectItem>
                        <SelectItem value="+1">+1</SelectItem>
                        <SelectItem value="+44">+44</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              rules={{
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Please enter a valid phone number",
                },
              }}
              render={({ field }) => (
                <FormItem className="flex flex-1 items-center gap-2">
                  <FormControl>
                    <Input type="tel" placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Subject */}
          <FormField
            control={form.control}
            name="subject"
            rules={{ required: "Subject is required" }}
            render={({ field }) => (
              <FormItem className="flex items-center gap-2">
                <FormLabel className="w-16 text-right">Subject: </FormLabel>
                <FormControl>
                  <Input placeholder="Subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem className="flex items-start gap-2">
                <FormLabel className="w-16 pt-2 text-right">
                  Message:{" "}
                </FormLabel>
                <FormControl>
                  <Textarea
                    rows={4}
                    placeholder="Write your message here..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex w-full justify-center">
            <Button type="submit" className="w-[200] bg-primary-500">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
};

export default ContactUsModal;
