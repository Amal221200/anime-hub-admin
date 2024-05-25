import getCurrentUser from "@/lib/actions/getCurrentUser";
import { deleteAnime, getAnime, updateAnime } from "@/lib/actions/anime";
import db from "@/lib/db";
import { animeSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

interface AnimeParams {
    params: {
        animeId: string
    }
}

export async function GET(request: NextRequest, { params: { animeId } }: AnimeParams) {
    try {
        const anime = await getAnime(animeId);

        return NextResponse.json(anime, { status: 200 })
    } catch (error) {

        return NextResponse.json("Internal Server error at GET ANIME [animeId]", { status: 500 })
    }
}

export async function PATCH(request: NextRequest, { params: { animeId } }: AnimeParams) {
    try {
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
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error at PATCH anime [animeId]" }, { status: 500 })
    }
}

export async function DELETE(_request: NextRequest, { params: { animeId } }: AnimeParams) {
    try {
        const user = await getCurrentUser();

        if (user?.role === 'USER') {
            return NextResponse.json('Unauthorized access', { status: 401 })
        }

        const animeExist = await getAnime(animeId);

        if (!animeExist) {
            return NextResponse.json("Anime does not exist", { status: 404 })
        }

        await deleteAnime(animeId)

        return NextResponse.json("Anime deleted", { status: 200 })
    } catch (error) {
        return NextResponse.json("Internal Server Error at DELETE ANIME [animeId]", { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params: { animeId } }: AnimeParams) {
    try {
        const user = await getCurrentUser();

        if (user?.role === 'USER') {
            return NextResponse.json('Unauthorized access', { status: 401 })
        }

        const body = await request.json();

        const animeExist = await getAnime(animeId);

        if (!animeExist) {
            return NextResponse.json("Anime does not exist", { status: 404 })
        }
        const animeData = animeSchema.parse({ ...body.data, release: new Date(body.data.release) });

        const updatedAnime = await updateAnime(animeId, animeData);

        return NextResponse.json(updatedAnime, { status: 200 })
    } catch (error) {
        return NextResponse.json("Internal Server Error at Update Anime [animeId]", { status: 500 })
    }
}