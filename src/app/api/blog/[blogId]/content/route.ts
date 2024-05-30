import { getBlog, updateBlogContent } from "@/lib/actions/blog";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";


interface BlogParams {
    params: {
        blogId: string
    }
}

export async function PUT(request: NextRequest, { params: { blogId } }: BlogParams) {
    try {
        const user = await getCurrentUser();

        if (user?.role === 'USER') {
            return NextResponse.json('Unauthorized access', { status: 401 })
        }

        const body: { content: string } = await request.json();

        const blogExist = await getBlog(blogId);

        if (!blogExist) {
            return NextResponse.json("Blog does not exist", { status: 404 })
        }

        const updatedBlog = await updateBlogContent(blogId, body.content);

        return NextResponse.json(updatedBlog, { status: 200 })
    } catch (error) {
        return NextResponse.json("Internal Server Error at Update Blog [blogId]", { status: 500 })
    }
}