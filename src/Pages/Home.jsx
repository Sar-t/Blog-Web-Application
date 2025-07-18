import React,{useState, useEffect} from 'react'
import service from '../appwrite/config'
import { Container, Postcard } from '../components/Index'
function Home() {
    const [posts,setPosts] = useState([]);
    useEffect(()=>{
        service.getPosts().then((posts)=>{
            console.log("Posts fetched:", posts);
            if(posts){
                setPosts(posts.documents);
            }
        });
    },[]);

    if(posts.length == 0){
        return (
            <div className="w-full py-8">
                <Container>
                <div className="flex items-center justify-center h-64">
                    <span className="text-gray-500 text-lg font-semibold">No posts found.</span>
                </div>
                </Container>
            </div>    
        )
    }
    
  return (
    <div className="w-full py-8">
        <Container>
            <div className='flex flex-wrap'>
                {
                    posts.map((post)=>(
                        <div key={post.$id} className='p-2 w-1/4'>
                            <Postcard {...post} />
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>

  )
}

export default Home