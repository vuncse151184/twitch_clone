
import { UserButton, SignInButton, useAuth } from "@clerk/nextjs"
import { currentUser } from "@clerk/nextjs/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clapperboard } from "lucide-react"

export const Actions = async () => {
    const user = await currentUser();
    console.log("user", user)
    return (
        <div className="flex items-center justify-center gap-x-2 ml-4 lg:ml-0">
            {!user && (
                <SignInButton>
                    <Button variant="primary" size="sm">
                        Login
                    </Button>
                </SignInButton>
            )}
            {!!user && (
                <div className="flex items-center gap-x-4">
                    <Button size="sm" variant='ghost' className="text-muted-foreground hover:text-primary" asChild>
                        <Link href={`/u/${user.username}`}>
                            <Clapperboard className="h-5 w-5 text-muted-foreground" />
                            <span>Dashboard</span>
                        </Link>
                    </Button>
                    <UserButton/>
                </div>
            )}
        </div>
    )
}