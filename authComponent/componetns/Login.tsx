import React, { useState } from 'react'
import styles from '../../styles/AuthStyle.module.scss'
import {AiOutlineMail } from "react-icons/ai";
import { BiErrorCircle } from "react-icons/bi";
import { HiOutlineLockClosed } from "react-icons/hi";
import { useRouter } from 'next/router';
import { AiOutlineGoogle } from "react-icons/ai";
import { API_URL, SITE_URL } from '../../config';
import axios from 'axios';
axios.defaults.withCredentials = true;

type propType={
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    setActiveAuthPage:React.Dispatch<React.SetStateAction<number>>
}

const Login = (props:propType) => {
    const {setLoading,setActiveAuthPage} = props

    const router = useRouter()

    const [formValues,setFormValues] = useState({
        email:"",    
        password:"",
    })
    const {email,password} = formValues

    const onChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setFormValues(prev=>(
            {
                ...prev,[e.target.name]:e.target.value
            }
        ))
     }
////////////////////////////////////////////////////////////////////////
    const onSubmit=async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        setLoading(true)
        const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
        
        const body = JSON.stringify({email,password})
        
        const res =await fetch(`${SITE_URL}/api/account/login`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:body
        })
       if(res.status === 200){
           setLoading(false)
           
           if(router.pathname !== '/auth/activate/[...uidtoken]'){
            router.reload()
           }else{
               router.push('/')
           }
          
       }else{
        setLoading(false)
        setActiveAuthPage(6)
       }
        
     }
//////////////////////////////////////////////////////////////////////////////////
    const googleLogin=async()=>{
        setLoading(true)
        const res = await axios(`${API_URL}/auth/o/google-oauth2/?redirect_uri=${SITE_URL}`)
        if(res.status === 200){
          const data = await res.data
          console.log(data);
          setLoading(false)
          window.location.assign(data.authorization_url)
        }
     }
//////////////////////////////////////////////////////////////////////////////////
  return (
    <div className={styles.login}>
        <div className={styles.heading}>
            <h1>SIGN IN</h1>
        </div>
        <div className={styles.google_login}>
                <button  onClick={googleLogin} className={styles.google_btn}> <AiOutlineGoogle /> Login with google  </button>
            </div>  
            <div className={styles.or_form}>
                <p>OR</p>
            </div>
            <form autoComplete='off' action="" onSubmit={onSubmit}>
                <div className={styles.inp}>
                    <AiOutlineMail />
                    <input type="email" required value={email} onChange={onChange} name="email" id="login_email" placeholder='email' />
                </div>
                <div className={styles.inp}>
                    <HiOutlineLockClosed />
                    <input type="password" required value={password} onChange={onChange} name="password" id="login_password" placeholder='password' />
                    {password.length > 0 && password.length < 6 ? (  <BiErrorCircle title='password length must be greater than 5' />):('')}
                </div>
                {password.length > 5 ?(
                    <input type="submit" value="LOG IN" />
                ):(<input disabled className={styles.disabled} type="submit" value="LOG IN" />)}
                
            </form>  
            
             <div className={styles.forgot_password}>
                 <p>Forgot Password...?</p>
                 <button onClick={()=>setActiveAuthPage(4)} className={styles.change_pass} type='button'>Change Passwrord</button>
                 </div>
    </div>
  )
}

export default Login;