import { toast } from "sonner"
import { animeFormSchema, animeSchema } from "@/lib/schema"
import { ActionsProviderType, FORM_TYPE } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Anime } from "@prisma/client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import useAlertModal from "../useAlertModal"
import { use, useCallback } from "react"
import { ActionsContext } from "@/components/providers/ActionsProvider"

export default function useAnimeForm(type: FORM_TYPE, anime?: Anime) {
    const { actions } = use(ActionsContext) as ActionsProviderType
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
                await actions.addAnime(animeData)
            } else {
                await actions.updateAnime(anime?.id!, animeData)
            }

            toast.success(type === FORM_TYPE.ADD ? `CREATED` : `EDITED ${form.getValues().title}`,
                {
                    description: type === FORM_TYPE.ADD ? `Successfully added ${form.getValues().title}` : `Successfully edited ${anime?.title}`
                })

        } catch (error: any) {
            onOpen({ title: 'Internal Server Error', description: error.message })
        }
    }, [type, actions, anime, form, onOpen])
    return {
        form,
        onSubmit,
    }
}