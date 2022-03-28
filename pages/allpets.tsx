import React, { useContext } from 'react'
import FullLayout, { userContextHook } from '../hoc/FullLayout';
import styles from '../styles/PetsPage.module.scss'
import Image from 'next/image';
import { useRouter } from 'next/router';

const Allpets = () => {
  const currenetUser = useContext(userContextHook)
  const {isAuthenticated,user,allPets} = currenetUser
  const router = useRouter()
  return (
    <section className={styles.allpets}>
        <div className={styles.heading}>
            <h1>Choose your buddy</h1>
            <div className={styles.filter}>

            </div>
        </div>
        <div className={styles.petsList}>
        {allPets && allPets.length ? (
            allPets.map((v,i)=>(
              <article key={i}>
                <div className={styles.image}>
                  <Image layout='fill' src={v.image} alt={v.breed} />
                </div>
                <div className={styles.details}>
                <h2>{v.breed}</h2>
                <h2>RS.{v.price}</h2>
                </div>
                
                <div className={styles.check_btn}>
                  <button onClick={()=>router.push(`/petpage/${v.id}`)}>Check</button>
                </div>
               
          </article>
            ))
           
          ):(<h1>NO DATA FOUND</h1>)}
           
          
        </div>
       
    </section>
  )
}

export default Allpets;
Allpets.getLayout = function getLayout(page:typeof Allpets){
    return <FullLayout>{page}</FullLayout>
}