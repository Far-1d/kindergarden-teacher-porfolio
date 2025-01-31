'use client';

import Nav from "@/components/Nav";
import Me from '@/components/Me';
import BreadNav from "@/components/BreadNav";
import React, { useState, useEffect, Suspense } from "react";
import Books from "@/components/Books";
// import Exams from "@/components/Exams";
// import Experiences from "@/components/Experiences";
// import Snowfall from "react-snowfall";
import { Post } from "@/types/Post";
import Image from "next/image";


// Dynamic imports for Exams and Experiences
const LazyExams = React.lazy(() => import('@/components/Exams'));
const LazyExperiences = React.lazy(() => import('@/components/Experiences'));
const LazySnowfall = React.lazy(() => import('react-snowfall'));

interface MainContentProps {
    books: Post[];
    exams: Post[];
    exps: Post[];
}

export default function Index({books, exams, exps}: MainContentProps) {
  const [page, setPage] = useState<string>('books')
  const [images, setImages] = useState<HTMLImageElement[]>([]);

  const URL = process.env.NEXT_PUBLIC_SITE_URL;

  const handlePageToggle = (page:string)=>{
      setPage(page)
  }

  useEffect(() => {
    // Create image elements after the component mounts
    const loadImages = async () => {
      const flowerImages = [];
      for (let i = 1; i <= 9; i++) {
        const img = document.createElement('img');
        img.src = `/assets/flowers/${i}.png`;
        img.decoding = 'async';
        flowerImages.push(img);
      }
      setImages(flowerImages);
    };
  loadImages();
  }, []);

  return (
    <>
      <div className={`relative flex flex-col w-full items-center justify-start z-1`}>
        <Nav handlePageToggle={handlePageToggle} page={page}/>
        <LazySnowfall 
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
                {/* large screen nav bar */}
                <div className="w-full hidden lg:flex items-center justify-end">
                    <BreadNav handlePageToggle={handlePageToggle} page={page}/>
                </div>

                {page === 'books' ? (
                  <Books books={books}/>
                ) : page === 'exams' ? (
                  <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><Image src={'/Loader.gif'} alt="loading gif" height={150} width={150}/></div>}>
                      <LazyExams exams={exams}/>
                  </Suspense>
                ) : (
                  <Suspense fallback={<div className="w-full h-full flex items-center justify-center"><Image src={'/Loader.gif'} alt="loading gif" height={150} width={150}/></div>}>
                    <LazyExperiences exp={exps}/>
                  </Suspense>
                )}

              </div>
          </div>
        </main>
      </div>
    </>
  );
}
