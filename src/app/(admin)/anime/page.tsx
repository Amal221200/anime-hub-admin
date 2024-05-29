import { Metadata } from 'next'
import SkeletonSpinner from '@/components/SkeletonSpinner'
import dynamic from 'next/dynamic'

const AnimeTable = dynamic(() => import('./_components/AnimeTable'), { ssr: false, 
  loading: () => <SkeletonSpinner className='h-[90vh]' /> })

export const metadata: Metadata = {
  title: 'Animes',
  description: "All the Anime Hub animes.",
}

const AnimesPage = () => {

  return (
    <main>
      <AnimeTable />
    </main>
  )
}

export default AnimesPage