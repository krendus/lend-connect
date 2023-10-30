import React from 'react'
import Loan from './loan'
import { Metadata } from 'next'

const Page = () => {
  return (
    <Loan />
  )
}

export const metadata: Metadata =  {
  title: "Lend Connect | Loans"
}

export default Page