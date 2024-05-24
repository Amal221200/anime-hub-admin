"use client"
import Image from "next/image"
import { X } from "lucide-react"
import { UploadDropzone } from "@/lib/uploadthing"
import { cn } from "@/lib/utils"
import useCurrentUser from "@/hooks/useCurrentUser"

interface FileUploadProps {
    onChange: (url?: string) => void,
    value: string,
    endpoint: "animeImage" | "messageFile"
}

const FileUpload: React.FC<FileUploadProps> = ({ endpoint, onChange, value }) => {
    const { data: userData } = useCurrentUser()
    const fileType = value.split('.').at(-1)

    if (value && fileType !== 'pdf') {
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
        <UploadDropzone endpoint={endpoint} className={cn("upload-button  cursor-pointer", userData?.role === 'USER' && 'cursor-not-allowed pointer-events-none opacity-60')} appearance={{ uploadIcon: { display: 'none' }, label: { display: 'none' }, allowedContent: { display: 'none' }, container: { padding: 0, margin: 0, display: "block" }, button: { padding: 0, marginInline: 0, marginBlock: 10 } }}
            onClientUploadComplete={(res) => {
                onChange(res?.[0].url)
            }} onUploadError={(error) => {
                console.log(error);
            }} />
    )
}

export default FileUpload