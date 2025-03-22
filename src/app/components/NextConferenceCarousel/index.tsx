import {
    ArrowRightIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
} from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface ConferenceCard {
    id: number;
    title: string;
    description: string;
    backgroundImage: string;
}

interface CountdownItem {
    value: string;
    label: string;
}

interface ConferenceProps {
    name: string;
    location: string;
    date: string;
    countdown: CountdownItem[];
    cards: ConferenceCard[];
}

const defaultProps: ConferenceProps = {
    name: "155th Congress of Correction",
    location: "Denver, CO",
    date: "Aug 21-26, 2025",
    countdown: [
        { value: "28", label: "Days" },
        { value: "16", label: "Hours" },
        { value: "43", label: "Mins." },
    ],
    cards: [
        {
            id: 1,
            title: "Registration & Housing Are Open",
            description:
                "Lorem ipsum dolor sit amet ipsa quae ab illo inventore veritatis",
            backgroundImage:
                "url(https://images.unsplash.com/photo-1505533321630-975218a5f66f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D)",
        },
        {
            id: 2,
            title: "Blueprint",
            description:
                "Lorem ipsum dolor sit amet ipsa quae ab illo inventore veritatis",
            backgroundImage:
                "url(https://images.unsplash.com/photo-1505533321630-975218a5f66f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D)",
        },
        {
            id: 3,
            title: "Conference Workshops",
            description:
                "Lorem ipsum dolor sit amet ipsa quae ab illo inventore veritatis",
            backgroundImage:
                "url(https://images.unsplash.com/photo-1505533321630-975218a5f66f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D)",
        },
        {
            id: 4,
            title: "Win 2 Tickets to Chris Stapleton",
            description:
                "Lorem ipsum dolor sit amet ipsa quae ab illo inventore veritatis",
            backgroundImage:
                "url(https://images.unsplash.com/photo-1505533321630-975218a5f66f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D)",
        },
        {
            id: 5,
            title: "Meet Your ACA Leadership",
            description:
                "Lorem ipsum dolor sit amet ipsa quae ab illo inventore veritatis",
            backgroundImage:
                "url(https://images.unsplash.com/photo-1505533321630-975218a5f66f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D)",
        },
    ],
};

