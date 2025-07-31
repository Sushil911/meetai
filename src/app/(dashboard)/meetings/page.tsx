import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { MeetingsView } from '@/modules/meetings/ui/views/meetings-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

const page = () => {
  const queryclient = getQueryClient()
  void queryclient.prefetchQuery(trpc.meetings.getMany.queryOptions({}))
  return (
    <HydrationBoundary state={dehydrate(queryclient)}>
      <ErrorBoundary fallback={<ErrorState title='Error loading meeting' description='Something went wrong' />}>
        <Suspense fallback={<LoadingState title='Loading Meeting' description='This may take few seconds' />}>
          <MeetingsView />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
  )
}

export default page