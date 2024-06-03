"use client"
import { useCallback } from 'react'
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
import useChangeBlogPublishStatus from '@/hooks/blog/useChangeBlogPublishStatus'
import { BlogType } from '@/lib/types'

const PublishStatusDropdown = ({ row }: { row: Row<BlogType> }) => {
    const { onOpen: onAlertOpen } = useAlertModal()
    const { onOpen: onDialogOpen } = useDialogModal()
    const { data: userData } = useCurrentUser()

    const { onPublishStatusChange } = useChangeBlogPublishStatus({
        blogId: row.getValue('id'), title: row.getValue('title'), publish: row.getValue('published')
    })

    const handleStatus = useCallback(async (publish: boolean) => {
        if (userData?.role === 'USER') {
            return onAlertOpen({
                title: 'Unauthorized',
                description: 'Users with administration access are allowed to change the data.'
            })
        }

        if (userData?.username !== row.getValue('author')) {
            return onAlertOpen({
                title: 'Data Tampering',
                description: 'Only authors of the blog are allowed to change the publish status.'
            })
        }

        if (row.getValue('published') === publish) {
            return onAlertOpen({
                title: `Redundant action`,
                description: `Publish Status is already ${publish}.`
            })
        }

        onDialogOpen({
            title: 'Are you sure',
            description: `Do you want to change the status from ${publish ? '"FALSE"' : '"TRUE"'} to ${publish ? '"TRUE"' : '"FALSE"'}`,
            async action() {
                await onPublishStatusChange(row.getValue('id'), publish)
            }
        })
    }, [onPublishStatusChange, userData, onAlertOpen, onDialogOpen, row])

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="ring-0 hover:bg-none">
                <Button variant="ghost" className="p-0 py-0 outline-none ring-0 hover:bg-none" size={'sm'}>
                    <span className="uppercase"> {row.getValue('published') ? 'true' : 'false'}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Status</DropdownMenuLabel>
                {
                    ['TRUE', 'FALSE'].map((status) => (
                        <DropdownMenuItem key={status ? 't' : 'f'} onClick={() => handleStatus(status === 'TRUE' ? true : false)}>
                            {status}
                        </DropdownMenuItem>
                    ))
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default PublishStatusDropdown