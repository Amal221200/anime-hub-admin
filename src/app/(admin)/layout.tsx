import { Suspense } from 'react'
import MobileNavbar from './_components/MobileNavbar'
import MobileUserButton from './_components/MobileUserButton'
import SkeletonSpinner from '@/components/SkeletonSpinner'
import dynamic from 'next/dynamic'

const DesktopSidebar = dynamic(() => import('./_components/desktop-sidebar'), {
    loading: () => <SkeletonSpinner className='fixed left-2 top-10 hidden h-[89vh] w-[200px] items-center justify-center gap-y-4 rounded-md border bg-zinc-900/20 p-2 sm:flex md:left-7' />
})
const DialogModal = dynamic(() => import("@/components/modal/DialogModal"), { ssr: false })
const AlertModal = dynamic(() => import('@/components/modal/AlertModal'), { ssr: false })
const Toaster = dynamic(() => import('@/components/ui/sonner'), { ssr: false })

function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <MobileUserButton />
            <DesktopSidebar />
            <div className='min-h-screen px-3 pt-10 sm:ml-[220px] sm:px-4 md:ml-[250px]'>
                <Suspense fallback={<SkeletonSpinner />}>
                    {children}
                </Suspense>
            </div>
            <MobileNavbar />
            <AlertModal />
            <DialogModal />
            <Toaster richColors position='top-right' closeButton />
        </div>
    )
}

export default AdminLayout