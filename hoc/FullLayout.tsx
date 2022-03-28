import { useRouter } from 'next/router';
import React, { createContext, useEffect, useState } from 'react'
import AuthLayout from '../authComponent/AuthLayout';
import Footer from '../component/Footer';
import Navbar from '../component/Navbar';
import { petbreeds } from '../fetchData/fetchpetdata';
import {check_authentication, fetchUser, google_auth} from '../fetchData/fetchuserdata';
import {  breedType, favouriteType, user, userProfile } from '../types/alltypes';
import randomstring from 'randomstring'
import { getuser_session, user_session } from '../fetchData/user/usersession';
import { get_favourite } from '../fetchData/favourite/favouritelist';


type Props = {
    children?: React.ReactNode;
};

type userContext ={
    isAuthenticated:boolean,
    user:user,
    allPets:breedType[],
    userSession:userProfile,
    favouriteList:favouriteType[]
    // cart:getCart[],
    // userProfile:userProfile,
    setAuthPage:(bool:boolean)=>void,
    // get_user_cart:()=>void
    getFavouriteList:(userid:number)=>void
}

const demoUser = {
    isAuthenticated:false,
    user:{},
    allPets:[],
    userSession:{},
    favouriteList:[],
    // cart:[],
    // userProfile:{},
    setAuthPage:()=>{},
    // get_user_cart:()=>{}
    getFavouriteList:()=>{}
}

export const userContextHook = createContext<userContext>(demoUser)

const FullLayout = ({children}:Props) =>{
    const router = useRouter()
    const query = router.query
 
    const state = query.state?.toString() ?? null
    const code = query.code?.toString() ?? null 

    const [user,setUser] = useState<user>({})
    const [currentUserSession,setCurrentUserSession] = useState<userProfile>({})
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const [allPets,setAllPets]= useState<breedType[]>([])
    const [favouriteList,setFavouriteList] = useState<favouriteType[]>([])
    // const [userProfile,setUserProfile] = useState<userProfile>({})
    // const [userCart,setUserCart] = useState<getCart[]>([])

    const [openAuthPage,setOpenAuthPage] = useState(false)

    
    
    function setAuthPage(bool:boolean){ 
        setOpenAuthPage(bool)
    }
        
    // async function get_user_cart(){
    //     const user_cart = await getUserCart()
    //     if(user_cart && user_cart.length > 0){
    //         setUserCart(user_cart)
    //     }
    // }

    const userContextValue :userContext= {
        isAuthenticated:isAuthenticated,
        user:user,
        allPets:allPets,
        userSession:currentUserSession,
        favouriteList:favouriteList,
        // cart:userCart,
        // userProfile:userProfile,
        setAuthPage:(bool:boolean)=>setAuthPage(bool),
        getFavouriteList:(userid:number)=>fetchFavourite(userid)
        // get_user_cart:()=>get_user_cart()
    }

/////////////////////////////////////////////////////////////////////////////////
    const fetch_user=async()=>{
        const userdata = await fetchUser()
        const verify_user = await check_authentication()
       if(userdata){
           setUser(userdata)
       }
       if(verify_user){
           setIsAuthenticated(true)
       }
    }

    useEffect(()=>{
       fetch_user()
    },[router.asPath])
    
////////////////////////////////////////////////////////////////////////////

const setuserSession =async (sessionString:string) => {
    const setSession = await user_session(sessionString)
    if(setSession){
        localStorage.setItem('usersession',sessionString)
    }
}
const getuserSession = async(usersession:string)=>{
    const getSession = await getuser_session(usersession)
    if(getSession){
        setCurrentUserSession(getSession)
    }
}
useEffect(()=>{
    const usersession = localStorage.getItem('usersession') ?? 'false'
    if(usersession === 'false'){
       const sessionString = randomstring.generate()
       setuserSession(sessionString)
    }else{
        getuserSession(usersession)
    }

},[])
/////////////////////////////////////////////////////////////////////
const fetchFavourite=async(userid:number)=>{
    console.log('yoooo');
    
    const res = await get_favourite(userid)
    if(res){
       setFavouriteList(res)
    }
}
useEffect(()=>{
    const usersession = localStorage.getItem('usersession') ?? 'false'
    if(usersession !== 'false'){
        if(currentUserSession.id){
       fetchFavourite(currentUserSession.id)
        }
    }
},[currentUserSession])
///////////////////////////////////////////////////////////////////////////
useEffect(()=>{

    const fetch=async(state:string,code:string)=>{
        const googleAuth= await  google_auth(state,code)
        if(googleAuth === 'google_auth_success'){
             fetch_user()
        }
    }

    if(state && code){
      console.log('state',state);
      console.log('code',code);
      fetch(state,code)
    }
  },[state,code])
/////////////////////////////////////////////////////////////////////////////
useEffect(()=>{
    
    const fetchPets=async()=>{
        const petdata = await petbreeds()
        if(petdata && petdata.length){
            setAllPets(petdata)
        }
    }
    if(allPets.length < 1){
    fetchPets()
    }
},[allPets])
/////////////////////////////////////////////////////////////////////////

    // useEffect(()=>{      
    //     const fetch=async(id:number)=>{
    //         const user_profile=  await getUserProfile(id)
           
    //         if(user_profile){
    //             setUserProfile(user_profile)
    //         }
    //     }

    //     if(user && isAuthenticated){
    //         if(user.id){
    //            fetch(user.id)
    //         }
    //     }
    // },[user,isAuthenticated])

 ////////////////////////////////////////////////////////////////////////////////

// useEffect(()=>{
//     // const fetch=async()=>{
//     //     const user_cart = await getUserCart()
//     //     if(user_cart && user_cart.length > 0){
//     //         setUserCart(user_cart)
//     //     }
        
//     // }
//     if(user && isAuthenticated){
//         if(!user.is_staff){
//             get_user_cart()
//         }
//     }

// },[user,isAuthenticated])

 ////////////////////////////////////////////////////////////////////////////
   
  return (
    <>
    <div className='site_container'>
        
        {!isAuthenticated && openAuthPage ? (
            <AuthLayout setOpenAuthPage={setOpenAuthPage} />
        ):('')}

    <userContextHook.Provider value={userContextValue}>
        <Navbar  isAuthenticated={isAuthenticated} isStaff={user.is_staff ? (user.is_staff):(false)} user_name={user.first_name? (user.first_name):('')} setOpenAuthPage={setOpenAuthPage} />
        {children}
        <Footer />
    </userContextHook.Provider>
            
    </div>
    </>
  )
}

export default FullLayout;


