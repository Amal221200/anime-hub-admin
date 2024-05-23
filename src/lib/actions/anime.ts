"use server"
import db from "@/lib/db"

export async function getAnimes({ query, page = 1, totalAnimes = false }: { query?: string, page?: number, totalAnimes?: number | boolean }) {
    const isLimit = typeof totalAnimes === 'number' ? totalAnimes : 0
    try {
        const animes = await db.anime.findMany(
            {
                where: {
                    imageLink: { startsWith: process.env.NODE_ENV === 'development' ? "" : "" },
                    title: { contains: query ? query : '', mode: "insensitive" }
                },
                orderBy: { updatedAt: 'desc' },
                take: isLimit || undefined,
                skip: ((page - 1) * isLimit) || undefined
            }
        );

        const animesLength = await db.anime.count({ where: { title: { contains: query ? query : '', mode: "insensitive" } } });

        const totalPages = Math.ceil(animesLength / isLimit)

        return { animes, totalPages }
    } catch (error) {
        console.log("getAnimes error");
        return { animes: null, totalPages: 0 }
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