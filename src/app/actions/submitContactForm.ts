"use server";

export const submitContactForm = async (formData: FormData) => {
  "use server";

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." };
  }

  // Here you would typically send the data to your backend or an API
  // For example, using fetch or axios to send a POST request

  console.log("Form submitted:", { name, email, message });

  return { success: true, message: "Form submitted successfully!" };
};
