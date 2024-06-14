import getCurrentUser from "@/lib/actions/getCurrentUser";
import { AdminUser } from "@prisma/client";

export async function fetchCurrentUser(): Promise<AdminUser> {
    const user = await getCurrentUser();
    return user
}