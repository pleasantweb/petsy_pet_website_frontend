import Image from 'next/image';
import React from 'react'
import styles from '../styles/Component.module.scss'

const CheckAllBreed = () => {
  return (
    <section className={styles.check_all_breed}>
        <div className={styles.image}>
            <div className={styles.content}>
            <h1>A little love is all they need.</h1>
            <h1>Adopt pets.</h1>
            </div>
           
            <Image src="https://res.cloudinary.com/dcegcusvq/image/upload/v1648539339/petsy/iekoagv8wh0vcn1ydw7j.jpg" alt="dog" layout='fill' />
        </div>

    </section>
  )
}

export default CheckAllBreed;