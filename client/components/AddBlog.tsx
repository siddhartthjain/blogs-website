import React, { useState } from 'react'
import { getAuthorizationToken, getBlogs } from '../http'
import Link from 'next/link';




const AddBlog = () => {
    const token = getAuthorizationToken();
    console.log("token is ", token);
  return (
    <div className='mx-auto mb-5' >
    
    {
        
        token ? (
          
          <div>
            <Link href="Blogs/post" className="text-white bg-blue-700   font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 ">Add Blog</Link>
         
        </div>): (<></>)
    }
    </div>
  )
}

export default AddBlog