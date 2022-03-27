import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'
// import {API_URL} from '../../../config/index'

type Data = {
    message?: string,
    error?:string
}
interface Map {
    [key: string]: string 
  }

const googleapi =async(req: NextApiRequest, res: NextApiResponse<Data>)=>{
    if(req.method === 'POST'){
        const {access,refresh} = req.body
       
        try{
           
               res.setHeader('Set-Cookie',[
                   cookie.serialize('access',access,{
                       httpOnly:true,
                       secure : process.env.USE_HTTPS !== 'TRUE',
                       maxAge : 60*60*24,
                       sameSite: 'strict',
                       path : '/api/'
                   }
                   ),
                   cookie.serialize('refresh',refresh,{
                       httpOnly:true,
                       secure:process.env.USE_HTTPS !== 'TRUE',
                       maxAge:60*60*24,
                       sameSite:'strict',
                       path: '/api/'
                   }
                   )
               ])
               return res.status(200).json({
                   message:'Cookie set'
               })
            
           
        }catch(err){
           return res.status(500).json({
               error: 'Something went wrong'
           })
        }
        

   }else{
       res.setHeader('Allow',['POST'])
       return res.status(405).json({
           error: `Method ${req.method} is not allowed`
       })
   }
   
}
export default googleapi;