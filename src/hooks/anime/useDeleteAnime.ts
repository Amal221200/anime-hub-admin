import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { deleteAnime } from "../actions/anime";
import { AxiosError } from "axios";
import useAlertModal from "../useAlertModal";

export default function useDeleteAnime(anime: { animeId: string, title: string }) {
    const queryClient = useQueryClient();
    const { onOpen: onAlertOpen } = useAlertModal()
    const { toast } = useToast()

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['anime_delete'],
        mutationFn: deleteAnime(anime.animeId),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['fetch_animes'] })
            toast({ title: "ANIME DELETED", description: `${anime.title} is deleted.`, variant: 'success', duration: 4000 })
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