// function Main() {
//   return (
//     <div className="main" id="main">
//       <h1>Write perfect email replies in seconds</h1>
//       <p>
//         Paste any email and get smart, professional response instantly clear,
//         concise and on point
//       </p>
//       <div className="main-btn">
//         <button
//           className="b1"
//           onClick={() =>
//             document
//               .getElementById("paste")
//               .scrollIntoView({ behavior: "smooth" })
//           }
//         >
//           Generate Reply
//         </button>

//         <button
//           className="b2"
//           onClick={() =>
//             document
//               .getElementById("paste")
//               .scrollIntoView({ behavior: "smooth" })
//           }
//         >
//           Ask AI
//         </button>
//       </div>
//       <div className="howline"></div>
//     </div>
//   );
// }
// export default Main;

'use client'
import React from 'react'
import { motion } from 'framer-motion'
import './Main.css'

function Main() {
  const scrollToPaste = () => {
    const element = document.getElementById('paste')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className='main-hero' id='main'>
      <div className='hero-container'>
        {/* Animated Badge or Label (Optional but looks professional) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='hero-badge'
        >
          AI-Powered Communication
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Write Perfect <span className='text-gradient'>Email</span> <br />
          Replies In Seconds
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Paste any email and get smart, professional responses instantly.{' '}
          <br className='desktop-only' />
          Clear, concise, and perfectly on point every single time.
        </motion.p>

        <motion.div
          className='hero-btns'
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button className='btn-primary' onClick={scrollToPaste}>
            Generate reply
          </button>

          <button className='btn-secondary' onClick={scrollToPaste}>
            Ask AI
          </button>
        </motion.div>

        {/* Decorative Divider Line */}
        <motion.div
          className='hero-divider'
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </div>
    </section>
  )
}

export default Main