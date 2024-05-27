import { Suspense } from 'react'
import SkeletonSpinner from '@/components/SkeletonSpinner';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const AdminUserTable = dynamic(() => import('./_components/AdminUserTable'), { ssr: false })

export const metadata: Metadata = {
  title: 'Users',
  description: "All the Anime Hub users.",
}

const AdminUsersPage = () => {

  return (
    <main>
      <Suspense fallback={<SkeletonSpinner className='h-[90vh]' />}>
        <AdminUserTable />
      </Suspense>
    </main>
  )
}

export default AdminUsersPage