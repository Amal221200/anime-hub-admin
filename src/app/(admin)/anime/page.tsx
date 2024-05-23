import React, { lazy, Suspense } from 'react'
import { getAnimes } from '@/lib/actions/anime'
import SkeletonSpinner from '@/components/SkeletonSpinner'
const AnimeTable = lazy(() => import('./_components/AnimeTable'))

const AnimesPage = async () => {
  const animesData = await getAnimes({})

  if (!animesData.animes) {
    return <h1>Animes not Fetched</h1>
  }

  return (
    <main>
      <Suspense fallback={<SkeletonSpinner className='h-[90vh]' />}>
        <AnimeTable animesData={animesData} />
      </Suspense>
    </main>
  )
}

export default AnimesPage