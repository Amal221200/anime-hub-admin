import getCurrentUser from "@/lib/actions/getCurrentUser";
import { blogSchema } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";
import { addBlog, getBlogs } from "@/lib/actions/blog";
import { revalidatePath } from "next/cache";

export async function GET(_request: NextRequest) {
    try {
        const blogs = await getBlogs();

        return NextResponse.json(blogs)
    } catch (error) {
        return NextResponse.json("Internal Server Error at GET Blog", { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {

        const user = await getCurrentUser();

        if (user?.role === 'USER' || !user) {
            return NextResponse.json('Unauthorized access', { status: 401 })
        }

        const body = await request.json();

        const blogData = blogSchema.parse({ ...body.data });

        const newBlog = await addBlog(blogData, user?.id)
        revalidatePath("/blog")
        return NextResponse.json(newBlog, { status: 201 })
    }

    catch (error) {
        return NextResponse.json("Internal Server Error at POST Blog", { status: 500 })
    }
}