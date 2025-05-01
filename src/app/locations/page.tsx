import { Breadcrumbs } from "@/components/breadcrumbs";
import { headers } from "next/headers";
import { ContactPageDocumentData } from "../../../prismicio-types";
import { getContactPage } from "../actions/getContactPageData";
import { notFound } from "next/navigation";
import { PrismicNextImage } from "@prismicio/next";
import Map from "@/components/interactive-map";
import { Metadata } from "next/types";
import { asImageSrc } from "@prismicio/client";
import { createClient } from "@/prismicio";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("locationsPage").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
export default async function Page() {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  let pageData: ContactPageDocumentData | null = null;

  pageData = await getContactPage().catch(() => notFound());

  if (!pageData) return notFound();

  const { pageTitle: title, pageImage: img } = pageData;

  return (
    <div className="flex w-full flex-col">
      <div className="mb-28 flex w-full flex-col px-11">
        <div className="relative mt-16 flex h-full min-h-[300px] w-full shrink-0 items-end gap-2.5 overflow-clip rounded-2xl p-12">
          {img && (
            <>
              <div className="absolute inset-0 z-10 h-full w-full">
                <PrismicNextImage
                  field={img}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-[rgba(32,32,32,0)] via-transparent via-10% to-[#0F0F0F]" />
              </div>
            </>
          )}
        </div>
        <div>
          <div className="flex w-full flex-col items-start gap-12 px-8">
            <div className="flex flex-col gap-12">
              {pathname && <Breadcrumbs path={pathname} />}
              {title && (
                <h1 className="heading-1 z-20 font-semibold text-blue-200">
                  Locations
                </h1>
              )}
            </div>
            <div className="min-h-screen w-full">
              <Map />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
