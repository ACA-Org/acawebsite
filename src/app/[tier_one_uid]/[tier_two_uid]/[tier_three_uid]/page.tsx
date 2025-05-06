import { Breadcrumbs } from "@/components/breadcrumbs";
import { headers } from "next/headers";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import { PrismicNextImage } from "@prismicio/next";
import {
  getTierThreePageData,
  TierThreePageData,
} from "@/app/actions/getTierPageData";
import { components } from "@/slices";
import PageRichText from "@/app/components/PageRichText";
import { Metadata } from "next/types";
import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";

type Params = {
  tier_one_uid: string;
  tier_two_uid: string;
  tier_three_uid: string;
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { tier_three_uid: uid_3 } = await params;
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  let pageData: TierThreePageData = null;

  pageData = await getTierThreePageData(uid_3).catch(() => notFound());

  if (!pageData) return notFound();

  const {
    data: {
      pageContent,
      pageTitle: title,
      pageImage: img,
      slices,
      slices2: postArticleSlices,
    },
  } = pageData;
  return (
    <div className="flex w-full flex-col">
      <div className="mx-auto mb-28 flex w-full max-w-[1440px] flex-col px-4 md:px-8">
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
        <div className="my-12 flex flex-row gap-16">
          <div className="flex w-full flex-col items-start gap-12 max-md:gap-8">
            <div className="flex flex-col gap-12">
              {pathname && <Breadcrumbs path={pathname} />}
              {title && (
                <h1 className="heading-1 z-20 font-semibold text-blue-300">
                  {title}
                </h1>
              )}
            </div>
            <div>
              <PageRichText content={pageContent} />
            </div>

            <SliceZone slices={slices} components={components} />
          </div>
        </div>
      </div>
      {postArticleSlices?.length > 0 && (
        <SliceZone slices={postArticleSlices} components={components} />
      )}
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tier_three_uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("tierThreePage", tier_three_uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title || `ACA - ${page.data.pageTitle}`,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export async function generateStaticParams() {
  const client = createClient();
  const pages = await client.getAllByType("tierOnePage");

  return pages.map((page) => ({ uid: page.uid }));
}
