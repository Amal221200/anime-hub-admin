"use client"
import useTable from "@/hooks/useTable"
import blogColumns from "./blog-table-columns"
import ReactTable from "@/components/ReactTable"
import { BlogType } from "@/lib/types"

export default function BlogTable({ blogs }: { blogs: BlogType[] }) {

    const { table, pagination } = useTable(blogs || [], blogColumns)
    return (
        <ReactTable table={table} pagination={pagination} columns={blogColumns} filterColumn="title" label="blog" />
    )
}
