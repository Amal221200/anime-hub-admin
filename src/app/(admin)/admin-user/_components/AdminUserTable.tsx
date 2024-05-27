"use client"
import adminUserColumns from "./admin-user-table-columns"
import useFetchAdminUsers from "@/hooks/admin-user/useFetchAdminUsers"
import useTable from "@/hooks/useTable"
import ReactTable from "@/components/ReactTable"


export default function UserTable() {
    const { adminUsers, isLoading } = useFetchAdminUsers()

    const { table, pagination } = useTable(adminUsers || [], adminUserColumns, { id: false })

    return (
        <ReactTable table={table} pagination={pagination}
            isLoading={isLoading} columns={adminUserColumns}
            label="user" filterColumn="username" />
    )
}
