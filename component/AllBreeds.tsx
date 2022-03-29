import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { petbreeds } from '../fetchData/fetchpetdata'
import { userContextHook } from '../hoc/FullLayout'
import styles from '../styles/Component.module.scss'
import { breedType } from '../types/alltypes'



const AllBreeds = () => {
    const [pageNumber,setPageNumber]= useState(0)
    const [petDetails,setPetDetails] = useState<breedType[]>([])

    const [breedSuggest,setBreedSuggest] = useState<breedType[]>([])
    const [openSuggest,setOpenSuggest] = useState(false)

    const [currentPet,setCurrentPet] = useState<breedType>()

    const currenetUser = useContext(userContextHook)
  const {allPets} = currenetUser

  
    const [breed,setBreed] = useState("")

    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setBreed(e.target.value)

      const yo= allPets.filter(v=>v.breed.toLowerCase().includes(e.target.value.toLowerCase()))
       setBreedSuggest(yo)
    
    }
    const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
         e.preventDefault()
         const yo = allPets.filter(v=>v.breed === breed)
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
                   <button>check</button>
               </div>
               </>
           ):('')}
           
       </div>
      
   </section>
  )
}

export default AllBreeds;

