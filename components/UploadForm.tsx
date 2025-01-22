'use client';
import React, {useRef, useState} from 'react'

import { IoMdFlower } from "react-icons/io";
import { IoFlowerOutline } from "react-icons/io5";
import { LuFlower } from "react-icons/lu";
import { LuFlower2 } from "react-icons/lu";
import { BsFlower2 } from "react-icons/bs";
import { toast } from "sonner"
import { HexColorPicker } from "react-colorful";
import { useSession } from 'next-auth/react';


const UploadForm = () => {
    const sectionRef = useRef<HTMLSelectElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const iconRef = useRef<HTMLSelectElement | null>(null);
    const colorRef = useRef<HTMLInputElement>(null);

    const [processing, setProcessing] = useState<boolean>(false);
    const [fileName, setFileName] = useState<string>('Choose file');
    const [color, setColor] = useState<string>('#000')
    const { data: session } = useSession()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!processing && session){
            setProcessing(true);
            const formData = new FormData();

            formData.append('section', sectionRef.current!.value);

            if (titleRef.current) {
                formData.append('title', titleRef.current.value);
            }
            if (descriptionRef.current) {
                formData.append('description', descriptionRef.current.value);
            }
            if (fileInputRef.current?.files?.[0]) {
                formData.append('file', fileInputRef.current.files[0]);
            }

            if (iconRef.current) {
                formData.append('icon', iconRef.current.value);
            }

            if (colorRef.current) {
                formData.append('color', colorRef.current.value);
            }
            
            formData.append('refreshToken', session.refreshToken!);
            console.log("form data is like this: ", formData);

            const response = await fetch('/api/post', {
                method: 'POST',
                body: formData,
            });
        
            if (response.ok) {
                // Handle success
                toast("successfull 😀");
            } else {
                toast("there was an error 😵");
            }
            setFileName('Choose file');
            setProcessing(false);
        } else {
            toast('Please Login to Google First');
        }
    };

    const handleUploadFileName = ()=>{
        const file = fileInputRef.current?.files?.[0];

        // Check if a file was selected
        if (file) {
            // Update the label text with the file name
            setFileName(file.name);
        } else {
            // Reset label if no file is selected
            setFileName('Choose file');
        }
    }

    const handleColorChange = (hex: string)=>{
        if (/^#[0-9a-f]{6}$/i.test(hex)) {
            setColor(hex);

            if (colorRef.current) {
                colorRef.current.value = hex;
            }
        }
    }

  return (
    <div className='flex flex-col items-center justify-center w-full mt-10'>
        <h2 className="text-2xl sm:text-4xl font-semibold py-6 text-neutral-800 dark:text-neutral-100 ">upload form</h2>
        <form action="api/posts" method="post" onSubmit={handleSubmit} className="w-full flex flex-col items-center 
        justify-center rounded-2xl gap-3 py-6 px-5 shadow-lg max-w-96 md:max-w-[600px] bg-white dark:bg-gray-800 backdrop-blur-md">
                
                <label className='flex flex-col sm:flex-row items-center justify-between gap-3 w-full'>
                    <span className='w-28 text-black dark:text-white text-center sm:text-left'>section</span>
                    
                    <select ref={sectionRef} required 
                        className={`px-3 py-2 w-full text-center rounded-md text-neutral-700 dark:text-neutral-300 
                        bg-white dark:bg-black border bg-opacity-50 dark:bg-opacity-50 border-neutral-240 dark:border-neutral-900`}
                    >
                    <option value="books">book</option>
                    <option value="exams">licence</option>
                    <option value="exp">experience</option>
                    </select>
                    
                    <span className='w-24 hidden sm:flex'></span>
                </label>
                
                <label className='flex flex-col sm:flex-row items-center justify-between gap-3 w-full'>
                    <span className='w-28 text-black dark:text-white text-center sm:text-left'>title</span>
                    
                    <input type="text" ref={titleRef} required 
                        className={`px-3 py-2 w-full text-center rounded-md text-neutral-700 dark:text-neutral-300 
                        bg-white dark:bg-black border bg-opacity-50 dark:bg-opacity-50 border-neutral-240 dark:border-neutral-900`}
                    />
                    
                    <span className='w-24 hidden sm:flex'></span>
                </label>
            
                <label className='flex flex-col sm:flex-row items-center justify-between gap-3 w-full'>
                    <span className='w-28 text-black dark:text-white text-center sm:text-left'>description</span>
                    
                    <textarea ref={descriptionRef} 
                        className={`px-3 py-2 w-full text-center rounded-md text-neutral-700 dark:text-neutral-300 
                        bg-white dark:bg-black border bg-opacity-50 dark:bg-opacity-50 border-neutral-240 dark:border-neutral-900`}
                    />
                    
                    <span className='w-24 hidden sm:flex'></span>
                </label>
                
                <label className='flex flex-col sm:flex-row items-center justify-between gap-3 w-full'>
                    <span className='w-28 text-black dark:text-white text-center sm:text-left'>file<small>{` `}optional</small></span>
                    
                    <div className='flex w-full'>
                    <input type="file" name="file" ref={fileInputRef} dir='ltr'
                    className='w-0 ' onChange={handleUploadFileName}/>
                    <p id="file-input"
                        className={`px-3 py-2 w-full text-center rounded-md text-neutral-700 dark:text-neutral-300 
                        bg-white dark:bg-black border bg-opacity-50 dark:bg-opacity-50 border-neutral-240 dark:border-neutral-900`}
                    >{fileName}</p>
                    </div>
                    
                    <span className='w-24 hidden sm:flex'></span>
                </label>

                <label className='flex flex-col sm:flex-row items-center justify-between gap-3 w-full'>
                    <span className='w-28 text-black dark:text-white text-center sm:text-left'>icon</span>
                    
                    <div className='w-full flex flex-col items-center justify-center'>
                        <div className='flex gap-3'>
                            <li className='flex gap-1'>
                                <p className='text-black dark:text-white'>1</p>
                                <IoMdFlower className="w-5 h-5" style={{fill: color }}/>
                            </li>
                            <li className='flex gap-1'>
                                <p className='text-black dark:text-white'>2</p>
                                <IoFlowerOutline className="w-5 h-5" style={{stroke: color}}/>
                            </li>
                            <li className='flex gap-1'>
                                <p className='text-black dark:text-white'>3</p>
                                <LuFlower className="w-5 h-5" style={{stroke: color,}}/>
                            </li>
                            <li className='flex gap-1'>
                                <p className='text-black dark:text-white'>4</p>
                                <LuFlower2 className="w-5 h-5" style={{stroke: color }}/>
                            </li>
                            <li className='flex gap-1'>
                                <p className='text-black dark:text-white'>5</p>
                                <BsFlower2 className="w-5 h-5" style={{fill: color }}/>
                            </li>
                        </div>

                        <select ref={iconRef} required
                            className={`px-3 py-2 w-full text-center rounded-md text-neutral-700 dark:text-neutral-300 
                            bg-white dark:bg-black border bg-opacity-50 dark:bg-opacity-50 border-neutral-240 dark:border-neutral-900`}
                        >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        </select>
                    </div>
                    <span className='w-24 hidden sm:flex'></span>
                </label>

                <label className='flex flex-col sm:flex-row items-center justify-between gap-3 w-full'>
                    <span className='w-28 text-center sm:text-start text-black dark:text-white'>icon color</span>

                    <input type="text" ref={colorRef} required placeholder='#ffaa11' dir='ltr' readOnly
                        className={`px-3 py-2 w-full text-center rounded-md text-neutral-700 dark:text-neutral-300 
                        bg-white dark:bg-black border bg-opacity-50 dark:bg-opacity-50 border-neutral-240 dark:border-neutral-900`}
                    />
                
                    <span className='w-24 hidden sm:flex'></span>
                </label>
                
                <div className='w-full flex justify-center'>
                    <HexColorPicker color={color} onChange={handleColorChange}/>
                </div>

                <button type="submit" className='bg-neutral-700 dark:bg-neutral-200 text-white dark:text-black hover:bg-gradient-to-r dark:hover:text-white from-[#ff0f7b] to-[#f89b29] w-40 py-3 rounded-3xl'>
                    {processing ? 'processing': 'save'}
                </button>
        </form>
    </div>
  )
}

export default UploadForm