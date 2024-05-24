import { getAnime } from '@/lib/actions/anime'
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

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
      {anime.title}
    </div>
  )
}

export default AnimePage