import { getUsers } from "@/lib/actions/user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export default function useFetchUsers() {
    const queryClient = useQueryClient()

    const handleFetch = useCallback(async () => {
        const users = await getUsers()
        return users
    }, [])

    const { data: users, isLoading } = useQuery({
        queryKey: ['fetch_users'],
        queryFn: handleFetch,
    }, queryClient)

    return {
        users,
        isLoading,
    }
}