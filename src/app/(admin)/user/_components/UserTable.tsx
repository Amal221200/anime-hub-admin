"use client"
import userColumns from "./user-table-columns"
import useTable from "@/hooks/useTable"
import ReactTable from "@/components/ReactTable"
import { User } from "@prisma/client"


export default function UserTable({ users }: { users: User[] }) {

    const { table, pagination } = useTable(users || [], userColumns, { visibility: { id: false } })

    return (
        <ReactTable table={table} pagination={pagination} columns={userColumns} label="user" filterColumn="username" />
    )
}
