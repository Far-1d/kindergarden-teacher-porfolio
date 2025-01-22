import React from 'react'
import { ModeToggle } from './theme-toggler'
import { TbMenu3 } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { FaHome } from "react-icons/fa";
import Link from 'next/link';

interface NavProps {
  handlePageToggle: (page: string) => void;
  page?:string;
}

const Nav: React.FC<NavProps> = ({handlePageToggle, page}) =>{
  return (
    <div className='w-full flex items-center justify-between bg-neutral-100 dark:bg-black lg:bg-transparent dark:lg:bg-transparent py-3 px-6'>
        {/* only show it if page exists */}
        
        <div className='flex items-center justify-center gap-3'>
            {/* menu button - hidden on desktop */}
            { page &&
            (<div className='block lg:hidden'>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-8 h-8 rounded-md flex items-center justify-center bg-red-400">
                    <TbMenu3 className='h-[1.25rem] w-[1.25rem] stroke-white'/>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-44 bg-white dark:bg-black">
                  <DropdownMenuGroup>
                    <DropdownMenuItem 
                      className={`text-black dark:text-white text-lg from-[#f40752] to-[#f9ab8f] ${page=='books'? 'bg-gradient-to-r text-white' : ''}`}              
                      onClick={()=>{handlePageToggle('books')}}>
                      books
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className={`text-black dark:text-white text-lg from-[#f40752] to-[#f9ab8f] ${page=='exams'? 'bg-gradient-to-r text-white' : ''}`}
                      onClick={()=>{handlePageToggle('exams')}}>
                      licences
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className={`text-black dark:text-white text-lg from-[#f40752] to-[#f9ab8f] ${page=='experiences'? 'bg-gradient-to-r text-white' : ''}`}
                      onClick={()=>{handlePageToggle('experiences')}}>
                      experience
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>)
            }

            <ModeToggle/>
            
            {!page && (
              <Link href="/" 
              className="flex gap-3 px-2 py-2 bg-neutral-100 dark:bg-neutral-900 bg-opacity-30 dark:bg-opacity-30
                rounded-md shadow-sm text-black dark:text-white"> 
                <FaHome className="w-5 h-5 fill-red-400"/>
              </Link>
            )}

        </div>
        
        <div className=''>
            <p className='text-5xl select-none text-transparent bg-clip-text bg-gradient-to-br from-[#ff5858] via-[#ff5858] to-[#ffc8c8]' 
                style={{fontWeight:900}}>J.D</p>
        </div>

    </div>
  )
}

export default Nav