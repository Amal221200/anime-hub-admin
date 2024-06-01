import { Metadata } from 'next'
import SkeletonSpinner from '@/components/SkeletonSpinner'
import dynamic from 'next/dynamic'
import { getAnimes } from '@/lib/actions/anime'
import { redirect } from 'next/navigation'

const AnimeTable = dynamic(() => import('./_components/AnimeTable'), {
  ssr: true,
  loading: () => <SkeletonSpinner className='h-[90vh]' />
})

export const metadata: Metadata = {
  title: 'Animes',
  description: "All the Anime Hub animes.",
}

const AnimesPage = async () => {
  const animes = await getAnimes()
  if (!animes) {
    return <h1 className='text-center'>{"Could'nt"} fetch animes</h1>
  }
  return (
    <main>
      <AnimeTable animes={animes} />
    </main>
  )
}

export default AnimesPage