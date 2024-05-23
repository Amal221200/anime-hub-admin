import { User } from "@prisma/client";
import UserAvatar from "@/components/UserAvatar";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown } from "lucide-react";

export const animeColums: ColumnDef<User>[] = [
    {
        accessorKey: "id",
        header: "",
        cell: "",
        size:0
    },
    {
        accessorKey: "imageUrl",
        header: ()=> (
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
            <DropdownMenu >
                <DropdownMenuTrigger asChild className="text-xs sm:text-sm" onClick={(e)=> e.stopPropagation()}>
                    <Button variant="ghost" className="p-0 py-0 outline-none ring-0 hover:bg-none" size={'sm'}>
                        {row.getValue('role')}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="space-y-1">
                    <DropdownMenuLabel>Roles</DropdownMenuLabel>
                    {["ADMIN", "USER"].map((role)=> (
                        <DropdownMenuItem className="text-xs sm:text-sm" key={role} onClick={(e)=> e.stopPropagation()}>
                            {role}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]