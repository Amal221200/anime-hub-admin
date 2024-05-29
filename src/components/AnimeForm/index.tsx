"use client"
import { Anime } from "@prisma/client"
import { z } from "zod"
import { useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { animeFormSchema, animeSchema } from "@/lib/schema"
import {
    Form,
    FormControl
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Textarea } from "../ui/textarea"
import FileUpload from "../FileUpload"
import useCurrentUser from "@/hooks/current-user/useCurrentUser"
import { addAnime, editAnime } from "../functions"
import { FORM_TYPE } from "@/lib/types"
import useAlertModal from "@/hooks/useAlertModal"
import DateInput from "../DateInput"
import useAnimeForm from "@/hooks/anime/useAnimeForm"
import AnimeInputWrapper from "./AnimeInputWrapper"
import NumberInput from "../NumberInput"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

interface AnimeFormProps {
    anime?: Anime,
    heading?: string,
    type: FORM_TYPE
}

const AnimeForm = ({ anime, heading, type }: AnimeFormProps) => {
    const router = useRouter()
    const { onOpen } = useAlertModal()
    const { data: userData } = useCurrentUser()
    const { form, mutateAsync } = useAnimeForm(type, type === FORM_TYPE.ADD ? addAnime : editAnime(anime?.id as string), anime)

    const onSubmit = useCallback(async (values: z.infer<typeof animeFormSchema>) => {
        const payload = animeSchema.parse({ ...values, genre: values.genre.split(',') })

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
                <h1 className="flex items-center gap-x-2 text-xl font-semibold sm:text-5xl">
                    {type === FORM_TYPE.EDIT && <ChevronLeft className="relative transform cursor-pointer transition-transform hover:-translate-x-1" onClick={() => router.back()} />} {heading}
                </h1>
                <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <AnimeInputWrapper name="title" form={form} label="Title">
                        {(field) => (
                            <Input {...field} placeholder="eg: Dragon Ball Z" />
                        )}
                    </AnimeInputWrapper>

                    <AnimeInputWrapper name="artist" form={form} label="Artist">
                        {(field) => (
                            <Input {...field} placeholder="eg: Akira Toriyama" />
                        )}
                    </AnimeInputWrapper>

                    <AnimeInputWrapper name="genre" form={form} label="Genre">
                        {(field) => (
                            <Input {...field} placeholder="eg: shonen, action, adventure" />
                        )}
                    </AnimeInputWrapper>
                    <AnimeInputWrapper name="studio" form={form} label="Studio">
                        {(field) => (
                            <Input {...field} placeholder="eg: Toe Animation" />
                        )}
                    </AnimeInputWrapper>

                    <AnimeInputWrapper name="status" form={form} label="Status">
                        {(field) => (
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
                        )}
                    </AnimeInputWrapper>


                    <AnimeInputWrapper name="watchLink" label="Watch Link" form={form}>
                        {
                            (field) => (
                                <Input {...field} placeholder="eg: https://example.com" />
                            )
                        }
                    </AnimeInputWrapper>

                    <AnimeInputWrapper name="episodes" label="Episodes" form={form}>
                        {
                            (field) => (
                                <NumberInput {...field} value={field.value} onValueChange={(value) => {
                                    field.onChange(value)
                                }} placeholder="eg: 131" />
                            )
                        }
                    </AnimeInputWrapper>

                    <AnimeInputWrapper name="episodeDuration" label="Episode Duration" form={form}>
                        {
                            (field) => (
                                <NumberInput {...field} value={field.value} onValueChange={(value) => {
                                    field.onChange(value)
                                }} placeholder="eg: 23 mins" />
                            )
                        }
                    </AnimeInputWrapper>

                    <AnimeInputWrapper name="release" label="Release" form={form} className="flex flex-col">
                        {
                            (field) => (
                                <DateInput field={field} />
                            )
                        }
                    </AnimeInputWrapper>

                    <AnimeInputWrapper name="imageLink" label="Image Link" form={form}>
                        {
                            (field) => (
                                <FileUpload endpoint="animeImage" value={field.value} onChange={field.onChange} />
                            )
                        }
                    </AnimeInputWrapper>

                    <AnimeInputWrapper name="description" label="Description" form={form} className="sm:col-span-2">
                        {
                            (field) => (
                                <Textarea {...field} placeholder="eg: This is the legend of a young kid called Son Goku..." rows={6}
                                    className="no-scrollbar" />
                            )
                        }
                    </AnimeInputWrapper>
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