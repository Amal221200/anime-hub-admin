"use client"

import useBlogForm from "@/hooks/blog/useBlogForm"
import useCurrentUser from "@/hooks/current-user/useCurrentUser"
import useAlertModal from "@/hooks/useAlertModal"
import { FORM_TYPE } from "@/lib/types"
import { Blog } from "@prisma/client"
import { useRouter } from "next/navigation"
import { addBlog, editBlog } from "../functions"
import { blogSchema } from "@/lib/schema"
import { useCallback } from "react"
import { z } from "zod"
import { Form } from "../ui/form"
import { ChevronLeft } from "lucide-react"
import BlogInputWrapper from "./BlogInputWrapper"
import { Input } from "../ui/input"
import FileUpload from "../FileUpload"
import { Textarea } from "../ui/textarea"
import { Button } from "../ui/button"

interface BlogFormProps {
    heading: string,
    type: FORM_TYPE,
    blog?: Blog,
}

const BlogForm = ({ heading, blog, type }: BlogFormProps) => {
    const router = useRouter()
    const { onOpen } = useAlertModal()
    const { data: userData } = useCurrentUser()
    const { form, mutateAsync } = useBlogForm(type, type === FORM_TYPE.ADD ? addBlog : editBlog(blog?.id as string), blog)

    const onSubmit = useCallback(async (values: z.infer<typeof blogSchema>) => {
        const payload = { ...values }

        await mutateAsync({ data: payload })
    }, [mutateAsync])
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto mb-16 max-w-[380px] space-y-3 sm:mb-0 sm:max-w-[1000px]">
                <h1 className="flex items-center gap-x-2 text-xl font-semibold sm:text-5xl">
                    {type === FORM_TYPE.EDIT && <ChevronLeft className="relative transform cursor-pointer transition-transform hover:-translate-x-1" onClick={() => router.back()} />} {heading}
                </h1>
                <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    <BlogInputWrapper name="title" form={form} label="Title">
                        {(field) => (
                            <Input {...field} placeholder="" />
                        )}
                    </BlogInputWrapper>
                    <BlogInputWrapper name="imageLink" form={form} label="Image">
                        {(field) => (
                            <FileUpload endpoint="animeBlogImage" value={field.value} onChange={field.onChange} />
                        )}
                    </BlogInputWrapper>
                    <BlogInputWrapper name="description" form={form} label="Description" className="sm:col-span-2">
                        {(field) => (
                             <Textarea {...field} placeholder="eg: This is the legend of a young kid called Son Goku..." rows={2}
                             className="no-scrollbar" />
                        )}
                    </BlogInputWrapper>
                </div>
                <Button type="submit"
                    disabled={form.formState.isLoading || form.formState.isSubmitting || userData?.role === 'USER'} className="block w-full disabled:cursor-null disabled:opacity-60 sm:w-max">
                    Submit
                </Button>
            </form>
        </Form>
    )
}

export default BlogForm