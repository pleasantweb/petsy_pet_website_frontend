import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { SITE_URL } from '../../config';
import { CloudImage } from '../../fetchData/uploadImage/CloudImage';
import FullLayout, { userContextHook } from '../../hoc/FullLayout';
import styles from '../../styles/Admin.module.scss'

const AddNewBreed = () => {
    const currenetUser = useContext(userContextHook)
    const {isAuthenticated,user} = currenetUser
    const router = useRouter()
    useEffect(()=>{
        if(!isAuthenticated){
            router.push('/')
        }
    },[isAuthenticated,router])
    
    const [petDetails,setPetDetails] = useState({
        breed:"",
        bred_for:"",
        life_span:"",
        temprament:"",
        origin:"",
        price:0,
        image:""
    })
    const {breed,bred_for,life_span,temprament,origin,price,image} = petDetails
    const [description,setDescription] = useState("")
    

    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target.name === 'price'){
            setPetDetails(prev=>(
                {
                    ...prev,[e.target.name]: parseInt(e.target.value)
                }
            ))
        }
        setPetDetails(prev=>(
            {
                ...prev,[e.target.name]:e.target.value
            }
        ))
    }
    const descriptionChange=(e:React.ChangeEvent<HTMLTextAreaElement>)=>{
         setDescription(e.target.value)

    }
////////////////////////////////////////////////////////////////////////////////
const onFileChange=async(e:React.ChangeEvent<HTMLInputElement>)=>{
    
    let files : FileList | null = e.currentTarget.files
    const form_data = new FormData()
    let preset = process.env.NEXT_PUBLIC_PRESET
    if(preset){
     form_data.append('upload_preset',preset)
    }
    if(files !== null){
        if(files.length >0){
            form_data.append('file',files[0])
           const imageUrl =await CloudImage(form_data)
          
         if(imageUrl){

   setPetDetails(prev=>(
       {
           ...prev,image:imageUrl
       }
   ))
       
        }
    }
}
}
//////////////////////////////////////////////////////////////////////////////
const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault()
  
   const body = JSON.stringify({breed,bred_for,life_span,temprament,origin,price,image,description})
   if(user.is_staff){
   const res = await fetch(`${SITE_URL}/api/pethome/addpet`,{
       method:"POST",
       headers:{
           'Content-Type':"application/json"
       },
      body:body
   })
  
   if(res.status === 201){
       setPetDetails({
        breed:"",
        bred_for:"",
        life_span:"",
        temprament:"",
        origin:"",
        price:0,
        image:""
       })
       setDescription("")
       window.scrollTo({
           top:0,
           behavior:'smooth'
       })
   }
}
   
}
////////////////////////////////////////////////////////////////////////////

  return (
    <section className={styles.add_new_breed}>
        <div className={styles.heading}>
        <h1>Add New Breed</h1>
        </div>
       <div className={styles.add_new_form}>
           <form action="" onSubmit={onSubmit}>
           <div className={styles.inp}>
               <label className={styles.file_label} htmlFor="image">Upload Pet Image</label>
               <input onChange={onFileChange} type="file" name="image" id='image' />
               </div>
               {image !== "" ? (
                     <div className={styles.pet_image}>
                     <Image src={image} layout='fill' alt={breed} />
                 </div>
               ):(
                   ''
               )}
          
               <div className={styles.inp}>
                   <label htmlFor="breed">Breed Name</label>
                   <input onChange={onChange} value={breed} type="text" name='breed' id='breed' />
               </div>
               <div className={styles.inp}>
                   <label htmlFor="bred_for">Bred For</label>
                   <input onChange={onChange} value={bred_for} type="text" name='bred_for' id='bred_for' />
               </div>
               <div className={styles.inp}>
                   <label htmlFor="life_span">Life Span</label>
                   <input onChange={onChange} value={life_span} type="text" name="life_span" id='life_span'  />
               </div>
               <div className={styles.inp}>
                   <label htmlFor="temprament">Temprament</label>
                   <input onChange={onChange} value={temprament} type="text" name="temprament" id='temprament' />
               </div>
               <div className={styles.inp}>
                   <label htmlFor="origin">Origin Country</label>
                   <input onChange={onChange} value={origin} type="text" name='origin' id='origin' />
               </div>
               <div className={styles.inp}>
                   <label htmlFor="price">Price</label>
                   <input onChange={onChange} value={price} type="number" name='price' id='price' />
               </div>
              
               <div className={styles.inp}>
                   <label htmlFor="description">Description</label>
               <textarea onChange={descriptionChange} value={description} name="description" id='description' cols={30} rows={10}></textarea>
               </div>
               <div className={styles.inp}>
                   <input type="submit" value="Save" />
               </div>
           </form>
       </div>
    </section>
  )
}

export default AddNewBreed;
AddNewBreed.getLayout = function getLayout(page:typeof AddNewBreed){
    return <FullLayout>{page}</FullLayout>
}