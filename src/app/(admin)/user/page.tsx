import React from 'react'
import UserTable from './_components/UserTable'
import { getUsers } from '@/lib/actions/user'

const UsersPage = async () => {
  const users = await getUsers();

  if(!users){
    return <h1>Users not Fetched</h1>
  }
  
  return (
    <div>
      <UserTable users={users} />
    </div>
  )
}

export default UsersPage