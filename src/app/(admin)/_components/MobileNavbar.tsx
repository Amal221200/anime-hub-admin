"use client"
import React from 'react'
import { sidebarLinks } from './desktop-sidebar'
import Link from 'next/link'
import { HomeIcon } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { UserButton } from '@clerk/nextjs'

const MobileNavbar = () => {
    const pathname = usePathname()
    return (
        <nav className='absolute bottom-7 left-[50%] flex -translate-x-[50%] transform items-center gap-x-2 rounded-full bg-zinc-800 p-1 backdrop-blur-md sm:hidden'>
            {
                sidebarLinks.map((sidebarLink) => (
                    <Link key={sidebarLink.href} href={sidebarLink.href} className={cn('py-1 px-2 rounded-full', sidebarLink.href === pathname && 'bg-white/80 text-black backdrop-blur-md')}>
                        <sidebarLink.icon size={15} />
                    </Link>
                ))
            }
        </nav>
    )
}

export default MobileNavbar