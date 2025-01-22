import React from 'react'
import Nav from '@/components/Nav'

const Privacy = () => {
  return (
    <div className="relative flex flex-col items-center justify-start min-h-screen  
      font-[family-name:var(--font-vazir)] bg-[url('/bg-white.jpg')] dark:bg-[url('/bg.svg')] 
      bg-cover bg-no-repeat dark:bg-neutral-950 z-0">
      <Nav handlePageToggle={()=>{}}/>
      
      <article className=" px-[12%] py-8 text-neutral-800 dark:text-neutral-200">
        <div className='flex flex-col items-center justify-start gap-3 px-6
          backdrop-filter backdrop-blur bg-opacity-10 backdrop-saturate-100 backdrop-contrast-100 bg-clip-padding'>
          <h1 className='text-3xl sm:text-5xl my-10'>Privacy Policy</h1>
          
          <p>
          At kindergarten-teacher, we prioritize your privacy and are dedicated to safeguarding your personal information. This Privacy Policy details the types of information we gather when you access our website, the purposes for which we utilize that information, and the steps we take to protect your data.
          </p>
          
          <h2 className='text-2xl mt-6'>
          Information Collection and Use  
          </h2>

          <p>
          Upon visiting our portfolio website, we may automatically collect certain data, including your IP address, browser type, and the specific pages you access. This information aids us in understanding the usage patterns of our site and enables us to enhance its functionality. Additionally, we may gather personal information that you willingly provide when completing contact forms or subscribing to our newsletter. Such information may encompass your name, email address, and any other details you opt to share. We utilize this data exclusively to address inquiries, provide updates, and improve your experience on our site.
          </p>

          <h2 className='text-2xl mt-6'>
          Cookies and Tracking Technologies  
          </h2>

          <p>
          Our website may employ cookies and similar tracking technologies to improve user experience. Cookies are small files placed on your device that assist us in recognizing you upon your return to our site. You have the option to accept or decline cookies through your browser settings; however, declining cookies may limit your ability to fully utilize the features of our website. We do not monitor users across other websites nor do we share any collected data with third parties for marketing purposes.
          </p>

          <h2 className='text-2xl mt-6'>
          Data Security  
          </h2>

          <p>
          We take the protection of your personal information seriously and implement appropriate measures to guard it against unauthorized access, disclosure, alteration, or destruction. While no method of transmission over the internet or electronic storage is entirely secure, we endeavor to use commercially reasonable means to protect your data. Nonetheless, please understand that no security measures are infallible, and we cannot assure absolute security.
          </p>

          <h2 className='text-2xl mt-6'>
          Revisions to This Privacy Policy  
          </h2>

          <p>
          We may periodically revise this Privacy Policy to align with changes in our practices or for various operational, legal, or regulatory considerations. Significant updates will be communicated to you through a notice on our website or via email. Your ongoing use of the site following any changes signifies your agreement to the revised policy. Should you have any inquiries regarding this Privacy Policy or our data handling practices, please reach out to us at JaneDoe@gmail.com
          </p>
        </div>
      </article>
    </div>
  )
}

export default Privacy