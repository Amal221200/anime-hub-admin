import React, { lazy, Suspense } from 'react'
import { getUsers } from '@/lib/actions/user'
import SkeletonSpinner from '@/components/SkeletonSpinner';
import { Metadata } from 'next';
const UserTable = lazy(() => import('./_components/UserTable'))

export const metadata: Metadata = {
  title: 'Users',
  description: "All the Anime Hub users.",
}

const UsersPage = async () => {
  const users = await getUsers();

  if (!users) {
    return <h1>Users not Fetched</h1>
  }

  return (
    <main>
      <Suspense fallback={<SkeletonSpinner className='h-[90vh]' />}>
        <UserTable users={users} />
      </Suspense>
    </main>
  )
}

export default UsersPage