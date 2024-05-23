import { getAnime } from '@/lib/actions/anime'
import React from 'react'

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