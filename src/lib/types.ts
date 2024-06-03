import { Blog } from "@prisma/client";
import { addAnime, deleteAnime, updateAnime, updateAnimeStatus } from "./actions/anime";
import { addBlog, deleteBlog, updateBlog, updateBlogContent } from "./actions/blog";
import { updateAdminUserRole } from "./actions/admin-user";

export enum FORM_TYPE {
    EDIT,
    ADD
}

export type BlogType = Blog & { author: string };