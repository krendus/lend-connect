"use client"
import dynamic from 'next/dynamic';

const Map = dynamic(() => import('@/app/components/map'), {
  ssr: false,
});
import React, { useEffect, useState } from 'react'
import styles from "../../../styles/explore.module.css";
import { toast }from 'react-toastify'
import { Dots } from 'react-activity';
import Image from 'next/image';
import userImage from '../../../assets/user.jpg';
interface MarkerData {
  position: [number, number];
  popupText: string;
}

const Explore = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [loading, setLoading] = useState(true);
  const [markers, setMarkers] = useState<MarkerData[]>([{
    position: [0, 0],
    popupText: ""
  }]);

  const getLocation = () => {
    if (typeof window !== 'undefined' && 'geolocation' in window.navigator) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setMarkers([{
          position: [position.coords.latitude, position.coords.longitude],
          popupText: "<p style='color: green; font-size: 14px;'>Your location</p>"
        }])
        toast.success("Location access granted");
        setLoading(false);
      }, function (error) {
        console.error("Error getting geolocation:", error);
        toast.error("Location access denied");
        setLoading(false);
      },
      { enableHighAccuracy: true } 
      );
    } else {
      console.log('Geolocation is not available in this browser or environment.');
    }
  };
  useEffect(() => {
    getLocation();
  }, [])
  
  return (
    <div className={styles.container}>
      <h2 className={styles.head}>Explore</h2>
      <p>Search for agents within you vicinity.</p>
      {!(latitude && longitude) && (
        <div className={styles.notify}>
          <p>Allow location to search vicinity</p>
          <button className={styles.btn} onClick={getLocation}>Allow Location</button>
        </div>
      ) }
      <div className={styles.content}>
        <div className={styles.left}>
        {(latitude && longitude && typeof window !== 'undefined') ? (<Map markers={markers}/>) : loading ? <div className={styles.center}><Dots color='black'/></div> : <div className={styles.center}><p>Allow Location to view map</p></div>} 
        </div>
        <div className={styles.right}>
          <h3>Agents</h3>
          <p>Note you can't apply above your current limit</p>
          <div className={styles.lenders}>
            <div className={styles.lender}>
              <div className={styles.logo}>
                  <Image src={userImage} alt='logo' height={40} width={40} style={{ objectPosition: "center", objectFit: "cover" }}/> 
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <div>
                  <h4>Samuel Lawal</h4>
                  <p className={styles.loc}>9km from you</p>
                </div>
                <button>Apply</button>
              </div>
            </div>
            <div className={styles.lender}>
              <div className={styles.logo}>
                  <Image src={userImage} alt='logo' height={40} width={40} style={{ objectPosition: "center", objectFit: "cover" }}/> 
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <div>
                  <h4>Aaron Musk</h4>
                  <p className={styles.loc}>24km from you</p>
                </div>
                <button>Apply</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explore