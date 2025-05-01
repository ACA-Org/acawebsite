import { Breadcrumbs } from "@/components/breadcrumbs";
import { headers } from "next/headers";
import { LocationsPageDocumentData } from "../../../prismicio-types";
import { notFound } from "next/navigation";
import { PrismicNextImage } from "@prismicio/next";
import Map from "@/components/interactive-map";
import { Metadata } from "next/types";
import { asImageSrc } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { Suspense } from "react";
import data from "./data/facilities";
import { getLocationsPageData } from "../actions/getLocationsPageData";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("locationsPage").catch(() => notFound());

  return {
    title: page.data.meta_title || `ACA - ${page.data.pageTitle}`,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export default async function Page() {
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  let pageData: LocationsPageDocumentData | null = null;

  pageData = await getLocationsPageData().catch(() => notFound());

  if (!pageData) return notFound();

  const { pageTitle: title, pageImage: img } = pageData;

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-col px-11 mb-28">
        <div className="relative mt-16 flex w-full h-full min-h-[300px] items-end gap-2.5 shrink-0 rounded-2xl overflow-clip p-12">
          {img && (
            <>
              <div className="absolute inset-0 w-full h-full z-10">
                <PrismicNextImage
                  field={img}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-bl from-[rgba(32,32,32,0)] via-10% via-transparent  to-[#0F0F0F]" />
              </div>
            </>
          )}
        </div>
        <div className="flex flex-row gap-16 my-12">
          <div className="flex w-full flex-col items-start gap-12 px-8">
            <div className="flex flex-col gap-12">
              {pathname && <Breadcrumbs path={pathname} />}
              {title && (
                <h1 className="heading-1 font-semibold z-20 text-blue-200">
                  {title}
                </h1>
              )}
            </div>
            <div className="w-full h-[700px]">
              <Suspense fallback={<Map facilities={[]} isLoading={true} />}>
                <Map facilities={data} />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
