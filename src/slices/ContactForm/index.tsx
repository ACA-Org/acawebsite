"use client";

import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "First name is required" }),
  email: z.string().nonempty({ message: "First name is required" }),
  message: z.string().nonempty({ message: "First name is required" }),
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormInputs) => {
    console.log(data);
  };

  return (
    <div className="bg-blue-50 rounded-2xl border-none p-8">
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex items-center gap-[41px] relative w-full mb-8">
          <div className="flex flex-col items-start gap-2 flex-1">
            <label
              htmlFor="firstName"
              className="font-body-LG text-blue-300 text-[18px] leading-normal"
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
              <span className="text-red-500 text-sm">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col items-start gap-2 flex-1">
            <label
              htmlFor="lastName"
              className="font-body-LG text-blue-300 text-[18px] leading-normal"
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
              <span className="text-red-500 text-sm">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 w-full mb-8">
          <label
            htmlFor="email"
            className="font-body-LG text-blue-300 text-[18px] leading-normal"
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
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col items-start gap-2 w-full mb-8">
          <label
            htmlFor="message"
            className="font-body-LG text-blue-300 text-[18px] leading-normal"
          >
            Message
          </label>
          <Textarea
            {...register("message", { required: "Message is required" })}
            id="message"
            placeholder="Type your message here"
            aria-required="true"
            className={`h-[148px] px-4 py-3 bg-[#dfeef3] text-gray-300 text-lg opacity-65 font-normal border-[#dfeef4] w-full rounded-md resize-none ${
              errors.message ? "border-red-500" : ""
            }`}
          />
          {errors.message && (
            <span className="text-red-500 text-sm">
              {errors.message.message}
            </span>
          )}
        </div>

        <Button type="submit" variant={"primary"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
