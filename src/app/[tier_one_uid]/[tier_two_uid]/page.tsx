"use server";

import { RightMenu } from "@/components/right-menu";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import { PrismicNextImage } from "@prismicio/next";
import {
  getTierTwoPageData,
  TierTwoPageData,
} from "@/app/actions/getTierPageData";
import { components } from "@/slices";
import PageRichText from "@/app/components/PageRichText";
import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";
import BreadcrumbsLoading from "@/components/breadcrumbs/loading";
import { Suspense } from "react";
import {
  getRightMenuData,
  RightMenuData,
} from "@/app/actions/getRightMenuData";
import { cn } from "@/lib/utils";

type Params = { tier_one_uid: string; tier_two_uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { tier_two_uid: uid_2 } = await params;

  let rightMenuData: RightMenuData | null = null;

  let pageData: TierTwoPageData = null;

  pageData = await getTierTwoPageData(uid_2).catch(() => notFound());

  if (!pageData) return notFound();

  try {
    rightMenuData = await getRightMenuData(uid_2, "two");
    console.log("rightMenuData", rightMenuData);
  } catch {
    console.error("error!");
  }

  const {
    data: {
      pageTextContent: pageContent,
      pageTitle: title,
      pageImage: img,
      slices,
      slices2: postArticleSlices,
    },
  } = pageData;

  return (
    <div className="mx-auto mb-28 flex w-full max-w-[1440px] flex-col px-4 md:px-8">
      {img.url && (
        <div className="relative mt-16 flex h-full min-h-[415px] w-full shrink-0 items-end gap-2.5 overflow-clip rounded-[12px] p-12">
          <>
            <div className="absolute inset-0 z-10 h-full w-full">
              <PrismicNextImage
                field={img}
                className="h-full w-full object-cover"
              />
            </div>
          </>
        </div>
      )}
      <div
        className={cn(
          "mx-auto mt-12 w-full max-w-[1440px]",
          !img.url && "mt-16"
        )}
      >
        <div className="flex flex-col gap-12">
          <Suspense fallback={<BreadcrumbsLoading />}>
            <Breadcrumbs />
          </Suspense>
          {title && (
            <h1 className="heading-1 z-20 font-semibold text-blue-300">
              {title}
            </h1>
          )}
        </div>
      </div>
      <div className="pl-body my-12 flex flex-row gap-16 max-md:flex-col-reverse">
        <div
          className={cn(
            "flex w-full flex-col items-start gap-12",
            rightMenuData && "w-3/4 max-lg:w-2/3"
          )}
        >
          {pageContent && (
            <div>
              <PageRichText content={pageContent} />
            </div>
          )}
          <SliceZone slices={slices} components={components} />
        </div>

        {rightMenuData && (
          <div className="ml-auto w-fit">
            <RightMenu
              items={rightMenuData}
              rightMenuHeader="In This Section"
            />
          </div>
        )}
      </div>
      {postArticleSlices?.length > 0 && (
        <div className="pl-full">
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
  const { tier_two_uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("tierTwoPage", tier_two_uid)
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
