import SkeletonSpinner from '@/components/SkeletonSpinner'
import { getBlog } from '@/lib/actions/blog'
import { FORM_TYPE } from '@/lib/types'
import dynamic from 'next/dynamic'

const BlogForm = dynamic(() => import('@/components/forms/BlogForm'), { ssr: true, loading: () => <SkeletonSpinner className='h-[40vh]' /> })

const BlogEditor = dynamic(() => import('@/components/blog-editor'), { ssr: false, loading: () => <SkeletonSpinner className='h-[50vh]' /> })

const BlogPage = async ({ params: { blogId } }: { params: { blogId: string } }) => {
    const blog = await getBlog(blogId);
    
    if (!blog) {
        return <h1>{"Couldn't"} fetch blog</h1>
    }
    
    return (
        <div className='mb-6 space-y-8'>
            <BlogForm heading={`Add a blog`} type={FORM_TYPE.EDIT} blog={blog} />
            <BlogEditor title="Add a blog" content={blog.content} blogId={blog.id} />
        </div>
    )
}

export default BlogPage