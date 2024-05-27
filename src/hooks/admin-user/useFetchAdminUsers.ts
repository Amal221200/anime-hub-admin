import { useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchAdminUsers } from "../actions/admin-users"

export default function useFetchAdminUsers() {
    const queryClient = useQueryClient()
    const { data: adminUsers, isLoading } = useQuery({ queryKey: ['fetch_admin_users'], queryFn: fetchAdminUsers }, queryClient)

    return {
        adminUsers,
        isLoading
    }
}