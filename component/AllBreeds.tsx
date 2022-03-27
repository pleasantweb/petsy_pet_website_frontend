import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { petbreeds } from '../fetchData/fetchpetdata'
import styles from '../styles/Component.module.scss'
import { breedType } from '../types/alltypes'



const AllBreeds = () => {
    const [pageNumber,setPageNumber]= useState(0)
    const [petDetails,setPetDetails] = useState<breedType[]>([])

    

  return (
   <section className={styles.allBreeds}>
       <div className={styles.searchBread}>
           <div className={styles.inp_div}>
               <input type="text" />
               <input type="submit" value="search" />
           </div>
       </div>
       <div className={styles.details}>

       </div>
       <div className={styles.dog_breeds}>
            <article></article>
            <article></article>
            {/* <article></article> */}
       </div>
      
   </section>
  )
}

export default AllBreeds;

