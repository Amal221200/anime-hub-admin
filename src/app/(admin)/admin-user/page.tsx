import SkeletonSpinner from '@/components/SkeletonSpinner';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const AdminUserTable = dynamic(() => import('./_components/AdminUserTable'), { ssr: false, loading: () => <SkeletonSpinner className='h-[90vh]' /> })

export const metadata: Metadata = {
  title: 'Users',
  description: "All the Anime Hub users.",
}

const AdminUsersPage = () => {

  return (
    <main>
      <AdminUserTable />
    </main>
  )
}

export default AdminUsersPage