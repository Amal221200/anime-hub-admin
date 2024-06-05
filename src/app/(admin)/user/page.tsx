import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import SkeletonSpinner from '@/components/SkeletonSpinner';

const UserTable = dynamic(() => import('./_components/UserTable'), {
  ssr: true,
  loading: () => <SkeletonSpinner className='h-[90vh]' />
})

export const metadata: Metadata = {
  title: 'Users',
  description: "All the Anime Hub users.",
}

const UsersPage = async () => {


  return (
    <main>
      <UserTable />
    </main>
  )
}

export default UsersPage