import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactPageDocumentData } from "../../../prismicio-types";
import { getContactPage } from "../actions/getContactPageData";
import { notFound } from "next/navigation";
import { DynamicImage } from "@/components/image";
import RichText from "../components/RichText";
import ContactForm from "@/slices/ContactForm";
import { SliceZone } from "@prismicio/react";
import { components } from "@/slices";
import { Metadata } from "next/types";
import { asImageSrc } from "@prismicio/client";
import { createClient } from "@/prismicio";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("contactPage").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export default async function Page() {
  let pageData: ContactPageDocumentData | null = null;

  pageData = await getContactPage().catch(() => notFound());

  if (!pageData) return notFound();

  const {
    pageContent,
    pageTitle: title,
    pageImage: img,
    slices2: rightSlices,
  } = pageData;

  return (
    <div className="flex w-full flex-col">
      <div className="mx-auto mb-12 flex w-full max-w-[1440px] flex-col px-5 md:mb-28 md:px-8">
        <div className="relative mt-16 flex h-full min-h-[300px] w-full shrink-0 items-end gap-2.5 overflow-clip rounded-2xl p-12">
          {img.url && (
            <>
              <div className="absolute inset-0 z-10 h-full w-full">
                <DynamicImage
                  field={img}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-[rgba(32,32,32,0)] via-transparent via-10% to-[#0F0F0F]" />
              </div>
            </>
          )}
        </div>
        <div className="mx-auto my-8 flex w-full flex-row gap-8 md:my-12 md:gap-16">
          <div className="flex w-full flex-col items-start gap-8">
            <div className="flex flex-col gap-8 md:gap-12">
              <Breadcrumbs />
              {title && (
                <h1 className="heading-1 z-20 text-[52px] leading-[70px] font-semibold text-blue-300 max-lg:text-[38px] max-lg:leading-[50px]">
                  {title}
                </h1>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <RichText content={pageContent} />
            </div>
          </div>
          {rightSlices?.length > 0 && (
            <div className="flex max-w-[380px] flex-col gap-4">
              <SliceZone slices={rightSlices} components={components} />
            </div>
          )}
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
