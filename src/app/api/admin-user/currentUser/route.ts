import getCurrentUser from "@/lib/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
    try {
        const userData = await getCurrentUser()

        return NextResponse.json(userData);
    } catch (error) {
        return NextResponse.json("Internal Server Error at GET CURRENT_USER", { status: 500 });
    }
}