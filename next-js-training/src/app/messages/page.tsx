import React from 'react'
import MessageSidebar from './MessageSidebar'
import MessageTable from './MessageTable'
import { getMessageByContainer, getMessageThread } from '../actions/messageActions'

export default async function MessagePage({searchParams}: {searchParams : {container: string}}) {
  const messages = await getMessageByContainer(searchParams.container)
  return (
    <div className='grid grid-cols-12 gap-5 h-[calc(100vh-115px)]'>
      <div className='col-span-2'>
        <MessageSidebar />
      </div>
      <div className='col-span-10'>
        <MessageTable messages={messages} />
      </div>
    </div>
  )
}
