import { animeSchema, blogSchema } from "@/lib/schema";
import axios from "axios";
import { z } from "zod";

export async function addAnime({ data }: { data: z.infer<typeof animeSchema> }) {
    const response = await axios.post(`/api/anime`, { data })
    return response.data
}

export function editAnime(animeId: string) {
    return async ({ data }: { data: z.infer<typeof animeSchema> }) => {
        const response = await axios.put(`/api/anime/${animeId}`, { data })
        return response.data
    }
}

export async function addBlog({ data }: { data: z.infer<typeof blogSchema> }) {
    const response = await axios.post(`/api/anime`, { data })
    return response.data
}

export function editBlog(blogId: string) {
    return async ({ data }: { data: z.infer<typeof blogSchema> }) => {
        const response = await axios.put(`/api/anime/${blogId}`, { data })
        return response.data
    }
}