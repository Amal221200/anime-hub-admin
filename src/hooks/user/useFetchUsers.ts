import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUsers } from "../actions/user";

export default function useFetchUsers(){
    const queryClient = useQueryClient()
    const { data: users, isLoading } = useQuery({ queryKey: ['fetch_users'], queryFn: fetchUsers }, queryClient)

    return {
        users,
        isLoading
    }
}