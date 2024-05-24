"use client";
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User, USER_ROLE } from '@prisma/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Row } from '@tanstack/react-table';
import { onRoleChange } from './functions';
import { useToast } from '@/components/ui/use-toast';
import { ToastProps } from '@/components/ui/toast';
import { AxiosError } from 'axios';
import { useCallback } from 'react';

const RoleDropdown = ({ row }: { row: Row<User> }) => {
    const queryClient = useQueryClient()
    const { toast } = useToast()
    const { mutateAsync } = useMutation({
        mutationKey: ['user_role'],
        mutationFn: onRoleChange(row.getValue('id')),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['fetch_users'] })
            toast({ title: "ROLE UPDATED", description: `${row.getValue('username')} role is updated.`, variant: 'success', duration: 4000 })
        },
        onError(error: AxiosError) {
            const toastOptions: ToastProps = { duration: 4000, variant: "destructive" }
            if (error.response?.status === 401) {
                toast({ ...toastOptions, title: 'Unauthoried User', description: "Only super admins are allowed to grant/revoke permissions to user" })
            } else if (error.response?.status === 500) {
                toast({ ...toastOptions, title: 'Internal Server Error', description: "There was a problem in the server." })
            }
        },
    }, queryClient)

    const handleRole = useCallback(async (role: USER_ROLE) => {
        await mutateAsync({ role })
    }, [mutateAsync])

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