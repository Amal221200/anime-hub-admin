"use client"
import { useCallback } from 'react'
import { Row } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { MoreHorizontal } from 'lucide-react'
import useCurrentUser from '@/hooks/current-user/useCurrentUser'
import useAlertModal from '@/hooks/useAlertModal'
import useDialogModal from '@/hooks/useDialogModal'
import useDeleteAnime from '@/hooks/anime/useDeleteAnime'
import { BlogType } from '@/lib/types'
import useDeleteblog from '@/hooks/blog/useDeleteBlog'

const ActionsDropdown = ({ row }: { row: Row<BlogType> }) => {
    const { data: userData } = useCurrentUser()

    const { onOpen: onDialogOpen } = useDialogModal()
    const { onOpen: onAlertOpen } = useAlertModal()
    
    const { onDelete } = useDeleteblog(row.getValue('id'))

    const handleDelete = useCallback(async () => {
        if (userData?.role === 'USER') {
            return onAlertOpen({
                title: 'Unauthorized', description: 'Users with administration access are allowed to change the data.'
            })
        }
        onDialogOpen({
            title: 'Are you sure?', description: "Once done, it's irreversible.", async action() {
                onDelete()
            }
        })

    }, [onDelete, userData, onAlertOpen, onDialogOpen])

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