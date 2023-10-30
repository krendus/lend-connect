"use client"

import React, { useState } from 'react'
import UserLendings from './user-lendings'
import styles from '../../../styles/explore.module.css'
import AgentLendings from './agent-lendings'

const Applications = () => {
  const [isAgent, setIsAgent] = useState(false);
  return (
    <>
      <div className={styles.tabContainer}>
        <button className={!isAgent ? styles.tabActive : styles.tab} onClick={() => setIsAgent(false)}>User</button>
        <button className={isAgent ? styles.tabActive : styles.tab} onClick={() => setIsAgent(true)}>Agent</button>
      </div>
      <div>
        {isAgent ? <AgentLendings /> : <UserLendings /> }
      </div>
    </>
  )
}

export default Applications