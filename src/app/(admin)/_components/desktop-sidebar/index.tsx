import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { CircleUserIcon, HomeIcon, NewspaperIcon, PlusIcon, ShellIcon, UserIcon } from "lucide-react"
import NavItems from './NavItems'

const UserButton = dynamic(() => import('@clerk/nextjs').then(m => m.UserButton), { ssr: false })


const DesktopSidebar = () => {
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