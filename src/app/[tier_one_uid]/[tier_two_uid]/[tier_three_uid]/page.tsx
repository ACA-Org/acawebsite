"use server";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import { PrismicNextImage } from "@prismicio/next";
import {
  getTierThreePageData,
  TierThreePageData,
} from "@/app/actions/getTierPageData";
import { components } from "@/slices";
import RichText from "@/app/components/RichText";
import { Metadata } from "next/types";
import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";
import BreadcrumbsLoading from "@/components/breadcrumbs/loading";
import { Suspense } from "react";
import { cn } from "@/lib/utils";

type Params = {
  tier_one_uid: string;
  tier_two_uid: string;
  tier_three_uid: string;
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { tier_three_uid: uid_3 } = await params;

  let pageData: TierThreePageData = null;

  pageData = await getTierThreePageData(uid_3).catch(() => notFound());

  if (!pageData) return notFound();

  const {
    data: {
      pageContent,
      pageTitle: title,
      pageSubTitle: subTitle,
      pageImage: img,
      slices,
      slices2: postArticleSlices,
    },
  } = pageData;
  return (
    <div className="mx-auto mb-12 flex w-full max-w-[1440px] flex-col px-3 md:mb-28 md:px-8">
      {img.url && (
        <div className="relative mt-12 flex h-full min-h-[300px] w-full shrink-0 items-end gap-2 overflow-clip rounded-[12px] p-8 md:mt-16 md:gap-2.5 md:p-12">
          <>
            <div className="absolute inset-0 z-10 h-full w-full">
              <PrismicNextImage
                alt=""
                field={img}
                className="h-full w-full object-cover"
              />
            </div>
          </>
        </div>
      )}
      <div
        className={cn(
          "mx-auto mt-8 w-full max-w-[1440px] md:mt-12",
          !img.url && "mt-12 md:mt-16"
        )}
      >
        <div className="flex flex-col gap-8 md:gap-12">
          <Suspense fallback={<BreadcrumbsLoading />}>
            <Breadcrumbs />
          </Suspense>
          {title && (
            <h1 className="heading-1 z-20 font-semibold text-blue-300">
              {title}
            </h1>
          )}
          {subTitle && <span className="body-xl font-light">{subTitle}</span>}
        </div>
      </div>
      <div className="pl-body mx-auto my-8 flex w-full flex-row gap-8 max-md:flex-col-reverse md:my-12 md:gap-16">
        <div className={"flex w-full flex-col items-start gap-8 md:gap-12"}>
          {pageContent && pageContent.length > 0 && (
            <div>
              <RichText content={pageContent} />
            </div>
          )}

          <SliceZone slices={slices} components={components} />
        </div>
      </div>
      {postArticleSlices?.length > 0 && (
        <div className="pl-full flex flex-col items-start gap-8 max-md:w-full md:gap-12">
          <SliceZone slices={postArticleSlices} components={components} />
        </div>
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
  const pages = await client.getAllByType("tierThreePage");

  return pages.map((page) => ({ uid: page.uid }));
}
