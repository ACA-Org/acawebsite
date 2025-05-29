import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import IntroContainer from "./components/IntroContainer";
import HeroCarousel from "./components/HeroCarousel";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { NextConference } from "./components/NextConference";
import { getHomePageData } from "./actions/getHomePageData";
import { LinkButton } from "@/components/ui/button";
import { Metadata } from "next";
import { asImageSrc } from "@prismicio/client";
import { ACAFullLogoColor } from "@/logos/ACAFullLogoColor";

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();
  const page = await client.getSingle("homepage").catch(() => notFound());

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    openGraph: {
      images: [{ url: asImageSrc(page.data.meta_image) ?? "" }],
    },
  };
}

export default async function Home() {
  const client = createClient();

  const [page, conferenceInfo] = await Promise.all([
    getHomePageData().catch(() => null),
    client.getSingle("nextConferenceSection").catch(() => null),
  ]);

  if (!page) return notFound();

  return (
    <main>
      <section className="">
        <div className="flex flex-col items-start justify-center gap-16 pb-16">
          <div className="flex w-full items-center gap-8 lg:pt-12">
            <div className="mx-auto w-full max-w-[1440px] px-4 pt-12 md:px-8 lg:pt-24">
              <div className="flex items-center justify-between gap-8 max-lg:flex-col-reverse max-lg:items-start lg:gap-16">
                <div className="flex w-full flex-col gap-6 lg:w-1/2">
                  <h1 className="text-[52px] leading-[70px] text-blue-300 max-lg:text-[38px] max-lg:leading-[50px]">
                    Strengthening Corrections,
                    <br />
                    <span className="text-blue-200">Enhancing Communities</span>
                  </h1>
                  {page.heroSubTitle && (
                    <p className="body-md text-gray-100">{page.heroSubTitle}</p>
                  )}
                  {page.heroAction && (
                    <LinkButton className="w-fit" field={page.heroAction}>
                      {page.heroAction.text}
                    </LinkButton>
                  )}
                </div>

                <ACAFullLogoColor className="h-auto w-full flex-1 max-lg:w-1/2" />
              </div>
            </div>
          </div>
          <HeroCarousel slides={page?.heroCarouselData} />
        </div>
      </section>

      {conferenceInfo && <NextConference {...conferenceInfo.data} />}

      <IntroContainer
        introImages={page?.introImageTile}
        introAction={page?.introAction}
        introHeader={page?.introHeader}
        introDescription={page?.introDescription}
      />
      <div className="flex flex-col">
        <SliceZone
          slices={page?.slices}
          components={Object.fromEntries(
            Object.entries(components).map(([key, Component]) => [
              key,
              (props) => (
                <div className="overflow-clip">
                  <Component {...props} />
                </div>
              ),
            ])
          )}
        />
      </div>
    </main>
  );
}
