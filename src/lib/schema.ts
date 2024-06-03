import { z } from "zod"

export const animeFormSchema = z.object({
    title: z.string().min(1, "Title is required.").trim(),
    artist: z.string().min(1, "Artist is required.").trim(),
    genre: z.string().min(1, "Genre is required.").trim().toLowerCase(),
    studio: z.string().min(1, "Studio is required.").trim(),
    status: z.string().min(1, "Status is required.").trim().toUpperCase(),
    watchLink: z.string().url('Watch link should be a valid url').min(10, "Watch Link is required.").trim(),
    release: z.date({ required_error: "A release date is required." }),
    episodes: z.number({ required_error: "Episodes is required" }).positive("Episodes should be more than zero").gt(0, "Episodes should be more than zero"),
    episodeDuration: z.number({ required_error: "Episode duration is required" }).positive("Episode duration should be more than zero").gt(0, "Episode duration should be more than zero"),
    imageLink: z.string().min(5, "Image Link is required.").trim(),
    description: z.string().min(1, "Description is required.").trim(),
})

export const blogSchema = z.object({
    title: z.string().min(1, "Title is required.").trim(),
    imageLink: z.string().min(5, "Image Link is required.").trim(),
    description: z.string().min(1, "Description is required.").trim(),
    published: z.boolean().default(false),
    content: z.string().optional().default(''),
})

export const animeSchema = z.object({
    title: z.string().min(1, "Title is required.").trim(),
    artist: z.string().min(1, "Artist is required.").trim(),
    genre: z.array(z.string().trim().toLowerCase()).min(1, "Genre is required."),
    studio: z.string().min(1, "Studio is required.").trim(),
    status: z.enum(['ONGOING', 'COMPLETED']),
    watchLink: z.string().url('Watch link should be a valid url').min(10, "Watch Link is required.").trim(),
    release: z.date({ required_error: "A release date is required." }),
    episodes: z.number().min(1, "Episodes is required").int("Enter a valid number"),
    episodeDuration: z.number().min(1, "Episode duration is required").int("Enter a valid number"),
    imageLink: z.string().min(5, "Image Link is required.").trim(),
    description: z.string().min(1, "Description is required.").trim(),
})