import Image from 'next/image'
import React from 'react'
import styles from '../styles/Component.module.scss'

const Header = () => {
  return (
    <header className={styles.home_header}>
        <div className={styles.header_image}>
          <Image src="https://res.cloudinary.com/dcegcusvq/image/upload/v1648523691/petsy/ldowy17d77c07knwnsqg.jpg" layout='fill' alt='dog_image' />
        </div>
        <div className={styles.header_text}>
          <h3>Buying commodities <br /> is one thing... </h3>
          <h3>Buying real life cuties <br /> is another.</h3>
          <button>A Pet E-commerce Platform</button>
        </div>
    </header>
  )
}

export default Header