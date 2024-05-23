import { Anime } from "@prisma/client";

import UserAvatar from "@/components/UserAvatar";

import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

export const animeColums: ColumnDef<Anime>[] = [
    {
        accessorKey: "imageLink",
        header: ()=> (
            <h6 className="text-xs sm:text-sm">Image</h6>
        ),
        cell: ({ row }) => (
            <UserAvatar imageLink={row.getValue('imageLink')} username={row.getValue('title')} />
        ),

    },
    {
        accessorKey: "title",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="group text-xs sm:text-sm"
                    size="sm"
                >
                    Title
                    <ArrowUpDown className="ml-2 hidden h-4 w-4 group-hover:block" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <p className="line-clamp-1 capitalize">{row.getValue("title")}</p>
        ),
    },
    {
        accessorKey: "status",
        header: ()=> (
            <h6 className="text-xs sm:text-sm">Status</h6>
        ),
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="ring-0 hover:bg-none">
                    <Button variant="ghost" className="p-0 py-0 outline-none ring-0 hover:bg-none" size={'sm'}>
                        {(row.getValue('status') as string).toLowerCase()}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Status</DropdownMenuLabel>
                    {
                        ['Ongoing', 'Completed'].map((status) => (
                            <DropdownMenuItem key={status}>{status}</DropdownMenuItem>
                        ))
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
    {
        accessorKey: "studio",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="group text-xs sm:text-sm"
                    size="sm"
                >
                    Studio
                    <ArrowUpDown className="ml-2 hidden h-4 w-4 group-hover:block" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <p className="capitalize">{row.getValue("studio")}</p>
        ),
    },
    {
        accessorKey: "artist",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="group text-xs sm:text-sm"
                    size="sm"
                >
                    Artist
                    <ArrowUpDown className="ml-2 hidden h-4 w-4 group-hover:block" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <p className="capitalize">{row.getValue("artist")}</p>
        ),
    },
    {
        accessorKey: "id",
        header: "",
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild className="">
                    <Button variant="ghost" className="p-0 py-0 outline-none ring-0 hover:bg-none" size={'sm'}>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="space-y-1">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem className="p-0">
                        <Button variant="outline" size="sm" className="inline-block h-full w-full border-red-600 px-0 py-1 pl-2 text-left text-red-600 hover:text-red-600">
                            Delete
                        </Button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]