import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAlertModal from "../useAlertModal";
import { useToast } from "@/components/ui/use-toast";
import { onAdminRoleChange } from "../actions/admin-users";
import { AxiosError } from "axios";

export default function useChangeAdminUserRole(user: {userId: string, username: string}){
    const queryClient = useQueryClient()
    const { onOpen: onAlertOpen } = useAlertModal()
    const { toast } = useToast()
    const { mutateAsync, isPending } = useMutation({
        mutationKey: ['user_role'],
        mutationFn: onAdminRoleChange(user.userId),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['fetch_admin_users'] })
            toast({ title: "ROLE UPDATED", description: `${user.username} role is updated.`, variant: 'success', duration: 4000 })
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