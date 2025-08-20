import { ErrorState } from '@/components/error-state'
import { LoadingState } from '@/components/loading-state'
import { auth } from '@/lib/auth'
import { loadSearchParams } from '@/modules/meetings/params'
import { MeetingsListHeader } from '@/modules/meetings/ui/components/meetings-list-header'
import { MeetingsView } from '@/modules/meetings/ui/views/meetings-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React, { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import type { SearchParams } from 'nuqs'


interface Props {
  searchParams: Promise<SearchParams>
}

const page = async ({searchParams}:Props) => {

  const filters = await loadSearchParams(searchParams)
  const session = await auth.api.getSession({
    headers: await headers()
  })

  if(!session){
    redirect("/sign-in")
  }

  const queryclient = getQueryClient()
  void queryclient.prefetchQuery(trpc.meetings.getMany.queryOptions({
    ...filters
  }))
  return (
    <>
    <MeetingsListHeader />
    <HydrationBoundary state={dehydrate(queryclient)}>
      <ErrorBoundary fallback={<ErrorState title='Error loading meeting' description='Something went wrong' />}>
        <Suspense fallback={<LoadingState title='Loading Meeting' description='This may take few seconds' />}>
          <MeetingsView />
        </Suspense>
      </ErrorBoundary>
    </HydrationBoundary>
    </>
  )
}

export default page