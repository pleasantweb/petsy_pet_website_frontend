import React from 'react'
import FullLayout from '../../hoc/FullLayout';
import styles from '../../styles/PetsPage.module.scss'

const PetPage = () => {
  return (
    <section className={styles.pet_page}>
        
    </section>
  )
}

export default PetPage;
PetPage.getLayout = function getLayout(page:typeof PetPage){
    return <FullLayout>{page}</FullLayout>
}