import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCurrentUser } from "../actions/current-user";


export default function useCurrentUser() {
    const queryClient = useQueryClient()
    const { data, isLoading, isError } = useQuery({ queryKey: ['current_user'], queryFn: fetchCurrentUser }, queryClient);

    return { data, isLoading, isError }
}