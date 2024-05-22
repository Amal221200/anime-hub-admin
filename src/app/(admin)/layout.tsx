import React from 'react'
import DesktopSidebar from './_components/desktop-sidebar'
import MobileNavbar from './_components/MobileNavbar'
import MobileUserButton from './_components/MobileUserButton'

function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <MobileUserButton />
            <DesktopSidebar />
            <div className='px-3 pt-10 sm:ml-[220px] sm:px-4 md:ml-[250px]'>
                {children}
            </div>
            <MobileNavbar />
        </div>
    )
}

export default AdminLayout