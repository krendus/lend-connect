"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import Link from 'next/link'
import styles from '../../styles/auth.module.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [accountType, setAccountType] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div className={styles.container}>
        <form className={styles.form}>
            <div className={styles.logo}>
                <Image src={logo} alt='logo' height={50} width={50} />
            </div>
            <h3>LendConnect Register</h3>
            <div className={styles.inputContainer}>
                <label>Fullname</label>
                <input
                 type='text'
                 placeholder='Enter your fullname'
                 value={fullname}
                 onChange={(e) => setFullname(e.target.value)}
                 />
            </div>
            <div className={styles.inputContainer}>
                <label>Phone Number</label>
                <input
                 type="tel"
                 inputMode='numeric'
                 placeholder='Enter your phone number'
                 value={phone}
                 onChange={(e) => setPhone(e.target.value)}
                 />
            </div>
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
                <label>Account Type</label>
                <select 
                 value={accountType}
                 onChange={(e) => setAccountType(e.target.value)}
                >
                  <option value="">Select Account Type</option>
                  <option value={"user"}>Lender / Borrower</option>
                  <option value={"agent"}>Agent</option>
                </select>
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
            <p className={styles.notifyText}>Already have an account? <Link href={"/"}>Login</Link></p>
            <button className={styles.submitBtn}>Register</button>
        </form>
    </div>
  )
}

export default Register;