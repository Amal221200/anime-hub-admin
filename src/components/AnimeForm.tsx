"use client"

import { Anime } from "@prisma/client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useCallback } from "react"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Textarea } from "./ui/textarea"
import FileUpload from "./FileUpload"

interface AnimeFormProps {
    anime?: Anime
}

const formSchema = z.object({
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

const AnimeForm = ({ anime }: AnimeFormProps) => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: anime?.title || "",
            artist: anime?.artist || "",
            genre: anime?.genre ? anime.genre.reduce((prev, current) => `${prev}, ${current}`) : "",
            studio: anime?.studio || "",
            status: anime?.status || "",
            watchLink: anime?.watchLink || "",
            release: anime?.release.toString() || '',
            episodes: anime?.episodes.toString() || '',
            episodeDuration: anime?.episodeDuration.toString() || '',
            imageLink: anime?.imageLink || '',
            description: anime?.description || '',
        },
    })


    const onSubmit = useCallback((values: z.infer<typeof formSchema>) => {
        console.log({ ...values, genre: values.genre.split(','), episodes: parseInt(values.episodes), episodeDuration: parseInt(values.episodeDuration), release: parseInt(values.release) })
    }, [])

    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto mb-16 max-w-[380px] sm:mb-0 sm:max-w-[1000px]">
                <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Title
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="eg: Dragon Ball Z" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="artist"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Artist
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="eg: Akira Toriyama" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="genre"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Genre
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="eg: Shonen, Action" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="studio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Studio
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="eg: Toe Animation" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="status"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Status
                                </FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="eg: COMPLETED" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {['ONGOING', 'COMPLETED'].map((status) => (
                                                <SelectItem key={status} value={status} >
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="watchLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    WatchLink
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="eg: https://example.com" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="release"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Release
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="eg: 1985" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="episodes"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Episodes
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="eg: 131" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="episodeDuration"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Episode Duration
                                </FormLabel>
                                <FormControl>
                                    <Input {...field} placeholder="eg: 23 mins" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="imageLink"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Image Link
                                </FormLabel>
                                <FormControl>
                                    <FileUpload endpoint="animeImage" value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"

                        render={({ field }) => (
                            <FormItem className="sm:col-span-2">
                                <FormLabel>
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea {...field} placeholder="eg: This is the legend of a young kid called Son Goku..." rows={6} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit"
                    disabled={form.formState.isDirty || form.formState.isLoading || form.formState.isSubmitting || form.formState.isValidating} className="block w-full sm:w-max">
                    Submit
                </Button>
            </form>
        </Form>
    )
}

export default AnimeForm