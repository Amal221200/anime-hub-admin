"use client"

import { useEffect, useState } from "react"
import {
    ColumnFiltersState,
    PaginationState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { useMediaQuery } from "usehooks-ts"
import { ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Anime } from "@prisma/client"
import { animeColums } from "./anime-table-columns"
import Link from "next/link"
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchAnimes } from "./functions"
import SkeletonSpinner from "@/components/SkeletonSpinner"



interface AnimeTableProps {
    animesData: {
        animes: Anime[],
        totalPages: number
    }
}

export default function AnimeTable() {
    const queryClient = useQueryClient()
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const [mounted, setMounted] = useState(false);
    const match = useMediaQuery('(min-width:640px)')

    const [columnVisibility, setColumnVisibility] =
        useState<VisibilityState>({ studio: match, artist: match })
    // const [rowSelection, setRowSelection] = useState({})
    const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 6 })

    const { data: animes, isLoading } = useQuery({ queryKey: ['animes'], queryFn: fetchAnimes }, queryClient)

    const table = useReactTable({
        data: animes || [],
        columns: animeColums,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        // onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            // rowSelection,
            pagination
        },
    })

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="w-full">
            <div className="flex flex-col items-center gap-2 py-4 sm:flex-row">
                <Input
                    placeholder="Filter anime..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    column.id === "id" ? null : (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            {
                isLoading ? <SkeletonSpinner /> : (
                    <>
                        <div className="rounded-md border">
                            <Table>
                                <TableHeader>
                                    {table.getHeaderGroups().map((headerGroup) => (
                                        <TableRow key={headerGroup.id}>
                                            {headerGroup.headers.map((header) => {
                                                return (
                                                    <TableHead key={header.id}>
                                                        {header.isPlaceholder
                                                            ? null
                                                            : flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                    </TableHead>
                                                )
                                            })}
                                        </TableRow>
                                    ))}
                                </TableHeader>
                                <TableBody>
                                    {table.getRowModel().rows?.length ? (
                                        table.getRowModel().rows.map((row) => (
                                            <TableRow
                                                key={row.id}
                                                data-state={row.getIsSelected() && "selected"}
                                            >
                                                {row.getVisibleCells().map((cell) => (
                                                    <TableCell key={cell.id} className="">
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={animeColums.length}
                                                className="h-24 text-center"
                                            >
                                                No results.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="flex items-center justify-end space-x-2 py-4">
                            <div className="flex-1 text-sm text-muted-foreground">
                                {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
                                {table.getFilteredRowModel().rows.length} animes.
                            </div>
                            <div className="space-x-2">
                                <span className="text-xs sm:text-base">
                                    Page {pagination.pageIndex + 1} / {table.getPageCount()}
                                </span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.previousPage()}
                                    disabled={!table.getCanPreviousPage()}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => table.nextPage()}
                                    disabled={!table.getCanNextPage()}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}
