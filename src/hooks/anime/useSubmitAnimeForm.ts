import { useToast } from "@/components/ui/use-toast"
import { animeFormSchema, animeSchema } from "@/lib/schema"
import { ANIME_FORM_TYPE } from "@/lib/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { Anime } from "@prisma/client"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AxiosError } from "axios"
import useAlertModal from "../useAlertModal"

export default function useAnimeForm( type: ANIME_FORM_TYPE,
    action: (data: { data: z.infer<typeof animeSchema> }) => Promise<void>, anime?: Anime) {
     
    const queryClient = useQueryClient()
    const router = useRouter()
    const { toast } = useToast()
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
            episodes: anime?.episodes.toString() || '',
            episodeDuration: anime?.episodeDuration.toString() || '',
            imageLink: anime?.imageLink || '',
            description: anime?.description || '',
        },
    })

    const { mutateAsync, isPending } = useMutation({
        mutationKey: [`anime_${type}`.toLowerCase()],
        mutationFn: action,
        onError(error: AxiosError) {
            onOpen({ title: 'Internal Server Error', description: error.message })
        },
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ["fetch_animes"] });
            toast({
                title: type === ANIME_FORM_TYPE.ADD ? `CREATED` : `EDITED ${form.getValues().title}`,
                description: type === ANIME_FORM_TYPE.ADD ? `Successfully added ${form.getValues().title}` : `Successfully edited ${anime?.title}`,
                variant: 'success'
            })
            if (type === ANIME_FORM_TYPE.ADD) {
                form.reset()
            }
            router.refresh()
        }
    }, queryClient)


    return {
        form,
        mutateAsync,
        isPending
    }
}