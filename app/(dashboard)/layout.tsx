"use client"
import React, { FC, useEffect, useState } from 'react'
import TopNav from '../components/top-nav'
import Sidebar from '../components/sidebar'
import styles from '../styles/dashboard-layout.module.css';
import { setUser, useDispatch } from '@/lib/redux';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { getUserProfile } from '../api/auth';

const Layout:FC<React.PropsWithChildren> = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const token = typeof window !== "undefined" && localStorage.getItem("lendconnect-token");
  const [loaded, setLoaded] = useState(false);
  const fetchProfile = () => {
    getUserProfile()
    .then((res) => {
      dispatch(setUser(res.data.data));
      setLoaded(true);
    })
    .catch((e: any) => {
      if(e.response.data.message) {
        toast.error(e.response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
        localStorage.clear();
        dispatch(setUser(null));
        router.replace("/");
        return;
      }
      if(e.message) {
        toast.error(e.message, {
          position: toast.POSITION.TOP_RIGHT
        });
        localStorage.clear();
        dispatch(setUser(null));
        router.replace("/");
      }
    })
  }
  useEffect(() => {
    if(!token) {
     router.replace("/")
    } else {
     fetchProfile();
    }
   }, [token])
  return (
    <>
      {
        loaded ? (
          <div className={styles.container}>
            <Sidebar />
            <div className={styles.right}>
              <TopNav />
              <div className={styles.child}>
                {children}
              </div>
            </div>
          </div>
        ): null
      }
    </>
  )
}

export default Layout
