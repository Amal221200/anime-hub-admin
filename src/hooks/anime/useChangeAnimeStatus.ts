import { ANIME_STATUS } from "@prisma/client"
import { toast } from "sonner"
import useAlertModal from "../useAlertModal"
import { use, useCallback } from "react"
import { ActionsContext } from "@/components/providers/ActionsProvider"
import { ActionsProviderType } from "@/lib/types"

export default function useChangeAnimeStatus(anime: { animeId: string, title: string, status: ANIME_STATUS }) {
    const { onOpen: onAlertOpen } = useAlertModal()
    const { actions } = use(ActionsContext) as ActionsProviderType;

    const onStatusChange = useCallback(async (animeId: string, status: ANIME_STATUS) => {
        try {
            await actions.updateAnimeStatus(animeId, status)
            toast.success("STATUS CHANGED", {
                description: `Status of ${anime.title} has changed to ${status}`,
            })
        } catch (error: any) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        }
    }, [actions, onAlertOpen, anime.title])

    return {
        onStatusChange,
    }
}