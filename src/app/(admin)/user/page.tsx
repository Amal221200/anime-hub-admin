import React, { lazy, Suspense } from 'react'
import SkeletonSpinner from '@/components/SkeletonSpinner';
import { Metadata } from 'next';
const UserTable = lazy(() => import('./_components/UserTable'))

export const metadata: Metadata = {
  title: 'Users',
  description: "All the Anime Hub users.",
}

const UsersPage = () => {

  return (
    <main>
      <Suspense fallback={<SkeletonSpinner className='h-[90vh]' />}>
        <UserTable />
      </Suspense>
    </main>
  )
}

export default UsersPage