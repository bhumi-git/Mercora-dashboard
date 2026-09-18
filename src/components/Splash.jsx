import { useState, useEffect } from 'react'

export default function Splash({ onDone }) {
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1200)
    const doneTimer = setTimeout(onDone, 1600)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(doneTimer)
    }
  }, [onDone])

  return (
    <div
      onClick={onDone}
      className={`min-h-screen flex items-center justify-center bg-[#0B0F17] cursor-pointer transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="text-center">
        <p className="text-slate-400 text-xs tracking-[0.3em] uppercase mb-3">Welcome to</p>
        <h1
          className="text-6xl font-bold text-white tracking-tight"
          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
        >
          MERCORA
        </h1>
        <p className="text-slate-500 text-sm mt-2">Your Personal Intelligence Assistant.</p>
      </div>
    </div>
  )
}