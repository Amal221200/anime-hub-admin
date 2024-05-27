import { Suspense } from 'react'
import SkeletonSpinner from '@/components/SkeletonSpinner';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
const UserTable = dynamic(() => import('./_components/UserTable'), { ssr: false })

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