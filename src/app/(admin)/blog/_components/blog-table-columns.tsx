import UserAvatar from "@/components/UserAvatar";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import ActionsDropdown from "./ActionsDropdown";
import { BlogType } from "@/lib/types";
import Link from "next/link";

const blogColumns: ColumnDef<BlogType>[] = [
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
            <Link href={`/blog/${row.getValue('id')}`} className="line-clamp-1 capitalize transition-all hover:font-semibold hover:underline">
                {row.getValue("title")}
            </Link>
        ),
    },
    {
        accessorKey: "author",
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
            <p>{row.getValue("author")}</p>
        ),
    },
    {
        accessorKey: "content",
        header: () => (
            <h6 className="text-xs sm:text-sm">Content</h6>
        ),
        cell: ({ row }) => (
            <p className="font-semibold uppercase">{(row.getValue('content') as string).length > 30 ? 'true' : 'false'}</p>
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

export default blogColumns;