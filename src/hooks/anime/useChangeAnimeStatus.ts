import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onAnimeStatusChange } from "../actions/anime"
import { AxiosError } from "axios"
import { ANIME_STATUS } from "@prisma/client"
import { toast } from "sonner"
import useAlertModal from "../useAlertModal"

export default function useChangeAnimeStatus(anime: { animeId: string, title: string, status: ANIME_STATUS }) {
    const queryClient = useQueryClient()
    const { onOpen: onAlertOpen } = useAlertModal()
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['anime_status', anime.animeId], mutationFn: onAnimeStatusChange(anime.animeId),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['fetch_animes'] })
            toast.success("STATUS CHANGED", {
                description: `Status of ${anime.title} has changed to ${anime.status}`,
            })
        },
        onError(error: AxiosError) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        },
    })

    return {
        mutateAsync,
        isPending
    }
}