export const NextConference = ({
    name = defaultProps.name,
    location = defaultProps.location,
    date = defaultProps.date,
    countdown = defaultProps.countdown,
    cards = defaultProps.cards,
}: Partial<ConferenceProps>): React.JSX.Element => {
    return (
        <div className="flex flex-col items-start gap-2.5 px-0 py-12 relative">
            <section className="flex flex-col items-start gap-12 px-19 py-24 relative self-stretch w-full flex-[0_0_auto] [background:linear-gradient(90deg,rgba(12,37,69,1)_0%,rgba(8,27,49,1)_100%)]">
                <div className="flex w-[1360px] items-center gap-6 relative flex-[0_0_auto]">
                    <div className="flex flex-col items-start gap-4 relative flex-1 grow">
                        <div className="flex items-center gap-8 pt-0 pb-4 px-0 relative self-stretch w-full flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] font-tag font-[number:var(--tag-font-weight)] text-blue-50 text-[length:var(--tag-font-size)] tracking-[var(--tag-letter-spacing)] leading-[var(--tag-line-height)] [font-style:var(--tag-font-style)]">
                                OUR NEXT CONFERENCE
                            </div>
                        </div>

                        <h2 className="relative self-stretch font-heading-2 font-[number:var(--heading-2-font-weight)] text-gold-100 text-[length:var(--heading-2-font-size)] tracking-[var(--heading-2-letter-spacing)] leading-[var(--heading-2-line-height)] [font-style:var(--heading-2-font-style)]">
                            {name}
                        </h2>

                        <div className="inline-flex items-center gap-8 relative flex-[0_0_auto]">
                            <div className="relative w-fit mt-[-1.00px] font-body-XL font-[number:var(--body-XL-font-weight)] text-blue-100 text-[length:var(--body-XL-font-size)] tracking-[var(--body-XL-letter-spacing)] leading-[var(--body-XL-line-height)] whitespace-nowrap [font-style:var(--body-XL-font-style)]">
                                {location}
                            </div>

                            <Separator className="relative w-[150px] h-px bg-blue-50 opacity-50" />

                            <div className="relative w-fit mt-[-1.00px] font-body-XL font-[number:var(--body-XL-font-weight)] text-blue-100 text-[length:var(--body-XL-font-size)] tracking-[var(--body-XL-letter-spacing)] leading-[var(--body-XL-line-height)] whitespace-nowrap [font-style:var(--body-XL-font-style)]">
                                {date}
                            </div>
                        </div>
                    </div>

                    <Card className="flex flex-col w-[350px] items-center relative border-0 bg-transparent">
                        <div className="flex h-[122px] items-center justify-between px-12 py-3 relative self-stretch w-full mt-[-1.00px] ml-[-1.00px] mr-[-1.00px] rounded-[8px_8px_0px_0px] overflow-hidden border border-solid border-[#2e3d51] [background:linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0.05)_100%)]">
                            {countdown.map((item, index) => (
                                <React.Fragment key={index}>
                                    <div className="flex flex-col w-[50px] items-center gap-1 relative">
                                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Gill_Sans-Regular',Helvetica] font-normal text-blue-50 text-[50px] tracking-[0] leading-[normal]">
                                            {item.value}
                                        </div>
                                        <div className="relative w-fit [font-family:'Gill_Sans-Regular',Helvetica] font-normal text-white text-lg text-center tracking-[0] leading-[normal] whitespace-nowrap">
                                            {item.label}
                                        </div>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>

                        <Button
                            variant="tertiary"
                            className="flex h-[52px] items-center justify-center gap-4 px-8 py-4 relative self-stretch w-full mb-[-1.00px] ml-[-1.00px] mr-[-1.00px] rounded-[0px_0px_8px_8px] border border-solid border-[#2e3d51] hover:bg-[rgba(255,255,255,0.05)]"
                        >
                            <span className="relative w-fit mt-[-0.50px] [font-family:'Open_Sans',Helvetica] font-normal text-white text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                                View Details
                            </span>
                            <ArrowRightIcon className="relative w-[14.5px] h-[13.5px]" />
                        </Button>
                    </Card>
                </div>

                <div className="relative w-[1360px] h-[350px] overflow-x-auto">
                    <div className="inline-flex items-center gap-8 relative">
                        {cards.map((card) => (
                            <Card
                                key={card.id}
                                className={`flex flex-col w-[340px] h-[350px] items-center justify-end gap-2 p-6 relative rounded-lg overflow-hidden shadow-[0px_4px_48px_#0000001f] [background:linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.75)_100%),${card.backgroundImage}_50%_50%_/_cover]`}
                            >
                                <CardContent className="p-0 w-full">
                                    <h3 className="relative self-stretch [font-family:'Gill_Sans-SemiBold',Helvetica] font-semibold text-white text-[28px] tracking-[0] leading-[normal]">
                                        {card.title}
                                    </h3>
                                    <p className="relative self-stretch font-body font-[number:var(--body-font-weight)] text-white text-[length:var(--body-font-size)] tracking-[var(--body-letter-spacing)] leading-[var(--body-line-height)] [font-style:var(--body-font-style)]">
                                        {card.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                    <Button
                        variant="tertiary"
                        className="inline-flex items-center gap-2 px-7 py-4 relative flex-[0_0_auto] rounded border border-solid border-[#d3f3ff] text-[#d4f3ff] hover:text-[#d4f3ff] hover:bg-transparent"
                    >
                        See Other Conferences
                    </Button>

                    <div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
                        <Button
                            variant="tertiary"
                            className="relative w-[50px] h-[50px] flex items-center justify-center rounded-full border border-solid border-[#d3f3ff] text-[#d4f3ff] hover:bg-transparent"
                        >
                            <ChevronLeftIcon className="h-6 w-6" />
                        </Button>
                        <Button
                            variant="tertiary"
                            className="relative w-[50px] h-[50px] flex items-center justify-center rounded-full border border-solid border-[#d3f3ff] text-[#d4f3ff] hover:bg-transparent"
                        >
                            <ChevronRightIcon className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
};
