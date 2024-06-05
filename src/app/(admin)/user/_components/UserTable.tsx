"use client"
import userColumns from "./user-table-columns"
import useTable from "@/hooks/useTable"
import ReactTable from "@/components/ReactTable"
import useFetchUsers from "@/hooks/user/useFetchUsers"


export default function UserTable() {
    const { users, isLoading } = useFetchUsers()
    const { table, pagination } = useTable(users || [], userColumns, { visibility: { id: false } })

    return (
        <ReactTable table={table} isLoading={isLoading} pagination={pagination} columns={userColumns} label="user" filterColumn="username" />
    )
}
