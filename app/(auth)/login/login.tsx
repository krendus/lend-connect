"use client"

import Image from 'next/image'
import React, { useState } from 'react'
import logo from '../../assets/logo.png'
import Link from 'next/link'
import styles from '../../styles/auth.module.css';
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { loginUser } from '@/app/api/auth'
import { setUser } from '@/lib/redux'
import { useDispatch } from 'react-redux'
import { Dots } from 'react-activity'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false)
  const handleLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if(loading) return;
    setLoading(true);
    if( !email || !password) {
      toast.error("Fill in required fields", {
        position: toast.POSITION.TOP_RIGHT
      });
      setLoading(false);
      return;
    }
    loginUser({
      email,
      password,
    }).then((res) => {
      dispatch(setUser(res.data.data.user))
      console.log(res.data);
      localStorage.setItem("lendconnect-token", res.data.data.token);
      router.replace("/dashboard");
    }).catch((e: any) => {
      if(e?.response?.data?.message) {
        toast.error(e.response.data.message, {
          position: toast.POSITION.TOP_RIGHT
        });
        setLoading(false);
        return;
      }
      if(e.message) {
        toast.error(e.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
      setLoading(false);
    })
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
            <p className={styles.notifyText}>Don&apos;t have an account? <Link href={"/register"}>Register</Link></p>
            <button className={styles.submitBtn} onClick={handleLogin}>{loading ? <Dots color='#fff'/> : "Login"}</button>
        </form>
    </div>
  )
}

export default Login