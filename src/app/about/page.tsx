import { RightMenu } from "@/components/right-menu";
import { getRightMenuData, RightMenuData } from "../actions/getRightMenuData";

export default async function Page() {
    let rightMenuData: RightMenuData | null = null;

    try {
        rightMenuData = await getRightMenuData("about");
    } catch {
        console.error("error!");
    }
    return (
        <div className="w-full">
            <div className="mt-16 flex w-full min-h-[650px] items-end gap-2.5 shrink-0 [background:#DCDCDC] p-12 rounded-2xl" />
            <div className="w-full flex flex-row">
                <div className="w-fit ml-auto">
                    <RightMenu data={rightMenuData} />
                </div>
            </div>
        </div>
    );
}
