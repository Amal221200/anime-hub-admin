"use client"
import { useCallback } from 'react'
import { Anime, ANIME_STATUS } from '@prisma/client'
import { Row } from '@tanstack/react-table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import useCurrentUser from '@/hooks/current-user/useCurrentUser'
import useAlertModal from '@/hooks/useAlertModal'
import useDialogModal from '@/hooks/useDialogModal'
import useChangeAnimeStatus from '@/hooks/anime/useChangeAnimeStatus'

const StatusDropdown = ({ row }: { row: Row<Anime> }) => {
    const { onOpen: onAlertOpen } = useAlertModal()
    const { onOpen: onDialogOpen } = useDialogModal()
    const { data: userData } = useCurrentUser()

    const { onStatusChange } = useChangeAnimeStatus(row.getValue('id'))

    const handleStatus = useCallback(async (status: ANIME_STATUS) => {
        if (userData?.role === 'USER') {
            return onAlertOpen({
                title: 'Unauthorized',
                description: 'Users with administration access are allowed to change the data.'
            })
        }

        if (row.getValue('status') === status) {
            return onAlertOpen({
                title: `Redundant action`,
                description: `Status is already ${status}.`
            })
        }

        onDialogOpen({
            title: 'Are you sure',
            description: `Do you want to change the status from ${status === 'ONGOING' ? '"COMPLETED"' : '"ONGOING"'} to ${status === 'ONGOING' ? '"ONGOING"' : '"COMPLETED"'}`,
            async action() {
                await onStatusChange(status)
            }
        })
    }, [onStatusChange, userData, onAlertOpen, onDialogOpen, row])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="ring-0 hover:bg-none">
                <Button variant="ghost" className="p-0 py-0 outline-none ring-0 hover:bg-none" size={'sm'}>
                    <span className="capitalize"> {(row.getValue('status') as string).toLowerCase()}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                {
                    ['ONGOING', 'COMPLETED'].map((status) => (
                        <DropdownMenuItem key={status} onClick={() => handleStatus(status as ANIME_STATUS)}>
                            {status}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default StatusDropdown