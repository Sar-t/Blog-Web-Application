import React, { useEffect, useState } from 'react'
import service from '../appwrite/config';
import authService from '../appwrite/auth';
import { useSelector } from 'react-redux';
import { Container, Postcard } from '../components/Index';
import { Query } from 'appwrite';

function MyPost() {
    const [myPosts, setMyPosts] = useState([]);
    const userData = useSelector(state => state.auth.userData);
    useEffect(() => {
        service.getPosts([
            Query.equal("userId", userData.$id),
            Query.equal("status", "active")
        ]).then((posts) => {
            if (posts) {
                setMyPosts(posts.documents);
                // console.log(typeof posts);
            }
        });
    }, [userData]);
    return (
        <>
            {myPosts.length === 0 ? (
                <div className="flex items-center justify-center h-64">
                    <span className="text-gray-500 text-lg font-semibold">No posts found.</span>
                </div>
            ) :
                (<div className="py-8 w-full">
                    <Container>
                        <div className='flex flex-wrap '>
                            {myPosts.map((post) => (
                                <div key={post.$id} className="p-2 w-1/4">
                                    <Postcard {...post} />
                                </div>
                            ))}
                        </div>
                    </Container>

                </div>)}
        </>
    )
}

export default MyPost
