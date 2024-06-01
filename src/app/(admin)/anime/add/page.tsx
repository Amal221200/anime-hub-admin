import { Metadata } from "next"
import { Suspense } from "react"
import { FORM_TYPE } from '@/lib/types'
import SkeletonSpinner from "@/components/SkeletonSpinner"
import dynamic from "next/dynamic"

const AnimeForm = dynamic(() => import('@/components/forms/AnimeForm'), { ssr: true })

export const metadata: Metadata = {
  title: 'Add Anime',
  description: "Add anime data.",
}


const AddAnimePage = () => {
  return (
    <div>
      <Suspense fallback={<SkeletonSpinner />}>
        <AnimeForm heading="Add Anime" type={FORM_TYPE.ADD} />
      </Suspense>
    </div>
  )
}

export default AddAnimePage