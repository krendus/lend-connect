import Image from 'next/image'
import React from 'react'
import styles from './style.module.css';
import { getUser, useSelector } from '@/lib/redux';

const TopNav = () => {
  const user = useSelector(getUser);
  return (
    <div className={styles.container}>
        <div className={styles.right}>
            <div>
              <p>{user?.firstname ?? ""} {user?.lastname ?? ""}</p>
              <p className={styles.tag}>KYC Level {user?.kyc_level.level}</p>
            </div>
            <div className={styles.logo}>
                <Image src={user?.profile_pic ?? ""} alt='logo' height={40} width={40} style={{ objectPosition: "center", objectFit: "cover" }}/> 
            </div>
        </div>
    </div>
  )
}

export default TopNav