import { toast } from "sonner";
import useAlertModal from "../useAlertModal";
import { use, useCallback } from "react";
import { ActionsContext } from "@/components/providers/ActionsProvider";
import { ActionsProviderType } from "@/lib/types";

export default function useDeleteAnime(anime: { animeId: string, title: string }) {
    const { onOpen: onAlertOpen } = useAlertModal()
    const { actions } = use(ActionsContext) as ActionsProviderType;

    const onDelete = useCallback(async (animeId: string) => {
        try {
            await actions.deleteAnime(animeId)
            toast("ANIME DELETED", { description: `${anime.title} is deleted.` })
        } catch (error: any) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        }
    }, [onAlertOpen, anime, actions])
    return {
        onDelete
    }
}