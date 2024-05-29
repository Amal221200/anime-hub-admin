import { Metadata } from 'next';
import { lazy, Suspense } from 'react';
import { redirect } from 'next/navigation';
import { FORM_TYPE } from '@/lib/types';
import { getAnime } from '@/lib/actions/anime'
import SkeletonSpinner from '@/components/SkeletonSpinner';
import dynamic from 'next/dynamic';

const AnimeForm = dynamic(() => import('@/components/AnimeForm'), { ssr: false, loading: () => <SkeletonSpinner className='h-[80vh]' /> })

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
      <AnimeForm anime={anime} heading={`Edit ${anime.title}`} type={FORM_TYPE.EDIT} />
    </div>
  )
}

export default AnimePage