import { createClient } from "@/prismicio";
import HeroCarouselSlide from "./components/HeroCarousel/HeroCarouselSlide";
import { notFound } from "next/navigation";
import { IntroContainer } from "./components/IntroContainer";

export default async function Home() {
    const client = createClient();
    const page = await client.getSingle("homepage").catch(() => notFound());

    const { data } = page;
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                {data.heroCarouselData.map((item, index) => (
                    <HeroCarouselSlide key={index} {...item} />
                ))}

                <IntroContainer
                    introImages={data.introImages}
                    introAction={data.introAction}
                    introHeader={data.introHeader}
                    introDescription={data.introDescription}
                />
            </main>
        </div>
    );
}
