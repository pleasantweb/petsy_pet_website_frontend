import { API_URL } from "../../config"
import { userProfile } from "../../types/alltypes";

export const user_session=async(session:string)=>{
    const body = JSON.stringify({session})
    const res = await fetch(`${API_URL}/allusers/alluser/user_profile/`,{
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:body
    })
    console.log(res);
    if(res.status === 201){
        return true
    }else{
        return false
    }
    
}
export const getuser_session=async(session:string)=>{
    const res = await fetch(`${API_URL}/allusers/alluser/user_profile/?session=${session}`)
    const data :userProfile[]= await res.json()
    console.log(res);
    console.log(data);
    if(res.status === 200){
        return data[0]
    }else{
        return false
    }
    
}