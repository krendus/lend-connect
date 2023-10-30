"use client"

import React from 'react'
import styles from './style.module.css';
import { DashboardIcon, ExploreIcon, LogoutIcon, SupportIcon, UserIcon, WalletIcon } from '@/app/assets/svg-icons';
import { usePathname, useRouter } from 'next/navigation';
import { setUser, useDispatch } from '@/lib/redux';

const BottomNav = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(setUser(null));
    router.replace("/")
  }
  return (
    <div className={styles.container}>
        <div className={styles.navLinks}>
            <button className={pathname === "/dashboard" ? styles.aNavLink : styles.navLink} onClick={() => router.push("/dashboard")}>
                <DashboardIcon />
                <span>Home</span>
            </button>
            <button className={pathname.includes("/dashboard/explore") ? styles.aNavLink : styles.navLink} onClick={() => router.push("/dashboard/explore")}>
                <ExploreIcon />
                <span>Explore</span>
            </button>
            <button className={pathname.includes("/dashboard/applications") ? styles.aNavLink : styles.navLink} onClick={() => router.push("/dashboard/applications")}>
                <SupportIcon />
                <span>Requests</span>
            </button>
            <button className={pathname.includes("/dashboard/loans") ? styles.aNavLink : styles.navLink} onClick={() => router.push("/dashboard/loans")}>
                <WalletIcon />
                <span>Loans</span>
            </button>
            <button className={pathname.includes("/dashboard/lendings") ? styles.aNavLink : styles.navLink} onClick={() => router.push("/dashboard/lendings")}>
                <WalletIcon />
                <span>Lendings</span>
            </button>
            <button className={pathname.includes("/dashboard/profile") ? styles.aNavLink : styles.navLink} onClick={() => router.push("/dashboard/profile")}>
                <UserIcon />
                <span>Profile</span>
            </button>
        </div>
    </div>
  )
}

export default BottomNav
