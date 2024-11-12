import { createClient } from "@/app/utils/supabase/client";
import { getSelf } from "./auth-services";
import { User } from "@/global.type";
export const getRecommended :()=>Promise<User[]> = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 5000))
    let userId: string;
    try {
        const self = await getSelf();
        userId = self.id;
    } catch (error) {
        console.error("Failed to fetch self:", error);
    }
    const supabase = createClient()
    const { data: users } = await supabase
        .from('user')
        .select("*") as { data: User[] | null, error: any };
    return users??[];
}