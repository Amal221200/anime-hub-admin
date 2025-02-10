import SkeletonSpinner from "@/components/SkeletonSpinner"
import { Metadata } from "next"
import dynamic from "next/dynamic"

const MerchandiseTable = dynamic(() => import('./_components/MerchandiseTable'), { loading: () => <SkeletonSpinner className="h-[90vh]" /> })

export const metadata: Metadata = {
  title: 'Merchandise',
  description: "All the Anime Hub merchandises.",
}

const MerchandisePage = () => {
  return (
    <main>
        <MerchandiseTable />
    </main>
  )
}

export default MerchandisePage