import { z } from "zod"

export const animeFormSchema = z.object({
    title: z.string().min(1, "Title is required.").trim(),
    artist: z.string().min(1, "Artist is required.").trim(),
    genre: z.string().min(1, "Genre is required.").trim().toLowerCase(),
    studio: z.string().min(1, "Studio is required.").trim(),
    status: z.string().min(1, "Status is required.").trim().toUpperCase(),
    watchLink: z.string().url().min(1, "Watch Link is required.").trim(),
    release: z.string().regex(/^[1-9][0-9]{3}$/, "Enter a valid year four digit year"),
    episodes: z.string().regex(/^[1-9][0-9]*$/, "Enter a valid number"),
    episodeDuration: z.string().regex(/^[1-9][0-9]*$/, "Enter a valid duration"),
    imageLink: z.string().url().min(1, "Image Link is required.").trim(),
    description: z.string().min(1, "Image Link is required.").trim(),
})