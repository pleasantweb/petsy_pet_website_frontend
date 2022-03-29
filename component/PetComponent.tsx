import Image from 'next/image';
import React from 'react'
import styles from '../styles/Component.module.scss'

const PetComponent = () => {
  return (
   <section className={styles.pet_compo}>
       <div className={styles.image}>
           <div className={styles.content}>
               <h2>24/7 Guide <br /> Helpline</h2>
               <button>Get your First Pet</button>
           </div>
           <Image src="https://res.cloudinary.com/dcegcusvq/image/upload/v1648542240/petsy/wpu2maxfxj7ulrnapii9.jpg" alt='dog' layout='fill' />
       </div>
   </section>
  )
}

export default PetComponent;