import getCurrentUser from "@/lib/actions/getCurrentUser";
import { AdminUser } from "@prisma/client";
import { redirect } from "next/navigation";

export async function fetchCurrentUser(): Promise<AdminUser> {
    const user = await getCurrentUser();
    if (!user) {
        redirect('/auth/sign-in')
    }
    return user
}