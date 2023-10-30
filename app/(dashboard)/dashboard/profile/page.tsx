import React from 'react'
import Profile from './profile'
import { Metadata } from 'next'

const Page = () => {
  return (
    <Profile />
  )
}

export const metadata: Metadata =  {
  title: "Lend Connect | Profile"
}

export default Page