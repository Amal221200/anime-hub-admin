import React from 'react'
import AnimeTable from './_components/AnimeTable'
import { getAnimes } from '@/lib/actions/anime'

const AnimesPage = async () => {
  const animesData = await getAnimes({})

  if (!animesData.animes) {
    return <h1>Animes not Fetched</h1>
  }

  return (
    <main>
      <AnimeTable animesData={animesData} />
    </main>
  )
}

export default AnimesPage