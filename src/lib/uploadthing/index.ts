import {
    generateUploadButton,
    generateUploadDropzone,
    generateReactHelpers
} from "@uploadthing/react";
import type { OurFileRouter } from "./core";

export const { useUploadThing } = generateReactHelpers<OurFileRouter>()

export const UploadButton = generateUploadButton<OurFileRouter>();
export const UploadDropzone = generateUploadDropzone<OurFileRouter>();