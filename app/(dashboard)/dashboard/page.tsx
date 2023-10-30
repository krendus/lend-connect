import React from 'react'
import Dashboard from './dashboard'
import { Metadata } from 'next'

const Page = () => {
  return (
    <Dashboard />
  )
}

export const metadata: Metadata =  {
  title: "Lend Connect | Dashboard"
}

export default Page
