"use client"
import adminUserColumns from "./admin-user-table-columns"
import useTable from "@/hooks/useTable"
import ReactTable from "@/components/ReactTable"
import { AdminUser } from "@prisma/client"


export default function UserTable({ adminUsers }: { adminUsers: AdminUser[] }) {

    const { table, pagination } = useTable(adminUsers || [], adminUserColumns, { visibility: { id: false } })

    return (
        <ReactTable table={table} pagination={pagination} columns={adminUserColumns} label="user" filterColumn="username" />
    )
}
