"use client";

import React, { useState, useEffect } from "react";

interface TimeUnit {
    value: string;
    label: string;
}

interface CountdownTimerProps {
    targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
    const [timeUnits, setTimeUnits] = useState<TimeUnit[]>([]);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = targetDate.getTime() - new Date().getTime();

            if (difference <= 0) {
                return [
                    { value: "00", label: "Days" },
                    { value: "00", label: "Hours" },
                    { value: "00", label: "Minutes" },
                ];
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);

            return [
                { value: days.toString().padStart(2, "0"), label: "Days" },
                { value: hours.toString().padStart(2, "0"), label: "Hours" },
                {
                    value: minutes.toString().padStart(2, "0"),
                    label: "Minutes",
                },
            ];
        };

        setTimeUnits(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeUnits(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className="flex gap-4">
            {timeUnits.map((item, index) => (
                <React.Fragment key={index}>
                    <div className="flex flex-col w-min items-center gap-1 relative">
                        <div className="relative self-stretch mt-[-1.00px] [font-family:'Gill_Sans-Regular',Helvetica] font-normal text-blue-50 text-[50px] tracking-[0] leading-[normal]">
                            {item.value}
                        </div>
                        <div className="relative w-fit [font-family:'Gill_Sans-Regular',Helvetica] font-normal text-white text-lg text-center tracking-[0] leading-[normal] whitespace-nowrap">
                            {item.label}
                        </div>
                    </div>
                    {index < timeUnits.length - 1 && (
                        <div className="text-white text-4xl self-start mt-4">
                            :
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
