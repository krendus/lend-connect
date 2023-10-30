"use client"

import React, { useState } from 'react'
import UserLoans from './user-loans'
import styles from '../../../styles/explore.module.css'
import AgentLoans from './agent-loans'

const Applications = () => {
  const [isAgent, setIsAgent] = useState(false);
  return (
    <>
      <div className={styles.tabContainer}>
        <button className={!isAgent ? styles.tabActive : styles.tab} onClick={() => setIsAgent(false)}>User</button>
        <button className={isAgent ? styles.tabActive : styles.tab} onClick={() => setIsAgent(true)}>Agent</button>
      </div>
      <div>
        {isAgent ? <AgentLoans /> : <UserLoans /> }
      </div>
    </>
  )
}

export default Applications