import React, { useEffect, useState } from 'react'
import styles from '../../../styles/dashboard.module.css';
import { fetchAgentAssignedLendings } from '@/app/api/agent';
import { toast } from 'react-toastify';
import { Dots } from 'react-activity';

const AgentLendings = () => {
  const [lendings, setLendings] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchLendings = () => {
    fetchAgentAssignedLendings()
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
      <div className={styles.heading}>
        <h3>Lendings</h3>
      </div>
      <div className={styles.rowB}>
        <div>Type</div>
        <div>Status</div>
        <div>Amount</div>
        <div>Date</div>
        <div>Action</div>
      </div>
      {
        loading ? (
          <Dots color='#000' />
        ) : (
          lendings.map((lending: any) => (
            <div className={styles.row}>
              <div>Loan</div>
              <div>Ongoing</div>
              <div>{lending.currency} {lending.amount}</div>
              <div>10th October, 2021</div>
              <div>
                <button>View</button>
              </div>
            </div>
          ))
        )
      }
    </div>
  )
}

export default AgentLendings

