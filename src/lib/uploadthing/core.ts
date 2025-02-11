import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
    const { userId } = await auth()

    if (!userId) throw new Error("Unauthorized user")

    return { userId }
}

const callbackAuth = async () => await handleAuth();
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    animeImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(callbackAuth)
        .onUploadComplete(() => { }),
    animeBlogImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(callbackAuth)
        .onUploadComplete(() => { }),
    animeBlogContentImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .middleware(callbackAuth)
        .onUploadComplete(() => { }),

    messageFile: f(["image", "pdf"])
        .middleware(callbackAuth)
        .onUploadComplete(() => { })
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;