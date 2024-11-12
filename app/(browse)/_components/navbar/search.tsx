"use client"

import queryString from "query-string"
import { useState } from "react"
import { SearchIcon, X } from 'lucide-react'
import { useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { on } from "events"

export const Search = () => {
    const router = useRouter()
    const [value, setValue] = useState("")
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!value) return
        const url = queryString.stringifyUrl({
            url: '/search',
            query: { term: value },
        }, { skipEmptyString: true })
        router.push(url)

    }
    return (
        <form
            className="relative w-full lg:w-[400px] flex items-center"
            onSubmit={onSubmit}
        >
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Search" className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0" />
            {value && (
                <X onClick={() => setValue('')} className="absolute top-2.5 right-14 h-5 w-5 text-muted-foreground cursor-pointer hover:opacity-75 transition" />)}
            <Button type="submit" size="sm" variant="secondary" className="rounded-l-none">
                <SearchIcon className="h-5 w-5 text-muted-foreground" />
            </Button>
        </form>
    )
}