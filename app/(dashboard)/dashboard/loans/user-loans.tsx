import React from 'react'
import styles from '../../../styles/dashboard.module.css';

const UserLoans = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>Loans</h3>
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
          <div>Loan</div>
          <div>Completed</div>
          <div>₦ 5200</div>
          <div>10th October, 2021</div>
          <div>
            <button>View</button>
          </div>
        </div>
        <div className={styles.row}>
          <div>Loan</div>
          <div>Overdue</div>
          <div>₦ 5200</div>
          <div>10th October, 2021</div>
          <div>
            <button>View</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserLoans

