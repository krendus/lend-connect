import React, { FC } from 'react'
import TopNav from '../components/top-nav'
import Sidebar from '../components/sidebar'
import styles from '../styles/dashboard-layout.module.css';

const Layout:FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <div className={styles.right}>
        <TopNav />
        <div className={styles.child}>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout
