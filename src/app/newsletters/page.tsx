import { getNewsletterPageInfo } from "@/app/actions/getNewslettersPageData";
import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Unauthenticated from "../components/Unauthenticated";
import RichText from "../components/RichText";
import type { Newsletter } from "./components/types";
import NewsletterSearchClient from "./components/NewsletterSearchClient";
import { DynamicImage } from "@/components/image";
import type { ImageField } from "@prismicio/client";

export default async function NewsletterSearchPage() {
  return notFound();
  const data = await getNewsletterPageInfo();

  const {
    pageTitle,
    pageContent,
    newsletterCards,
    requiresAuth,
    newsletterBanner,
  }: {
    pageTitle: string | null;
    pageContent: any;
    newsletterCards: Newsletter[];
    requiresAuth: boolean;
    newsletterBanner: ImageField<never> | null;
  } = data;

  if (requiresAuth) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return <Unauthenticated />;
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mx-auto mb-12 flex w-full max-w-[1440px] flex-col px-5 md:mb-28 md:px-8">
        <div>
          <div className="my-8 flex flex-row gap-8 md:my-12 md:gap-16">
            <div className="flex w-full flex-col items-start gap-8">
              <div className="mt-4 flex w-full flex-col gap-8 md:gap-12">
                {newsletterBanner && (
                  <div className="relative mt-8 flex w-full shrink-0 items-end overflow-clip rounded-[12px] p-8 max-lg:aspect-video md:mt-8 lg:min-h-[415px]">
                    <div className="absolute inset-0 z-10 h-full w-full">
                      <DynamicImage
                        alt=""
                        field={newsletterBanner}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                )}
                <div className="">
                  {pageTitle && (
                    <h1 className="heading-1 z-20 text-[52px] leading-[70px] font-semibold text-blue-300 max-lg:text-[38px] max-lg:leading-[50px]">
                      {pageTitle}
                    </h1>
                  )}
                  {pageContent && <RichText content={pageContent} />}
                </div>
              </div>
            </div>
          </div>

          <NewsletterSearchClient newsletters={newsletterCards} />
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("newsletterPage").catch(() => notFound());

  return {
    title: page.data.meta_title || `ACA - ${page.data.pageTitle}`,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
