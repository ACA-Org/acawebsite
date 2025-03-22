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
                    <p className="leading-7 text-[#808080] max-w-[900px]">
                        Sed ut perspiciatis unde omnis iste natus error sit
                        voluptatem accusantium doloremque laudantium, totam rem
                        aperiam, eaque ipsa quae ab illo inventore veritatis et
                        quasi architecto beatae
                    </p>
                </div>
                <HeroCarousel slides={data.heroCarouselData} />
            </section>
            <IntroContainer
                introImages={data.introImageTile}
                introAction={data.introAction}
                introHeader={data.introHeader}
                introDescription={data.introDescription}
            />
            <div className="flex flex-col gap-32">
                <SliceZone slices={page.data.slices} components={components} />
            </div>
        </main>
    );
}
