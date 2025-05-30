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
    <div className="rounded-2xl border border-blue-500/15 bg-white p-8">
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

        <Button type="submit" variant={"primary"}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
