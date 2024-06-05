import { Metadata } from 'next'
import SkeletonSpinner from '@/components/SkeletonSpinner'
import dynamic from 'next/dynamic'

const AnimeTable = dynamic(() => import('./_components/AnimeTable'), {
  ssr: true,
  loading: () => <SkeletonSpinner className='h-[90vh]' />
})

export const metadata: Metadata = {
  title: 'Animes',
  description: "All the Anime Hub animes.",
}

const AnimesPage = async () => {

  return (
    <main>
      <AnimeTable />
    </main>
  )
}

export default AnimesPage