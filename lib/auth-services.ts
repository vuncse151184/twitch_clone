import { currentUser } from "@clerk/nextjs/server";
import { createClient } from "@/app/utils/supabase/client";
import { User } from "@/global.type";

export const getSelf: () => Promise<User> = async () => {
    
    const self = await currentUser();
    const supabase = createClient()

    if (!self || !self.username) {
        throw new Error("Unauthorized");
    }

    const { data: user, error } = await supabase
    .from('user')
    .select("*")
    .eq('external_user_id', self.id) as { data: User[] | null, error: any };

    if (error) {
        throw new Error(`Query Error: ${error.message}`);
    }

    if (!user || user.length === 0) {
        throw new Error("User not found");
    }
    return user[0];
}