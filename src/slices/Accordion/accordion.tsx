"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

function Accordion({
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
    return <AccordionPrimitive.Root data-slot="accordion" {...props} />;
}

function AccordionItem({
    className,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
    return (
        <AccordionPrimitive.Item
            data-slot="accordion-item"
            className={cn("border-b last:border-b-0", className)}
            {...props}
        />
    );
}

function AccordionTrigger({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
    return (
        <AccordionPrimitive.Header className="flex">
            <AccordionPrimitive.Trigger
                data-slot="accordion-trigger"
                className={cn(
                    "focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start gap-4 rounded-md py-[28px] text-left transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180 body-xl-semibold text-blue-300 hover:text-blue-200 data-[state=open]:text-blue-200  group",
                    className
                )}
                {...props}
            >
                <div className={cn("relative w-6 h-6")}>
                    <div className="absolute inset-0 transform transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0 group-data-[state=closed]:rotate-0 group-data-[state=closed]:opacity-100">
                        <Plus className="w-6 h-6 text-blue-200" />
                    </div>
                    <div className="absolute inset-0 transform transition-transform duration-300 ease-in-out group-data-[state=open]:rotate-0 group-data-[state=open]:opacity-100 group-data-[state=closed]:-rotate-180 group-data-[state=closed]:opacity-0">
                        <Minus className="w-6 h-6 text-blue-100" />
                    </div>
                </div>
                {children}
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    );
}

function AccordionContent({
    className,
    children,
    ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content
            data-slot="accordion-content"
            className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-gray-300 text-base font-normal leading-[175%] flex mb-4 gap-8"
            {...props}
        >
            <div className="w-1 h-fill shrink-0 bg-blue-100" />
            <div className={cn("pt-0 pb-4 body-md text-gray-300", className)}>
                {children}
            </div>
        </AccordionPrimitive.Content>
    );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
