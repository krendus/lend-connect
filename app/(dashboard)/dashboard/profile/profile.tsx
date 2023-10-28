"use client"
import Image from 'next/image'
import React, { useState } from 'react'
import userImage from '../../../assets/user.jpg';
import styles from '../../../styles/profile.module.css';

const Profile = () => {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
  
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        }, function (error) {
          console.error("Error getting geolocation:", error);
        },
        { enableHighAccuracy: true } 
        );
      } else {
        console.error("Geolocation is not supported by your browser.");
      }
    };
  return (
    <div className={styles.container}>
        <div className={styles.profilePic}>
            <Image src={userImage} alt='logo' height={150} width={150} style={{ objectPosition: "center", objectFit: "cover" }}/> 
        </div>
        <div className={styles.tag}>Agent</div>
        <div className={styles.wrapper}>
            <div className={styles.inputFlex}>
                <div className={styles.inputContainer}>
                    <label>Fullname</label>
                    <input type="text" />
                </div>
                <div className={styles.inputContainer}>
                    <label>BVN</label>
                    <input type="text" />
                </div>
            </div>
            <div className={styles.inputFlex}>
                <div className={styles.inputContainer}>
                    <label>Location</label>
                    <input type="text" value={`${longitude}, ${latitude}`}/>
                </div>
                <div className={styles.inputContainer}>
                    <label>Phone Number</label>
                    <input type="text" />
                </div>
            </div>
            <div className={styles.inputFlex}>
                <div className={styles.inputContainer}>
                    <label>Email</label>
                    <input type="text" />
                </div>
                <div className={styles.inputContainer}>
                    <label>Address</label>
                    <input type="text" />
                </div>
            </div>
            <button className={styles.btn} onClick={getLocation}>Update Location</button>
            <button className={styles.btn} style={{ marginLeft: "10px"}}onClick={() => {}}>Save Location</button>
            <h3>Guarantors</h3>
            <div className={styles.guarantor}>
                <div>
                    <h4>Samuel Lawal</h4>
                    <p>09038047151</p>
                </div>
                <button>Remove</button>
            </div>
            <button className={styles.btn}>Add Guarantor</button>
        </div>
    </div>
  )
}

export default Profile