import React from 'react'
import service from '../appwrite/config'
import {Link} from "react-router-dom"

export default function Postcard(
  {
  $id,
  title, 
  featuredimage
  }
  ){ //featuredimage is expected to be a file ID from Appwrite
  return (
    <Link to={`/post/${$id}`}>
        {console.log("Postcard: ", $id, title, featuredimage)}
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={service.getFilePreview(featuredimage)} alt={title} className='rounded-xl' />
            </div>
            <h2
            className='text-xl font-bold'
            >
                {title}
            </h2>
        </div>
    </Link>
  )
}