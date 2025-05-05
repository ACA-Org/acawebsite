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
          <div className="relative flex w-min flex-col items-center gap-1">
            <div className="relative mt-[-1.00px] self-stretch [font-family:'Gill_Sans-Regular',Helvetica] text-[50px] leading-[normal] font-normal tracking-[0] text-blue-50">
              {item.value}
            </div>
            <div className="relative w-fit text-center [font-family:'Gill_Sans-Regular',Helvetica] text-lg leading-[normal] font-normal tracking-[0] whitespace-nowrap text-white">
              {item.label}
            </div>
          </div>
          {index < timeUnits.length - 1 && (
            <div className="mt-4 self-start text-4xl text-white">:</div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
