import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/config";
import { Button, Container } from "../components/Index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  console.log("User Data:", userData);
  
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredimage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-10 bg-gray-50 min-h-screen">
      <Container>
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-md">
          {console.log("image Url:", service.getFilePreview(post.featuredimage))}
          <div className="relative mb-6">
            <img
              src={service.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="w-full h-96 object-cover rounded-xl shadow-sm"
            />
            {isAuthor && (
              <div className="absolute top-4 right-4 flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-600" className="px-4 py-2 text-white">
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-600"
                  className="px-4 py-2 text-white"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
