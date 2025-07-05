import { getNewsletterPageInfo } from "@/app/actions/getNewslettersPageData";
import { NewsletterGrid } from "./components/NewsletterGrid";
import { Metadata } from "next";
import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Unauthenticated from "../components/Unauthenticated";
import RichText from "../components/RichText";

export default async function NewsletterSearchPage() {
  const data = await getNewsletterPageInfo();

  const { pageTitle, pageContent, newsletterCards, requiresAuth } = data;

  if (requiresAuth) {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return <Unauthenticated />;
    }
  }

  return (
    <div className="flex w-full flex-col">
      <div className="mx-auto mb-12 flex w-full max-w-[1440px] flex-col px-5 md:mb-28 md:px-8">
        <div>
          <div className="my-8 flex flex-row gap-8 md:my-12 md:gap-16">
            <div className="flex w-full flex-col items-start gap-8">
              <div className="mt-4 flex flex-col gap-8 md:gap-12">
                <div className="space-y-4">
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

          <NewsletterGrid newsletters={newsletterCards} />
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

