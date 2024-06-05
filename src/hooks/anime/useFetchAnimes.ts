import { getAnimes } from "@/lib/actions/anime";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export default function useFetchAnimes() {
    const queryClient = useQueryClient()

    const handleFetch = useCallback(async () => {
        const animes = await getAnimes()
        return animes!
    }, [])

    const { data: animes, status, isLoading } = useQuery({
        queryKey: ['fetch_animes'],
        queryFn: handleFetch,
    }, queryClient)


    return {
        animes,
        status,
        isLoading,
    }
}