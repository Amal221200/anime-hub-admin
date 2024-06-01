import SkeletonSpinner from '@/components/SkeletonSpinner';
import {  getUsers } from '@/lib/actions/user';
import { Metadata } from 'next';
import dynamic from 'next/dynamic';
const UserTable = dynamic(() => import('./_components/UserTable'), { ssr: true, loading: () => <SkeletonSpinner className='h-[90vh]' /> })

export const metadata: Metadata = {
  title: 'Users',
  description: "All the Anime Hub users.",
}

const UsersPage = async () => {
  const users = await getUsers();
  
  if(!users){
    return <h1 className='text-center'>{"Couldn't"} fetch users</h1>
  }
  
  return (
    <main>
      <UserTable users={users} />
    </main>
  )
}

export default UsersPage