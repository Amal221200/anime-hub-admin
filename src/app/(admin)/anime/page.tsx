import { Metadata } from 'next'
import { Suspense } from 'react'
import SkeletonSpinner from '@/components/SkeletonSpinner'
import dynamic from 'next/dynamic'

const AnimeTable = dynamic(() => import('./_components/AnimeTable'), { ssr: false })

export const metadata: Metadata = {
  title: 'Animes',
  description: "All the Anime Hub animes.",
}

const AnimesPage = () => {

  return (
    <main>
      <Suspense fallback={<SkeletonSpinner className='h-[90vh]' />}>
        <AnimeTable />
      </Suspense>
    </main>
  )
}

export default AnimesPage