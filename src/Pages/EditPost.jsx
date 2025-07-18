import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components/Index'
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/config';
// This component is used to edit a post. It fetches the post data based on the slug from the URL parameters.
function EditPost() {
    const [post,setPost] = useState(null);  //[] empty array is a truthy value, so we use null to indicate no post is loaded yet.
    const { slug } = useParams()
    const navigate = useNavigate()
    console.log("Slug from params: ", slug);
    useEffect(()=>{
        console.log("useEffect triggered, slug:", slug);
        if(slug){
            console.log("if slug: ", slug);
            service.getPost(slug)
            .then((post)=>(
                post? setPost(post) : navigate('/')
            ))
            
        }else{
            navigate('/');
        }

    },[slug,navigate])
  return post ?
    (<div className='py-8'>
        {console.log("reached edit post")}
        <Container>
            {console.log("Edit Post: ", post)}
            <PostForm post = {post} />
        </Container>
    </div>):null;
}

export default EditPost