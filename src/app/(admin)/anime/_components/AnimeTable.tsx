"use client"
import { useMediaQuery } from "usehooks-ts"
import animeColums from "./anime-table-columns"
import useTable from "@/hooks/useTable"
import ReactTable from "@/components/ReactTable"
import useFetchAnimes from "@/hooks/anime/useFetchAnimes"

export default function AnimeTable() {
    const match = useMediaQuery('(min-width:640px)')
    const { animes, isLoading } = useFetchAnimes()
    const { table, pagination } = useTable(animes || [], animeColums, { visibility: { studio: match, artist: match } })

    return (
        <ReactTable table={table} isLoading={isLoading} pagination={pagination} columns={animeColums} filterColumn="title" label="anime" />
    )
}
