"use client"
import adminUserColumns from "./admin-user-table-columns"
import useTable from "@/hooks/useTable"
import ReactTable from "@/components/ReactTable"
import useFetchAdminUsers from "@/hooks/admin-user/useFetchAdminUsers"


export default function UserTable() {
    const { adminUsers } = useFetchAdminUsers()
    const { table, pagination } = useTable(adminUsers || [], adminUserColumns, { visibility: { id: false } })

    return (
        <ReactTable table={table} pagination={pagination} columns={adminUserColumns} label="user" filterColumn="username" />
    )
}
