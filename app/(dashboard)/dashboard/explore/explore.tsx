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
import { exploreAgents, exploreLendings } from '@/app/api/explore';
interface MarkerData {
  position: [number, number];
  popupText: string;
}

const Explore = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isAgent, setIsAgent] = useState(true);
  const [agents, setAgents] = useState([]);
  const [lendings, setLendings] = useState([]);
  const [markers, setMarkers] = useState<MarkerData[]>([{
    position: [0, 0],
    popupText: ""
  }]);
  const [lendingMarkers, setLendingMarkers] = useState<MarkerData[]>([{
    position: [0, 0],
    popupText: ""
  }]);
  function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const radius = 6371.0;
  
    const lat1Rad = (Math.PI / 180) * lat1;
    const lon1Rad = (Math.PI / 180) * lon1;
    const lat2Rad = (Math.PI / 180) * lat2;
    const lon2Rad = (Math.PI / 180) * lon2;

    const dLon = lon2Rad - lon1Rad;
    const dLat = lat2Rad - lat1Rad;
  
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
 
    const distance = radius * c;
  
    return distance;
  }
  

  const fetchNearbyAgents = (lat?: number, long?: number) => {
    let rLat = lat ? lat : latitude;
    let rLong = long ? long : longitude;
    if(rLat && rLong) {
      exploreAgents(`${rLat},${rLong}`)
      .then((res) => {
        const resData = res.data.data.data;
        const resMarker: MarkerData[] = [];
        setAgents(resData);
        resData.forEach((agent: any) => {
          const distance = haversineDistance(rLat, rLong, agent.location.latitude, agent.location.longitude)
          resMarker.push({
            position: [agent.location.latitude, agent.location.longitude],
            popupText: `<h4 style='margin: 1px 0;'>${agent.firstname} ${agent.lastname}</h4><p style='color: green; font-size: 12px; margin: 1px 0;'>${distance.toFixed(2)}km from you</p>`
          })
        })
        setMarkers((prevMarker) => {
          let adjusted = [...prevMarker, ...resMarker]
          return adjusted;
        })
        setLoading(false);
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
    } else {
      toast.error("Set your location");
    }
  }
  const fetchNearbyLendings = (lat?: number, long?: number) => {
    let rLat = lat ? lat : latitude;
    let rLong = long ? long : longitude;
    if(rLat && rLong) {
      exploreLendings(`${rLat},${rLong}`)
      .then((res) => {
        const resData = res.data.data.data;
        if(resData) {
          const resMarker: MarkerData[] = [];
          setLendings(resData);
          resData.forEach((agent: any) => {
            resMarker.push({
              position: [agent.location.latitude, agent.location.longitude],
              popupText: `<h4 style='margin: 1px 0;'>${agent.firstname} ${agent.lastname}</h4><p style='color: green; font-size: 12px; margin: 1px 0;'>9km from you</p>`
            })
          })
          setLendingMarkers((prevMarker) => {
            let adjusted = [...prevMarker, ...resMarker]
            return adjusted;
          })
        }
        setLoading(false);
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
    } else {
      toast.error("Set your location");
    }
  }

  const getLocation = () => {
    if (typeof window !== 'undefined' && 'geolocation' in window.navigator) {
      window.navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setMarkers([{
          position: [position.coords.latitude, position.coords.longitude],
          popupText: "<p style='color: green; font-size: 14px;'>Your location</p>"
        }])
        setLendingMarkers([{
          position: [position.coords.latitude, position.coords.longitude],
          popupText: "<p style='color: green; font-size: 14px;'>Your location</p>"
        }])
        toast.success("Location access granted");
        fetchNearbyAgents(position.coords.latitude, position.coords.longitude);
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
 
  const setTabAgents = () => {
    setIsAgent(true);
    setLoading(true);
    fetchNearbyAgents();
  }
  const setTabLendings = () => {
    setIsAgent(false);
    setLoading(true);
    fetchNearbyLendings();
  }
  useEffect(() => {
    getLocation();
  }, [])
  
  return (
    <div className={styles.container}>
      <h2 className={styles.head}>Explore</h2>
      <p>Search for agents / lendings within your vicinity.</p>
      <div className={styles.tabContainer}>
        <button className={isAgent ? styles.tabActive : styles.tab} onClick={() => setTabAgents()}>Agent</button>
        <button className={!isAgent ? styles.tabActive : styles.tab} onClick={() => setTabLendings()}>Lendings</button>
      </div>
      {
        isAgent ? (
          <>
            {!(latitude && longitude) && (
              <div className={styles.notify}>
                <button className={styles.btn} onClick={getLocation}>Allow Location</button>
              </div>
            ) }
            <div className={styles.content}>
              <div className={styles.left}>
              {(latitude && longitude) ? (<Map markers={markers}/>) : loading ? <div className={styles.center}><Dots color='black'/></div> : <div className={styles.center}><p>Allow Location to view map</p></div>} 
              </div>
              <div className={styles.right}>
                <h3>Agents</h3>
                <p>Note you can't apply above your current loan limit</p>
                {
                  loading ? (
                    <Dots color='black' />
                  ) : (
                    <div className={styles.lenders}>
                      {
                        agents.map((agent: any, i) => {
                          const distance = haversineDistance(latitude, longitude, agent.location.latitude, agent.location.longitude)
                          return (
                          <div className={styles.lender} key={i}>
                            <div className={styles.logo}>
                                <Image src={agent.profile_pic} alt='logo' height={40} width={40} style={{ objectPosition: "center", objectFit: "cover" }}/> 
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                              <div>
                                <h4>{agent.firstname} {agent.lastname}</h4>
                                <p className={styles.loc}>{distance.toFixed(2)}km from you</p>
                              </div>
                              <button>Apply</button>
                            </div>
                          </div>
                        )
                      })
                      }
                    </div>
                  )
                }
              </div>
            </div>
          </>
        ) : (
          <>
            {!(latitude && longitude) && (
              <div className={styles.notify}>
                <button className={styles.btn} onClick={getLocation}>Allow Location</button>
              </div>
            ) }
            <div className={styles.content}>
              <div className={styles.left}>
              {(latitude && longitude) ? (<Map markers={lendingMarkers}/>) : loading ? <div className={styles.center}><Dots color='black'/></div> : <div className={styles.center}><p>Allow Location to view map</p></div>} 
              </div>
              <div className={styles.right}>
                <h3>Lendings</h3>
                <p>Note you can't apply above your current limit</p>
                {
                  loading ? (
                    <Dots color='black' />
                  ) : (
                    <div className={styles.lenders}>
                      <div className={styles.lender}>
                        <div className={styles.logo}>
                            <Image src={userImage} alt='logo' height={40} width={40} style={{ objectPosition: "center", objectFit: "cover" }}/> 
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                          <div>
                            <h4>₦ 50,000</h4>
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
                            <h4>₦ 100,000</h4>
                            <p className={styles.loc}>24km from you</p>
                          </div>
                          <button>Apply</button>
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default Explore