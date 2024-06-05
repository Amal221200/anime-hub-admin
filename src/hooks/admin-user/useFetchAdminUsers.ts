import { getAdminUsers } from "@/lib/actions/admin-user";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";

export default function useFetchAdminUsers() {
    const queryClient = useQueryClient()

    const handleFetch = useCallback(async () => {
        const adminUsers = await getAdminUsers()
        return adminUsers!
    }, [])

    const { data: adminUsers, status, isLoading, refetch } = useQuery({
        queryKey: ['fetch_admin_users'],
        queryFn: handleFetch,
    }, queryClient)


    return {
        adminUsers,
        status,
        isLoading,
        refetch
    }
}