"use client"

import React, { useState } from 'react'
import UserApplications from './user-applications'
import styles from '../../../styles/explore.module.css'
import AgentApplications from './agent-applications'

const Applications = () => {
  const [isAgent, setIsAgent] = useState(false);
  return (
    <>
      <div className={styles.tabContainer}>
        <button className={!isAgent ? styles.tabActive : styles.tab} onClick={() => setIsAgent(false)}>User</button>
        <button className={isAgent ? styles.tabActive : styles.tab} onClick={() => setIsAgent(true)}>Agent</button>
      </div>
      <div>
        {isAgent ? <AgentApplications /> : <UserApplications /> }
      </div>
    </>
  )
}

export default Applications