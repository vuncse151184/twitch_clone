"use client"

import { useSidebar } from "@/store/use-sidebar"
import { Database } from "./../../../../database.types"
import { UserItem, UserItemSkeleton } from "./user-items"

type User = Database["public"]["Tables"]["user"]["Row"]
interface RecommendedProps {
    data: User[]
}

export const Recommended = ({
    data
}: RecommendedProps) => {
    const { collapsed } = useSidebar((state) => state);
    console.log("data:", data)
    const showLabel = !collapsed && data?.length > 0;
    return (
        <div>
            {showLabel && (
                <div className="text-sm text-muted-foreground" >
                    <p>Recommended</p>
                </div>

            )}
            <ul className="space-y-2 px-2">
                {data.map((user) => (
                    <UserItem key={user.id} username={user.user_name!} imageUrl={user.image_url || ''} isLive={true} />
                ))}
            </ul>
        </div>
    )
}


export const RecommendedSkeleton = () => {
    return (
        <ul>
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}