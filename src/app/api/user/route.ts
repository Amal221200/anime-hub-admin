import { getUsers } from "@/lib/actions/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
    const users = await getUsers();

    if (!users) {
        return NextResponse.json("Internal server error", { status: 500 })
    }

    return NextResponse.json(users)
}