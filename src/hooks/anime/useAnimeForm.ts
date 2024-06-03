import { toast } from "sonner"
import { animeFormSchema, animeSchema } from "@/lib/schema"
import { FORM_TYPE } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Anime } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import useAlertModal from "../useAlertModal"
import { useCallback } from "react"
import { addAnime, updateAnime } from "@/lib/actions/anime"

export default function useAnimeForm(type: FORM_TYPE, anime?: Anime) {
    const { onOpen } = useAlertModal()

    const form = useForm<z.infer<typeof animeFormSchema>>({
        resolver: zodResolver(animeFormSchema),
        defaultValues: {
            title: anime?.title || '',
            artist: anime?.artist || '',
            genre: anime?.genre?.reduce((prev, current) => `${prev}, ${current}`) || '',
            studio: anime?.studio || '',
            status: anime?.status || '',
            watchLink: anime?.watchLink || '',
            release: anime?.release,
            episodes: anime?.episodes || 0,
            episodeDuration: anime?.episodeDuration || 0,
            imageLink: anime?.imageLink || '',
            description: anime?.description || '',
        },
    })

    const onSubmit = useCallback(async (animeData: z.infer<typeof animeSchema>) => {
        try {
            if (type === FORM_TYPE.ADD) {
                await addAnime(animeData)
            } else {
                await updateAnime(anime?.id!, animeData)
            }

            toast.success(type === FORM_TYPE.ADD ? `CREATED` : `EDITED ${form.getValues().title}`,
                {
                    description: type === FORM_TYPE.ADD ? `Successfully added ${form.getValues().title}` : `Successfully edited ${anime?.title}`
                })

        } catch (error: any) {
            onOpen({ title: 'Internal Server Error', description: error.message })
        }
    }, [type, anime, form, onOpen])
    return {
        form,
        onSubmit,
    }
}