import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface ContactFormEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export const ContactFormEmail = ({
  firstName,
  lastName,
  email,
  message,
}: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        New Contact Form Submission from {firstName} {lastName}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src="https://aca.org/aca.png"
              alt="ACA Logo"
              width={100}
              style={logo}
            />
          </Section>

          <Section style={section}>
            <Text style={label}>Name:</Text>
            <Text style={value}>
              {firstName} {lastName}
            </Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Email:</Text>
            <Text style={value}>{email}</Text>
          </Section>

          <Section style={section}>
            <Text style={label}>Message:</Text>
            <Text style={messageStyle}>{message}</Text>
          </Section>

          <Text style={footer}>
            This message was sent from the ACA website contact form.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  width: "100%",
  display: "table" as const,
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  marginTop: "64px",
  maxWidth: "600px",
  borderRadius: "8px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
};

const logoSection = {
  textAlign: "center" as const,
  padding: "40px 40px 20px",
};

const logo = {
  margin: "0 auto",
  display: "block" as const,
};

const section = {
  padding: "0 40px",
  marginBottom: "24px",
};

const label = {
  color: "#666",
  fontSize: "14px",
  fontWeight: "600",
  margin: "0 0 4px",
};

const value = {
  color: "#333",
  fontSize: "16px",
  margin: "0 0 0 0",
};

const messageStyle = {
  color: "#333",
  fontSize: "16px",
  margin: "0",
  whiteSpace: "pre-wrap" as const,
  lineHeight: "1.5",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  padding: "0 40px",
  marginTop: "32px",
};

export default ContactFormEmail;

