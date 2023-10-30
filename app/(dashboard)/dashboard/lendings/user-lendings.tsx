import React, { useEffect, useState } from 'react'
import styles from '../../../styles/dashboard.module.css';
import { fetchAgentAssignedLendings } from '@/app/api/agent';
import { toast } from 'react-toastify';
import { Dots } from 'react-activity';
import { getLendings } from '@/app/api/loans';

const UserLendings = () => {
  const [lendings, setLendings] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchLendings = () => {
    getLendings()
    .then((res) => {
        setLendings(res.data.data.data)
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
        <h3>Lendings</h3>
      </div>
      <div className={styles.table}>
        <div className={styles.rowB}>
          <div>Interest Rate</div>
          <div>Status</div>
          <div>Amount</div>
          <div>Tenure</div>
          <div>Action</div>
        </div>
        {
          loading ? (
            (<div style={{ display: "flex", margin: "20px 0", justifyContent: "center" }}><Dots color='#000'/></div>)
          ) : (
            lendings.length ?
            lendings.map((lending: any) => (
              <div className={styles.row}>
                <div>{lending.interest_rate}%</div>
                <div>{lending.status}</div>
                <div>{lending.currency} {lending.amount}</div>
                <div>{lending.tenure_count} {lending.tenure_type}(s)</div>
                <div>
                  <button>View</button>
                </div>
              </div>
            ))
            : (
              <div style={{ display: "flex", margin: "20px 0", justifyContent: "center" }}>No lendings</div>
            )
          )
        }
      </div>
    </div>
  )
}

export default UserLendings

