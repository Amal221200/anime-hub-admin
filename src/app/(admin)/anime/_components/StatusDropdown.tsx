"use client"

import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Anime, ANIME_STATUS } from '@prisma/client'
import React, { useCallback } from 'react'
import { onStatusChange } from './functions'
import { Row } from '@tanstack/react-table'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useToast } from '@/components/ui/use-toast'
import { AxiosError } from 'axios'
import useCurrentUser from '@/hooks/useCurrentUser'
import useAlertModal from '@/hooks/useAlertModal'

const StatusDropdown = ({ row }: { row: Row<Anime> }) => {
    const queryClient = useQueryClient()
    const { onOpen } = useAlertModal()
    const { toast } = useToast()
    const { data: userData } = useCurrentUser()
    const { mutateAsync } = useMutation({
        mutationKey: ['anime_status'], mutationFn: onStatusChange(row.getValue('id')),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['fetch_animes'] })
            toast({
                title: "STATUS CHANGED", description: `Status of ${row.getValue('title')} has changed to ${status}`, variant: "success",
                duration: 4000
            })
        },
        onError(error: AxiosError) {
            onOpen({ title: 'Internal Server Error', description: error.message })
        },
    })

    console.log(userData);
    const handleStatus = useCallback(async (status: ANIME_STATUS) => {
        
        if (userData?.role === 'USER') {
            return onOpen({ title: 'Unauthorized', description: 'Users with administration access are allowed to change the data.' })
        }
        await mutateAsync({ status })
    }, [mutateAsync, userData, onOpen])

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