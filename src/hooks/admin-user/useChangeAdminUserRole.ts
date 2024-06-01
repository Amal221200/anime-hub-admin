import useAlertModal from "../useAlertModal";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { use, useCallback } from "react";
import { ActionsContext } from "@/components/providers/ActionsProvider";
import { ActionsProviderType } from "@/lib/types";
import { USER_ROLE } from "@prisma/client";

export default function useChangeAdminUserRole(user: { username: string }) {
    const { actions } = use(ActionsContext) as ActionsProviderType
    const { onOpen: onAlertOpen } = useAlertModal()

    const onRoleChange = useCallback(async (userId: string, role: USER_ROLE) => {
        try {
            await actions.updateAdminUserRole(userId, role)
            toast.success("ROLE UPDATED", { description: `${user.username} role is updated.` })
        } catch (error: AxiosError | any) {
            onAlertOpen({ title: 'Internal Server Error', description: error.message })
        }
    }, [actions, user, onAlertOpen])

    return {
        onRoleChange
    }
}