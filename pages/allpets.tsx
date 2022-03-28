import React from 'react'
import FullLayout from '../hoc/FullLayout';
import styles from '../styles/PetsPage.module.scss'

const Allpets = () => {
  return (
    <section className={styles.allpets}>
        <div className={styles.heading}>
            <h1>Choose your buddy</h1>
            <div className={styles.filter}>

            </div>
        </div>
        <div className={styles.petsList}>
           <article></article>
           <article></article>
           <article></article>
           <article></article>
           <article></article>
        </div>
       
    </section>
  )
}

export default Allpets;
Allpets.getLayout = function getLayout(page:typeof Allpets){
    return <FullLayout>{page}</FullLayout>
}