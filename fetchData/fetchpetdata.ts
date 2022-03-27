import { breedType } from "../types/alltypes";

export const petbreeds=async(page:number)=>{
    const res = await fetch(`https://api.thedogapi.com/v1/breeds?limit=6&page=${page}`)
    const data:breedType[] =await res.json()
    console.log(data);
    if(res.status === 200){
        return data
    }
    
    
}