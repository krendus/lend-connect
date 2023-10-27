"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import Link from 'next/link'
import styles from '../../styles/auth.module.css';
import { useRouter } from 'next/navigation'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    router.push("/dashboard");
  }
  return (
    <div className={styles.container}>
        <form className={styles.form}>
            <div className={styles.logo}>
                <Image src={logo} alt='logo' height={50} width={50} />
            </div>
            <h3>LendConnect Login</h3>
            <div className={styles.inputContainer}>
                <label>Email</label>
                <input
                 type='email'
                 placeholder='Enter your email address'
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 />
            </div>
            <div className={styles.inputContainer}>
                <label>Password</label>
                <input
                 type='password'
                 placeholder='Enter your password'
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 />
            </div>
            <p className={styles.notifyText}>Already have an account? <Link href={"/register"}>Register</Link></p>
            <button className={styles.submitBtn} onClick={handleLogin}>Login</button>
        </form>
    </div>
  )
}

export default Login