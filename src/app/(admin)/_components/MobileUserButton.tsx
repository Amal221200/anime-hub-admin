import { UserButton } from '@clerk/nextjs'
import React from 'react'

const MobileUserButton = () => {
  return (
    <div className='absolute right-3 top-2 z-[1000] block sm:hidden'>
        <UserButton />
    </div>
  )
}

export default MobileUserButton