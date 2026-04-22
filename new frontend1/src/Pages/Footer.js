// import q from "../Images/reply.png";
// import framei from "../Images/Frame21.png";
// import frame2 from "../Images/Frame20.png";
// import frame3 from "../Images/Frame19.png";

// function Footer() {
//   return (
//     <div className="footer">
//       <div className="footer-left">
//         <div>
//           <img src={q} alt="Q&A S" />
//         </div>
//         <div>
//           <img src={framei} />
//           <img src={frame2} />
//           <img src={frame3} />
//         </div>
//       </div>

//       <div className="footer-container">
//         <h1>Quick Links</h1>
//         <a href="#">Features</a>
//         <a href="#">Contact</a>
//         <a href="#">AI optimizer</a>
//         <div>@ BuildON Inc. All rights reserve.</div>
//       </div>
//     </div>
//   );
// }

// export default Footer;

'use client'
import React from 'react'
import { FaXTwitter } from 'react-icons/fa6'
import './Footer.css'

function Footer() {
  return (
    <footer className='footer-section'>
      <div className='footer-main'>
        {/* Left Side: Brand & Socials */}
        <div className='footer-left'>
          <h2 className='footer-brand'>Replix AI</h2>
          <div className='social-links'>
            
           <a href='https://x.com/replix_ai?s=21' className='social-icon' aria-label='X (Twitter)'>
              <FaXTwitter size={20} />
            </a>
          </div>
        </div>

        {/* Right Side: Navigation Links */}
        <div className='footer-links-container'>
          <h3 className='links-title'>Quick Links</h3>
          <nav className='footer-nav'>
            <a href='#features'>Features</a>
            <a href='#how-it-works'>How It Works</a>
            <a href='#contact'>Contact</a>
            <a href='#paste'>Use Case</a>
          </nav>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className='footer-bottom'>
        <p>@ BuildON Inc. All Rights Reserve.</p>
      </div>
    </footer>
  )
}

export default Footer
