import SkeletonSpinner from '@/components/SkeletonSpinner'
import { FORM_TYPE } from '@/lib/types'
import dynamic from 'next/dynamic'

const BlogForm = dynamic(() => import('@/components/BlogForm'), { ssr: false, loading: () => <SkeletonSpinner className='h-[40vh]' /> })

const BlogEditor = dynamic(() => import('@/components/BlogEditor'), { ssr: false, loading: () => <SkeletonSpinner className='h-[50vh]' /> })

const AddBlogPage = () => {
    return (
        <div className='mb-6 space-y-8'>
            <BlogForm heading="Add a blog" type={FORM_TYPE.ADD} />
            <BlogEditor title="Add a blog" />
        </div>
    )
}

export default AddBlogPage