import { BlogType } from "@/lib/types";
import axios from "axios"

export async function fetchBlogs(): Promise<BlogType[]> {
    const response = await axios.get('/api/blog');
    return response.data
}

export function deleteBlog(blogId: string) {
    return async () => {
        const response = await axios.delete(`/api/blog/${blogId}`)

        if (response.status === 401) {
            throw new Error('', { cause: response.status })
        }

        return response.data
    }
}