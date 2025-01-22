'use client';
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import Snowfall from "react-snowfall";
import UploadForm from "@/components/UploadForm";
import LoginForm from "@/components/LoginForm";
import Panel from "@/components/Panel";
import {signIn, signOut, useSession, getProviders, LiteralUnion, ClientSafeProvider} from 'next-auth/react';
import { BuiltInProviderType } from "next-auth/providers/index";
import Cookies from "js-cookie";

export default function Control() {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const { data: session } = useSession()
  const [providers, setProviders] = useState<Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null>(null);


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

  useEffect(() => {
    const setUpProviders = async()=>{
      const response = await getProviders(); 
      setProviders(response);
    }
    setUpProviders();
  }, [])

  // Check for existing cookie on mount
  useEffect(() => {
    const token = Cookies.get('auth_token');
    if (token) {
      setIsLoggedin(true);
    }
  }, []);
  
  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen  
      font-[family-name:var(--font-vazir)] bg-[url('/bg-white.jpg')] dark:bg-[url('/bg.svg')] 
      bg-cover bg-no-repeat dark:bg-neutral-950 z-0">
      <Nav handlePageToggle={handlePageToggle}/>
      <Snowfall 
        images={images}
        radius={[26, 50.0]}
        snowflakeCount={30}
        style={{zIndex:1}}
      />
      <main className="flex items-center justify-center w-full h-full z-20">

        <div className="flex flex-col h-full w-full items-center justify-center px-10" dir="ltr">
        
        {isLoggedin && (
          <>
            {session ? (
              <>        
                <p className="text-neutral-700 dark:text-neutral-200">Signed in as {session.user!.email}</p> <br />        
                <button onClick={() => signOut()}
                  className='bg-neutral-700 dark:bg-neutral-200 text-white dark:text-black 
                  hover:bg-gradient-to-r dark:hover:text-white from-[#ff0f7b] to-[#f89b29] 
                  px-8 py-3 rounded-3xl'>
                    Sign out
                </button>      
              </>
            ):(  
              <>
                {providers && 
                  Object.values(providers).map((provider)=>(
                    <button
                      type='button'
                      key={provider.name}
                      onClick={()=> signIn(provider.id)}
                      className='bg-neutral-700 dark:bg-neutral-200 text-white dark:text-black 
                        hover:bg-gradient-to-r dark:hover:text-white from-[#ff0f7b] to-[#f89b29] 
                        px-8 py-3 rounded-3xl'
                    >
                      Sign In with {provider.name}
                    </button>
                  ))
                }
              </>
          )}
          </>
        )}

          {isLoggedin ? (<UploadForm/>) : (<LoginForm setIsLoggedin={setIsLoggedin}/>)}
          {isLoggedin && (
            <div className="flex flex-col items-center justify-center w-full overflow-x-hidden mt-12">
              <h2 className="text-2xl sm:text-4xl font-semibold py-6 text-neutral-800 dark:text-neutral-100 ">جدول اطلاعات</h2>
              <Panel/>
            </div>
          )}
        </div>
      </main>
      
      <Footer fixed={true}/>
    </div>
  );
}
