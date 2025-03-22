import Footer from "@/components/footer";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Footer> = {
    component: Footer,
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Primary: Story = {
    args: {
        data: {
            footerAddress: [
                {
                    footerAddressLine: "206 N. Washington Street",
                },
                {
                    footerAddressLine: "Suite 200",
                },
                {
                    footerAddressLine: "Alexandria, VA 22314",
                },
            ],
            footerContactInfo: [
                {
                    footerContactLine: "Phone: (703) 224-0000",
                },
                {
                    footerContactLine: "Fax: (703) 224-0010",
                },
            ],
            helpfulNavLinks: [
                {
                    key: "about_us",
                    link_type: "Web",
                    url: "",
                    text: "About Us",
                },
                {
                    key: "professional_development",
                    link_type: "Web",
                    url: "",
                    text: "Professional Development",
                },
                {
                    key: "conferences",
                    link_type: "Web",
                    url: "",
                    text: "Conferences",
                },
                {
                    key: "correctional_health_care",
                    link_type: "Web",
                    url: "",
                    text: "Correctional Health Care",
                },
                {
                    key: "global_corrections_service",
                    link_type: "Web",
                    url: "",
                    text: "Global Corrections Service",
                },
                {
                    key: "membership",
                    link_type: "Web",
                    url: "",
                    text: "Membership",
                },
                {
                    key: "publications",
                    link_type: "Web",
                    url: "",
                    text: "Publications",
                },
                {
                    key: "resources",
                    link_type: "Web",
                    url: "",
                    text: "Resources",
                },
                {
                    key: "standards_and_accreditations",
                    link_type: "Web",
                    url: "",
                    text: "Standards & Accreditations",
                },
                {
                    key: "job_bank",
                    link_type: "Web",
                    url: "",
                    text: "Job Bank",
                },
            ],
            memberNavLinks: [
                {
                    key: "sign_in",
                    link_type: "Web",
                    url: "",
                    text: "Sign In",
                },
                {
                    key: "marketplace",
                    link_type: "Web",
                    url: "",
                    text: "Marketplace",
                },
                {
                    key: "newsletters",
                    link_type: "Web",
                    url: "",
                    text: "Newsletters",
                },
            ],
            subFooterNavLinks: [
                {
                    key: "careers",
                    link_type: "Web",
                    url: "",
                    text: "Careers",
                },
                {
                    key: "contact_us",
                    link_type: "Web",
                    url: "",
                    text: "Contact Us",
                },
                {
                    key: "privacy_policy",
                    link_type: "Web",
                    url: "",
                    text: "Privacy Policy",
                },
                {
                    key: "terms_and_conditions",
                    link_type: "Web",
                    url: "",
                    text: "Terms and Conditions",
                },
            ],
        },
    },
};
