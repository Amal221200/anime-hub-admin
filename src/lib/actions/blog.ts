"use server"
import db from "@/lib/db"
import { z } from "zod";
import { blogSchema } from "../schema";
import { BlogType } from "../types";
import { revalidatePath } from "next/cache";

export async function getBlogs(): Promise<BlogType[] | null> {
    try {
        const blogs = await db.blog.findMany(
            {
                include: { author: { select: { username: true } } },
                orderBy: { updatedAt: 'desc' },
            }
        );
        return blogs.map((blog) => ({ ...blog, author: blog.author.username }));
    } catch (error) {
        console.log("getBlogs error");
        return null
    }
}

export async function getBlog(id: string) {
    try {
        const anime = await db.blog.findUnique({ where: { id } })
        return anime
    } catch (error) {
        console.log("getBlog error");
    }
}

export async function addBlog(blog: z.infer<typeof blogSchema>, authorId: string) {
    try {
        const newBlog = await db.blog.create({
            data: {
                title: blog.title,
                description: blog.description,
                imageLink: blog.imageLink,
                authorId
            }
        })

        revalidatePath("/blog")
        return newBlog
    } catch (error) {
        console.log("getBlog error");
        return null
    }
}

export async function deleteBlog(blogId: string) {
    try {
        const blog = await db.blog.delete({ where: { id: blogId } })
        revalidatePath("/blog")
        return blog
    } catch (error) {
        console.log("deleteBlog error");
        return null
    }
}

export async function updateBlog(blogId: string, blogData: z.infer<typeof blogSchema>) {
    try {
        const updatedBlog = await db.blog.update({
            where: { id: blogId }, data: {
                title: blogData.title,
                description: blogData.description,
                imageLink: blogData.imageLink
            }
        })
        revalidatePath(`/blog/${blogId}`)
        return updatedBlog
    } catch (error) {
        console.log("updateBlog error");
        return null
    }
}

export async function updateBlogContent(blogId: string, content: string) {
    try {
        const updatedBlog = await db.blog.update({
            where: { id: blogId }, data: {
                content
            }
        })
        revalidatePath(`/blog/${blogId}`)
        return updatedBlog
    } catch (error) {
        console.log("updateBlogContent error");
        return null
    }
}