import getCurrentUser from "@/app/auth/getCurrentUser";
import { getAnimes } from "@/lib/actions/anime";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_request: NextRequest) {
    const animes = await getAnimes({});

    if (!animes.animes) {
        return NextResponse.json("Internal server error", { status: 500 })
    }

    return NextResponse.json(animes.animes)
}

export async function POST(request: NextRequest) {
    const user = await getCurrentUser();

    if (user?.role === 'USER') {
        return NextResponse.json('Unauthorized access', { status: 401 })
    }
    
    const body = await request.json();

    const newAnime = await db.anime.create({
        data: {
            title: body.title,
            description: body.description,
            artist: body.artist,
            studio: body.studio,
            status: body.status,
            episodes: body.episodes,
            episodeDuration: body.episodeDuration,
            genre: body.genre,
            imageLink: body.imageLink,
            release: body.release,
            watchLink: body.watchLink,
        }
    })

    return NextResponse.json(newAnime, { status: 201 })
}