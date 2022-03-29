import styles from '../styles/Component.module.scss'
import { IoMdBicycle } from "react-icons/io";
import { useRouter } from 'next/router';
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { FaDog } from "react-icons/fa";
const Footer = () => {

  const router = useRouter()

  const bike_categories= [
    {id:1,name:'Pet-Food'},
    {id:2,name:'Pet-Home'},
    {id:3,name:'Veterinarian'},
    {id:4,name:'Pet-Grooming'},
    {id:5,name:'Accessories '},
  ]
  const current_year = ()=>{
    const date = new Date()
    const year = date.getFullYear()
    return year
    
  }
  return (
    <section className={styles.footer}>
      <div className={styles.footer_component}>

 
        <div className={styles.logo}>
        <FaDog /> <h1>Petsy</h1>
        </div>
        <div className={styles.categories}>
        <ul>
           {bike_categories.map((v,i)=>(
             <li key={i}>{v.name}</li>
           ))}
          
         </ul>
        </div>
        <div className={styles.aboutus}>
         <ul>
           <li>Privacy-Policy</li>
           <li>About Us</li>
         </ul>
        </div>
        <div className={styles.copyright}>
          <AiOutlineCopyrightCircle /> <h1>{current_year()}</h1>
        </div>
        </div>
    </section>
  )
}

export default Footer