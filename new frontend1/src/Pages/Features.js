'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Cpu, MousePointer2, Zap } from 'lucide-react'
import './Features.css'

function Features() {
  const features = [
    {
      title: 'Smart Tone Control',
      desc: 'Switch between professional, casual, or friendly tones with a single click.',
      icon: <MousePointer2 size={24} />,
    },
    {
      title: 'Neural Analysis',
      desc: 'Our AI deeply understands the context of incoming emails for accurate replies.',
      icon: <Cpu size={24} />,
    },
    {
      title: 'Instant Generation',
      desc: 'Generate high-quality, ready-to-send email drafts in under 3 seconds.',
      icon: <Zap size={24} />,
    },
    {
      title: 'Privacy Focused',
      desc: 'Your email data is processed securely and never stored on our servers.',
      icon: <ShieldCheck size={24} />,
    },
  ]

  return (
    <section className='features-section' id='features'>
      <div className='container'>
        <div className='features-header'>
          <span className='feature-badge'>CORE CAPABILITIES</span>
          <h2 className='section-title'>Powerful Features</h2>
        </div>

        <div className='features-grid'>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className='feature-card'
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className='feature-icon-wrapper'>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
