'use client'

import { ErrorState } from "@/components/error-state"
import { LoadingState } from "@/components/loading-state"
import { Button } from "@/components/ui/button"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

export const AgentsView = () => {
    const trpc=useTRPC()
    const {data} = useSuspenseQuery(trpc.agents.getMany.queryOptions())
    return (
        <div>
            {JSON.stringify(data,null,2)}
        </div>
    )
}