"use client"
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MoreHorizontal } from 'lucide-react'
import { useCallback } from 'react'
import { deleteAnime } from './functions'
import { Row } from '@tanstack/react-table'
import { Anime } from '@prisma/client'
import { useToast } from '@/components/ui/use-toast'
import { AxiosError } from 'axios'
import useCurrentUser from '@/hooks/useCurrentUser'
import useAlertModal from '@/hooks/useAlertModal'

const ActionsDropdown = ({ row }: { row: Row<Anime> }) => {
    const queryClient = useQueryClient();
    const { data: userData } = useCurrentUser()
    
    const { onOpen } = useAlertModal()
    const { toast } = useToast()
    
    const { mutateAsync } = useMutation({
        mutationKey: ['anime_delete'],
        mutationFn: deleteAnime(row.getValue('id')),
        async onSuccess() {
            await queryClient.invalidateQueries({ queryKey: ['fetch_animes'] })
            toast({ title: "ANIME DELETED", description: `${row.getValue('title')} is deleted.`, variant: 'success', duration: 4000 })
        },
        onError(error: AxiosError) {
            onOpen({ title: 'Internal Server Error', description: error.message })
        },
    }, queryClient)

    const handleDelete = useCallback(async () => {
        if (userData?.role === 'USER') {
            return onOpen({ title: 'Unauthorized', description: 'Users with administration access are allowed to change the data.' })
        }
        await mutateAsync()
    }, [mutateAsync, userData, onOpen])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="">
                <Button variant="ghost" className="p-0 py-0 outline-none ring-0 hover:bg-none" size={'sm'}>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="space-y-1">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem className="p-0">
                    <Button onClick={handleDelete} variant="outline" size="sm" className="inline-block h-full w-full border-red-600 px-0 py-1 pl-2 text-left text-red-600 hover:text-red-600">
                        Delete
                    </Button>
                </DropdownMenuItem>
                {/* <DropdownMenuItem className="p-0">
                    <Button onClick={() => toast({ title: "ANIME DELETED", description: `${row.getValue('title')} is deleted.`, variant: 'success' })} variant="outline" size="sm" className="inline-block h-full w-full border-emerald-600 px-0 py-1 pl-2 text-left text-emerald-600 hover:text-emerald-600">
                        Testing
                    </Button>
                </DropdownMenuItem> */}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ActionsDropdown