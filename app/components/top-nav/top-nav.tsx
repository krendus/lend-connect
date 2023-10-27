import Image from 'next/image'
import React from 'react'
import userImage from '../../assets/user.jpg';
import styles from './style.module.css';

const TopNav = () => {
  return (
    <div className={styles.container}>
        <div className={styles.right}>
            <p>Samuel Lawal</p>
            <div className={styles.logo}>
                <Image src={userImage} alt='logo' height={40} width={40}/> 
            </div>
        </div>
    </div>
  )
}

export default TopNav