import { RightMenu } from "@/components/right-menu";
import { getRightMenuData, RightMenuData } from "../actions/getRightMenuData";

export default async function Page() {
    let rightMenuData: RightMenuData | null = null;

    try {
        rightMenuData = await getRightMenuData("this-is-a-test");
    } catch {
        console.error("error!");
    }

    return (
        <div>
            <RightMenu data={rightMenuData} />
        </div>
    );
}
