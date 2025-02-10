"use client";

import dynamic from 'next/dynamic';

const UserButton = dynamic(() => import('@clerk/nextjs').then(m => m.UserButton), { ssr: false })

export default function ClerkButton() {
    return (
        <UserButton showName />
    )
}