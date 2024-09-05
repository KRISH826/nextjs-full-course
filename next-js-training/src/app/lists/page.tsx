import React from 'react'
import ListsTab from './ListsTab'
import { fetchCurrentLikeId, fetchLikedMembers} from '../actions/likeActions'


export default async function ListsPage({searchParams}: {searchParams: {type: string}}) {
  const likeIds = await fetchCurrentLikeId();
  const members = await fetchLikedMembers(searchParams.type);

  return (
    <div className='listPage'>
      <ListsTab members={members} likeIds={likeIds} />
    </div>
  )
}