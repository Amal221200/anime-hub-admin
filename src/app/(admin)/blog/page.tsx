import SkeletonSpinner from "@/components/SkeletonSpinner"
import { getBlogs } from "@/lib/actions/blog"
import dynamic from "next/dynamic"
import { redirect } from "next/navigation"

const BlogsTable = dynamic(() => import('./_components/BlogsTable'), { ssr: true, loading: () => <SkeletonSpinner /> })

const BlogsPage = async () => {
  const blogs = await getBlogs()

  if (!blogs) {
    return <h1 className="text-center">{"Couldn't"} fetch blogs</h1>
  }

  return (
    <main>
      <BlogsTable blogs={blogs} />
    </main>
  )
}

export default BlogsPage