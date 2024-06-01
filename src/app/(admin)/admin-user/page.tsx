import SkeletonSpinner from '@/components/SkeletonSpinner';
import { getAdminUsers } from '@/lib/actions/admin-user';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';

const AdminUserTable = dynamic(() => import('./_components/AdminUserTable'), {
  ssr: true,
  loading: () => <SkeletonSpinner className='h-[90vh]' />
}
)

export const metadata: Metadata = {
  title: 'Users',
  description: "All the Anime Hub users.",
}

const AdminUsersPage = async () => {
  const adminUsers = await getAdminUsers()

  if (!adminUsers) {
    return <h1 className='text-center'>{"Could'nt"} fetch admin users</h1>
  }

  return (
    <main>
      <AdminUserTable adminUsers={adminUsers} />
    </main>
  )
}

export default AdminUsersPage