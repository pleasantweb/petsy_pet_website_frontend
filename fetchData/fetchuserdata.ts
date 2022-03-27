import axios from "axios"
import { API_URL, SITE_URL } from "../config"
axios.defaults.withCredentials = true;

export const fetchUser = async() => {
   
            const res = await fetch(`${SITE_URL}/api/account/user`,{
                method:"GET"
            })
            const data = await res.json()
             
    if(data){
        return data.user
    }
  return null
}

export const check_authentication =async()=>{
    const res = await fetch(`${SITE_URL}/api/account/verify`,{
        method:"GET"
      })
    if(res.status === 200){
        return true
    }else{
        return null
    }
}

// export const getUserProfile =async(userid:number)=>{
//     const res = await fetch(`${SITE_URL}/api/profile/getuserprofile/${userid}`,{
//       method:'GET',
//     })  
//     const data =await res.json()
    
//     if(res.status === 200 && data){
//         return data.userProfile
//     }else{
//         return null
//     }
     
//   }
interface Map {
    [key: string]: string 
  }
export const google_auth=async(state:string,code:string)=>{
    const details:Map = {
        'state':state,
        'code':code
    }
    const formBody = Object.keys(details).map(key=>encodeURIComponent(key) + '=' + encodeURIComponent(details[key])).join('&')
   
    console.log(formBody);
   
    const res = await axios(`${API_URL}/auth/o/google-oauth2/?${formBody}`,{
        method:"POST",
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
        }

    })
console.log(res);

if(res.status === 201){
    const data = await res.data
    const {access,refresh} = data
    const body = JSON.stringify({access,refresh})
    const apires= await fetch(`${SITE_URL}/api/account/googlelogin`,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:body
    })
    if(apires.status === 200){
        return 'google_auth_success'  
    }
    // console.log(apires);
}
   
}
