import React, { useState, useEffect } from 'react';
import service from '../appwrite/config';
import { Container, Postcard } from '../components/Index';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts().then((posts) => {
      console.log("Posts fetched:", posts);
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  return (
    <div className="w-full">
      <Container>

        {/* ✅ Hero Section */}
        {/* ✅ Hero Section with Video Background */}
<div className="relative w-full h-[650px] rounded-md overflow-hidden shadow mb-8">
  <video
    className="absolute top-0 left-0 w-full h-full object-cover z-0"
    src="./hero.mp4"
    autoPlay
    loop
    muted
    playsInline
    preload="auto"
  />

  <div className="absolute inset-0 bg-opacity-60 z-10 flex flex-col items-center justify-center text-center text-white px-4">
    <h1 className="text-5xl font-extrabold mb-4">Welcome to BLOGNest</h1>
    <p className="text-lg">Sharing stories, insights, and tutorials weekly.</p>
  </div>
</div>


        {/* ✅ Categories Filter (optional static demo) */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {['Tech', 'Life', 'Tutorials', 'Reviews'].map((tag, index) => (
            <button key={index} className="px-4 py-2 bg-gray-200 rounded-full text-sm hover:bg-gray-300 transition">
              #{tag}
            </button>
          ))}
        </div>

        {/* ✅ No posts fallback */}
        {posts.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <span className="text-gray-500 text-lg font-semibold">No posts found.</span>
          </div>
        ) : (
          <>
            {/* ✅ Featured / Popular Posts (optional mockup) */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">🔥 Popular Post</h2>
              <div className="p-2 bg-yellow-50 rounded-lg shadow">
                <Postcard {...posts[0]} />
              </div>
            </div>

            {/* ✅ All Posts */}
            <h2 className="text-xl font-semibold text-gray-800 mb-4">📚 All Posts</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {posts.map((post) => (
                <div key={post.$id} className="p-2">
                  <Postcard {...post} />
                </div>
              ))}
            </div>
          </>
        )}

        {/* ✅ About Me Section */}
        <div className="mt-16 p-6 bg-gray-100 rounded-lg text-center">
          <img src="/avatar.jpg" alt="Author" className="mx-auto w-24 h-24 rounded-full mb-4" />
          <h3 className="text-xl font-bold text-gray-700">Hi, I’m Sarthak 👋</h3>
          <p className="text-gray-600 mt-2">A web developer and DSA enthusiast writing about my learning journey, tips, and tutorials for developers.</p>
        </div>

        {/* ✅ Newsletter Signup */}
        <div className="mt-16 p-6 bg-white rounded-lg shadow text-center">
          <h3 className="text-2xl font-semibold text-gray-800">📬 Stay Updated!</h3>
          <p className="text-gray-600 mt-2 mb-4">Subscribe to get new posts delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row justify-center gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-4 py-2 border rounded w-full sm:w-64"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* ✅ Optional Footer */}
        <div className="mt-16 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} | Built by Sarthak | All rights reserved
        </div>
        
      </Container>
    </div>
  );
}

export default Home;
