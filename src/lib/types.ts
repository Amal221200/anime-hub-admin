import { Blog } from "@prisma/client";
import { addAnime, deleteAnime, updateAnime, updateAnimeStatus } from "./actions/anime";
import { addBlog, deleteBlog, updateBlog, updateBlogContent } from "./actions/blog";
import { updateAdminUserRole } from "./actions/admin-user";

export enum FORM_TYPE {
    EDIT,
    ADD
}

export type BlogType = Blog & { author: string };

export interface ActionsType {
    addAnime: typeof addAnime;
    updateAnime: typeof updateAnime,
    deleteAnime: typeof deleteAnime,
    addBlog: typeof addBlog,
    deleteBlog: typeof deleteBlog,
    updateBlog: typeof updateBlog,
    updateBlogContent: typeof updateBlogContent,
    updateAdminUserRole: typeof updateAdminUserRole,
    updateAnimeStatus: typeof updateAnimeStatus,
}

export interface ActionsProviderType {
    actions: ActionsType
}
