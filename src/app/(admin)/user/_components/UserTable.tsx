"use client"
import userColumns from "./user-table-columns"
import useFetchUsers from "@/hooks/user/useFetchUsers"
import useTable from "@/hooks/useTable"
import ReactTable from "@/components/ReactTable"


export default function UserTable() {
    const { users, isLoading } = useFetchUsers()

    const { table, pagination } = useTable(users || [], userColumns, { id: false })

    return (
        <ReactTable table={table} pagination={pagination} isLoading={isLoading}
            columns={userColumns} label="user" filterColumn="username" />
    )
}
