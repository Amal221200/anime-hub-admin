"use client";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { AdminUser, USER_ROLE } from '@prisma/client';
import { Row } from '@tanstack/react-table';
import { useCallback } from 'react';
import useCurrentUser from '@/hooks/current-user/useCurrentUser';
import useAlertModal from '@/hooks/useAlertModal';
import useDialogModal from '@/hooks/useDialogModal';
import useChangeAdminUserRole from '@/hooks/admin-user/useChangeAdminUserRole';

const RoleDropdown = ({ row }: { row: Row<AdminUser> }) => {
    const { data: userData } = useCurrentUser();
    const { onOpen: onAlertOpen } = useAlertModal()
    const { onOpen: onDialogOpen } = useDialogModal()
    
    const { mutateAsync } = useChangeAdminUserRole({ userId: row.getValue('id'), username: row.getValue('username') })
    
    const handleRole = useCallback(async (role: USER_ROLE) => {
        if (userData?.role !== 'SUPER_ADMIN') {
            return onAlertOpen({ title: 'Unauthorized', description: 'Super Admins are allowed to grant roles to the user.' })
        }

        if (row.getValue('role') === role) {
            return onAlertOpen({
                title: `Redundant action`,
                description: `Role is already ${role}.`
            })
        }

        onDialogOpen({
            title: 'Are you sure?',
            description: "Do yo want to change the role of the user?",
            async action() {
                await mutateAsync({ role })
            }
        })
    }, [mutateAsync, userData, onAlertOpen, onDialogOpen, row])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="text-xs sm:text-sm" onClick={(e) => e.stopPropagation()}>
                <Button variant="ghost" className="p-0 py-0 outline-none ring-0 hover:bg-none" size={'sm'}>
                    {row.getValue('role')}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-1">
                <DropdownMenuLabel>Roles</DropdownMenuLabel>
                {["ADMIN", "USER"].map((role) => (
                    <DropdownMenuItem className="text-xs sm:text-sm" key={role} onClick={() => handleRole(role as USER_ROLE)}>
                        {role}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default RoleDropdown