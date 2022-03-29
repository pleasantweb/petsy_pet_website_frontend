import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { userContextHook } from '../hoc/FullLayout'
import styles from '../styles/Component.module.scss'
import { breedType } from '../types/alltypes'



const AllBreeds = () => {
    const router = useRouter()
    const currenetUser = useContext(userContextHook)
    const {allPets} = currenetUser


    const [breedSuggest,setBreedSuggest] = useState<breedType[]>([])
    const [openSuggest,setOpenSuggest] = useState(false)

    const [currentPet,setCurrentPet] = useState<breedType>()

   
    const [breed,setBreed] = useState("Husky")

    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setBreed(e.target.value)

      const yo= allPets.filter(v=>v.breed.toLowerCase().includes(e.target.value.toLowerCase()))
       setBreedSuggest(yo)
    
    }
    const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
         e.preventDefault()
         const yo= allPets.filter(v=>v.breed.toLowerCase().includes(breed.toLowerCase()))
      
         setCurrentPet(yo[0])
    }
    const onBlurr=()=>{
        setTimeout(()=>{
            setOpenSuggest(false)
        },500)
    }

    useEffect(()=>{
        if(breed === ""){
            setBreedSuggest([])
        }
    },[breed])
    
    const searchPet=(name:string)=>{
      
        
       setBreed(name)
       const yo = allPets.filter(v=>v.breed === name)
       console.log(yo);
       
       setCurrentPet(yo[0])
    }
console.log(currentPet);

  return (
   <section className={styles.allBreeds}>
       <div className={styles.searchBread}>
           <form action="" onSubmit={onSubmit}>
           <div className={styles.inp_div}>
               <input onBlur={onBlurr} onFocus={()=>setOpenSuggest(true)} onChange={onChange} value={breed} type="text" />
               <div className={openSuggest  && breed !== "" ? (styles.suggestion) :(styles.close)}>
                   {breedSuggest.length ? (
                       breedSuggest.map((v,i)=>(
                           <h2 onClick={()=>searchPet(v.breed)} key={i}>{v.breed}</h2>
                       ))
                   ):(breed !== "" ?(<h2>Not Found</h2>):("")
                   )}
               </div>
               <input type="submit" value="search" />
           </div>
           </form>
       </div>
      
       <div className={styles.dog_breeds}>
           {currentPet ? (
               <>
               <div className={styles.image}>
                   <Image src={currentPet.image} alt={currentPet.breed} layout='fill' />
               </div>
               <div className={styles.content}>
                   <h1>{currentPet.breed}</h1>
                   <h2>{currentPet.temprament}</h2>
                   <button onClick={()=>router.push(`/petpage/${currentPet.id}`)}>check</button>
               </div>
               </>
           ):(allPets && allPets.length ? (
               allPets.map((v,i)=>{
                   if(v.breed === 'husky'){
                       return (
                        <>
                        <div className={styles.image}>
                            <Image src={v.image} alt={v.breed} layout='fill' />
                        </div>
                        <div className={styles.content}>
                            <h1>{v.breed}</h1>
                            <h2>{v.temprament}</h2>
                            <button onClick={()=>router.push(`/petpage/${v.id}`)}>check</button>
                        </div>
                        </>
                       )
                   }
               })
           ):(<h1 className={styles.not_found}>Not Found</h1>))}
           
       </div>
      
   </section>
  )
}

export default AllBreeds;

