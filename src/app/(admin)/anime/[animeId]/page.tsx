import { ANIME_FORM_TYPE } from '@/lib/types';
import SkeletonSpinner from '@/components/SkeletonSpinner';
import { getAnime } from '@/lib/actions/anime'
import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { lazy, Suspense } from 'react';

const AnimeForm = lazy(() => import('@/components/AnimeForm'))

export async function generateMetadata({ params: { animeId } }: { params: { animeId: string } }): Promise<Metadata> {
  const anime = await getAnime(animeId);

  if (!anime) {
    redirect('/404')
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
    return
  }

  return (
    <div>
      <Suspense fallback={<SkeletonSpinner />}>
        <AnimeForm anime={anime} heading={`Edit ${anime.title}`} type={ANIME_FORM_TYPE.EDIT} />
      </Suspense>
    </div>
  )
}

export default AnimePage