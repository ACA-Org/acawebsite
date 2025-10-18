"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { submitContactForm } from "@/app/actions/submitContactForm";
import { useState, useTransition } from "react";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

type FormInputs = z.infer<typeof formSchema>;

/**
 * Props for `ContactForm`.
 */
export type ContactFormProps = SliceComponentProps<Content.ContactFormSlice>;

/**
 * Component for "ContactForm" Slices.
 */
const ContactForm = () => {
  const [isPending, startTransition] = useTransition();
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [lastSubmitTime, setLastSubmitTime] = useState<number>(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormInputs) => {
    // Prevent spam: require 5 seconds between submissions
    const now = Date.now();
    const timeSinceLastSubmit = now - lastSubmitTime;
    const minimumDelay = 5000; // 5 seconds

    if (timeSinceLastSubmit < minimumDelay) {
      setSubmitStatus({
        type: "error",
        message: "Please wait a moment before submitting again.",
      });
      return;
    }

    setSubmitStatus({ type: null, message: "" });

    startTransition(async () => {
      try {
        const result = await submitContactForm(data);

        if (result.success) {
          setSubmitStatus({
            type: "success",
            message: result.message || "Message sent successfully!",
          });
          setLastSubmitTime(now);
          reset(); // Clear the form on success
        } else {
          setSubmitStatus({
            type: "error",
            message: result.error || "Failed to send message.",
          });
        }
      } catch (error) {
        console.error("Form submission error:", error);
        setSubmitStatus({
          type: "error",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    });
  };

  return (
    <div className="rounded-2xl border border-blue-500/20 bg-white p-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="relative mb-8 flex w-full items-center gap-[41px]">
          <div className="flex flex-1 flex-col items-start gap-2">
            <label
              htmlFor="firstName"
              className="font-body-LG text-[18px] leading-normal text-blue-300"
            >
              First Name
            </label>
            <Input
              {...register("firstName", { required: "First name is required" })}
              id="firstName"
              type="text"
              placeholder="First Name"
              aria-required="true"
              hasError={!!errors?.firstName?.message}
            />
            {errors.firstName && (
              <span className="text-sm text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex flex-1 flex-col items-start gap-2">
            <label
              htmlFor="lastName"
              className="font-body-LG text-[18px] leading-normal text-blue-300"
            >
              Last Name
            </label>
            <Input
              {...register("lastName", { required: "Last name is required" })}
              id="lastName"
              type="text"
              placeholder="Last Name"
              aria-required="true"
              hasError={!!errors?.lastName}
            />
            {errors.lastName && (
              <span className="text-sm text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        <div className="mb-8 flex w-full flex-col items-start gap-2">
          <label
            htmlFor="email"
            className="font-body-LG text-[18px] leading-normal text-blue-300"
          >
            Email Address
          </label>
          <Input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            id="email"
            type="email"
            placeholder="name@company.com"
            aria-required="true"
            hasError={!!errors?.email}
          />
          {errors.email && (
            <span className="text-sm text-red-500">{errors.email.message}</span>
          )}
        </div>

        <div className="mb-8 flex w-full flex-col items-start gap-2">
          <label
            htmlFor="message"
            className="font-body-LG text-[18px] leading-normal text-blue-300"
          >
            Message
          </label>
          <Textarea
            {...register("message", { required: "Message is required" })}
            id="message"
            placeholder="Type your message here"
            aria-required="true"
            rows={4}
          />
          {errors.message && (
            <span className="text-sm text-red-500">
              {errors.message.message}
            </span>
          )}
        </div>

        {/* Status Messages */}
        {submitStatus.type && (
          <div
            className={`mb-4 rounded-lg p-4 ${
              submitStatus.type === "success"
                ? "border border-green-200 bg-green-50 text-green-800"
                : "border border-red-200 bg-red-50 text-red-800"
            }`}
            role="alert"
          >
            {submitStatus.message}
          </div>
        )}

        <Button type="submit" variant={"primary"} disabled={isPending}>
          {isPending ? "Sending..." : "Submit"}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
