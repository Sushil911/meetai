import {
    CircleXIcon,
    CircleCheckIcon,
    ClockArrowUpIcon,
    VideoIcon,
    LoaderIcon
} from "lucide-react"

import { CommandSelect } from "@/components/command-select"
import { MeetingStatus } from "../../types"
import { useMeetingsFilters } from "../../hooks/use-meetings-filters"
import { id } from "date-fns/locale"

const options = [
    {
        id:MeetingStatus.Upcoming,
        value:MeetingStatus.Upcoming,
        children:
        (
            <div className="flex items-center gap-x-2 capitalize">
            <ClockArrowUpIcon className="w-4 h-4" />
            {MeetingStatus.Upcoming}
            </div>
        )
    },
    {
        id:MeetingStatus.Active,
        value:MeetingStatus.Active,
        children:
        (
            <div className="flex items-center gap-x-2 capitalize">
            <VideoIcon className="w-4 h-4" />
            {MeetingStatus.Active}
            </div>
        )
    },
    {
        id:MeetingStatus.Completed,
        value:MeetingStatus.Completed,
        children:
        (
            <div className="flex items-center gap-x-2 capitalize">
            <CircleCheckIcon className="w-4 h-4" />
            {MeetingStatus.Completed}
            </div>
        )
    },
    {
        id:MeetingStatus.Cancelled,
        value:MeetingStatus.Cancelled,
        children:
        (
            <div className="flex items-center gap-x-2 capitalize">
            <CircleXIcon className="w-4 h-4" />
            {MeetingStatus.Cancelled}
            </div>
        )
    },
    {
        id:MeetingStatus.Processing,
        value:MeetingStatus.Processing,
        children:
        (
            <div className="flex items-center gap-x-2 capitalize">
            <LoaderIcon className="w-4 h-4" />
            {MeetingStatus.Processing}
            </div>
        )
    },
]

export const StatusFilter = () => {
  const [filters,setFilters] = useMeetingsFilters()
  return (
    <CommandSelect
      palceholder="Status"
      className="h-9"
      options={options}
      onSelect={(value) => setFilters({status:value as MeetingStatus})}
      value={filters.status ?? ""}
      isSearchable={false}
    ></CommandSelect>
  )
}