import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { createClient } from "@/prismicio";

import { Breadcrumbs } from "@/components/breadcrumbs";
import RichText from "../components/RichText";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("privacyPolicy").catch(() => notFound());

  const {
    data: { pageContent, pageTitle: title },
  } = page;

  return (
    <div className="mb-12 flex w-full flex-col px-3 md:mb-28 md:px-8">
      <div className="mx-auto my-8 flex w-full max-w-[1440px] flex-row gap-8 md:my-12 md:gap-16">
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
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("privacyPolicy").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? " " }],
    },
  };
}
