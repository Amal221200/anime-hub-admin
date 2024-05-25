import React, { lazy, Suspense } from 'react'
import SkeletonSpinner from '@/components/SkeletonSpinner';
import { Metadata } from 'next';
const AdminUserTable = lazy(() => import('./_components/AdminUserTable'))

export const metadata: Metadata = {
  title: 'Users',
  description: "All the Anime Hub users.",
}

const UsersPage = () => {

  return (
    <main>
      <Suspense fallback={<SkeletonSpinner className='h-[90vh]' />}>
        <AdminUserTable />
      </Suspense>
    </main>
  )
}

export default UsersPage