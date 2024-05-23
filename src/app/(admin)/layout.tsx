import React, { Suspense } from 'react'
import DesktopSidebar from './_components/desktop-sidebar'
import MobileNavbar from './_components/MobileNavbar'
import MobileUserButton from './_components/MobileUserButton'
import SkeletonSpinner from '@/components/SkeletonSpinner'

function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <MobileUserButton />
            <Suspense fallback={<SkeletonSpinner />}>
                <DesktopSidebar />
            </Suspense>
            <div className='min-h-screen px-3 pt-10 sm:ml-[220px] sm:px-4 md:ml-[250px]'>
                <Suspense fallback={<SkeletonSpinner />}>
                    {children}
                </Suspense>
            </div>
            <MobileNavbar />
        </div>
    )
}

export default AdminLayout