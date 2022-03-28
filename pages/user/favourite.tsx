import React from 'react'
import FullLayout from '../../hoc/FullLayout';
import styles from '../../styles/User.module.scss'

const Favourite = () => {
  return (
   <section className={styles.favourite}>
       
   </section>
  )
}

export default Favourite;
Favourite.getLayout = function getLayout(page:typeof Favourite){
    return <FullLayout>{page}</FullLayout>
}