"use server";

import { Breadcrumbs } from "@/components/breadcrumbs";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import {
  getTierFourPageData,
  TierFourPageData,
} from "@/app/actions/getTierPageData";
import { components } from "@/slices";
import RichText from "@/app/components/RichText";
import { Metadata } from "next/types";
import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";
import BreadcrumbsLoading from "@/components/breadcrumbs/loading";
import { Suspense } from "react";
import { BackButton } from "@/components/back-button";

type Params = {
  tier_one_uid: string;
  tier_two_uid: string;
  tier_three_uid: string;
  tier_four_uid: string;
};

export default async function Page({ params }: { params: Promise<Params> }) {
  const { tier_four_uid: uid_4 } = await params;

  let pageData: TierFourPageData = null;

  pageData = await getTierFourPageData(uid_4).catch(() => notFound());

  if (!pageData) return notFound();

  const {
    data: {
      pageContent,
      pageTitle: title,
      pageSubTitle: subTitle,

      slices,
      slices2: postArticleSlices,
    },
  } = pageData;
  return (
    <div className="mx-auto mb-12 flex w-full max-w-[1440px] flex-col px-3 md:mb-28 md:px-8">
      <div className={"mx-auto mt-16 w-full max-w-[1440px]"}>
        <div className="flex flex-col gap-8 md:gap-12">
          <Suspense fallback={<BreadcrumbsLoading />}>
            <Breadcrumbs />
          </Suspense>
          <BackButton />
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
  const { tier_four_uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("tierFourPage", tier_four_uid)
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
  const pages = await client.getAllByType("tierFourPage");

  return pages.map((page) => ({ uid: page.uid }));
}
