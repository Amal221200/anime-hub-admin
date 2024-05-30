import { Blog } from "@prisma/client";

export enum FORM_TYPE {
    EDIT,
    ADD
}

export type BlogType = Blog & { author: string };