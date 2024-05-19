"use server"
import db from "@/lib/db"

export async function getAnimes(query?: string, limit: number = 12) {
    try {
        const animes = await db.anime.findMany(
            {
                where: {
                    imageLink: { startsWith: process.env.NODE_ENV === 'development' ? "" : "" },
                    title: { contains: query ? query : '', mode: "insensitive" }
                },
                orderBy: { title: 'asc' },
                take: limit
            }
        );
        return animes
    } catch (error) {
        console.log("getAnimes error");
    }
}

export async function getAnime(id: string) {
    try {
        const anime = await db.anime.findUnique({ where: { id } })
        return anime
    } catch (error) {
        console.log("getAnime error");
    }
}