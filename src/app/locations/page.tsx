import { Breadcrumbs } from "@/components/breadcrumbs";
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
import RichText from "../components/RichText";

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
  let pageData: LocationsPageDocumentData | null = null;

  pageData = await getLocationsPageData().catch(() => notFound());

  if (!pageData) return notFound();

  const { pageTitle: title, pageImage: img, pageContent } = pageData;

  return (
    <div className="flex w-full flex-col">
      <div className="mx-auto mb-12 flex w-full max-w-[1440px] flex-col px-3 md:mb-28 md:px-8">
        <div className="relative mt-16 flex h-full min-h-[300px] w-full shrink-0 items-end gap-2.5 overflow-clip rounded-2xl p-12">
          {img.url && (
            <>
              <div className="absolute inset-0 z-10 h-full w-full">
                <PrismicNextImage
                  alt=""
                  field={img}
                  className="h-full w-full object-cover"
                />
              </div>
            </>
          )}
        </div>
        <div className="mx-auto my-8 flex w-full flex-col gap-8 md:my-12 md:gap-16">
          <div className="flex w-full flex-col items-start gap-8">
            <div className="flex flex-col gap-8 md:gap-12">
              <Breadcrumbs />
              {title && (
                <h1 className="heading-1 z-20 font-semibold text-blue-300">
                  {title}
                </h1>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <RichText content={pageContent} />
            </div>
          </div>
          <div className="h-[700px] w-full">
            <Suspense fallback={<Map facilities={[]} isLoading={true} />}>
              <Map facilities={data} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
