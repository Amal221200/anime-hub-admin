import SkeletonSpinner from '@/components/SkeletonSpinner';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
const UserTable = dynamic(() => import('./_components/UserTable'), { ssr: false, loading: () => <SkeletonSpinner className='h-[90vh]' /> })

export const metadata: Metadata = {
  title: 'Users',
  description: "All the Anime Hub users.",
}

const UsersPage = () => {

  return (
    <main>
      <UserTable />
    </main>
  )
}

export default UsersPage