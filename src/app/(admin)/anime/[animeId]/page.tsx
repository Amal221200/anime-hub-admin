import { Metadata } from 'next';
import { FORM_TYPE } from '@/lib/types';
import { getAnime } from '@/lib/actions/anime'
import SkeletonSpinner from '@/components/SkeletonSpinner';
import dynamic from 'next/dynamic';

const AnimeForm = dynamic(() => import('@/components/forms/AnimeForm'), { ssr: true, loading: () => <SkeletonSpinner className='h-[80vh]' /> })

export async function generateMetadata({ params: { animeId } }: { params: { animeId: string } }): Promise<Metadata> {
  const anime = await getAnime(animeId);

  if (!anime) {
    return {}
  }

  return {
    title: anime.title,
    description: anime.description,
    keywords: [anime.title, ...anime.genre, anime.artist, anime.studio]
  }
}

const AnimePage = async ({ params: { animeId } }: { params: { animeId: string } }) => {
  const anime = await getAnime(animeId);

  if (!anime) {
    return <h1>{"Couldn't"} fetch anime</h1>
  }

  return (
    <div>
      <AnimeForm anime={anime} heading={`Edit ${anime.title}`} type={FORM_TYPE.EDIT} />
    </div>
  )
}

export default AnimePage