'use client';
import React, { useEffect, useState } from 'react'
import { IoMdFlower } from "react-icons/io";
import { IoFlowerOutline } from "react-icons/io5";
import { LuFlower } from "react-icons/lu";
import { LuFlower2 } from "react-icons/lu";
import { BsFlower2 } from "react-icons/bs";

import { lightenHexColor, darkenHexColor } from '@/lib/colorUtils';
import { useTheme } from "next-themes"
import { Post } from '@/types/Post';
import { TbMoodSadSquint } from 'react-icons/tb';
import { toast } from 'sonner';


const Experiences = () => {
    const [lighterColors, setLighterColors] = useState<string[]>([])
    const [darkerColors, setDarkerColors] = useState<string[]>([])
    const [exp, setExp] = useState<Post[]>([])
    const {theme} = useTheme();
    const [downloadId, setDownloadId] = useState<string>('');
    
    const handleDownload = async (fileId: string) => {
        setDownloadId(fileId);
        const response = await fetch(`/api/post/download?fileId=${fileId}`);
    
        if (!response.ok) {
            toast("Error fetching the file");
            return;
        }
    
        const { downloadUrl } = await response.json();
    
        // Trigger the file download using the public link
        const a = document.createElement('a');
        a.style.display = 'hidden';
        a.href = downloadUrl;
        a.click();
        setDownloadId('');
    };

  
  useEffect(() => {
        const getExp = async ()=> {
        const response = await fetch('/api/post/exp');
        if (response.ok){
            const data = await response.json();
            const jsonData: Post[] = JSON.parse(data);
            setExp(jsonData);
        }
        }
        getExp();
    }, []);

  useEffect(() => {
    const getAllColors = () => {
      const newLighterColors = exp.map(ex => lightenHexColor(ex.iconColor, 60)); // Lighten by 20%
      const newDarkerColors = exp.map(ex => darkenHexColor(ex.iconColor, 60)); // Darken by 20%

      setLighterColors(newLighterColors);
      setDarkerColors(newDarkerColors);
    };

    getAllColors();
  }, [exp]); 

  return (
    <div className='w-full h-full flex flex-col items-start justify-start px-5 lg:px-10 py-10 gap-5 bg-white dark:bg-[#0e0e0e] lg:rounded-2xl'>
        <div className='w-[90%] lg:w-[70%] flex items-end gap-8'>
            <h2 className='text-black dark:text-white font-semibold text-3xl lg:text-5xl shrink-0 font-[family-name:var(--font-caveat)]'>My Experience</h2>
            <div className='h-[2px] w-full rounded-full bg-gradient-to-r from-[#e20b8c] to-[#f84b00] mb-4'/>
        </div>

        {exp.map((ex , idx)=>(
            <div 
                dir='ltr'
                key={idx} 
                style={{ backgroundColor: theme=="dark"? '#0e0e0e' : lighterColors[idx] }}
                className={`dark:border border-neutral-700 flex flex-col w-full items-start justify-center px-4 py-5 rounded-xl`}>
                <div className='flex items-center justify-start gap-4'>
                    {/* chose icon */}
                    {ex.icon == 1 ? 
                    (<IoMdFlower style={{ fill: ex.iconColor }} className={`w-10 h-10`}/>): 
                    ex.icon == 2 ? 
                    (<IoFlowerOutline style={{ stroke: ex.iconColor }} className={`w-10 h-10`}/>): 
                    ex.icon == 3 ? 
                    (<LuFlower style={{ stroke: ex.iconColor }} className={`w-10 h-10`}/>): 
                    ex.icon == 4 ? 
                    (<LuFlower2 style={{ stroke: ex.iconColor }} className={`w-10 h-10`}/>): 
                    (<BsFlower2 style={{ fill: ex.iconColor }} className={`w-10 h-10`}/>)
                    }

                    <p className={`text-xl font-medium text-black dark:text-white font-[family-name:var(--font-jua)]`}>
                    {ex.title}
                    </p>
                </div>
                <span className='ps-5 mt-1 text-sm sm:text-base text-black dark:text-white'>
                    {ex.description}
                </span>
                <div className='w-full flex items-center justify-end'>
                    {ex.file ? (
                    <button 
                        onClick={()=>{handleDownload(ex.file as string)}}
                        style={{ color: theme=="dark"? ex.iconColor : darkerColors[idx] }}
                        className={` underline`}
                    >
                      {downloadId == ex.file ? 'downloading' : 'download file'}
                      </button>
                    ):''}
                </div>
            </div>
        ))}

        {exp.length == 0 && (
            <div className='w-full h-full flex flex-col items-center justify-center gap-4
                text-black dark:text-white'>
                <TbMoodSadSquint className='w-12 h-12'/>
                <p>ohh my bad, i forgot to fill this page !</p>
            </div>
        )}

    </div>
  )
}

export default Experiences