'use client';
import React, {useRef} from 'react'
import { toast } from "sonner"

interface LoginProps {
    setIsLoggedin: (value: boolean) => void;
}

const LoginForm: React.FC<LoginProps> = ({setIsLoggedin}) => {
    
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const username = usernameRef.current!.value;
        const password = passwordRef.current!.value;
        
        

        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (response.ok){
            setIsLoggedin(true);
            toast("welcome");
        } else {
            toast("wrong credentials");
        }
    }


  return (
    <div className='flex flex-col items-center justify-center w-full mt-10 font-[family-name:var(--font-playpen)]'>
        <h2 className="text-2xl sm:text-4xl font-semibold py-6 text-neutral-800 dark:text-neutral-100">Login Form</h2>
        <form action="api/posts" method="post" onSubmit={handleSubmit} className="w-full flex flex-col items-center 
            justify-center rounded-2xl gap-3 py-6 px-5 border shadow-lg max-w-96 md:max-w-[550px] bg-neutral-500 bg-opacity-10 backdrop-blur-md">
            <div className='flex items-center justify-start gap-3 w-full'>
                
                <input type="text" ref={usernameRef} required placeholder='username'
                    className={`px-3 py-2 w-full text-center rounded-md text-neutral-700 dark:text-neutral-300 
                        bg-white dark:bg-black border bg-opacity-50 dark:bg-opacity-50 border-neutral-200 dark:border-neutral-900`}
                />
            </div>
            <div className='flex items-center justify-start gap-3 w-full'>
                <input type="password" ref={passwordRef} required placeholder='password'
                    className={`px-3 py-2 w-full text-center rounded-md text-neutral-700 dark:text-neutral-300 
                        bg-white dark:bg-black border bg-opacity-50 dark:bg-opacity-50 border-neutral-200 dark:border-neutral-900`}
                />
            </div>
            <button type='submit' className='bg-neutral-700 dark:bg-neutral-200 text-white dark:text-black hover:bg-gradient-to-r dark:hover:text-white from-[#ff0f7b] to-[#f89b29] w-40 py-3 rounded-3xl'>
                Enter
            </button>
        </form>
    </div>
  )
}

export default LoginForm