import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import FullLayout, { userContextHook } from '../../hoc/FullLayout';
import styles from '../../styles/PetsPage.module.scss'
import { breedType } from '../../types/alltypes';
import { AiOutlineHeart,AiFillHeart} from "react-icons/ai";
import { FaClosedCaptioning } from 'react-icons/fa';
import { favourite_pet } from '../../fetchData/favourite/favouritelist';

const PetPage = () => {
  const router = useRouter()
  const {petid} = router.query
  const [favourite,setFavourite] = useState(false)
  const [petData,setPetData] = useState<breedType>()



  const currenetUser = useContext(userContextHook)
  const {isAuthenticated,user,allPets,userSession,favouriteList,getFavouriteList} = currenetUser

  useEffect(()=>{
    
    if(petid){
      let check = favouriteList.filter(v=>v.pet.id === parseInt(petid.toString()))
     if(check.length){
       setFavourite(true)
     }
      
    }
  },[petid,favouriteList])

  useEffect(()=>{
    if(petid){
      const id = parseInt(petid.toString())
      if(!isNaN(id)){
        if(allPets && allPets.length){
          const ourpet = allPets.filter(v=>v.id === id)
          setPetData(ourpet[0])
        }
      }
    }
  },[petid,allPets])
  console.log(petData);
  
  const favouritePet=(b:boolean,petid:number)=>{
     setFavourite(b)
     if(userSession.id){
     favourite_pet(userSession.id,petid)
     getFavouriteList(userSession.id)
     }
  }
  
  return (
    <section className={styles.pet_page}>
        {petData && Object.entries(petData).length !== 0 && petData.constructor === Object ? (
         <>
         <div className={styles.petheader}>
            <div className={styles.left}>
              <div className={styles.name_favourite}>
              <h1>{petData.breed}</h1>
              {favourite ? (<AiFillHeart title='Favourite Added' />):(<AiOutlineHeart title='Favourite' onClick={()=>favouritePet(true,petData.id)} />)}
              </div>
              
              <h2>Bred For: <span>{petData.bred_for}</span> </h2>
              <h2>Origin: <span>{petData.origin}</span> </h2>
              <h2>Life Span: <span>{petData.life_span}</span></h2>
              <h2>Temprament: <span>{petData.temprament}</span></h2>
              <h2>Addoption Charge: <span>Rs.{petData.price}</span></h2>
              <div className={styles.actions}>
                <button onClick={()=>router.push('/shop/payment')}>Enquire</button>
                <button onClick={()=>router.push('/shop/payment')} >Addopt</button>
              </div>

            </div>
            <div className={styles.right}>
              <Image src={petData.image} layout='fill' alt={petData.breed} />
            </div>
          </div>
          <div className={styles.description}>
             <p>{petData.description}</p>
          </div>
          </>
        ):(<h1>No Data Found</h1>) }
    </section>
  )
}

export default PetPage;
PetPage.getLayout = function getLayout(page:typeof PetPage){
    return <FullLayout>{page}</FullLayout>
}