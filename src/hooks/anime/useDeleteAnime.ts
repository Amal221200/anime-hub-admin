import { toast } from "sonner";
import useAlertModal from "../useAlertModal";
import { useCallback } from "react";
import { deleteAnime } from "@/lib/actions/anime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export default function useDeleteAnime(animeId: string) {
    const { onOpen: onAlertOpen } = useAlertModal()
    const queryClient = useQueryClient()

    const handleDelete = useCallback((animeId: string) => {
        return async () => {
            return await deleteAnime(animeId)
        }
    }, [])

    const { mutateAsync: onDelete } = useMutation({
        mutationKey: [`delete_anime`, animeId],
        mutationFn: handleDelete(animeId),
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['fetch_animes'] })
            toast.success("ANIME DELETED", { description: `${data?.title} is deleted.` })
        },
        onError(error: AxiosError | any, variables, context) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        },
    })

    return {
        onDelete
    }
}