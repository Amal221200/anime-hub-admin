"use client"

import useFetchBlogs from "@/hooks/blog/useFetchBlogs"
import useTable from "@/hooks/useTable"
import blogColumns from "./blog-table-columns"
import ReactTable from "@/components/ReactTable"

export default function MerchandiseTable() {

    const { blogs, isLoading } = useFetchBlogs()

    const { table, pagination } = useTable(blogs || [], blogColumns)
    return (
        <ReactTable table={table} pagination={pagination} 
        isLoading={isLoading} columns={blogColumns} filterColumn="title" label="blog" />
    )
}
