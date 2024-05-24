import getCurrentUser from "@/app/auth/getCurrentUser";
import { getUser } from "@/lib/actions/user";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface UserParams {
    params: { userId: string }
}

export async function PATCH(request: NextRequest, { params: { userId } }: UserParams) {
    const user = await getCurrentUser();

    if (user?.role !== 'SUPER_ADMIN') {
        return NextResponse.json('Unauthorized access', { status: 401 })
    }

    const body = await request.json();

    const userExist = await getUser(userId);

    if (!userExist) {
        return NextResponse.json("User does not exist", { status: 404 })
    }

    await db.user.update({
        where: { id: userId }, data: {
            role: body.role || userExist.role
        }
    })

    return NextResponse.json({ message: "User patched" }, { status: 200 })
}