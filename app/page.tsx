import Footer from "@/components/Footer";
import Index from "@/components/pages/Index";
import Head from "next/head";
import { Post } from "@/types/Post";
import { headers } from 'next/headers';
import { Suspense } from "react";
import Image from "next/image";


const getBaseUrl = async () => {
  const host = (await headers()).get('host'); // Get the host from headers
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'; // Determine protocol
  return `${protocol}://${host}`; // Construct full base URL
};


const fetchPosts = async (section:string): Promise<Post[]> => {
  const Url = await getBaseUrl();
  const response = await fetch(`${Url}/api/post/${section}`); // Replace with your actual API URL

  if (![200, 404].includes(response.status)) {
    throw new Error('Failed to fetch Post');
  }
  const data = await response.json();
  try{
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export default async function Home() {
  console.time('myFunctionTimer');
  const books = await fetchPosts('books'); // Fetch books data
  const exams = await fetchPosts('exams'); // Fetch exams data
  const exps = await fetchPosts('exp'); // Fetch expr data
  
  const Url = process.env.NEXT_PUBLIC_SITE_URL;
  console.timeEnd('myFunctionTimer');
  return (
    <>
      <Head>
        <link rel="canonical" href={Url} />
        <link fetchPriority="high" rel="preload" href="/assets/flowers/1.png" as="image" type="image/png"/>
        <link fetchPriority="high" rel="preload" href="/assets/flowers/2.png" as="image" type="image/png"/>
        <link fetchPriority="high" rel="preload" href="/assets/flowers/3.png" as="image" type="image/png"/>
        <link fetchPriority="high" rel="preload" href="/assets/flowers/4.png" as="image" type="image/png" />
        <link fetchPriority="high" rel="preload" href="/assets/flowers/5.png" as="image" type="image/png" />
        <link fetchPriority="high" rel="preload" href="/assets/flowers/6.png" as="image" type="image/png" />
        <link fetchPriority="high" rel="preload" href="/assets/flowers/7.png" as="image" type="image/png" />
        <link fetchPriority="high" rel="preload" href="/assets/flowers/8.png" as="image" type="image/png" />
        <link fetchPriority="high" rel="preload" href="/assets/flowers/9.png" as="image" type="image/png" />
      </Head>
      <div className={`relative flex flex-col items-center justify-start 
        min-h-screen w-full`}>
          <Suspense fallback={<div className="w-full h-full">
            <Image
                src={'/Loader.gif'}
                alt='loading animation'
                width={150}
                height={150}
            />
          </div>}>
            <Index books={books} exams={exams} exps={exps}/>
          </Suspense>
        <Footer/>
      </div>
    </>
  );
}
 