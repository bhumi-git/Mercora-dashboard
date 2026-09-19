import { useState, useRef, useEffect } from 'react'
import { Sparkles, Send, X } from 'lucide-react'

export default function ChatPanel({ onClose }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Ask me anything about your campaigns — e.g. \"What should I improve first?\"" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim() || loading) return
    const question = input.trim()
    setMessages((m) => [...m, { role: 'user', text: question }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      })
      const data = await res.json()
      setMessages((m) => [...m, { role: 'ai', text: data.answer }])
    } catch {
      setMessages((m) => [...m, { role: 'ai', text: 'Something went wrong. Try again.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[32rem] bg-[#111726] border border-slate-800 rounded-lg shadow-2xl flex flex-col z-50">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Sparkles size={15} className="text-cyan-400" />
          <p className="text-white text-sm font-medium">Ask Mercora</p>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
          <X size={16} />
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`text-sm ${m.role === 'user' ? 'text-right' : ''}`}>
            <div
              className={`inline-block px-3 py-2 rounded-lg max-w-[85%] text-left ${
                m.role === 'user' ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-slate-200'
              }`}
            >
              {m.text}
            </div>
          </div>
        ))}
        {loading && <div className="text-slate-500 text-xs">Thinking...</div>}
      </div>

      <div className="p-3 border-t border-slate-800 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask about your campaigns..."
          className="flex-1 bg-slate-800 text-white text-sm rounded px-3 py-2 outline-none focus:ring-1 focus:ring-cyan-500"
        />
        <button onClick={send} disabled={loading} className="text-cyan-400 hover:text-cyan-300 disabled:opacity-40">
          <Send size={18} />
        </button>
      </div>
    </div>
  )
}