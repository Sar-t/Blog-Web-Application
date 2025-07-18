//To display all post
import React,{useState, useEffect} from 'react'
import service from '../appwrite/config'
import { Container } from '../components/Index'
import Postcard from '../components/Postcard';
function AllPost() {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        
    },[]);
    service.getPosts([])
        .then((allpost)=> {
            if(allpost){
                setPosts(allpost.documents);
            }
        })
  return (
    <div className="py-8 w-full">
        <Container>
            <div className='flex flex-wrap '>
                    {posts.map((post)=>(
                        <div key = {post.$id} className = "p-2 w-1/4">
                            <Postcard {...post} />
                        </div>
                    ))}
            </div>
        </Container>
        
    </div>
  )
}

export default AllPost