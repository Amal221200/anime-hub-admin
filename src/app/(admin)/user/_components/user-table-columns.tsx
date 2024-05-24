import { User } from "@prisma/client";
import { ArrowUpDown } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import RoleDropdown from "./RoleDropdown";
import UserAvatar from "@/components/UserAvatar";

export const userColumns: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "",
        cell: "",
    },
    {
        accessorKey: "imageUrl",
        header: () => (
            <h6 className="text-xs sm:text-sm">Image</h6>
        ),
        cell: ({ row }) => (
            <UserAvatar imageLink={row.getValue('imageUrl')} username={row.getValue('username')} />
        ),
    },
    {
        accessorKey: "username",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="group text-xs sm:text-sm"
                    size="sm"
                >
                    Username
                    <ArrowUpDown className="ml-2 hidden h-4 w-4 group-hover:block" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <p className="text-xs sm:text-sm">{row.getValue("username")}</p>
        ),
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")} className="group text-xs sm:text-sm"
                    size="sm"
                >
                    Email
                    <ArrowUpDown className="ml-2 hidden h-4 w-4 group-hover:block" />
                </Button>
            )
        },
        cell: ({ row }) => (
            <p className="text-xs sm:text-sm">{row.getValue("email")}</p>
        ),
    },
    {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => (
            <RoleDropdown row={row} />
        ),
    },
]