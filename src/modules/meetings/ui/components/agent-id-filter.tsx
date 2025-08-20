import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { CommandSelect } from "@/components/command-select";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { useMeetingsFilters } from "@/modules/meetings/hooks/use-meetings-filters";

export const AgentIdFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();
    const trpc = useTRPC();
    const [AgentsSearchFilter, setAgentSearch] = useState("");
    const { data } = useQuery(trpc.agents.getMany.queryOptions({ pageSize:100, search: AgentsSearchFilter }));
    
    return (
        <CommandSelect
            className="h-9"
            options={(data?.items ?? []).map((agent) => ({
                id: agent.id,
                value: agent.id,
                children: (
                    <div className="flex items-center gap-x-2">
                        <GeneratedAvatar
                            seed={agent.name}
                            variant="botttsNeutral"
                            className="size-4"
                        />
                        <span>{agent.name}</span>
                    </div>
                ),
            }))}
            onSelect={(value)=> setFilters({agentId:value})}
            onSearch={setAgentSearch}
            value={filters.agentId ?? ""}
            isSearchable={true}
            />
    )
}