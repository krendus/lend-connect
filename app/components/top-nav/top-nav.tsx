import Image from 'next/image'
import React from 'react'
import styles from './style.module.css';
import { getUser, setUser, useDispatch, useSelector } from '@/lib/redux';
import { LogoutIcon } from '@/app/assets/svg-icons';
import { useRouter } from 'next/navigation';

const TopNav = () => {
  const user = useSelector(getUser);
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    router.replace("/");
    dispatch(setUser(null));
  }
  return (
    <div className={styles.container}>
        <div className={styles.right}>
            <div>
              <p>{user?.firstname ?? ""} {user?.lastname ?? ""}</p>
              <p className={styles.tag}>KYC Level {user?.kyc_level.level}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", columnGap: "15px" }}>
              <div className={styles.logo}>
                  <Image src={user?.profile_pic ?? ""} alt='profile_pic' height={40} width={40} style={{ objectPosition: "center", objectFit: "cover" }}/> 
              </div>
              <button className={styles.btn} onClick={handleLogout}><LogoutIcon /></button>
            </div>
        </div>
    </div>
  )
}

export default TopNav