import { getBlogs } from "@/lib/actions/blog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export default function useFetchBlogs() {
    const queryClient = useQueryClient()

    const handleFetch = useCallback(async () => {
        const blogs = await getBlogs()
        return blogs!
    }, [])

    const { data: blogs, status, isLoading } = useQuery({
        queryKey: ['fetch_blogs'],
        queryFn: handleFetch,
    }, queryClient)

    return {
        blogs,
        status,
        isLoading,
    }
}