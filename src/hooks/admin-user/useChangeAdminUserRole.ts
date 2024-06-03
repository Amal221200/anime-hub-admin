import useAlertModal from "../useAlertModal";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useCallback } from "react";
import { USER_ROLE } from "@prisma/client";
import { updateAdminUserRole } from "@/lib/actions/admin-user";

export default function useChangeAdminUserRole(user: { username: string }) {
    const { onOpen: onAlertOpen } = useAlertModal()

    const onRoleChange = useCallback(async (userId: string, role: USER_ROLE) => {
        try {
            await updateAdminUserRole(userId, role)
            toast.success("ROLE UPDATED", { description: `${user.username} role is updated.` })
        } catch (error: AxiosError | any) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        }
    }, [user, onAlertOpen])

    return {
        onRoleChange
    }
}