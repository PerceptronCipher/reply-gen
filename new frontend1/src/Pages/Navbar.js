// import reply from "../Images/reply.png";
// // In Navbar.js
// import { useRef } from "react";

// function Navbar() {
//   const fileInput = useRef(null);

//   const handleUpload = () => {
//     fileInput.current.click();
//   };

//   return (
//     <div className="navbar">
//       <div className="logo">
//         <img src={reply} />
//       </div>
//       <div className="nav-links">
//         <a href="#main">Features</a>
//         <a href="#how">How it Works</a>
//         <a href="#paste">Documentation</a>
//       </div>
//       <div className="nav-btn">
//         <button onClick={handleUpload}>Upload Docs</button>
//         <input
//           type="file"
//           ref={fileInput}
//           style={{ display: "none" }}
//           onChange={(e) => console.log(e.target.files)}
//         />
//       </div>
//     </div>
//   );
// }
// export default Navbar;

'use client'
import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import './Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const fileInput = useRef(null)

  // Close menu on resize to prevent layout bugs
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992) setIsOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleUpload = () => {
    fileInput.current.click()
    if (isOpen) setIsOpen(false)
  }

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Documentation', href: '#paste' },
  ]

  return (
    <nav className='navbar'>
      <div className='nav-container'>
        {/* LOGO */}
        <div className='nav-left'>
          <div
            className='logo-text'
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Reply<span className='logo-accent'>AI</span>
          </div>
        </div>

        {/* DESKTOP LINKS */}
        <div className='nav-center desktop-only'>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className='nav-link'>
              {link.name}
            </a>
          ))}
        </div>

        {/* ACTIONS & HAMBURGER */}
        <div className='nav-right'>
          <button className='upload-btn desktop-only' onClick={handleUpload}>
            Upload Docs
          </button>

          <button
            type='button'
            className='hamburger-toggle'
            onClick={() => setIsOpen(!isOpen)}
          >
            {/* The icon switches based on isOpen state */}
            {isOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className='mobile-drawer'
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className='drawer-content'>
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className='upload-btn drawer-btn' onClick={handleUpload}>
                Upload Docs
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <input
        type='file'
        ref={fileInput}
        style={{ display: 'none' }}
        onChange={(e) => console.log(e.target.files)}
      />
    </nav>
  )
}

export default Navbar