"use client"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { sidebarLinks } from "."


const NavItems = ({ className }: { className?: string }) => {
    const pathname = usePathname()
    return (
        <div className={cn('flex flex-col gap-y-3', className)}>
            {
                sidebarLinks.slice(1).map((sidebarLink) => (
                    <Link key={sidebarLink.href} href={sidebarLink.href} className={cn('flex gap-x-2 rounded text-sm p-2 transition-colors hover:bg-zinc-900', sidebarLink.href === pathname && "bg-zinc-800 hover:bg-zinc-900")}>
                        <sidebarLink.icon size={20} /> {sidebarLink.label}
                    </Link>
                ))
            }
        </div>
    )
}

export default NavItems