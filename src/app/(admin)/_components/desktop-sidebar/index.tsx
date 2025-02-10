import Image from 'next/image'
import Link from 'next/link'
import NavItems from './NavItems'
import ClerkButton from './ClerkButton'

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
          <ClerkButton />
        </li>
      </menu>
    </aside>
  )
}

const Buttons = ()=> {

}

export default DesktopSidebar