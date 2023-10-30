import React, { useEffect, useState } from 'react'
import styles from '../../../styles/dashboard.module.css';
import { toast } from 'react-toastify';
import { Dots } from 'react-activity'
import { fetchAgentLoans } from '@/app/api/agent';
import { getAllLoans } from '@/app/api/loans';

const UserLoans = () => {
  const [loans, setLoans] = useState([]);
  const [loanId, setLoanId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const fetchLoans = () => {
    getAllLoans()
    .then((res) => {
        setLoans(res.data.data.data);
        console.log(res.data.data);
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
    fetchLoans();
  }, [])
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>Loans</h3>
      </div>
      <div className={styles.table}>
        <div className={styles.rowB}>
          <div>Amount</div>
          <div>Agent Fee</div>
          <div>Tenure</div>
          <div>Due Date</div>
          <div>Action</div>
        </div>
        {
          loading ? (
            (<div style={{ display: "flex", margin: "20px 0", justifyContent: "center" }}><Dots color='#000'/></div>)
          ) : (
            loans.length ?
            loans.map((loan: any, i) => (
              <div className={styles.row} key={i}>
                <div>{loan.currency} {loan.amount}</div>
                <div>{loan.currency} {loan.agent_fee}</div>
                <div>{loan.tenure_count} {loan.tenure_type}(s)</div>
                <div>{(new Date(loan.end_date)).toDateString()}</div>
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

export default UserLoans
