import React, { useState, FC, useEffect } from 'react'
import exploreStyles from "../../../styles/explore.module.css"
import Image from 'next/image';
import userImage from '../../../assets/user.jpg';
import styles from '../style.module.css';
import { CancelIcon } from '@/app/assets/svg-icons';
import { applyForLoan, createLending } from '@/app/api/loans';
import { toast } from 'react-toastify';
import { Dots } from 'react-activity' 
import { fetchAgentLendings } from '@/app/api/agent';
import { haversineDistance } from '@/lib/util';

interface IAgent {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    agentId: string,
    longitude: number,
    latitude: number
}

const AgentModal: FC<IAgent> = ({ agentId, setShowModal, longitude, latitude }) => {
  const [isBorrow, setIsBorrow] = useState(true);
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [tenureType, setTenureType] = useState("");
  const [tenureCount, setTenureCount] = useState("");
  const [loading, setLoading] = useState(false);
  const [lendings, setLendings] = useState([]);
  const handleCreateLending = () => {
    if(loading) return;
    setLoading(true);
    createLending({
        amount: Number(amount),
        currency: "NGN",
        interest_rate: Number(interestRate),
        tenure_type: tenureType,
        tenure_count: Number(tenureCount), 
        agent_id: Number(agentId)
    })
    .then((res) => {
        toast.success("Lending created successfully");
        setShowModal(false);
        setLoading(false);
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
  const apply = (lending_id: string) => {
    if(loading) return;
    setLoading(true);
    applyForLoan({
        agent_id: Number(agentId),
        lending_id: Number(lending_id)
    })
    .then((res) => {
        toast.success("Loan application submitted successfully");
        setLoading(false);
        setShowModal(false)
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
  const fetchLendings = () => {
    fetchAgentLendings(agentId)
    .then((res) => {
        setLendings(res.data.data)
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
    fetchLendings();
  }, [])
  
  return (
    <div className={styles.container}>
        <div className={styles.modal}>
            <button className={styles.close} onClick={() => setShowModal(false)}><CancelIcon /></button>
            <div className={exploreStyles.tabContainer}>
                <button className={isBorrow ? exploreStyles.tabActive : exploreStyles.tab} onClick={() => setIsBorrow(true)}>Borrow</button>
                <button className={!isBorrow ? exploreStyles.tabActive : exploreStyles.tab} onClick={() => setIsBorrow(false)}>Lend</button>
            </div>
            {
                !isBorrow ? (
                    <div>
                        <div className={styles.inputContainer}>
                            <label>Amount</label>
                            <input
                            type='text'
                            placeholder='Enter amount'
                            value={amount}
                            onChange={(e) => (e.target.value === "" || Number(e.target.value)) && setAmount(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Interest rate</label>
                            <input
                            type='text'
                            placeholder='Enter interest rate in %'
                            value={interestRate}
                            onChange={(e) => (e.target.value === "" || Number(e.target.value)) && setInterestRate(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Tenure type</label>
                            <select 
                             value={tenureType}
                             onChange={(e) => setTenureType(e.target.value)}
                            >
                                <option value="">Select tenure type</option>
                                <option value="day">Day</option>
                                <option value="month">Month</option>
                            </select>
                        </div>
                        <div className={styles.inputContainer}>
                            <label>Tenure count</label>
                            <input
                            type='text'
                            placeholder='Enter tenure count'
                            value={tenureCount}
                            onChange={(e) => (e.target.value === "" || Number(e.target.value)) && setTenureCount(e.target.value)}
                            />
                        </div>
                        <button className={styles.submitBtn} onClick={handleCreateLending}>{loading ? <Dots color='#fff'/> : "Create"}</button>
                    </div>
                ) : (
                    <div className={exploreStyles.lenders}>
                        {
                            lendings.map((lending: any, i) => {
                                const distance = haversineDistance(latitude, longitude, lending.lender.location.latitude, lending.lender.location.longitude)
                                return (
                                    <div className={exploreStyles.lender} key={i}>
                                        <div className={exploreStyles.logo}>
                                            <Image src={lending.lender.profile_pic} alt='logo' height={40} width={40} style={{ objectPosition: "center", objectFit: "cover" }}/> 
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                        <div>
                                            <h4>{lending.currency} {lending.amount}</h4>
                                            <p className={exploreStyles.loc}>{distance.toFixed(2)}km from you</p>
                                        </div>
                                        <button onClick={() => apply(lending.id)}>{loading ? <Dots color='#fff'/> : "Apply"}</button>
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
  )
}

export default AgentModal