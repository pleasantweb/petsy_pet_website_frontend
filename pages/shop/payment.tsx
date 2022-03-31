import React from 'react'
import WorkInProgress from '../../component/WorkInProgress';
import FullLayout from '../../hoc/FullLayout';
import styles from '../../styles/Shop.module.scss'
const Payment = () => {
  return (
    <section className={styles.payment_page}>
          <WorkInProgress />
    </section>
  )
}

export default Payment;
Payment.getLayout = function getLayout(page:typeof Payment){
    return <FullLayout>{page}</FullLayout>
}