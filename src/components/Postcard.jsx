import React from 'react';
import service from '../appwrite/config';
import { Link } from "react-router-dom";

export default function Postcard({ $id, title, featuredimage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="flex flex-col sm:flex-row items-center sm:items-start bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 p-4 gap-4">
        
        {/* Image Section */}
        <div className="w-full sm:w-40 h-40 flex-shrink-0">
          <img
            src={service.getFilePreview(featuredimage)}
            alt={title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>

        {/* Text Section */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
            {title}
          </h2>
          <p className="text-sm text-gray-500">
            Click to read more →
          </p>
        </div>
      </div>
    </Link>
  );
}
