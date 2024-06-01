import {
    ColumnDef,
    ColumnFiltersState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    PaginationState,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table"
import { useState } from "react"

export default function useTable<T>(data: Array<T>, columns: ColumnDef<T>[], options?: { visibility?: VisibilityState, pagination?: PaginationState }) {

    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(options?.visibility || {})
    const [pagination, setPagination] = useState<PaginationState>(options?.pagination || { pageIndex: 0, pageSize: 6 })

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            pagination
        },
    })

    return {
        table,
        sorting,
        columnFilters,
        columnVisibility,
        pagination
    }
}