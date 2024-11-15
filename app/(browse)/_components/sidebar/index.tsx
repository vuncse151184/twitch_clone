import { Toggle, ToggleSkeleton } from "./toggle";
import { Wrapper } from "./wrapper";
import { Recommended, RecommendedSkeleton } from "./recommended";
import { getRecommended } from "@/lib/recommended-services";

const Sidebar = async () => {
    const recommended = await getRecommended();
    return (
        <Wrapper>
            <Toggle />
            <div className="space-y-4 pt-4 lg:pt-0">
                <Recommended data={recommended} />
            </div>
        </Wrapper>
    )
};
export default Sidebar;


export const SidebarSkeleton = () => {
    return (
        <aside className="fixed left-0 flex flex-col w-[70px] lg:w-60 h-full border-r border-[#2D2E35] z-50">
            <ToggleSkeleton />
            <RecommendedSkeleton />
        </aside>
    )
}