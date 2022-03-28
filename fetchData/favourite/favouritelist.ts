import { API_URL } from "../../config"
import { favouriteType } from "../../types/alltypes";

export const favourite_pet=async(user:number,pet:number)=>{
    const body = JSON.stringify({user,pet})
    const res = await fetch(`${API_URL}/allusers/alluser/add_favourite/`,{
        method:"POST",
        headers:{
            'Content-Type':"application/json"
        },
        body:body
    })
    console.log(res);
    
}
export const get_favourite=async(userid:number)=>{
    const res = await fetch(`${API_URL}/allusers/alluser/favourite/?user=${userid}`,{
        method:"GET"
    })
    const data:favouriteType[] =await res.json()
    console.log(data);
    if(res.status === 200){
        return data
    }else{
        return false
    }
    
}