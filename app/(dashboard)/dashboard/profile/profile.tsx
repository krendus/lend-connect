"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '../../../styles/profile.module.css';
import { getUser, setUser, useDispatch, useSelector } from '@/lib/redux';
import { becomeAgent } from '@/app/api/agent';
import { toast } from 'react-toastify';
import { Dots } from 'react-activity'
import { getUserProfile } from '@/app/api/auth';

const Profile = () => {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [profilePic, setProfilePic] = useState("");
  
    const becomeAnAgent = () => {
        if(loading) return;
        setLoading(true);
        becomeAgent()
        .then((res) => {
            toast.success("Application submitted successfully");
            setLoading(false);
            getUserProfile()
            .then((res2) => {
                dispatch(setUser(res2.data.data));
            })
            .catch((e: any) => {
                if(e.response.data.message) {
                    toast.error(e.response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                    });
                    return;
                }
                if(e.message) {
                    toast.error(e.message, {
                    position: toast.POSITION.TOP_RIGHT
                    });
                }
            })
        })
        .catch((e: any) => {
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
          });
    }
    useEffect(() => {
      if (user) {
        setAddress(user.address ?? "");
        setFirstname(user.firstname ?? "");
        setLastname(user?.lastname ?? "");
        setEmail(user?.email ?? "");
        setUsername(user?.username ?? "");
        setPhone(user?.phone ?? "");
        setProfilePic(user?.profile_pic ?? "");
        setAddress(user?.location.address ?? "");
      }
    }, [user])
  return (
    <div className={styles.container}>
        <div className={styles.profilePic}>
            { profilePic && <Image src={profilePic} alt='logo' height={150} width={150} style={{ objectPosition: "center", objectFit: "cover" }}/>}
        </div>
        {user?.is_agent ? (<div className={styles.tag}>Agent</div>) : null}
        <div className={styles.wrapper}>
            <div className={styles.inputFlex}>
                <div className={styles.inputContainer}>
                    <label>Firstname</label>
                    <input type="text" value={firstname} onChange={() => {}} style={{ cursor: "not-allowed" }}/>
                </div>
                <div className={styles.inputContainer}>
                    <label>Lastname</label>
                    <input type="text" value={lastname} onChange={() => {}} style={{ cursor: "not-allowed" }}/>
                </div>
            </div>
            <div className={styles.inputFlex}>
                <div className={styles.inputContainer}>
                    <label>Address</label>
                    <input type="text" value={address} onChange={() => {}} style={{ cursor: "not-allowed" }}/>
                </div>
                <div className={styles.inputContainer}>
                    <label>Phone Number</label>
                    <input type="text" value={phone} onChange={() => {}} style={{ cursor: "not-allowed" }}/>
                </div>
            </div>
            <div className={styles.inputFlex}>
                <div className={styles.inputContainer}>
                    <label>Email</label>
                    <input type="text" value={email} onChange={() => {}} style={{ cursor: "not-allowed" }}/>
                </div>
                <div className={styles.inputContainer}>
                    <label>Usernme</label>
                    <input type="text" value={username} onChange={() => {}} style={{ cursor: "not-allowed" }}/>
                </div>
            </div>
            {
                !user?.is_agent ? (
                    <button className={styles.btn} onClick={becomeAnAgent} style={{ width: "130px" }}>{loading ? <Dots color='#fff'/> : "Become an agent"}</button>
                ) : null
            }
            {/* <h3>Guarantors</h3>
            <div className={styles.guarantor}>
                <div>
                    <h4>Samuel Lawal</h4>
                    <p>09038047151</p>
                </div>
                <button>Remove</button>
            </div>
            <button className={styles.btn}>Add Guarantor</button> */}
        </div>
    </div>
  )
}

export default Profile