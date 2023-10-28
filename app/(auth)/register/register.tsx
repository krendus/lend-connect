"use client"

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import Link from 'next/link'
import styles from '../../styles/auth.module.css';
import Script from 'next/script'

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const autoCompleteRef = useRef<any>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [selected, setSelected] = useState(false);
  const options = {
    componentRestrictions: { country: "ng" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"]
  };
const handleLoaded = () => {
    autoCompleteRef.current = new (window as any).google.maps.places.Autocomplete(
        inputRef.current,
        options
    );
    autoCompleteRef.current.addListener('place_changed', () => {
        const selectedPlace = autoCompleteRef.current.getPlace();
        if (selectedPlace) {
            const rLongitude = selectedPlace.geometry.location.lng();
            const rLatitude = selectedPlace.geometry.location.lat();
            let rCity = '';
            let rState = '';
            let rCountry = '';
          
            for (const component of selectedPlace.address_components) {
              const types = component.types;
              if (types.includes('locality')) {
                rCity = component.long_name;
              } else if (types.includes('administrative_area_level_1')) {
                rState = component.long_name;
              } else if (types.includes('country')) {
                rCountry = component.long_name;
              }
            }
            setLongitude(rLongitude);
            setLatitude(rLatitude);
            setCity(rCity);
            setState(rState);
            setCountry(rCountry);
            setAddress(inputRef.current?.value ?? "");
            setSelected(true)
        }
    })
  }
 
  return (
    <div className={styles.container}>
        <Script 
        type="text/javascript"
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}&libraries=places`}
        onLoad={handleLoaded}
        />
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
                <label>Address</label>
                <input
                 type='text'
                 placeholder='Enter your address'
                 value={address}
                 ref={inputRef}
                 onChange={(e) => { 
                    setAddress(e.target.value);
                    setSelected(false);
                }}
                 />
                 {!selected && <p style={{ fontSize: "12px", marginTop: "5px", marginLeft: "10px", color: "red" }}>Pick an address</p>}
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