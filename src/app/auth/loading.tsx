import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const AuthLoading = () => {
    return (
        <main className="grid h-screen w-full place-content-center">
            <Skeleton className="sx:min-h-72 sx:min-w-72 xs:min-h-80 xs:min-w-80 m-10 min-h-60 min-w-60 rounded-lg" />
        </main>
    )
}

export default AuthLoading