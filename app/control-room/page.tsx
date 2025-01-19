'use client';
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import UploadForm from "@/components/UploadForm";
import LoginForm from "@/components/LoginForm";
import Panel from "@/components/Panel";

export default function Control() {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  
  const handlePageToggle = ()=>{}

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
    <div className="relative flex flex-col items-center justify-start min-h-screen  
      font-[family-name:var(--font-vazir)] bg-[url('/bg-white.jpg')] dark:bg-[url('/bg.svg')] bg-cover bg-no-repeat dark:bg-neutral-950 z-0">
      <Nav handlePageToggle={handlePageToggle}/>
      <Snowfall 
        images={images}
        radius={[26, 50.0]}
        snowflakeCount={30}
        style={{zIndex:1}}
      />
      <main className="flex items-center justify-center w-full h-full z-20">

        <div className="flex flex-col h-full w-full items-center justify-center px-10" dir="ltr">
          
          {isLoggedin ? (<UploadForm/>) : (<LoginForm setIsLoggedin={setIsLoggedin}/>)}
          {isLoggedin && (
          <div className="flex flex-col items-center justify-center w-full overflow-x-hidden mt-12">
            <h2 className="text-2xl sm:text-4xl font-semibold py-6 text-neutral-800 dark:text-neutral-100 ">جدول اطلاعات</h2>
            <Panel/>
          </div>)}
        </div>
      </main>
      
      <Footer fixed={true}/>
    </div>
  );
}
