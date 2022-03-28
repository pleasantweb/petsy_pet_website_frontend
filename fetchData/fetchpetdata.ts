import { API_URL } from "../config";
import { breedType } from "../types/alltypes";

export const petbreeds=async()=>{
   const res = await fetch(`${API_URL}/allpets/pet/petbreed/`,{
       method:"GET"
   })
   const data:breedType[] = await res.json()
   console.log(data);
   if(res.status === 200){
       return data
   }
    
}