import { Anime } from "@prisma/client";
import UserAvatar from "@/components/UserAvatar";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const blogColumns: ColumnDef<Anime>[] = [
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
            <div className="capitalize">{row.getValue("title")}</div>
        ),
    }
]

export default blogColumns;