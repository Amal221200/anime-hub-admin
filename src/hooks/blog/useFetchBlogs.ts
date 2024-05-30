import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchBlogs } from "../actions/blog";

export default function useFetchBlogs(){
    const queryClient = useQueryClient()
    const { data: blogs, isLoading } = useQuery({ queryKey: ['fetch_blogs'], queryFn: fetchBlogs }, queryClient);

    return {
        blogs,
        isLoading
    }
}