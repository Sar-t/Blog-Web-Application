import React from 'react';
import { Container, Logo, LogoutBtn } from '../Index';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
    { name: "My Posts", slug: "/my-posts", active: authStatus}
  ];

  return (
    <header className="py-3 px-2 bg-white/90 backdrop-blur shadow-lg fixed top-0 left-0 right-0 z-50">
      <Container>
        <nav className="flex flex-wrap items-center justify-between gap-y-4">
          
          {/* ✅ Logo */}
          <Link to="/" className="text-2xl md:text-3xl text-indigo-700 font-bold tracking-tight">
            BLOGNest
          </Link>

          {/* ✅ Navigation Links */}
          <div className="flex flex-wrap items-center gap-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => navigate(item.slug)}
                    className="text-gray-700 hover:text-indigo-700 font-medium px-4 py-2 transition duration-200"
                  >
                    {item.name}
                  </button>
                )
            )}
          </div>

          {/* ✅ Auth Buttons */}
          <div className="flex gap-3">
            {!authStatus && (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="border-2 border-indigo-700 text-indigo-700 font-semibold px-4 py-1 rounded-xl hover:bg-indigo-700 hover:text-white transition duration-200"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/signup')}
                  className="bg-indigo-700 text-white font-semibold px-4 py-1 rounded-xl border-2 border-indigo-700 hover:bg-white hover:text-indigo-700 transition duration-200"
                >
                  Sign Up
                </button>
              </>
            )}
            {authStatus && <LogoutBtn />}
          </div>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
