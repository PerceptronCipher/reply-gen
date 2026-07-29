'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Sparkles, ChevronDown } from 'lucide-react'
import './Paste.css'

function Paste({ uploaded }) {
  const [emailText, setEmailText] = useState('')
  const [tone, setTone] = useState('professional')
  const [length, setLength] = useState('short')
  const [intent, setIntent] = useState('Accept')
  const [generatedReply, setGeneratedReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  
  // State to hold the session token passed by DBChores
  const [sessionToken, setSessionToken] = useState('')

  // Capture the DBChores session token on load
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('session')
    if (token) setSessionToken(token)

    if (uploaded) {
      setEmailText(
        'Extracted content from your document is ready for processing...',
      )
    }
  }, [uploaded])

  const handleCopy = () => {
    if (!generatedReply) return
    navigator.clipboard.writeText(generatedReply)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Instead of generating immediately, ask DBChores to deduct tokens first
  const handleGenerate = () => {
    if (!emailText.trim()) return
    setLoading(true)

    // Send a message to the DBChores parent window asking to deduct 150 tokens
    window.parent.postMessage(
      {
        type: 'REQUEST_DEDUCTION',
        amount: 150,
        tool: 'Replix AI Emails',
      },
      '*' // In production, replace '*' with 'https://your-dbchores-domain.com' for extra security
    )
  }

  // Listen for approval, execute the AI, and handle History/Refunds
  useEffect(() => {
    const handleMessage = async (event) => {
      // Step A: DBChores approved the deduction! Let's run the AI.
      if (event.data?.type === 'DEDUCTION_APPROVED') {
        try {
          const response = await fetch(
            'https://api-reply-gen.buildoninc.org/generate',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              // Notice we don't need to change the backend. We send the exact same payload.
              body: JSON.stringify({
                email_content: emailText,
                tone,
                length,
                intent,
              }),
            }
          )

          if (!response.ok) {
            throw new Error('AI Backend generation failed')
          }

          const data = await response.json()
          const replyResult = data.replies?.[tone] || data.reply || 'Generation complete.'
          
          setGeneratedReply(replyResult)

          // Send the successful output back to DBChores so it saves to History
          window.parent.postMessage(
            {
              type: 'SAVE_HISTORY',
              title: `Email Reply (${tone})`,
              content: replyResult,
              amount: 150,
            },
            '*'
          )
        } catch (err) {
          console.error("Generation error:", err)
          
          // THE SAFETY NET. If the FastAPI backend fails, refund the user!
          window.parent.postMessage(
            {
              type: 'REQUEST_REFUND',
              amount: 150,
            },
            '*'
          )
          setGeneratedReply('Generation failed. Your tokens have been fully refunded.')
        } finally {
          setLoading(false)
        }
      } 
      // DBChores rejected the deduction (user is out of tokens)
      else if (event.data?.type === 'DEDUCTION_FAILED') {
        setLoading(false)
        setGeneratedReply('Generation failed: Insufficient tokens in your DBChores wallet.')
      }
    }

    // Attach the event listener
    window.addEventListener('message', handleMessage)
    
    // Cleanup listener on unmount or when dependencies change
    return () => window.removeEventListener('message', handleMessage)
  }, [emailText, tone, length, intent, sessionToken])

  return (
    <section className='paste-section' id='paste'>
      <div className='paste-card'>
        <h2 className='card-title'>Paste Incoming Email</h2>

        <div className='input-wrapper'>
          <textarea
            className='email-textarea'
            placeholder='Paste the email you receive here...'
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
          />
        </div>

        <div className='options-grid'>
          <p className='options-label'>Quick options</p>
          <div className='dropdowns'>
            {/* TONE SELECT */}
            <div className='select-group'>
              <label>Tone</label>
              <div className='select-wrapper'>
                <select
                  className='pill-select'
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                >
                  <option value='professional'>Professional</option>
                  <option value='casual'>Casual</option>
                  <option value='friendly'>Friendly</option>
                </select>
                <ChevronDown className='select-icon' size={16} />
              </div>
            </div>

            {/* LENGTH SELECT */}
            <div className='select-group'>
              <label>Response length</label>
              <div className='select-wrapper'>
                <select
                  className='pill-select'
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                >
                  <option value='short'>Short</option>
                  <option value='medium'>Medium</option>
                  <option value='detailed'>Detailed</option>
                </select>
                <ChevronDown className='select-icon' size={16} />
              </div>
            </div>

            {/* INTENT SELECT */}
            <div className='select-group'>
              <label>Intent</label>
              <div className='select-wrapper'>
                <select
                  className='pill-select'
                  value={intent}
                  onChange={(e) => setIntent(e.target.value)}
                >
                  <option value='Accept'>Accept</option>
                  <option value='Decline'>Decline</option>
                  <option value='Follow Up'>Follow Up</option>
                </select>
                <ChevronDown className='select-icon' size={16} />
              </div>
            </div>
          </div>
        </div>

        <button
          className={`generate-btn ${loading ? 'loading' : ''}`}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? 'Verifying Tokens...' : 'Generate reply'}
          <Sparkles size={18} />
        </button>

        <AnimatePresence>
          {generatedReply && (
            <motion.div
              className='output-container'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div className='output-header'>
                <h3>Generated reply</h3>
                <button
                  className='copy-btn'
                  onClick={handleCopy}
                  title='Copy to clipboard'
                >
                  {copied ? (
                    <Check size={18} color='#4ade80' />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
              <div className='output-box'>{generatedReply}</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Paste
