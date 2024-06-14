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
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

export default function useAnimeForm(type: FORM_TYPE, anime?: Anime) {
    const { onOpen } = useAlertModal()
    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof animeFormSchema>>({
        resolver: zodResolver(animeFormSchema),
        defaultValues: {
            title: anime?.title || '',
            artist: anime?.artist || '',
            genre: anime?.genre?.reduce((prev, current) => `${prev}, ${current}`) || '',
            studio: anime?.studio || '',
            status: anime?.status || 'ONGOING',
            watchLink: anime?.watchLink || '',
            release: anime?.release,
            episodes: anime?.episodes || 0,
            episodeDuration: anime?.episodeDuration || 0,
            imageLink: anime?.imageLink || '',
            description: anime?.description || '',
        },
    })

    const handleSubmit = useCallback(() => {
        return async (animeData: z.infer<typeof animeSchema>) => {
            return type === FORM_TYPE.ADD ? await addAnime(animeData) : await updateAnime(anime?.id!, animeData);
        }
    }, [type, anime])

    const { mutateAsync: onSubmit } = useMutation({
        mutationKey: [type === FORM_TYPE.ADD ? `add_anime` : `edit_anime`, anime?.id],
        mutationFn: handleSubmit(),
        async onSuccess(data) {
            await queryClient.invalidateQueries({ queryKey: ['fetch_animes'] })
            toast.success(type === FORM_TYPE.ADD ? `CREATED` : `EDITED ${data?.title}`,
                {
                    description: type === FORM_TYPE.ADD ? `Successfully added ${data?.title}` : `Successfully edited ${data?.title}`
                })
            if (type === FORM_TYPE.ADD) {
                form.reset()
            }
        },
        onError(error: AxiosError | any) {
            onOpen({ title: 'Internal Server Error', description: error.message })
        },
    })
    return {
        form,
        onSubmit,
    }
}