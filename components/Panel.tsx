'use client';
import { useState, useEffect, useRef } from "react";
import { Post } from "@/types/Post";
import { IoMdFlower } from "react-icons/io";
import { IoFlowerOutline } from "react-icons/io5";
import { LuFlower } from "react-icons/lu";
import { LuFlower2 } from "react-icons/lu";
import { BsFlower2 } from "react-icons/bs";
import { toast } from "sonner"
import { TbRefresh } from "react-icons/tb";
import { useSession } from 'next-auth/react';


const Panel = () => {
    const sectionRef = useRef<HTMLSelectElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const iconRef = useRef<HTMLSelectElement | null>(null);
    const colorRef = useRef<HTMLInputElement>(null);

    const [posts, setPosts] = useState<Post[]>([]);
    const [processingUpdateId, setProcessingUpdateId] = useState<string>('')
    const [processingDelete, setProcessingDelete] = useState<boolean>(false)
    const [processingUpdate, setProcessingUpdate] = useState<boolean>(false)
    const [fileName, setFileName] = useState<string>('Choose file');
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const { data: session } = useSession()
    

    const handleDelete = async (id: string)=>{
      if (! processingDelete){
        try{
          setProcessingDelete(true);
          if (session){
            const formData = new FormData();
            formData.append('refreshToken', session.refreshToken!);

            const response = await fetch(`api/post/delete/${id}`, {
              method: "DELETE",
              body: formData
            })
            if (response.ok) {
              setPosts((prevPosts) => prevPosts.filter(post => post._id !== id));
              toast("Delete successfull 😀");
            } else {
              toast('There was an error');
            }
          } else {
            toast('Please Login to Google First');
          }
        } catch {
          toast('There was a server side error');
        }
        setProcessingDelete(false);
      } else {
        toast('Please Wait');
      }
    }

    const handleUpdate = async (id: string)=>{
      if (! processingUpdate){
        setProcessingUpdate(true);

        if (processingUpdateId){
          if (session){
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

            const response = await fetch(`/api/post/update/${id}`, {
                method: 'PUT',
                body: formData,
            });
        
            if (response.ok) {
                // Handle success
                console.log('File uploaded successfully');
                toast("Update successfull 😀");
                getPosts();
            } else {
                // Handle error
                console.error('Error uploading file');
                toast("There was an error 😵");
            }
          } else {
            toast('Please Login to Google First');
          }  
        }

        setProcessingUpdateId('');
        setProcessingUpdate(false);
      } else {
        toast('Please Wait');
      }
    }

    const handleFieldChange = (id:string) =>{
      if(processingUpdateId == ""){
        setProcessingUpdateId(id);
      } else {
        toast('Please finish previous update');
      }
    }

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

    const getPosts = async ()=> {
      setRefreshing(true);
      const response = await fetch('/api/post/list');
      if (response.ok){
        const data = await response.json();
        const jsonData: Post[] = JSON.parse(data);
        setPosts(jsonData);
      }
      setRefreshing(false);
    }

  useEffect(() => {
    
    getPosts();
  }, []);

  return (
    
    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mb-28 sm:mb-24">
      <button 
        onClick={getPosts} 
        className="flex gap-1 text-neutral-700 dark:text-neutral-300 py-1">
          refresh
          <TbRefresh className={`w-4 h-4 mt-1 rotate-180 ${refreshing? 'animate-spin': ''}`}/>
        </button>
        {posts.length != 0 ? (
          <div className="flex w-full overflow-y-auto max-h-screen">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 rounded-md">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 transition-transform duration-200">
                  <tr>
                      <th scope="col" className="px-2 sm:px-6 py-3 min-w-28">
                          section
                      </th>
                      <th scope="col" className="px-2 sm:px-6 py-3 min-w-44">
                          title
                      </th>
                      <th scope="col" className="px-2 sm:px-6 py-3 min-w-44">
                          description
                      </th>
                      <th scope="col" className="px-2 sm:px-6 py-3">
                          file
                      </th>
                      <th scope="col" className="px-2 sm:px-6 py-3">
                          icon
                      </th>
                      <th scope="col" className="px-2 sm:px-6 py-3">
                          color
                      </th>
                      <th scope="col" className="px-2 sm:px-6 py-3">
                          <span className="sr-only">edit</span>
                      </th>
                      <th scope="col" className="px-2 sm:px-6 py-3">
                          <span className="sr-only">delete</span>
                      </th>
                  </tr>
              </thead>
              <tbody>
              {posts.map(post => (    
                  <tr key={post._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      
                      <th scope="row" className="px-2 sm:px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        { processingUpdateId == post._id ? ( 
                            <select ref={sectionRef} required defaultValue={post.section}
                              className={`px-3 py-2 w-full text-center rounded-md text-neutral-700 dark:text-neutral-300 min-w-28 
                              bg-white dark:bg-black border bg-opacity-50 dark:bg-opacity-50 border-neutral-240 dark:border-neutral-900`}
                            >
                              <option value="books">Book</option>
                              <option value="exams">Licence</option>
                              <option value="exp">Experience</option>
                            </select>
                          ) : (
                            <p className="">{post.section == "books"? 'Book' : post.section == 'exams'? 'Licence' : 'Experience'}</p>
                          )}
                      </th>
                      <td className="px-2 sm:px-6 py-4">
                        { processingUpdateId == post._id ? ( 
                            <input type="text" ref={titleRef} required  defaultValue = {post.title}
                            className={`px-3 py-2 w-full text-center rounded-md text-neutral-700 dark:text-neutral-300 min-w-44
                            bg-white dark:bg-black border bg-opacity-50 dark:bg-opacity-50 border-neutral-240 dark:border-neutral-900`}/>
                          ) : (
                            <p className="max-h-48 overflow-auto">
                              {post.title}
                            </p>
                          ) }
                      </td>
                      <td className="px-2 sm:px-6 py-4 text-ellipsis">
                      { processingUpdateId == post._id ? ( 
                        <textarea ref={descriptionRef} defaultValue={post.description}
                          className={`px-3 py-2 w-full text-center rounded-md text-neutral-700 dark:text-neutral-300 min-w-64
                          bg-white dark:bg-black border bg-opacity-50 dark:bg-opacity-50 border-neutral-240 dark:border-neutral-900`}
                        />
                      ) : (
                        <p className="max-h-48 overflow-auto">
                          {post.description}
                        </p>
                      )}
                      </td>
                      <td className="px-2 sm:px-6 py-4">
                      { processingUpdateId == post._id ? (
                        <label className='flex items-center justify-between w-full max-w-64'>
                          <div className='flex w-full'>
                            <input type="file" name="file" ref={fileInputRef} dir='ltr'
                            className='w-0 ' onChange={handleUploadFileName}/>
                            <p id="file-input"
                                className={`px-3 py-2 w-full text-center rounded-md text-neutral-700 dark:text-neutral-300 
                                bg-white dark:bg-black border bg-opacity-50 dark:bg-opacity-50 border-neutral-240 dark:border-neutral-900`}
                            >{fileName}</p>
                          </div>
                        </label>
                      ) : (
                        <p className="max-h-48 overflow-auto">
                          {post.file}
                        </p>
                      )}
                      </td>
                      <td className="px-2 sm:px-6 py-4">
                      { processingUpdateId == post._id ? ( 
                          <select ref={iconRef} required defaultValue={post.icon}
                          className={`px-3 py-2 w-full text-center rounded-md text-neutral-700 dark:text-neutral-300 min-w-10 
                          bg-white dark:bg-black border bg-opacity-50 dark:bg-opacity-50 border-neutral-240 dark:border-neutral-900`}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                          ) : (
                            post.icon == 1 ? 
                            (<IoMdFlower style={{fill: post.iconColor }} className={`w-6 h-6`}/>): 
                            post.icon == 2 ? 
                            (<IoFlowerOutline style={{stroke: post.iconColor}} className={`w-6 h-6`}/>): 
                            post.icon == 3 ? 
                            (<LuFlower style={{stroke: post.iconColor}} className={`w-6 h-6`}/>): 
                            post.icon == 4 ? 
                            (<LuFlower2 style={{stroke: post.iconColor}} className={`w-6 h-6`}/>): 
                            (<BsFlower2 style={{fill: post.iconColor}} className={`w-6 h-6`}/>)
                          )}
                      </td>
                      <td className="px-2 sm:px-6 py-4">
                        {processingUpdateId == post._id ? (
                          <input type="text" ref={colorRef} required placeholder='#ffaa11' dir='ltr' defaultValue={post.iconColor}
                              className={`px-3 py-2 w-full text-center rounded-md text-neutral-700 dark:text-neutral-300 min-w-20
                              bg-white dark:bg-black border bg-opacity-50 dark:bg-opacity-50 border-neutral-240 dark:border-neutral-900`}
                          />
                        ) : (
                          <span className="flex items-center gap-1">
                            {post.iconColor}
                            <span className={`w-3 h-3 rounded mb-1`} style={{backgroundColor : post.iconColor}}/>
                          </span>
                        )}
                      </td>
                      <td className="px-2 sm:px-6 py-4 text-right">
                        {processingUpdateId == post._id ? (
                          <button onClick={()=>{handleUpdate(post._id)}} className="font-medium text-indigo-500 dark:text-indigo-500 hover:underline">{processingUpdate? 'saving' : 'save'}</button>
                        ) : (
                          <button onClick={()=>{handleFieldChange(post._id)}} className="font-medium text-purple-500 dark:text-purple-500 hover:underline">edit</button>
                        )}
                      </td>
                      <td className="px-2 sm:px-6 py-4 text-right">
                          <button onClick={()=>{handleDelete(post._id)}} className="font-medium text-orange-500 dark:text-orange-500 hover:underline">{processingDelete? 'deleting' : 'delete'}</button>
                      </td>
                  </tr>
              ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="w-full flex justify-center mb-8">
            <p className="text-neutral-700 dark:text-neutral-200">No Data Available</p>
          </div>
        )}
    </div>

  )
}

export default Panel;