import { Suspense } from 'react'
import { addAnime, updateAnime, deleteAnime, updateAnimeStatus } from '@/lib/actions/anime'
import { updateAdminUserRole } from '@/lib/actions/admin-user'
import { addBlog, deleteBlog, updateBlog, updateBlogContent } from '@/lib/actions/blog'
import MobileNavbar from './_components/MobileNavbar'
import MobileUserButton from './_components/MobileUserButton'
import SkeletonSpinner from '@/components/SkeletonSpinner'
import dynamic from 'next/dynamic'
import ActionsProvider from '@/components/providers/ActionsProvider'

const DesktopSidebar = dynamic(() => import('./_components/desktop-sidebar'), {
    loading: () => <SkeletonSpinner className='fixed left-2 top-10 hidden h-[89vh] w-[200px] items-center justify-center gap-y-4 rounded-md border bg-zinc-900/20 p-2 sm:flex md:left-7' />
})
const DialogModal = dynamic(() => import("@/components/modal/DialogModal"), { ssr: false })
const AlertModal = dynamic(() => import('@/components/modal/AlertModal'), { ssr: false })
const Toaster = dynamic(() => import('@/components/ui/sonner'), { ssr: false })

function AdminLayout({ children }: { children: React.ReactNode }) {

    return (
        <ActionsProvider actions={{ addAnime, updateAnime, deleteAnime, addBlog, deleteBlog, updateBlog, updateBlogContent, updateAdminUserRole, updateAnimeStatus }}>
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
        </ActionsProvider>
    )
}

export default AdminLayout