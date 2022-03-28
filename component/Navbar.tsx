import styles from '../styles/Component.module.scss'

import { BsCart3 } from "react-icons/bs";
import { useRouter } from 'next/router';

// import { IoMdBicycle } from "react-icons/io";
import { FaDog } from "react-icons/fa";
import { useState } from 'react';
import { AiOutlineHeart,AiFillHeart} from "react-icons/ai";
// import { getCart} from '../types/alltypes'
import { MdOutlineStoreMallDirectory } from "react-icons/md";
// import user from '../pages/api/account/user';

type propType ={
  // cart:getCart[],
  isAuthenticated:boolean,
  isStaff:boolean,
  user_name:string,
  setOpenAuthPage:React.Dispatch<React.SetStateAction<boolean>>
}

const Navbar = (props:propType) => {
  const {isAuthenticated,isStaff,user_name,setOpenAuthPage} = props

  const router = useRouter()
 
 const [openNav,setOpenNav] = useState(false)

 const bike_categories= [
  {id:1,category:'electric_bike',name:'E-bikes'},
  {id:2,category:'hybrid',name:'Hybrid'},
  {id:3,category:'mtb',name:'MTB'},
  {id:4,category:'road',name:'Road-bikes'},
  {id:5,category:'fatbike',name:'Fat-bikes'},
 
]
 
  const onSignout=async()=>{
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
    const res = await fetch(`${SITE_URL}/api/account/logout`,{
      method:"POST"
    })
   if(res.status == 200){
     router.reload()
   }
    
  }

  const onMouseHover=()=>{
   setOpenNav(true)
  }

  return (
    <nav onMouseLeave={()=>setOpenNav(false)} className={openNav ? (styles.navbar_open):(styles.navbar)}>
        <div className={styles.logo} onClick={()=>router.push('/')}><FaDog/> Petsy</div>
        <ul className={styles.navOptions}>
         
        
          {isAuthenticated && isStaff ? (
            <>
            <li onClick={()=>router.push('/owner/addnewbreed')}>new</li>
            <li onClick={()=>router.push('/owner/store')}>store</li>
            </>
          ):('')}
         <li onMouseOver={()=>setOpenNav(false)} onClick={()=>router.push('/allpets')}>All Pets</li>
          <li onMouseOver={onMouseHover} className={styles.hover_it}>popular</li>
          <li  onMouseOver={()=>setOpenNav(false)} onClick={()=>router.push('/petpage/favourites')}><AiOutlineHeart title='Go to Favourite' /></li>
          {isAuthenticated ? (
            <>
            {isStaff ? (<li onClick={()=>router.push('/admin/orderinprogress')} >orders</li>):('')}
              <li onClick={onSignout}>logout </li>
              {/* {!isStaff ? (<li className={styles.cartLogo} onClick={()=>router.push(`/cart/${user_name}`)}><BsCart3 /> {cart && cart.length > 0 ? (<span>{cart.length}</span>):('')} </li>):('')} */}
              
              </>
            ):( <li onMouseOver={()=>setOpenNav(false)} onClick={()=>setOpenAuthPage(true)}>login</li>)}
        </ul>

      <div className={styles.bikes_category}>
         <ul>
           {bike_categories.map((v,i)=>(
             <li key={i} >{v.name}</li>
           ))}
          
         </ul>
      </div>


        {/* <div className={styles.options}>
          <ul>
            <li onClick={()=>router.push('/profile')}> <ImProfile /> <p>Profile</p> </li>
           
           
          {isStaff ? (
            <>
            <li onClick={()=>router.push('/newcycle')}><IoIosBicycle /> <p>Sell</p> </li>
            <li onClick={()=>router.push('/admin/store')}><MdOutlineStoreMallDirectory /> <p>Store</p> </li>
            </>
          ):('')}
            
          </ul>
        </div> */}
    </nav>
  )
}

export default Navbar;