"use client"

import React, {useState} from "react"
import { LuMoon } from "react-icons/lu";
import { FiSun } from "react-icons/fi";
import { useTheme } from "next-themes"


export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [isLight, setIsLight] = useState<boolean>(theme === 'light')

    const handleToggle = ()=>{
        setIsLight(prev => !prev);
        setTheme(isLight? 'dark':'light');
    }
    

    return (
        <button onClick={handleToggle} className="w-8 h-8 rounded-md border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-black flex items-center justify-center">
            <span className="sr-only">تغییر تم</span>
            {isLight ? 
                (<LuMoon className="moon h-[1.2rem] w-[1.2rem] transition-all duration-150 stroke-black" />)
                :
                (<FiSun className="sun h-[1.2rem] w-[1.2rem] transition-all duration-150 stroke-white" />)
            }
        </button>
  )
}
