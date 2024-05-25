"use server"
import db from "@/lib/db"
import { Anime } from "@prisma/client";
import { z } from "zod";
import { animeSchema } from "../schema";

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

export async function addAnime(anime: z.infer<typeof animeSchema>) {
    try {
        const newAnime = await db.anime.create({
            data: {
                title: anime.title,
                description: anime.description,
                artist: anime.artist,
                studio: anime.studio,
                status: anime.status,
                episodes: anime.episodes,
                episodeDuration: anime.episodeDuration,
                genre: anime.genre,
                imageLink: anime.imageLink,
                release: anime.release,
                watchLink: anime.watchLink,
            }
        })

        return newAnime
    } catch (error) {
        console.log("getAnime error");
        return null
    }
}

export async function deleteAnime(animeId: string) {
    try {
        const anime = await db.anime.delete({ where: { id: animeId } })
        return anime
    } catch (error) {
        console.log("deleteAnime error");
        return null
    }
}

export async function updateAnime(animeId: string, animeData: z.infer<typeof animeSchema>) {
    try {
        const updatedAnime = await db.anime.update({
            where: { id: animeId }, data: {
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
        return updatedAnime
    } catch (error) {
        console.log("updateAnime error");
        return null
    }
}