import React from 'react'
import styles from '../../styles/dashboard.module.css';

const AgentDashboard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <p>Active Loans</p>
          <h1>0</h1>
        </div>
        <div className={styles.card}>
          <p>Completed Loans</p>
          <h1>0</h1>
        </div>
        <div className={styles.card}>
          <p>Overdue Loans</p>
          <h1>0</h1>
        </div>
        <div className={styles.card}>
          <p>Total Earning</p>
          <h1>₦ 0</h1>
        </div>
        <div className={styles.card}>
          <p>Trust score</p>
          <h1>0</h1>
        </div>
        <div className={styles.card}>
          <p>Total Amount Disbursed</p>
          <h1>₦ 0</h1>
        </div>
      </div>
      <div className={styles.heading}>
        <h3>Recent Transactions</h3>
      </div>
      <div className={styles.table}>
        <div className={styles.rowB}>
          <div>Type</div>
          <div>Status</div>
          <div>Amount</div>
          <div>Date</div>
          <div>Action</div>
        </div>
        <div className={styles.row}>
          <div>Loan</div>
          <div>Ongoing</div>
          <div>₦ 5200</div>
          <div>10th October, 2021</div>
          <div>
            <button>View</button>
          </div>
        </div>
        <div className={styles.row}>
          <div>Lending</div>
          <div>Ongoing</div>
          <div>₦ 1200</div>
          <div>12th October, 2021</div>
          <div>
            <button>View</button>
          </div>
        </div>
        <div className={styles.row}>
          <div>Lending</div>
          <div>Completed</div>
          <div>₦ 1200</div>
          <div>12th October, 2021</div>
          <div>
            <button>View</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AgentDashboard
