import React from 'react'
import Requests from './applications'
import { Metadata } from 'next'

const Page = () => {
  return (
    <Requests />
  )
}

export const metadata: Metadata =  {
  title: "Lend Connect | Applications"
}

export default Page