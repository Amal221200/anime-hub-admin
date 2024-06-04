import React from 'react'
import { Skeleton } from '../ui/skeleton'

const BlogEditorLoading = () => {
    return (
        <Skeleton className='mx-auto h-[70vh] max-w-5xl rounded border-2 border-zinc-700' />
    )
}

export default BlogEditorLoading