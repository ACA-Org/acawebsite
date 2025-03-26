"use client";

import { RightMenuData } from "@/app/actions/getRightMenuData";
import { ArrowLeft } from "@/icons/ArrowLeft";
import RightMenuAccordion from "@/slices/RightMenuAccordion";
import RightMenuLinks from "@/slices/RightMenuLinks";
import { useRouter } from "next/navigation";

export const RightMenu = ({ data }: { data: RightMenuData }) => {
    const router = useRouter();
    if (!data) return null;

    const {
        data: { slices, rightMenuHeader },
    } = data;

    return (
        <div className="w-[380px] sticky top-24 max-h-[calc(100dvh-6rem)] overflow-scroll">
            {rightMenuHeader && (
                <div className="w-full h-[60px] border-b border-blue-100 pl-5 pb-5 pt-[18px]">
                    <p className="font-semibold body-xl text-blue-300">
                        {rightMenuHeader}
                    </p>
                </div>
            )}
            <div className="divide-y divide-[#E5E5E5]">
                {slices.map((i, index) => {
                    if (i.slice_type === "right_menu_link") {
                        return (
                            <RightMenuLinks
                                key={`${i.slice_type}-${index}`}
                                slice={i}
                            />
                        );
                    } else if (i.slice_type === "right_menu") {
                        return (
                            <RightMenuAccordion
                                key={`${i.slice_type}-${index}`}
                                slice={i}
                            />
                        );
                    }
                })}
            </div>
            <div
                role="button"
                onClick={() => router.back()}
                className="flex items-center gap-6 self-stretch p-4 group cursor-pointer"
            >
                <ArrowLeft className="w-4 h-[14px] stroke-blue-200" />
                <span className="body-lg text-blue-200 group-hover:underline">
                    Back to Previous Page
                </span>
            </div>
        </div>
    );
};
