import { createClient } from "@/prismicio";
import { notFound } from "next/navigation";
import IntroContainer from "./components/IntroContainer";
import HeroCarousel from "./components/HeroCarousel";
import { components } from "@/slices";
import { SliceZone } from "@prismicio/react";

export default async function Home() {
    const client = createClient();
    const page = await client.getSingle("homepage").catch(() => notFound());

    const { data } = page;

    return (
        <div className="">
            <main>
                <div className="min-h-[650px] flex items-center justify-center">
                    <HeroCarousel slides={data.heroCarouselData} />
                </div>
                <IntroContainer
                    introImages={data.introImages}
                    introAction={data.introAction}
                    introHeader={data.introHeader}
                    introDescription={data.introDescription}
                />
                <div className="flex flex-col gap-32">
                    <SliceZone
                        slices={page.data.slices}
                        components={components}
                    />
                </div>
            </main>
        </div>
    );
}
