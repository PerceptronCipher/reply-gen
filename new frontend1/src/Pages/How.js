// import star1 from "../Images/Star1.png";

// function How() {
//   return (
//     <div className="how" id="how-it-works">
//       <div className="howHeading">How it works</div>
//       <div className="howList">
//         <div className="hl">
//           <img src={star1} />
//           <li>Paste Email</li>
//         </div>
//         <div className="hl">
//           <img src={star1} />
//           <li>Get Instant Reply</li>
//         </div>
//         <div className="hl">
//           <img src={star1} />
//           <li>Ai Understands Context</li>
//         </div>
//       </div>
//       <h2 className="use">Use Cases</h2>
//       <div className="use-list">
//         <li>Client communication</li>
//         <li>Job applications</li>
//         <li>Business follow-up</li>
//         <li>Customer replies</li>
//       </div>
//     </div>
//   );
// }
// export default How;

'use client'
import React from 'react'
import { motion } from 'framer-motion'
import {
  Brain,
  Zap,
  ClipboardCheck,
  Globe,
  ShieldCheck,
  MousePointer2,
} from 'lucide-react'
import './How.css'

function How() {
  const steps = [
    {
      title: 'Paste Email',
      desc: 'Input your received email content.',
      icon: <ClipboardCheck size={28} className='brand-icon' />,
    },
    {
      title: 'AI Analysis',
      desc: 'Our engine detects tone & context.',
      icon: <Brain size={28} className='brand-icon' />,
    },
    {
      title: 'Instant Reply',
      desc: 'Get a polished response in seconds.',
      icon: <Zap size={28} className='brand-icon' />,
    },
  ]

  const useCases = [
    'Client Communication',
    'Job Applications',
    'Business Follow-Up',
    'Customer Replies',
  ]

  return (
    <section className='how-section' id='how-it-works'>
      <div className='container'>
        {/* Professional Context Header */}
        <div className='header-context'>
          <h2 className='section-title'>Effortless Communication</h2>
          <p className='section-subtitle'>
            ReplyAI leverages advanced neural networks to bridge the gap between
            receiving an email and delivering a perfect response.
          </p>
        </div>

        {/* Horizontal Process Steps */}
        <div className='process-line'>
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className='process-step'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              <div className='icon-box'>
                {step.icon}
                {index < steps.length - 1 && <div className='connector-line' />}
              </div>
              <h4>{step.title}</h4>
              <p>{step.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Use Cases Footer */}
        <div className='use-cases-content'>
          <div className='use-list'>
            <span className='use-label'>TRUSTED FOR:</span>
            {useCases.map((item, index) => (
              <React.Fragment key={index}>
                <span className='use-item'>{item}</span>
                {index < useCases.length - 1 && (
                  <span className='use-divider'>|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default How