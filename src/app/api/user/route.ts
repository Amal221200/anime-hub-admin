import { getUsers } from "@/lib/actions/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        request.nextUrl.searchParams.get('page')
        const users = await getUsers();

        return NextResponse.json(users)
    } catch (error) {
        return NextResponse.json("Internal server error at GET USER", { status: 500 })
    }
}