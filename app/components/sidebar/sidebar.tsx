"use client"

import React from 'react'
import styles from './style.module.css';
import logo from '../../assets/logo.png'
import Image from 'next/image';
import { DashboardIcon, ExploreIcon, LogoutIcon, SupportIcon, UserIcon, WalletIcon } from '@/app/assets/svg-icons';
import { usePathname, useRouter } from 'next/navigation';
import { setUser, useDispatch } from '@/lib/redux';

const Sidebar = () => {
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
        <div className={styles.logo}>
            <Image src={logo} alt='logo' height={40} width={40}/>
            <h3>LendConnect</h3>
        </div>
        <div className={styles.navLinks}>
            <button className={pathname === "/dashboard" ? styles.aNavLink : styles.navLink} onClick={() => router.push("/dashboard")}>
                <DashboardIcon />
                <span>Home</span>
            </button>
            <button className={pathname.includes("/dashboard/explore") ? styles.aNavLink : styles.navLink} onClick={() => router.push("/dashboard/explore")}>
                <ExploreIcon />
                <span>Explore</span>
            </button>
            <button className={pathname.includes("/dashboard/requests") ? styles.aNavLink : styles.navLink} onClick={() => router.push("/dashboard/requests")}>
                <SupportIcon />
                <span>Requests</span>
            </button>
            <button className={pathname.includes("/dashboard/loans") ? styles.aNavLink : styles.navLink} onClick={() => router.push("/dashboard/loans")}>
                <WalletIcon />
                <span>Loans</span>
            </button>
            <button className={pathname.includes("/dashboard/profile") ? styles.aNavLink : styles.navLink} onClick={() => router.push("/dashboard/profile")}>
                <UserIcon />
                <span>Profile</span>
            </button>
            <button className={styles.navLink} onClick={handleLogout}>
                <LogoutIcon />
                <span>Logout</span>
            </button>
        </div>
    </div>
  )
}

export default Sidebar