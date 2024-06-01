import getCurrentUser from "@/lib/actions/getCurrentUser";
import { getAdminUser } from "@/lib/actions/admin-user";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

interface UserParams {
    params: { userId: string }
}

export async function PATCH(request: NextRequest, { params: { userId } }: UserParams) {
    try {

        const user = await getCurrentUser();

        if (user?.role !== 'SUPER_ADMIN') {
            return NextResponse.json('Unauthorized access', { status: 401 })
        }

        const body = await request.json();

        const userExist = await getAdminUser(userId);

        if (!userExist) {
            return NextResponse.json("User does not exist", { status: 404 })
        }

        await db.adminUser.update({
            where: { id: userId }, data: {
                role: body.role || userExist.role
            }
        })
        
        revalidatePath("/admin-user")
        return NextResponse.json({ message: "User patched" }, { status: 200 })
    } catch (error) {
        return NextResponse.json("Internal Server error at PATCH ADMIN_USER [userId]", { status: 500 })
    }
}