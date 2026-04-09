// import { useState, useEffect } from "react";

// function Paste({ uploaded }) {
//   const [emailText, setEmailText] = useState("");
//   const [contextText, setContextText] = useState("");
//   const [tone, setTone] = useState("professional");
//   const [length, setLength] = useState("short");
//   const [intent, setIntent] = useState("Accept");
//   const [generatedReply, setGeneratedReply] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const handleGenerate = async () => {
//     if (!emailText.trim()) {
//       alert("Please paste an email first.");
//       return;
//     }

//     setLoading(true);
//     setError("");

//     try {
//       const response = await fetch("https://api-reply-gen.buildoninc.org/generate", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           email_content: emailText,
//           context: contextText,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to generate reply");
//       }

//       const data = await response.json();

//       const replyForTone = data.replies[tone];
//       setGeneratedReply(replyForTone || "No reply generated");
//     } catch (err) {
//       console.error(err);
//       setError("Something went wrong. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     if (uploaded) {
//       setEmailText("Your document content will appear here...");
//     }
//   }, [uploaded]);

//   return (
//     <div className="paste" id="paste">
//       <h1>Paste your email here</h1>

//       <textarea
//         className="t2"
//         placeholder="Paste your email here..."
//         value={emailText}
//         onChange={(e) => setEmailText(e.target.value)}
//       ></textarea>

//       <p className="q">Quick option</p>

//       <div className="dropdown-container">
//         <select value={tone} onChange={(e) => setTone(e.target.value)}>
//           <option value="professional">Professional</option>
//           <option value="casual">Casual</option>
//           <option value="friendly">Friendly</option>
//         </select>

//         <select value={length} onChange={(e) => setLength(e.target.value)}>
//           <option value="short">Short</option>
//           <option value="medium">Medium</option>
//           <option value="detailed">Detailed</option>
//         </select>

//         <select value={intent} onChange={(e) => setIntent(e.target.value)}>
//           <option value="Accept">Accept</option>
//           <option value="Decline">Decline</option>
//           <option value="Request clarification">Request clarification</option>
//           <option value="Follow Up">Follow Up</option>
//         </select>
//       </div>

//       <div>
//         <button className="b3" onClick={handleGenerate}>
//           {loading ? "Generating..." : "Generate Reply"}
//         </button>
//       </div>

//       {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

//       <div className="box1">
//         <h2>Generate reply</h2>

//         <textarea
//           className="t1"
//           placeholder="Generated reply will appear here..."
//           value={generatedReply}
//           readOnly
//         ></textarea>
//       </div>
//     </div>
//   );
// }

// export default Paste;

'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, Sparkles, ChevronDown } from 'lucide-react' // Added ChevronDown
import './Paste.css'

function Paste({ uploaded }) {
  const [emailText, setEmailText] = useState('')
  const [tone, setTone] = useState('professional')
  const [length, setLength] = useState('short')
  const [intent, setIntent] = useState('Accept')
  const [generatedReply, setGeneratedReply] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
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

  const handleGenerate = async () => {
    if (!emailText.trim()) return
    setLoading(true)
    try {
      const response = await fetch(
        'https://api-reply-gen.buildoninc.org/generate',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email_content: emailText,
            tone,
            length,
            intent,
          }),
        },
      )
      const data = await response.json()
      setGeneratedReply(
        data.replies?.[tone] || data.reply || 'Generation complete.',
      )
    } catch (err) {
      setGeneratedReply('Error connecting to server. Please try again.')
    } finally {
      setLoading(false)
    }
  }

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
          {loading ? 'Thinking...' : 'Generate reply'}
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