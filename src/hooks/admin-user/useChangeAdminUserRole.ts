import useAlertModal from "../useAlertModal";
import { toast } from "sonner";
import { useCallback } from "react";
import { USER_ROLE } from "@prisma/client";
import { updateAdminUserRole } from "@/lib/actions/admin-user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useChangeAdminUserRole( userId: string ) {
    const { onOpen: onAlertOpen } = useAlertModal()
    const queryClient = useQueryClient()

    const handleRoleChange = useCallback((userId: string) => {
        return async ({ role }: { role: USER_ROLE }) => {
          return  await updateAdminUserRole(userId, role)
        }
    }, [])

    const { mutateAsync: onRoleChange } = useMutation({
        mutationKey: [`role_change`, userId],
        mutationFn: handleRoleChange(userId),
        onSuccess(data) {
            queryClient.invalidateQueries({ queryKey: ['fetch_admin_users'] })
            toast.success("ROLE UPDATED", { description: `${data?.username} role is updated.` })
        },
        onError(error) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        },
    })
    return {
        onRoleChange
    }
}