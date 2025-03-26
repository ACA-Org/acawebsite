import { RightMenu } from "@/components/right-menu";
import { getRightMenuData, RightMenuData } from "../actions/getRightMenuData";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { headers } from "next/headers";
import { PrismicRichText, SliceZone } from "@prismicio/react";
import {
    getTierOnePageData,
    TierOnePageData,
} from "../actions/getTierPageData";
import { notFound } from "next/navigation";
import { PrismicNextImage } from "@prismicio/next";
import SpeedBump from "@/slices/SpeedBump";
import SocialCarousel from "@/slices/SocialCarousel";

export default async function Page({
    params,
}: {
    params: Promise<{ uid_1: string }>;
}) {
    const { uid_1 } = await params;
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");

    let rightMenuData: RightMenuData | null = null;
    let pageData: TierOnePageData = null;

    pageData = await getTierOnePageData(uid_1).catch(() => notFound());

    if (!pageData) return notFound();

    try {
        rightMenuData = await getRightMenuData("about");
    } catch {
        console.error("error!");
    }

    const {
        data: {
            pageTextContent: rtContent,
            pageTitle: title,
            pageImage: img,
            slices,
            slices2: postArticleSlices,
        },
    } = pageData;

    return (
        <div className="w-full flex flex-col mb-28 px-11">
            <div className="relative mt-16 flex w-full h-full min-h-[585px] items-end gap-2.5 shrink-0 rounded-2xl overflow-clip p-12">
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
                        <PrismicRichText
                            field={rtContent}
                            components={{
                                heading1: ({ children }) => (
                                    <h1 className="heading-1">{children}</h1>
                                ),
                                heading2: ({ children }) => (
                                    <h2 className="heading-2 text-blue-200">
                                        {children}
                                    </h2>
                                ),
                                heading3: ({ children }) => (
                                    <h3 className="heading-3">{children}</h3>
                                ),
                                heading4: ({ children }) => (
                                    <h4 className="heading-4">{children}</h4>
                                ),
                                heading5: ({ children }) => (
                                    <h5 className="heading-5">{children}</h5>
                                ),
                                heading6: ({ children }) => (
                                    <h6 className="heading-6">{children}</h6>
                                ),
                                paragraph: ({ children }) => (
                                    <p className="body-md text-gray-100">
                                        {children}
                                    </p>
                                ),

                                hyperlink: ({ node, children }) => {
                                    if (node.data.link_type === "Web") {
                                        return (
                                            <a
                                                href={node.data.url}
                                                target={node.data.target}
                                                className="text-blue-200 underline hover:text-blue-300 visited:text-blue-400"
                                            >
                                                {children}
                                            </a>
                                        );
                                    }
                                },
                            }}
                        />
                    </div>

                    <SliceZone
                        slices={slices}
                        components={{
                            speedBump: ({ slice, ...props }) => (
                                <div className="mt-12">
                                    <SpeedBump slice={slice} {...props} />
                                </div>
                            ),
                        }}
                    />
                </div>
                {rightMenuData && (
                    <div className="w-fit ml-auto">
                        <RightMenu data={rightMenuData} />
                    </div>
                )}
            </div>
            {postArticleSlices?.length > 0 && (
                <SliceZone
                    slices={postArticleSlices}
                    components={{
                        social_carousel: ({ slice, ...props }) => (
                            <SocialCarousel slice={slice} {...props} />
                        ),
                    }}
                />
            )}
        </div>
    );
}
