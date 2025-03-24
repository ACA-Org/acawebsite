import { RightMenu } from "@/components/right-menu";
import {
    getRightMenuData,
    RightMenuData,
} from "../../actions/getRightMenuData";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { headers } from "next/headers";

export default async function Page({
    params,
}: {
    params: Promise<{ uid_1: string; uid_2: string }>;
}) {
    console.log({ params: await params });
    const headerList = await headers();
    const pathname = headerList.get("x-current-path");

    let rightMenuData: RightMenuData | null = null;

    try {
        rightMenuData = await getRightMenuData("about");
    } catch {
        console.error("error!");
    }
    return (
        <div className="w-full flex flex-col mb-28">
            <div className="mt-16 flex w-full min-h-[650px] items-end gap-2.5 shrink-0 [background:#DCDCDC] rounded-2xl" />
            <div className="mt-12 flex w-full flex-col items-start gap-16 px-8">
                {pathname && <Breadcrumbs path={pathname} />}
                <h2 className="heading-2">Message from the Durrrector</h2>
                <div className="w-full flex flex-row gap-16">
                    <div>
                        <p className="body-lg">
                            Dear Valued Members and Colleagues of the American
                            Correctional Association,
                            <br />
                            <br />
                            I would like to extend my heartfelt gratitude to
                            each of you for your participation in our 2025
                            Winter Conference in Orlando, Florida. Your presence
                            and insightful contributions made the event a
                            resounding success, helping us promote the vital
                            discussions that are powering our profession
                            forward. <br />
                            <br />
                            As we continue to navigate the challenges and
                            opportunities within the correctional field, I am
                            excited to invite you to join us for the 155th
                            Congress of Correction in Denver, Colorado. This
                            extraordinary event promises to be a landmark
                            occasion, featuring renowned speakers, engaging
                            workshops and invaluable networking opportunities
                            that will enhance our collective expertise and drive
                            correctional excellence.
                            <br />
                            <br />
                            Mark your calendars for August 21-26, and prepare to
                            be inspired and informed as we come together to
                            share knowledge and advance our profession. The
                            Congress will provide a platform for collaboration,
                            innovation and the exchange of exemplary practices
                            that are crucial for shaping the future of
                            corrections.
                            <br />
                            <br />
                            Thank you once again for your continued support and
                            dedication to the American Correctional Association.
                            We look forward to seeing you in Denver for an
                            unforgettable experience!
                            <br />
                            <br />
                            <br />
                            Warmest regards, <br />
                            <br />
                            Robert Green Executive Director
                        </p>
                    </div>
                    <div className="w-fit ml-auto">
                        <RightMenu data={rightMenuData} />
                    </div>
                </div>
            </div>
        </div>
    );
}
