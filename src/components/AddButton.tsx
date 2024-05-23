import { Plus } from "lucide-react"
import { Button } from "./ui/button"
import Link from "next/link"


const AddButton = () => {
  return (
    <Button variant="ghost" asChild className="fixed right-7 top-7 hidden scale-[1.2] transform bg-zinc-800 p-0 sm:inline">
        <Link href="/anime/add" className="p-2">
            <Plus />
        </Link>
    </Button>
  )
}

export default AddButton