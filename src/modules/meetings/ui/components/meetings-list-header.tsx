"use client"

import { Button } from '@/components/ui/button'
import { PlusIcon, XCircleIcon } from 'lucide-react'
import React, { useState } from 'react'
import { NewMeetingDialog } from './new-meeting-dialog'
import { MeetingsSearchFilter } from './meetings-search-filter'
import { StatusFilter } from './status-filter'
import { AgentIdFilter } from './agent-id-filter'
import { useMeetingsFilters } from '../../hooks/use-meetings-filters'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

export const MeetingsListHeader = () => {
  const [filters,setFilters] = useMeetingsFilters()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const isAnyFilterModified = !!filters.search || !!filters.status || !!filters.agentId
  const onclearFilters = () => {
    setFilters({
      search:"",
      status:null,
      agentId:"",
      page:1
    })
  }
  return (
    <>
    <NewMeetingDialog
    open={isDialogOpen}
    onOpenChange={setIsDialogOpen}
    />
      <div className='py-4 px-4 md:px-8 flex-col gap-y-4'>
          <div className='flex items-center justify-between'>
                  <h5 className='font-medium text-xl'>My Meetings</h5>
                  <Button onClick={()=>setIsDialogOpen(true)}>
                      <PlusIcon />
                      New Meeting
                  </Button>
          </div>
          <ScrollArea>
            <div>
              <MeetingsSearchFilter />
              <StatusFilter />
              <AgentIdFilter />
              {isAnyFilterModified && (
                <Button variant="outline" onClick={onclearFilters}>
                        <XCircleIcon className='size-4' />
                        Clear
                    </Button>
              )}
            </div>
            <ScrollBar orientation='horizontal' />
          </ScrollArea>
      </div>
    </>
  )
}
