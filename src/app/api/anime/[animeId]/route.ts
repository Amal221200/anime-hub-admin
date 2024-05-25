import getCurrentUser from "@/app/auth/getCurrentUser";
import { getAnime } from "@/lib/actions/anime";
import db from "@/lib/db";
import { animeSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

interface AnimeParams {
    params: {
        animeId: string
    }
}

export async function GET(request: NextRequest, { params: { animeId } }: AnimeParams) {
    const anime = await getAnime(animeId);

    return
}

export async function PATCH(request: NextRequest, { params: { animeId } }: AnimeParams) {
    const user = await getCurrentUser();

    if (user?.role === 'USER') {
        return NextResponse.json('Unauthorized access', { status: 401 })
    }

    const body = await request.json();

    const animeExist = await getAnime(animeId);

    if (!animeExist) {
        return NextResponse.json("Anime does not exist", { status: 404 })
    }

    await db.anime.update({
        where: { id: animeId }, data: {
            status: body.status || animeExist.status
        }
    })

    return NextResponse.json({ message: "Anime patched" }, { status: 200 })
}

export async function DELETE(_request: NextRequest, { params: { animeId } }: AnimeParams) {
    const user = await getCurrentUser();

    if (user?.role === 'USER') {
        return NextResponse.json('Unauthorized access', { status: 401 })
    }

    const animeExist = await getAnime(animeId);

    if (!animeExist) {
        return NextResponse.json("Anime does not exist", { status: 404 })
    }

    await db.anime.delete({ where: { id: animeId } })

    return NextResponse.json("Anime deleted", { status: 200 })
}

export async function PUT(request: NextRequest, { params: { animeId } }: AnimeParams) {
    const user = await getCurrentUser();

    if (user?.role === 'USER') {
        return NextResponse.json('Unauthorized access', { status: 401 })
    }

    const body = await request.json();

    const animeExist = await getAnime(animeId);

    if (!animeExist) {
        return NextResponse.json("Anime does not exist", { status: 404 })
    }

    const animeData = animeSchema.parse(body.data);

    const updatedAnime = await db.anime.update({
        where: { id: animeId }, data: {
            title: animeData.title || animeExist.title,
            description: animeData.description || animeExist.description,
            artist: animeData.artist || animeExist.artist,
            studio: animeData.studio || animeExist.studio,
            status: animeData.status || animeExist.status,
            episodes: animeData.episodes || animeExist.episodes,
            episodeDuration: animeData.episodeDuration || animeExist.episodeDuration,
            genre: animeData.genre || animeExist.genre,
            imageLink: animeData.imageLink || animeExist.imageLink,
            release: animeData.release || animeExist.release,
            watchLink: animeData.watchLink || animeExist.watchLink,
        }
    })

    return NextResponse.json(updatedAnime, { status: 200 })
}