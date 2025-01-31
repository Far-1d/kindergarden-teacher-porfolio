import React from 'react'
import Image from 'next/image';
const Loading = () => {
  return (
    <div className='w-full h-screen flex items-center justify-center text-black dark:text-white'>
        <Image
            src={'/Loader.gif'}
            alt='loading animation'
            width={150}
            height={150}
        />
        <p className='font-semibold text-xl'>
            Loading
        </p>
    </div>
  )
}

export default Loading