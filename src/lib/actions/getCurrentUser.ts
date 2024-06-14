"use server"
import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function getCurrentUser() {
    const user = await currentUser()
    if (!user) {
        redirect('/auth/sign-in')
    }
    const userData = await db.adminUser.findUnique({ where: { externalUserId: user.id } });
    if (!userData) {
        redirect('/auth/sign-in')
    }
    return userData
}