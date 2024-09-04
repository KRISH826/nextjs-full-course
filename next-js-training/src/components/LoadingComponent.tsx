import { Spinner } from '@nextui-org/react'
import React from 'react'

const LoadingComponent = ({label}: {label?: string}) => {
  return (
    <div className='flex justify-center items-center vertical-center h-44'>
      <Spinner color='secondary' labelColor='secondary' label={label || 'Loading...'} />
    </div>
  )
}

export default LoadingComponent
