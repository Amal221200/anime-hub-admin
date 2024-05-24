import SkeletonSpinner from "@/components/SkeletonSpinner"
import { Metadata } from "next"
import { lazy, Suspense } from "react"
const AnimeForm = lazy(() => import('@/components/AnimeForm'))

export const metadata: Metadata = {
  title: 'Add Anime',
  description: "Add anime data.",
}


const AddAnimePage = () => {
  return (
    <div>
      <Suspense fallback={<SkeletonSpinner />}>
        <AnimeForm heading="Add Anime"/>
      </Suspense>
    </div>
  )
}

export default AddAnimePage