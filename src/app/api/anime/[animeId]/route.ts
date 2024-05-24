import getCurrentUser from "@/app/auth/getCurrentUser";
import { getAnime } from "@/lib/actions/anime";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface AnimeParams {
    params: {
        animeId: string
    }
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
    const body = await request.json();

    const animeExist = await getAnime(animeId);

    if (!animeExist) {
        return NextResponse.json("Anime does not exist", { status: 404 })
    }

    const updatedAnime = await db.anime.update({
        where: { id: animeId }, data: {
            title: body.title || animeExist.title,
            description: body.description || animeExist.description,
            artist: body.artist || animeExist.artist,
            studio: body.studio || animeExist.studio,
            status: body.status || animeExist.status,
            episodes: body.episodes || animeExist.episodes,
            episodeDuration: body.episodeDuration || animeExist.episodeDuration,
            genre: body.genre || animeExist.genre,
            imageLink: body.imageLink || animeExist.imageLink,
            release: body.release || animeExist.release,
            watchLink: body.watchLink || animeExist.watchLink,
        }
    })

    return NextResponse.json(updatedAnime, { status: 200 })
}