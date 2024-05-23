import React, { lazy, Suspense } from 'react'
import { getUsers } from '@/lib/actions/user'
import SkeletonSpinner from '@/components/SkeletonSpinner';
const UserTable = lazy(() => import('./_components/UserTable'))

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