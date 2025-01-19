import React from 'react'



const Footer = ({fixed}:{fixed?:boolean}) => {
  return (
    <footer dir="rtl" className={`${fixed?'fixed bottom-0':''} absolute bottom-0 flex flex-col gap-3 flex-wrap items-center justify-center text-sm
      text-black dark:text-white py-6 px-2`}>
        <p className='text-center'>Farid Zarei 2025. All rights reserved ©</p>
        <p>Made with ♥️ By F</p>
  </footer> 
  )
}

export default Footer