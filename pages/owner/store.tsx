import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext } from 'react'
import FullLayout, { userContextHook } from '../../hoc/FullLayout';
import styles from '../../styles/Admin.module.scss'

const Store = () => {
  const currenetUser = useContext(userContextHook)
  const {isAuthenticated,user,allPets} = currenetUser
   const router = useRouter()
  return (
    <section className={styles.store}>
        <div className={styles.heading}>
            <h1>Pet Home</h1>
            <button onClick={()=>router.push('/owner/addnewbreed')}>Add New</button>
        </div>
        <div className={styles.allPets}>
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
                
                <div className={styles.actions}>
                  <button>Edit</button>
                  <button>Remove</button>
                </div>
          </article>
            ))
           
          ):(<h1>NO DATA FOUND</h1>)}
           
          
        </div>
    </section>
  )
}

export default Store;
Store.getLayout= function getLayout(page:typeof Store){
    return <FullLayout>{page}</FullLayout>
}