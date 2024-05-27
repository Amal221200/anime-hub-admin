import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchAnimes } from "../actions/anime"

export default function useFetchAnimes(){
    const queryClient = useQueryClient()
    const { data: animes, isLoading } = useQuery({ queryKey: ['fetch_animes'], queryFn: fetchAnimes }, queryClient);

    return {
        animes,
        isLoading
    }
}