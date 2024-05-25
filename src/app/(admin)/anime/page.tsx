import { Metadata } from 'next'
import React, { lazy, Suspense } from 'react'
import SkeletonSpinner from '@/components/SkeletonSpinner'

const AnimeTable = lazy(() => import('./_components/AnimeTable'))

export const metadata: Metadata = {
  title: 'Animes',
  description: "All the Anime Hub animes.",
}

const AnimesPage = () => {

  return (
    <main>
      <Suspense fallback={<SkeletonSpinner className='h-[90vh]' />}>
        <AnimeTable  />
      </Suspense>
    </main>
  )
}

export default AnimesPage