import MobileNavbar from './_components/MobileNavbar'
import SkeletonSpinner from '@/components/SkeletonSpinner'
import dynamic from 'next/dynamic'

const DesktopSidebar = dynamic(() => import('./_components/desktop-sidebar'), {
    loading: () => <SkeletonSpinner className='fixed left-2 top-10 hidden h-[89vh] w-[200px] items-center justify-center gap-y-4 rounded-md border bg-zinc-900/20 p-2 sm:flex md:left-7' />,
})

const MobileUserButton = dynamic(() => import('./_components/MobileUserButton'))
const DialogModal = dynamic(() => import("@/components/modal/DialogModal"))
const AlertModal = dynamic(() => import('@/components/modal/AlertModal'))
const Toaster = dynamic(() => import('@/components/ui/sonner'))

function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <div>
            <MobileUserButton />
            <DesktopSidebar />
            <div className='mb-[4rem] min-h-screen px-3 pt-10 sm:mb-0 sm:ml-[220px] sm:px-4 md:ml-[250px]'>
                {children}
            </div>
            <MobileNavbar />
            <AlertModal />
            <DialogModal />
            <Toaster richColors position='top-right' closeButton />
        </div>
    )
}

export default AdminLayout