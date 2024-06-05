import { ANIME_STATUS } from "@prisma/client"
import { toast } from "sonner"
import useAlertModal from "../useAlertModal"
import { useCallback } from "react"
import { updateAnimeStatus } from "@/lib/actions/anime"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"

export default function useChangeAnimeStatus(animeId: string) {
    const { onOpen: onAlertOpen } = useAlertModal()
    const queryClient = useQueryClient()

    const handleStatusChange = useCallback((animeId: string) => {
        return async (status: ANIME_STATUS) => {
            return await updateAnimeStatus(animeId, status)
        }
    }, [])

    const { mutateAsync: onStatusChange } = useMutation({
        mutationKey: [`status_change`, animeId],
        mutationFn: handleStatusChange(animeId),
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['fetch_animes'] })
            toast.success("STATUS CHANGED", {
                description: `Status of ${data?.title} has changed to ${data?.status}`,
            })
        },
        onError(error: AxiosError | any, variables, context) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        },
    })

    return {
        onStatusChange,
    }
}