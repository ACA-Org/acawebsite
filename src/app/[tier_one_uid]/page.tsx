import { RightMenu } from "@/components/right-menu";
import { getRightMenuData, RightMenuData } from "../actions/getRightMenuData";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { headers } from "next/headers";
import { SliceZone } from "@prismicio/react";
import {
  getTierOnePageData,
  TierOnePageData,
} from "../actions/getTierPageData";
import { notFound } from "next/navigation";
import { PrismicNextImage } from "@prismicio/next";
import { components } from "@/slices";
import PageRichText from "../components/PageRichText";
import { Metadata } from "next/types";
import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";

type Params = { tier_one_uid: string };

export default async function Page({ params }: { params: Promise<Params> }) {
  const { tier_one_uid } = await params;
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  let rightMenuData: RightMenuData | null = null;
  let pageData: TierOnePageData = null;

  pageData = await getTierOnePageData(tier_one_uid).catch((err) => {
    console.error(err);
    return notFound();
  });

  if (!pageData) return notFound();

  try {
    rightMenuData = await getRightMenuData(tier_one_uid);
  } catch (err) {
    console.error("error!");
    console.error(err);
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
    <div className="w-full flex flex-col mb-28 px-11">
      <div className="relative mt-16 flex w-full h-full min-h-[585px] items-end gap-2.5 shrink-0 rounded-[12px] overflow-clip p-12">
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
          <div>
            <PageRichText content={pageContent} />
          </div>

          <SliceZone slices={slices} components={components} />
        </div>
        {rightMenuData && (
          <div className="w-fit ml-auto">
            <RightMenu
              items={rightMenuData}
              rightMenuHeader="In This Section"
            />
          </div>
        )}
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
  const { tier_one_uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("tierOnePage", tier_one_uid)
    .catch(() => notFound());

  return {
    title: page.data.meta_title,
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
