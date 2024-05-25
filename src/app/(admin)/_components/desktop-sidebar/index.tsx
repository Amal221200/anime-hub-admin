import Image from 'next/image'
import React from 'react'
import { CircleUserIcon, HomeIcon, PlusIcon, ScanBarcodeIcon, ShellIcon, UserIcon } from "lucide-react"
import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import NavItems from './NavItems'
import { currentUser } from "@clerk/nextjs/server"

export const sidebarLinks = [
  {
    href: "/",
    icon: HomeIcon,
    label: "Home"
  },
  {
    href: "/user",
    label: "User",
    icon: UserIcon
  },
  {
    href: "/admin-user",
    label: "Admin Users",
    icon: CircleUserIcon
  },
  {
    href: "/anime",
    label: "Anime",
    icon: ShellIcon
  },
  {
    href: "/merchandise",
    label: "Merchandise",
    icon: ScanBarcodeIcon
  },
  {
    href: "/anime/add",
    label: "Add Anime",
    icon: PlusIcon
  },
]

const DesktopSidebar = async () => {
  // const user = await currentUser()
  return (
    <aside className='fixed left-2 top-10 hidden h-[89vh] w-[200px] flex-col gap-y-4 rounded-md border bg-zinc-900/20 p-2 sm:flex md:left-7'>
      <nav className='flex-1 space-y-4'>
        <div>
          <Link href="/">
            <Image src="/logo-header-dark.png" alt='logo' width={200} height={50} className='' />
          </Link>
        </div>

        <NavItems className='pl-2' />
      </nav>

      <menu className='flex flex-col items-start pl-2'>
        <li className='flex items-center gap-x-2'>
          <UserButton showName />
        </li>
      </menu>
    </aside>
  )
}

export default DesktopSidebar