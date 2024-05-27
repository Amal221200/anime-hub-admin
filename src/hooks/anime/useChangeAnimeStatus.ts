import { useMutation, useQueryClient } from "@tanstack/react-query"
import { onAnimeStatusChange } from "../actions/anime"
import { AxiosError } from "axios"
import { ANIME_STATUS } from "@prisma/client"
import { useToast } from "@/components/ui/use-toast"
import useAlertModal from "../useAlertModal"

export default function useChangeAnimeStatus(anime: { animeId: string, title: string, status: ANIME_STATUS }) {
    const queryClient = useQueryClient()
    const { onOpen: onAlertOpen } = useAlertModal()
    const { toast } = useToast()
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['anime_status'], mutationFn: onAnimeStatusChange(anime.animeId),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['fetch_animes'] })
            toast({
                title: "STATUS CHANGED", description: `Status of ${anime.title} has changed to ${anime.status}`, variant: "success",
                duration: 4000
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