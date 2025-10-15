import { RightMenu } from "@/components/right-menu";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import { DynamicImage } from "@/components/image";
import {
  getTierTwoPageData,
  TierTwoPageData,
} from "@/app/actions/getTierPageData";
import { components } from "@/slices";
import RichText from "@/app/components/RichText";
import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { asImageSrc } from "@prismicio/client";
import BreadcrumbsLoading from "@/components/breadcrumbs/loading";
import { Suspense } from "react";
import {
  getRightMenuData,
  RightMenuData,
} from "@/app/actions/getRightMenuData";
import { cn, Params } from "@/lib/utils";
import { BackButton } from "@/components/back-button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Unauthenticated from "@/app/components/Unauthenticated";

export const dynamic = "force-dynamic";

export default async function Page({ params }: { params: Promise<Params> }) {
  const { tier_two_uid: uid_2 } = await params;

  let rightMenuData: RightMenuData | null = null;

  let pageData: TierTwoPageData = null;

  pageData = await getTierTwoPageData(uid_2).catch(() => notFound());

  if (!pageData) return notFound();

  const {
    data: {
      pageTextContent: pageContent,
      pageTitle: title,
      pageImage: img,
      pageSubTitle: subTitle,
      slices,
      slices2: postArticleSlices,
      requiresAuth,
    },
  } = pageData;

  if (requiresAuth) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return <Unauthenticated />;
    }
  }

  try {
    rightMenuData = await getRightMenuData(uid_2, "two");
  } catch {
    console.error("error!");
  }

  return (
    <div className="mx-auto mb-12 flex w-full max-w-[1440px] flex-col px-5 md:mb-28 md:px-8">
      {img.url && (
        <div className="relative mt-12 flex w-full shrink-0 items-end gap-2 overflow-clip rounded-[12px] p-8 max-lg:aspect-video md:mt-16 md:gap-2.5 md:p-12 lg:min-h-[415px]">
          <div className="absolute inset-0 z-10 h-full w-full">
            <DynamicImage field={img} className="h-full w-full object-cover" />
          </div>
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
          <BackButton />
          {title && (
            <h1 className="heading-1 z-20 text-[52px] leading-[70px] font-semibold text-blue-300 max-lg:text-[38px] max-lg:leading-[50px]">
              {title}
            </h1>
          )}
          {subTitle && <span className="body-xl">{subTitle}</span>}
        </div>
      </div>
      <div className="pl-body my-8 flex flex-row gap-8 max-md:flex-col-reverse md:my-12 md:gap-16">
        <div
          className={cn(
            "flex flex-col items-start gap-8 max-md:w-full md:gap-12",
            rightMenuData && "w-3/4 max-lg:w-2/3"
          )}
        >
          {pageContent && pageContent.length > 0 && (
            <div>
              <RichText content={pageContent} />
            </div>
          )}
          <SliceZone slices={slices} components={components} />
        </div>

        {rightMenuData && (
          <div className="ml-auto w-1/4 max-lg:w-1/3 max-md:w-full">
            <RightMenu
              items={rightMenuData}
              rightMenuHeader="In This Section"
            />
          </div>
        )}
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
  const { tier_two_uid } = await params;
  const client = createClient();
  const page = await client
    .getByUID("tierTwoPage", tier_two_uid)
    .catch(() => notFound());

  const {
    data: { requiresAuth },
  } = page;

  // Base metadata
  const baseMetadata: Metadata = {
    title: page.data.meta_title || `ACA - ${page.data.pageTitle}`,
    description: page.data.meta_description,
    openGraph: {
      images: [
        {
          url:
            asImageSrc(page.data.meta_image) ??
            "https://images.prismic.io/acawebsite/Z_vG-uvxEdbNO-jG_aca-og.png?auto=format,compress",
        },
      ],
    },
  };

  // If page requires authentication, implement SEO restrictions
  if (requiresAuth) {
    return {
      ...baseMetadata,
      // Prevent search engines from indexing authenticated content
      robots: {
        index: false,
        follow: false,
        nocache: true,
        nosnippet: true,
        noimageindex: true,
      },
      // Remove Open Graph data for protected content
      openGraph: undefined,
      // Optional: Modify description to indicate authentication required
      description: page.data.meta_description
        ? `${page.data.meta_description} (Authentication required)`
        : "This content requires authentication to view.",
    };
  }

  // For public pages, include full metadata
  return {
    ...baseMetadata,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
