import React from 'react'
import MessageSidebar from './MessageSidebar'

export default function MessagePage() {
  return (
    <div className='grid grid-cols-12 gap-5 h-[calc(100vh-115px)] mt-10'>
      <div className='col-span-2'>
        <MessageSidebar />
      </div>
      <div className='col-span-10'>
        <p>text messages</p>
      </div>
    </div>
  )
}
