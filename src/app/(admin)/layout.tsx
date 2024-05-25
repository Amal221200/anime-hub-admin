import React, { lazy, Suspense } from 'react'
import MobileNavbar from './_components/MobileNavbar'
import MobileUserButton from './_components/MobileUserButton'
import SkeletonSpinner from '@/components/SkeletonSpinner'
import { Toaster } from '@/components/ui/toaster'
import AlertModal from '@/components/modal/AlertModal'

const DesktopSidebar = lazy(() => import('./_components/desktop-sidebar'))

function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <MobileUserButton />
            <Suspense fallback={
                <SkeletonSpinner className='fixed left-2 top-10 hidden h-[89vh] w-[200px] items-center justify-center gap-y-4 rounded-md border bg-zinc-900/20 p-2 sm:flex md:left-7' />
            }>
                <DesktopSidebar />
            </Suspense>
            <div className='min-h-screen px-3 pt-10 sm:ml-[220px] sm:px-4 md:ml-[250px]'>
                <Suspense fallback={<SkeletonSpinner />}>
                    {children}
                </Suspense>
            </div>
            <MobileNavbar />
            <AlertModal />
            <Toaster />
        </div>
    )
}

export default AdminLayout