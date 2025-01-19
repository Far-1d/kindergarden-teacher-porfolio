import React from 'react'
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaLocationDot } from "react-icons/fa6";
import { BsPersonWorkspace } from "react-icons/bs";
const Me = () => {
  return (
    <div className='me sticky top-24 flex flex-col items-center w-full lg:max-w-[400px] h-min gap-2 rounded-none lg:rounded-2xl 
    shadow-none lg:shadow-md bg-white dark:bg-[#0e0e0e] pt-12 pb-12'>
        <h1 className='text-black dark:text-white text-2xl font-[family-name:var(--font-jua)]' style={{fontWeight:500}}>Jane Doe</h1>
        <p className='text-sm text-gray-500 dark:text-gray-500 mb-12 font-[family-name:var(--font-jua)]'>Professional Kindergarten and Elementary School Teacher</p>

        <div className='w-full flex px-3 items-center justify-center'>
            <div className='flex flex-col items-start w-full max-w-[350px] bg-neutral-100 dark:bg-neutral-800 px-7 py-6 rounded-2xl'>
                
                <div className='flex items-center justify-start py-3 border-b-[1px] w-full 
                    border-neutral-300 dark:border-neutral-600 gap-2'>
                    <div className='group bg-white dark:bg-black rounded-md shadow-md p-2 duration-200 hover:bg-gradient-to-r 
                    dark:hover:bg-gradient-to-r from-[#e20b8c] to-[#f84b00]'>
                        <HiOutlineMailOpen className='w-6 h-6 stroke-purple-400 duration-200 group-hover:stroke-white'/>
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                        <p className='text-sm text-gray-600 dark:text-gray-300'>E-mail</p>
                        <p className='text-black dark:text-white text-sm font-medium'>jahndoe@gmail.com</p>
                    </div>
                </div>

                <div className='flex items-center justify-start py-3 border-b-[1px] w-full
                    border-neutral-300 dark:border-neutral-600 gap-2'>
                    <div className='group bg-white dark:bg-black rounded-md shadow-md p-2 duration-200 hover:bg-gradient-to-r 
                    dark:hover:bg-gradient-to-r from-[#e20b8c] to-[#f84b00]'>
                        <FaLocationDot className='w-6 h-6 fill-pink-300 duration-200 group-hover:fill-white'/>
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                        <p className='text-sm text-gray-600 dark:text-gray-300'>Location</p>
                        <p className='text-black dark:text-white text-sm font-medium'>NY - New York</p>
                    </div>
                </div>

                <div className='flex items-center justify-start py-3 border-b-[1px] w-full
                    border-neutral-300 dark:border-neutral-600 gap-2'>
                    <div className='group bg-white dark:bg-black rounded-md shadow-md p-2 duration-200 hover:bg-gradient-to-r 
                    dark:hover:bg-gradient-to-r from-[#e20b8c] to-[#f84b00]'>
                        <BsPersonWorkspace className='w-6 h-6 fill-green-300 duration-200 group-hover:fill-white'/>
                    </div>
                    <div className='flex flex-col items-start justify-center'>
                        <p className='text-sm text-gray-600 dark:text-gray-300'>Experience</p>
                        <p className='text-black dark:text-white text-sm font-medium'>7 years</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Me