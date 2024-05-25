import getCurrentUser from "@/app/auth/getCurrentUser";
import { getAnimes } from "@/lib/actions/anime";
import db from "@/lib/db";
import { animeSchema } from "@/lib/schema";
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

    const animeData = animeSchema.parse(body.data);

    const newAnime = await db.anime.create({
        data: {
            title: animeData.title,
            description: animeData.description,
            artist: animeData.artist,
            studio: animeData.studio,
            status: animeData.status,
            episodes: animeData.episodes,
            episodeDuration: animeData.episodeDuration,
            genre: animeData.genre,
            imageLink: animeData.imageLink,
            release: animeData.release,
            watchLink: animeData.watchLink,
        }
    })

    return NextResponse.json(newAnime, { status: 201 })
}