"use client"
import useTable from "@/hooks/useTable"
import blogColumns from "./blog-table-columns"
import ReactTable from "@/components/ReactTable"
import useFetchBlogs from "@/hooks/blog/useFetchBlogs"

export default function BlogTable() {
    const { blogs, isLoading } = useFetchBlogs()
    const { table, pagination } = useTable(blogs || [], blogColumns)

    return (
        <ReactTable table={table} isLoading={isLoading} pagination={pagination} columns={blogColumns} filterColumn="title" label="blog" />
    )
}
