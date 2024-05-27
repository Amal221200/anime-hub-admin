import SkeletonSpinner from "@/components/SkeletonSpinner"
import { Metadata } from "next"
import dynamic from "next/dynamic"
import { Suspense } from "react"

const MerchandiseTable = dynamic(() => import('./_components/MerchandiseTable'), { ssr: false })

export const metadata: Metadata = {
  title: 'Merchandise',
  description: "All the Anime Hub merchandises.",
}

const MerchandisePage = () => {
  return (
    <main>
      <Suspense fallback={<SkeletonSpinner />}>
        <MerchandiseTable />
      </Suspense>
    </main>
  )
}

export default MerchandisePage