"use client"

import React, { useState } from 'react'
import UserApplications from './user-applications'
import styles from '../../../styles/explore.module.css'
import AgentApplications from './agent-applications'
import { getUser, useSelector } from '@/lib/redux'

const Applications = () => {
  const [isAgent, setIsAgent] = useState(false);
  const user = useSelector(getUser);
  return (
    <>
      <div className={styles.tabContainer}>
        <button className={!isAgent ? styles.tabActive : styles.tab} onClick={() => setIsAgent(false)}>User</button>
        <button className={isAgent ? styles.tabActive : styles.tab} onClick={() => setIsAgent(user?.is_agent)} style={{ cursor: user?.is_agent ? "pointer" : "not-allowed" }}>Agent</button>
      </div>
      <div>
        {isAgent ? <AgentApplications /> : <UserApplications /> }
      </div>
    </>
  )
}

export default Applications