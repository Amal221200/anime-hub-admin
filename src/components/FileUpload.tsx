"use client"
import Image from "next/image"
import { X } from "lucide-react"
import { UploadDropzone } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"
import useCurrentUser from "@/hooks/current-user/useCurrentUser"
import { toast } from "sonner"
import imageCompression, { Options } from "browser-image-compression"

interface FileUploadProps {
    onChange: (url?: string, name?: string) => void,
    value: string,
    endpoint: "animeImage" | "messageFile" | "animeBlogImage" | "animeBlogContentImage",
    preview?: boolean
}

async function compress(file: File) {
    const imageFile = file;

    const options: Options = {
        maxSizeMB: 0.6,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    }
    try {
        const compressedFile = await imageCompression(imageFile, options);
        return compressedFile
    } catch (error) {
        console.log(error);
    }

    return file;
}

const FileUpload: React.FC<FileUploadProps> = ({ endpoint, onChange, value, preview }) => {
    const { data: userData } = useCurrentUser()
    const fileType = value.split('.').at(-1)

    if (value && (fileType !== 'pdf') && preview) {
        return (
            <div className="relative h-20 w-20">
                <Image src={value} alt="server-image" fill className="rounded-full object-cover" />
                <button type="button" onClick={() => onChange("")} className="absolute right-0 top-0 rounded-full bg-rose-500 p-1 text-white shadow-sm">
                    <X className="h-4 w-4" />
                </button>
            </div>
        )
    }
    return (
        <UploadDropzone endpoint={endpoint} className={cn("upload-button  cursor-pointer", userData?.role === 'USER' && 'cursor-null  pointer-events-none opacity-60')} appearance={{ uploadIcon: { display: 'none' }, label: { display: 'none' }, allowedContent: { display: 'none' }, container: { padding: 0, margin: 0, display: "block" }, button: { padding: 0, marginInline: 0, marginBlock: 10 } }}

            onDrop={(files) => {
                if (files[0].size / 1024 / 1024 > 4) {
                    return toast.error('File is too big, max file size is 4MB')
                }
                return []
            }}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url, res?.[0].name)
                toast.success("Upload complete", { description: `${res?.[0].name} was uploaded` });
            }}

            onUploadError={(error) => {
                if (error.message.includes('FileSizeMismatch')) {
                    toast.error("Upload Error", { description: "File is too big, the maximum file size is 4MB" });
                }
                console.log(error);
            }}

            onBeforeUploadBegin={(files) => {
                return compress(files[0]).then(file => [file])
            }}
        />
    )
}

export default FileUpload