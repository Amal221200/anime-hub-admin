import { blogSchema } from "@/lib/schema"
import axios from "axios"
import { z } from "zod"

export async function addBlog({ data }: { data: z.infer<typeof blogSchema> }) {
    const response = await axios.post(`/api/blog`, { data })
    return response.data
}

export function editBlog(blogId: string) {
    return async ({ data }: { data: z.infer<typeof blogSchema> }) => {
        const response = await axios.put(`/api/blog/${blogId}`, { data })
        return response.data
    }
}

export function editBlogContent(blogId: string) {
    return async ({ content }: { content: string }) => {
        const response = await axios.put(`/api/blog/${blogId}/content`, { content })
        return response.data
    }
}