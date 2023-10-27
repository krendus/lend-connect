"use client"
import Map from '@/app/components/map';
import React, { useEffect, useState } from 'react'
import styles from "../../../styles/explore.module.css";
interface MarkerData {
  position: [number, number];
  popupText: string;
}

const Explore = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [markers, setMarkers] = useState<MarkerData[]>([{
    position: [0, 0],
    popupText: "Your location"
  }]);

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setMarkers([{
          position: [position.coords.latitude, position.coords.longitude],
          popupText: "Your location"
        }])
      }, function (error) {
        console.error("Error getting geolocation:", error);
      },
      { enableHighAccuracy: true } 
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };
  useEffect(() => {
      getLocation();
  }, [])
  
  return (
    <div className={styles.container}>
      <h2 className={styles.head}>Explore</h2>
      <p>Search for lenders within you vicinity.</p>
      {!(latitude && longitude) && (
        <div className={styles.notify}>
          <p>Allow location to search vicinity</p>
          <button className={styles.btn} onClick={getLocation}>Allow Location</button>
        </div>
      ) }
      <div className={styles.content}>
        <div className={styles.left}>
        {(latitude && longitude) ? (<Map markers={markers}/>) : <p>Select Location</p>}
        </div>
        <div className={styles.right}>
          <h3>Lenders</h3>
          <p>Note you can't apply above your current limit</p>
          <div className={styles.lenders}>
            <div className={styles.lender}>
              <div>
                <h4>Samuel Lawal</h4>
                <p>Available: ₦ 300,000</p>
                <p>Max Duration: 7 days</p>
              </div>
              <button>Request</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Explore