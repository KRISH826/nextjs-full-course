import { NextUIProvider } from '@nextui-org/react'
import React, { ReactNode } from 'react'

const Provider = ({children}: {children: ReactNode}) => {
  return (
    <NextUIProvider>
        {children}
    </NextUIProvider>
  )
}

export default Provider

