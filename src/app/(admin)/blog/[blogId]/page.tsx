import BlogEditorLoading from '@/components/loading/BlogEditorLoading'
import SkeletonSpinner from '@/components/SkeletonSpinner'
import { getBlog } from '@/lib/actions/blog'
import getCurrentUser from '@/lib/actions/getCurrentUser'
import { FORM_TYPE } from '@/lib/types'
import dynamic from 'next/dynamic'

const BlogForm = dynamic(() => import('@/components/forms/BlogForm'), { ssr: true, loading: () => <SkeletonSpinner className='h-[40vh]' /> })

const BlogEditor = dynamic(() => import('@/components/blog-editor'), { loading: () => <BlogEditorLoading /> })

const BlogPage = async (props: { params: Promise<{ blogId: string }> }) => {
    const params = await props.params;

    const {
        blogId
    } = params;

    const blog = await getBlog(blogId);
    const user = await getCurrentUser()

    if (!blog) {
        return <h1>{"Couldn't"} fetch blog</h1>
    }

    return (
        <div className='mb-6 space-y-8'>
            <BlogForm heading={`Edit ${blog.title}`} type={FORM_TYPE.EDIT} blog={blog} />
            <BlogEditor title="Content" content={blog.content} blogId={blog.id} editable={blog.author === user?.username || blog.title === 'Demo'} />
        </div>
    )
}

export default BlogPage