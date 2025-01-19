'use client';
import React from 'react'
import { FaBook } from "react-icons/fa";
import { CgNotes } from "react-icons/cg";
import { RiRainbowLine } from "react-icons/ri";

interface BreadNavProps {
    handlePageToggle: (page: string) => void;
    page: string;
}

const BreadNav: React.FC<BreadNavProps> = ({handlePageToggle, page}) => {
  return (
    <div className='w-min h-min flex items-center justify-center px-8 py-6 gap-5 bg-white dark:bg-[#0e0e0e] rounded-2xl'>

            <div onClick={()=>{handlePageToggle('books')}} className={`flex flex-col items-center justify-center w-[95px] h-[100px] gap-2 group bg-neutral-100 dark:bg-neutral-800
               rounded-xl p-2 duration-200 hover:bg-gradient-to-r dark:hover:bg-gradient-to-r from-[#e20b8c] to-[#f84b00] text-sm cursor-pointer
               ${page=='books'? 'bg-gradient-to-r':''}`}>
                <FaBook className={`w-5 h-5 fill-neutral-600 dark:fill-neutral-400 duration-200 group-hover:fill-white ${page=='books'? 'fill-white dark:fill-white':''}`}/>
                <p className={`text-neutral-600 dark:text-neutral-400 group-hover:text-white text-center ${page=='books'? 'text-white dark:text-white':''}`}>
                    books
                </p>
            </div> 

            <div onClick={()=>{handlePageToggle('exams')}} className={`flex flex-col items-center justify-center w-[95px] h-[100px] gap-2 group bg-neutral-100 dark:bg-neutral-800
               rounded-xl p-2 duration-200 hover:bg-gradient-to-r dark:hover:bg-gradient-to-r from-[#e20b8c] to-[#f84b00] text-sm cursor-pointer
               ${page=='exams'? 'bg-gradient-to-r text-white':''}`}>
                <CgNotes className={`w-5 h-5 text-neutral-600 dark:text-neutral-400 duration-200 group-hover:text-white ${page=='exams'? 'text-white dark:text-white':''}`}/>
                <p className={`text-neutral-600 dark:text-neutral-400 group-hover:text-white text-center ${page=='exams'? 'text-white dark:text-white':''}`}>
                    licences 
                </p>
            </div> 

            <div onClick={()=>{handlePageToggle('experiences')}} className={`flex flex-col items-center justify-center w-[95px] h-[100px] gap-2 group bg-neutral-100 dark:bg-neutral-800
               rounded-xl p-2 duration-200 hover:bg-gradient-to-r dark:hover:bg-gradient-to-r from-[#e20b8c] to-[#f84b00] text-sm cursor-pointer
               ${page=='experiences'? 'bg-gradient-to-r text-white':''}`}>
                <RiRainbowLine className={`w-5 h-5 fill-neutral-600 dark:fill-neutral-400 duration-200 group-hover:fill-white ${page=='experiences'? 'fill-white dark:fill-white':''}`}/>
                <p className={`text-neutral-600 dark:text-neutral-400 group-hover:text-white text-center ${page=='experiences'? 'text-white dark:text-white':''}`}>
                    experience 
                </p>
            </div> 
    </div>
  )
}

export default BreadNav