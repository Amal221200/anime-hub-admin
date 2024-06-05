"use client"
import useTable from "@/hooks/useTable"
import blogColumns from "./blog-table-columns"
import ReactTable from "@/components/ReactTable"
import useFetchBlogs from "@/hooks/blog/useFetchBlogs"
import { useEffect } from "react"
import useAlertModal from "@/hooks/useAlertModal"
import useCurrentUser from "@/hooks/current-user/useCurrentUser"

export default function BlogTable() {
    const { blogs, isLoading } = useFetchBlogs()
    const { table, pagination } = useTable(blogs || [], blogColumns)
    const { onOpen } = useAlertModal()
    const { data: user } = useCurrentUser()

    useEffect(() => {
        if (user?.role === 'USER') {
            onOpen({ description: 'You can edit the Demo blog to check my rich text editor', title: 'Notice' })
        }
    }, [user, onOpen])

    return (
        <ReactTable table={table} isLoading={isLoading} pagination={pagination} columns={blogColumns} filterColumn="title" label="blog" />
    )
}
