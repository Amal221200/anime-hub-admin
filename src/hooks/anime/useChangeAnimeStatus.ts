import { ANIME_STATUS } from "@prisma/client"
import { toast } from "sonner"
import useAlertModal from "../useAlertModal"
import { useCallback } from "react"
import { updateAnimeStatus } from "@/lib/actions/anime"

export default function useChangeAnimeStatus(anime: { animeId: string, title: string, status: ANIME_STATUS }) {
    const { onOpen: onAlertOpen } = useAlertModal()

    const onStatusChange = useCallback(async (animeId: string, status: ANIME_STATUS) => {
        try {
            await updateAnimeStatus(animeId, status)
            toast.success("STATUS CHANGED", {
                description: `Status of ${anime.title} has changed to ${status}`,
            })
        } catch (error: any) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        }
    }, [onAlertOpen, anime.title])

    return {
        onStatusChange,
    }
}