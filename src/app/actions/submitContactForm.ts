"use server";

import { Resend } from "resend";
import { render } from "@react-email/render";
import ContactFormEmail from "@/emails/ContactFormEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export const submitContactForm = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}) => {
  "use server";

  const { firstName, lastName, email, message } = data;

  // Validate inputs
  if (
    !firstName?.trim() ||
    !lastName?.trim() ||
    !email?.trim() ||
    !message?.trim()
  ) {
    return { success: false, error: "All fields are required." };
  }

  // Basic email validation
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email address." };
  }

  try {
    // Render the email template
    const emailHtml = await render(
      ContactFormEmail({
        firstName,
        lastName,
        email,
        message,
      })
    );

    // Send email using Resend
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: "ACA Website <onboarding@resend.dev>", // Replace with your verified domain
      to: ["website@aca.org"], // Replace with your recipient email
      replyTo: email,
      subject: `Contact Form Submission from ${firstName} ${lastName}`,
      html: emailHtml,
    });

    if (emailError) {
      console.error("Resend error:", emailError);
      return {
        success: false,
        error: "Failed to send message. Please try again later.",
      };
    }

    console.log("Email sent successfully:", emailData);
    return {
      success: true,
      message: "Thank you for your message! We'll get back to you soon.",
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: "An unexpected error occurred. Please try again later.",
    };
  }
};
