"use server"
import db from "@/lib/db"
import { z } from "zod";
import { blogSchema } from "../schema";
import { BlogType } from "../types";

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

export async function getBlog(id: string): Promise<BlogType | null> {
    try {
        const blog = await db.blog.findUnique({ where: { id }, include: { author: { select: { username: true } } } })
        if (!blog) {
            return null
        }
        return { ...blog, author: blog.author.username }
    } catch (error) {
        console.log("getBlog error");
        return null
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


        return newBlog
    } catch (error) {
        console.log("getBlog error");
        return null
    }
}

export async function deleteBlog(blogId: string) {
    try {
        const blog = await db.blog.delete({ where: { id: blogId } })

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
                imageLink: blogData.imageLink,
                published: blogData.published
            }
        })
        return updatedBlog
    } catch (error) {
        console.log("updateBlog error");
        return null
    }
}

export async function updateBlogPublish(id: string, publish: boolean) {
    try {
        const updatedBlog = await db.blog.update({
            where: { id }, data: {
                published: publish
            }
        })


        return updatedBlog
    } catch (error) {
        console.log("updateBlogPublish error");
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

        return updatedBlog
    } catch (error) {
        console.log("updateBlogContent error");
        return null
    }
}