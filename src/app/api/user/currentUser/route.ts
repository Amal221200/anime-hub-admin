import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
    const user = await currentUser();
    if (!user) {
        redirect('/auth/sign-in')
    }

    const userData = await db.user.findUnique({ where: { externalUserId: user.id } });

    return NextResponse.json(userData);
}