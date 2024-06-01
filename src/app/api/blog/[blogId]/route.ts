import getCurrentUser from "@/lib/actions/getCurrentUser";
import { blogSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";
import { deleteBlog, getBlog, updateBlog } from "@/lib/actions/blog";
import { revalidatePath } from "next/cache";

interface BlogParams {
    params: {
        blogId: string
    }
}

export async function GET(request: NextRequest, { params: { blogId } }: BlogParams) {
    try {
        const blog = await getBlog(blogId);

        return NextResponse.json(blog, { status: 200 })
    } catch (error) {

        return NextResponse.json("Internal Server error at GET Blog [blogId]", { status: 500 })
    }
}

export async function DELETE(_request: NextRequest, { params: { blogId } }: BlogParams) {
    try {
        const user = await getCurrentUser();

        if (user?.role === 'USER') {
            return NextResponse.json('Unauthorized access', { status: 401 })
        }

        const blogExist = await getBlog(blogId);

        if (!blogExist) {
            return NextResponse.json("Blog does not exist", { status: 404 })
        }

        await deleteBlog(blogId)
        revalidatePath("/blog")
        return NextResponse.json("Blog deleted", { status: 200 })
    } catch (error) {
        return NextResponse.json("Internal Server Error at DELETE Blog [blogId]", { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params: { blogId } }: BlogParams) {
    try {
        const user = await getCurrentUser();

        if (user?.role === 'USER') {
            return NextResponse.json('Unauthorized access', { status: 401 })
        }

        const body = await request.json();

        const blogExist = await getBlog(blogId);

        if (!blogExist) {
            return NextResponse.json("Blog does not exist", { status: 404 })
        }
        const blogData = blogSchema.parse({ ...body.data });

        const updatedBlog = await updateBlog(blogId, blogData);
        revalidatePath("/blog")
        return NextResponse.json(updatedBlog, { status: 200 })
    } catch (error) {
        return NextResponse.json("Internal Server Error at Update Blog [blogId]", { status: 500 })
    }
}