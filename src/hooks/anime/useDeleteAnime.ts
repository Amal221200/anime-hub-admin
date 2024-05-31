import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteAnime } from "../actions/anime";
import { AxiosError } from "axios";
import useAlertModal from "../useAlertModal";

export default function useDeleteAnime(anime: { animeId: string, title: string }) {
    const queryClient = useQueryClient();
    const { onOpen: onAlertOpen } = useAlertModal()

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['anime_delete', anime.animeId],
        mutationFn: deleteAnime(anime.animeId),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['fetch_animes'] })
            toast("ANIME DELETED", { description: `${anime.title} is deleted.` })
        },
        onError(error: AxiosError) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        },
    }, queryClient)

    return {
        mutateAsync,
        isPending
    }
}