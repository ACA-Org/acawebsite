import { RightMenu } from "@/components/right-menu";
import {
    getRightMenuData,
    RightMenuData,
} from "../../actions/getRightMenuData";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { headers } from "next/headers";
import { SliceZone } from "@prismicio/react";
import { notFound } from "next/navigation";
import { PrismicNextImage } from "@prismicio/next";
import {
    getTierTwoPageData,
    TierTwoPageData,
} from "@/app/actions/getTierPageData";
import { components } from "@/slices";
import PageRichText from "@/app/components/PageRichText";

export default async function Page({
    params,
}: {
    params: Promise<{ tier_one_uid: string; tier_two_uid: string }>;
}) {
    const { tier_two_uid: uid_2 } = await params;
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");

    let rightMenuData: RightMenuData | null = null;
    let pageData: TierTwoPageData = null;

    pageData = await getTierTwoPageData(uid_2).catch(() => notFound());

    if (!pageData) return notFound();

    console.log(pageData);

    try {
        rightMenuData = await getRightMenuData("about");
    } catch {
        console.error("error!");
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
        <div className="w-full flex flex-col">
            <div className="w-full flex flex-col px-11 mb-28">
                <div className="relative mt-16 flex w-full h-full min-h-[415px] items-end gap-2.5 shrink-0 rounded-2xl overflow-clip p-12">
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
                    <div className="w-fit ml-auto">
                        <RightMenu data={rightMenuData} />
                    </div>
                </div>
            </div>
            {postArticleSlices?.length > 0 && (
                <SliceZone slices={postArticleSlices} components={components} />
            )}
        </div>
    );
}
