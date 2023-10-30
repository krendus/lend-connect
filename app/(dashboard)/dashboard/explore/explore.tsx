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
import AgentModal from '@/app/components/modals/agent/agent';
import { haversineDistance } from '@/lib/util';
import { applyForLoan } from '@/app/api/loans';
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
  const [showModal, setShowModal] = useState(false);
  const [agentId, setAgentId] = useState("");
  const [loadingL, setLoadingL] = useState(false);
  const [markers, setMarkers] = useState<MarkerData[]>([{
    position: [0, 0],
    popupText: ""
  }]);
  const [lendingMarkers, setLendingMarkers] = useState<MarkerData[]>([{
    position: [0, 0],
    popupText: ""
  }]);
  

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
        const resData = res.data.data;
        if(resData) {
          const resMarker: MarkerData[] = [];
          setLendings(resData);
          resData.forEach((agent: any) => {
            const distance = haversineDistance(rLat, rLong, agent.lender.location.latitude, agent.lender.location.longitude)
            resMarker.push({
              position: [agent.lender.location.latitude, agent.lender.location.longitude],
              popupText: `<h4 style='margin: 1px 0;'>${agent.amount}</h4><p style='color: green; font-size: 12px; margin: 1px 0;'>${distance.toFixed()}km from you</p>`
            })
          })
          console.log(resMarker)
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
  const apply = (lending_id: string) => {
    if(loadingL) return;
    setLoadingL(true);
    applyForLoan({
        agent_id: Number(agentId),
        lending_id: Number(lending_id)
    })
    .then((res) => {
        toast.success("Loan application submitted successfully");
        setLoadingL(false);
    })
    .catch((e: any) => {
        if(e?.response?.data?.message) {
            toast.error(e.response.data.message, {
            position: toast.POSITION.TOP_RIGHT
            });
            setLoadingL(false);
            return;
        }
        if(e.message) {
            toast.error(e.message, {
            position: toast.POSITION.TOP_RIGHT
            });
        }
        setLoadingL(false);
        });
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
                              <button onClick={() => {
                                setShowModal(true);
                                setAgentId(agent.id)
                              }}>Use</button>
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
                      {
                          lendings.map((lending: any, i) => {
                              const distance = haversineDistance(latitude, longitude, lending.lender.location.latitude, lending.lender.location.longitude)
                              return (
                                  <div className={styles.lender} key={i}>
                                      <div className={styles.logo}>
                                          <Image src={lending.lender.profile_pic} alt='logo' height={40} width={40} style={{ objectPosition: "center", objectFit: "cover" }}/> 
                                      </div>
                                      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                      <div>
                                          <h4>{lending.currency} {lending.amount}</h4>
                                          <p className={styles.loc}>{distance.toFixed(2)}km from you</p>
                                      </div>
                                      <button onClick={() => apply(lending.id)}>{loadingL ? <Dots color='#fff'/> : "Apply"}</button>
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
        )
      }
      {showModal && <AgentModal agentId={agentId} setShowModal={setShowModal} longitude={longitude} latitude={latitude}/>}
    </div>
  )
}

export default Explore