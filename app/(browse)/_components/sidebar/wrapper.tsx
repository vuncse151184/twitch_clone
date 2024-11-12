"use client"
import { useState, useEffect } from "react";

import { useSidebar } from "@/store/use-sidebar";
import { cn } from "@/lib/utils";
import { ToggleSkeleton } from "./toggle";
import { RecommendedSkeleton } from "./recommended";

interface WrapperProps {
    children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
    const { collapsed } = useSidebar((state) => state);
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return (
            <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full bg-background border-r border-[#2E2D35] z-50">
                <ToggleSkeleton />
                <RecommendedSkeleton />
            </aside>
        )
    }

    return (
        <aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-r border-[#2E2D35] z-50", collapsed && "w-[70px]")}>
            {children}
        </aside>
    )
}