import getCurrentUser from "@/lib/actions/getCurrentUser";
import { addAnime, getAnimes } from "@/lib/actions/anime";
import db from "@/lib/db";
import { animeSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
    try {
        const animes = await getAnimes({});
        
        return NextResponse.json(animes.animes)
    } catch (error) {
        return NextResponse.json("Internal Server Error at GET ANIME", { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {

        const user = await getCurrentUser();

        if (user?.role === 'USER') {
            return NextResponse.json('Unauthorized access', { status: 401 })
        }

        const body = await request.json();

        const animeData = animeSchema.parse({ ...body.data, release: new Date(body.data.release) });

        const newAnime = await addAnime(animeData)

        return NextResponse.json(newAnime, { status: 201 })
    }

    catch (error) {
        return NextResponse.json("Internal Server Error at POST ANIME", { status: 500 })
    }
}