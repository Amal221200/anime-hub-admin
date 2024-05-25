import { Anime, ANIME_STATUS } from "@prisma/client"
import axios from "axios"

export async function fetchAnimes(): Promise<Anime[]> {
    const animes = await axios.get('/api/anime');
    return animes.data
}

export function onStatusChange(animeId: string) {
    return async ({ status }: { status: ANIME_STATUS }) => {
        const response = await axios.patch(`/api/anime/${animeId}`, { status })
        return response.data
    }
}

export function deleteAnime(animeId: string) {
    return async () => {
        const response = await axios.delete(`/api/anime/${animeId}`)

        if (response.status === 401) {
            throw new Error('', { cause: response.status })
        }

        return response.data
    }
}