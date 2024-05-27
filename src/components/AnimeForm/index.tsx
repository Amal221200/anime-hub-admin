"use client"
import { Anime } from "@prisma/client"
import { z } from "zod"
import { useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { animeFormSchema, animeSchema } from "@/lib/schema"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import FileUpload from "../FileUpload"
import useCurrentUser from "@/hooks/current-user/useCurrentUser"
import { addAnime, editAnime } from "../functions"
import { ANIME_FORM_TYPE } from "@/lib/types"
import useAlertModal from "@/hooks/useAlertModal"
import DateInput from "./DateInput"
import useAnimeForm from "@/hooks/anime/useSubmitAnimeForm"

interface AnimeFormProps {
    anime?: Anime,
    heading?: string,
    type: ANIME_FORM_TYPE
}

const AnimeForm = ({ anime, heading, type }: AnimeFormProps) => {
    const { onOpen } = useAlertModal()
    const { data: userData } = useCurrentUser()
    const { form, mutateAsync } = useAnimeForm(type, type === ANIME_FORM_TYPE.ADD ? addAnime : editAnime(anime?.id as string), anime)
    
    const onSubmit = useCallback(async (values: z.infer<typeof animeFormSchema>) => {
        const payload = animeSchema.parse({ ...values, genre: values.genre.split(','), episodes: parseInt(values.episodes), episodeDuration: parseInt(values.episodeDuration) })

        await mutateAsync({ data: payload })
    }, [mutateAsync])

    useEffect(() => {
        if (userData?.role === 'USER') {
            onOpen({ title: 'Notice', description: 'You cannot add/edit anime, nor you upload any images since you are not an administrator' })
        }
    }, [userData, onOpen])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto mb-16 max-w-[380px] space-y-3 sm:mb-0 sm:max-w-[1000px]">
                <h1 className="text-3xl font-semibold sm:text-5xl">{heading}</h1>
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
                        name="release"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>
                                    Release
                                </FormLabel>
                                <FormControl>
                                    <DateInput field={field} />
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
                                <FormControl >
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
                    disabled={form.formState.isLoading || form.formState.isSubmitting || userData?.role === 'USER'} className="block w-full disabled:cursor-null disabled:opacity-60 sm:w-max">
                    Submit
                </Button>
            </form>
        </Form>
    )
}

export default AnimeForm