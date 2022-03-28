import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
import { API_URL } from '../../../config'
type Data = {
    message?: string,
    error?:string
}

const addpet=async(req: NextApiRequest, res: NextApiResponse<Data>)=>{
    if(req.method === 'POST'){
        const {breed,bred_for,life_span,temprament,origin,price,image,description} = req.body
        const body = JSON.stringify({breed,bred_for,life_span,temprament,origin,price,image,description})
        const cookies = cookie.parse(req.headers.cookie ?? '')
        const access = cookies.access ?? 'false'
        if(access === 'false'){
            return res.status(401).json({
                error:'User unauthorised to make this request'
            })

        }else{
            try{
                const apiRes = await fetch(`${API_URL}/allpets/pet/petbreed/`,{
                    method:"POST",
                    headers:{
                        'Accept':'application/json',
                        'Content-Type':'application/json',
                        'Authorization':`JWT ${access}`
                    },
                    body:body
                })
               
                if(apiRes.status === 201){
                    return res.status(201).json({
                        error:'Your data added successfully.'
                    })
                }else{
                    return res.status(400).json({
                        error:'Something went wrong when adding data.'
                    })
                }
            }catch(err){
                return res.status(500).json({
                    error:'Something went wrong when adding data.'
                })
            }
        }
    }else{
        res.setHeader('Allow',['POST'])
        return res.status(405).json({
            error:`Method ${req.method} is not allowed`
        })
    }
}
export default addpet;