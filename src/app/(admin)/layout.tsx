import React from 'react'

function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className='min-h-screen'>
            {children}
        </div>
    )
}

export default AdminLayout