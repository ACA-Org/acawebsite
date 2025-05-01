import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { asImageSrc } from "@prismicio/client";
import { createClient } from "@/prismicio";
import { headers } from "next/headers";
import { Breadcrumbs } from "@/components/breadcrumbs";
import PageRichText from "../components/PageRichText";

export default async function Page() {
  const client = createClient();
  const page = await client.getSingle("privacyPolicy").catch(() => notFound());
  const headerList = await headers();
  const pathname = headerList.get("x-current-path");

  const {
    data: { pageContent, pageTitle: title },
  } = page;

  return (
    <div className="w-full flex flex-col mb-28 px-11">
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
          <div className="flex flex-col gap-2">
            <PageRichText content={pageContent} />
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("privacyPolicy").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}
