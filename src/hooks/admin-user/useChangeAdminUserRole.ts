import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAlertModal from "../useAlertModal";
import { toast } from "sonner";
import { onAdminRoleChange } from "../actions/admin-users";
import { AxiosError } from "axios";

export default function useChangeAdminUserRole(user: { userId: string, username: string }) {
    const queryClient = useQueryClient()
    const { onOpen: onAlertOpen } = useAlertModal()

    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['user_role', user.userId],
        mutationFn: onAdminRoleChange(user.userId),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['fetch_admin_users'] })
            toast.success("ROLE UPDATED", { description: `${user.username} role is updated.` })
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