import Image from 'next/image';
import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai';
import { remove_favourite } from '../../fetchData/favourite/favouritelist';
import FullLayout, { userContextHook } from '../../hoc/FullLayout';
import styles from '../../styles/PetsPage.module.scss'
import { favouriteType } from '../../types/alltypes';

const Favourites = () => {
    const currenetUser = useContext(userContextHook)
  const {isAuthenticated,user,allPets,userSession,favouriteList,getFavouriteList} = currenetUser
 
  const [favData,setFavData] = useState<favouriteType[]>([])
  useEffect(()=>{
      if(favouriteList && favouriteList.length){
     setFavData(favouriteList)
      }
  },[favouriteList])

  const removeFavourite=async(id:number)=>{
    const deleted = await remove_favourite(id)
    if(deleted){
        setFavData(favData.filter(v=>v.id !== id))
        if(userSession.id){
        getFavouriteList(userSession.id)
        }
    }
}
  return (
    <section className={styles.favourite_page}>
       <div className={styles.pets}>
           {favData && favData.length ? (
               favData.map((v,i)=>(
                <article key={i}>
                     <div className={styles.image}>
                          <Image src={v.pet.image} layout='fill' alt={v.pet.breed} />
                      </div>
                      <div className={styles.details}>
                          <div className={styles.name_pet}>
                            <h1>{v.pet.breed}</h1>
                            <AiFillHeart />
                          </div>
                        
                         <div className={styles.pet_details}>
                             <h2>{v.pet.temprament}</h2>
                         <h2>Adoption Charge: Rs.{v.pet.price}</h2>
                         </div>
                         <div className={styles.actions}>
                         <button>Proceed to Addopt</button>
                         <button onClick={()=>removeFavourite(v.id)} >Remove from favourite</button>
                         </div>
                         
                      </div>
                     
                </article>
            ))
           ):(<h1 className={styles.noFav}>No Favourites Yet</h1>)}
       </div>
    </section>
  )
}

export default Favourites;
Favourites.getLayout= function(page:typeof Favourites){
    return <FullLayout>{page}</FullLayout>
}