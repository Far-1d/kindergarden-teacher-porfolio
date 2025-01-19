'use client';

import Nav from "@/components/Nav";
import Me from '@/components/Me';
import BreadNav from "@/components/BreadNav";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import Books from "@/components/Books";
import Exams from "@/components/Exams";
import Experiences from "@/components/Experiences";
import Snowfall from "react-snowfall";
import Head from "next/head";
 
export default function Home() {
  const [page, setPage] = useState<string>('books')
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const URL = process.env.NEXT_PUBLIC_SITE_URL;
  
  const handlePageToggle = (page:string)=>{
    setPage(page)
  }

  useEffect(() => {
    // Create image elements after the component mounts
    const flowerImages: HTMLImageElement[] = [];
    for (let i = 1; i <= 9; i++) {
      const img = document.createElement('img'); // Use document.createElement
      img.src = `/assets/flowers/${i}.png`;
      flowerImages.push(img);
    }
    setImages(flowerImages);
  }, []);

  return (
    <>
      <Head>
      <link rel="canonical" href={URL} />
      </Head>
    
      <div className="relative flex flex-col items-center justify-start min-h-screen  
         font-[family-name:var(--font-playpen)] bg-[url('/bg-white.jpg')] dark:bg-[url('/bg.svg')] bg-cover bg-no-repeat dark:bg-neutral-950 z-0">
        <Nav handlePageToggle={handlePageToggle} page={page}/>
        <Snowfall 
          images={images}
          radius={[26, 50.0]}
          snowflakeCount={30}
          style={{zIndex:1}}
        />
        <main className="w-full h-full z-20 mb-28 sm:mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 h-full w-full px-0 lg:px-[4%] lg:mt-20 lg:gap-8" dir="ltr">
            <div className="col-span-1 w-full h-full flex ">
              <Me/>
            </div>
            <div className="col-span-1 lg:col-span-2 flex flex-col items-end justify-start lg:gap-8">

              <div className="w-full hidden lg:flex items-center justify-end">
                <BreadNav handlePageToggle={handlePageToggle} page={page}/>
              </div>

              {page === 'books' ? (<Books/>) : page === 'exams' ? (<Exams/>) : (<Experiences/>)}
            
            </div>
          </div>
        </main>
        
        <Footer/>
      </div>
    </>
  );
}
