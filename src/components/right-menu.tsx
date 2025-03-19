import { RightMenuData } from "@/app/actions/getRightMenuData";
import RightMenuAccordion from "@/slices/RightMenuAccordion";
import RightMenuLinks from "@/slices/RightMenuLinks";

export const RightMenu = ({ data }: { data: RightMenuData }) => {
    if (!data) return null;

    const {
        data: { slices, rightMenuHeader },
    } = data;

    return (
        <div className="w-[380px]">
            {rightMenuHeader && (
                <div className="w-full h-[60px] border-b border-[#E5E5E5] pl-5 pb-5 pt-[18px]">
                    <p className="font-semibold">{rightMenuHeader}</p>
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
        </div>
    );
};
