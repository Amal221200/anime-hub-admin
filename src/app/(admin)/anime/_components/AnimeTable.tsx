"use client"
import { useMediaQuery } from "usehooks-ts"
import animeColums from "./anime-table-columns"
import useTable from "@/hooks/useTable"
import ReactTable from "@/components/ReactTable"
import { Anime } from "@prisma/client"

export default function AnimeTable({ animes }: { animes: Anime[] }) {
    const match = useMediaQuery('(min-width:640px)')
    const { table, pagination } = useTable(animes || [], animeColums, { visibility: { studio: match, artist: match } })

    return (
        <ReactTable table={table} pagination={pagination} columns={animeColums} filterColumn="title" label="anime" />
    )
}
