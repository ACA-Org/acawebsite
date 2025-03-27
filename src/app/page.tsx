import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import IntroContainer from "./components/IntroContainer";
import HeroCarousel from "./components/HeroCarousel";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";
import { NextConference } from "./components/NextConference";
import { getHomePageData } from "./actions/getHomePageData";
import { LinkButton } from "@/components/ui/button";

export default async function Home() {
    const client = createClient();

    const [page, conferenceInfo] = await Promise.all([
        getHomePageData().catch(() => null),
        client.getSingle("nextConferenceSection").catch(() => null),
    ]);

    if (!page) return notFound();

    return (
        <main>
            <section className="flex flex-col items-start justify-center gap-16 pb-12 pt-24">
                <div className="px-19 gap-6 flex flex-col">
                    <h1 className="text-blue-300 text-[52px] leading-[70px]">
                        Strengthening Corrections,
                        <br />
                        <span className="text-blue-200">
                            Enhancing Communities
                        </span>
                    </h1>
                    {page.heroSubTitle && (
                        <p className="body-md text-gray-100 max-w-[800px]">
                            {page.heroSubTitle}
                        </p>
                    )}
                    {page.heroAction && (
                        <LinkButton className="w-fit" field={page.heroAction}>
                            {page.heroAction.text}
                        </LinkButton>
                    )}
                </div>
                <HeroCarousel slides={page?.heroCarouselData} />
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
                                <div className="px-12 py-8 overflow-clip">
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
