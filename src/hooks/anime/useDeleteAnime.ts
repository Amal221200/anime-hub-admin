import { toast } from "sonner";
import useAlertModal from "../useAlertModal";
import { useCallback } from "react";
import { deleteAnime } from "@/lib/actions/anime";

export default function useDeleteAnime(anime: { animeId: string, title: string }) {
    const { onOpen: onAlertOpen } = useAlertModal()

    const onDelete = useCallback(async (animeId: string) => {
        try {
            await deleteAnime(animeId)
            toast("ANIME DELETED", { description: `${anime.title} is deleted.` })
        } catch (error: any) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        }
    }, [onAlertOpen, anime])
    
    return {
        onDelete
    }
}