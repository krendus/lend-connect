import React, { useState, FC, useEffect } from 'react'
import exploreStyles from "../../../styles/explore.module.css"
import Image from 'next/image';
import styles from '../style.module.css';
import { CancelIcon } from '@/app/assets/svg-icons';
import { toast } from 'react-toastify';
import { Dots } from 'react-activity' 
import { approveApplication, fetchSingleApplication } from '@/app/api/agent';

interface IAgent {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    applicationId: string
}

const AgentApplicationModal: FC<IAgent> = ({ applicationId, setShowModal }) => {
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const approve = () => {
    if(loading) return;
    setLoading(true);
    approveApplication(applicationId, {
        agent_fee: 100,
        start_date: (new Date()).toISOString().split('T')[0].split("-").reverse().join("-"),
        description: "Approved the loan"
    })
    .then((res) => {
        toast.success("Loan application approved");
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
  const fetchApplication = () => {
    fetchSingleApplication(applicationId)
    .then((res) => {
        setApplication(res.data.data)
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
    fetchApplication();
  }, [])
  
  return (
    <div className={styles.container}>
        <div className={styles.modal} style={{ paddingTop: "30px" }}>
            <button className={styles.close} onClick={() => setShowModal(false)}><CancelIcon /></button>
            <div className={styles.details}>
                <h4>Amount</h4>
                <p>{application?.lending?.currency} {application?.lending?.amount}</p>
            </div>
            <div className={styles.details}>
                <h4>Tenure</h4>
                <p>{application?.lending?.tenure_count} {application?.lending?.tenure_type}(s)</p>
            </div>
            <div className={styles.details}>
                <h4>Interest</h4>
                <p>{application?.lending?.interest_rate}%</p>
            </div>
            <div className={styles.details}>
                <h4>Status</h4>
                <p>{application?.status}</p>
            </div>
            <div className={styles.details}>
                <h4>Borrower Address</h4>
                <p>{application?.user.location.address}</p>
            </div>
            <div className={styles.details}>
                <h4>Borrower Phone Number</h4>
                <p>{application?.user.phone}</p>
            </div>
            <div className={exploreStyles.lender} style={{ marginTop: "20px" }}>
                <div className={exploreStyles.logo}>
                    {application?.user.profile_pic && <Image src={application?.user.profile_pic} alt='logo' height={40} width={40} style={{ objectPosition: "center", objectFit: "cover" }}/>} 
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                    <div>
                    <h4>{application?.user.firstname} {application?.user.lastname}</h4>
                    <p className={exploreStyles.loc}>Loan limit: {application?.user.kyc_level?.loan_limit}</p>
                    </div>
                   { (application?.status !== "Approved") && <button onClick={approve}>{loading ? <Dots color='#fff' /> : "Approve"}</button>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default AgentApplicationModal