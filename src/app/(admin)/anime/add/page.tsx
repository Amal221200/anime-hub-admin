import { Metadata } from "next"
import { lazy, Suspense } from "react"
import { ANIME_FORM_TYPE } from '@/lib/types'
import SkeletonSpinner from "@/components/SkeletonSpinner"

const AnimeForm = lazy(() => import('@/components/AnimeForm'))

export const metadata: Metadata = {
  title: 'Add Anime',
  description: "Add anime data.",
}


const AddAnimePage = () => {
  return (
    <div>
      <Suspense fallback={<SkeletonSpinner />}>
        <AnimeForm heading="Add Anime" type={ANIME_FORM_TYPE.ADD}/>
      </Suspense>
    </div>
  )
}

export default AddAnimePage