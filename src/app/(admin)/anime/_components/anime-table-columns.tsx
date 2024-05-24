import { Anime } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import UserAvatar from "@/components/UserAvatar";
import StatusDropdown from "./StatusDropdown";
import ActionsDropdown from "./ActionsDropdown";
import { Button } from "@/components/ui/button";

export const animeColums: ColumnDef<Anime>[] = [
    {
        accessorKey: "imageLink",
        header: () => (
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
            <Link href={`/anime/${row.getValue('id')}`} className="line-clamp-1 capitalize transition-all hover:font-semibold hover:underline">{row.getValue("title")}</Link>
        ),
    },
    {
        accessorKey: "status",
        header: () => (
            <h6 className="text-xs sm:text-sm">Status</h6>
        ),
        cell: ({ row }) => (
            <StatusDropdown row={row} />
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
            <ActionsDropdown row={row} />
        ),
    },
]