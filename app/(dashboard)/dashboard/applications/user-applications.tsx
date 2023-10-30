import React, { useEffect, useState } from 'react'
import styles from '../../../styles/dashboard.module.css';
import { getLoanApplications } from '@/app/api/loans';
import { toast } from 'react-toastify';
import { Dots } from 'react-activity';
import AgentApplicationModal from '@/app/components/modals/user-application/user-application';

const UserRequests = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [applicationId, setApplicationId] = useState("");
  const fetchLendings = () => {
    getLoanApplications()
    .then((res) => {
        setApplications(res.data.data.data);
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
  useEffect(() => {
    fetchLendings();
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>Applications</h3>
      </div>
      <div className={styles.table}>
        <div className={styles.rowB}>
          <div>Status</div>
          <div>Amount</div>
          <div>Tenure</div>
          <div>Interest</div>
          <div>Action</div>
        </div>
        {
          loading ? (<div style={{ display: "flex", margin: "20px 0", justifyContent: "center" }}><Dots color='#000'/></div>) :
          applications.length ?
           applications.map((application: any, i) => {
            return (
              <div className={styles.row} key={i}>
                <div>{application.status}</div>
                <div>{application.lending.currency} {application.lending.amount}</div>
                <div>{application.lending.tenure_count} {application.lending.tenure_type}(s)</div>
                <div>{application.lending.interest_rate}%</div>
                <div>
                  <button onClick={() => {
                    setApplicationId(application.id);
                    setShowModal(true);
                  }}>View</button>
                </div>
              </div>
            )
          })
          : (
            <div style={{ display: "flex", margin: "20px 0", justifyContent: "center" }}>No applications</div>
          )
        }
      </div>
      {showModal && <AgentApplicationModal applicationId={applicationId} setShowModal={setShowModal}/>}
    </div>
  )
}

export default UserRequests;

