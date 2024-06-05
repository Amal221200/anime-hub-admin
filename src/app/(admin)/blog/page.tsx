import SkeletonSpinner from "@/components/SkeletonSpinner"
import dynamic from "next/dynamic"

const BlogsTable = dynamic(() => import('./_components/BlogsTable'), { ssr: true, loading: () => <SkeletonSpinner /> })

const BlogsPage = () => {

  return (
    <main>
      <BlogsTable />
    </main>
  )
}

export default BlogsPage