import { LayoutDashboard, Megaphone, TriangleAlert, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'
import { apiGet } from '../lib/api'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Campaigns', icon: Megaphone },
  { label: 'Anomalies', icon: TriangleAlert },
  { label: 'Insights', icon: Sparkles },
]

function StatusIndicator() {
  const [lastSync, setLastSync] = useState(null)
  const [connected, setConnected] = useState(true)
  const [, forceTick] = useState(0)

  useEffect(() => {
    const ping = () => {
      apiGet('/summary')
        .then(() => { setLastSync(Date.now()); setConnected(true) })
        .catch(() => setConnected(false))
    }
    ping()
    const pingInterval = setInterval(ping, 30000)
    const tickInterval = setInterval(() => forceTick((n) => n + 1), 1000)
    return () => {
      clearInterval(pingInterval)
      clearInterval(tickInterval)
    }
  }, [])

  const secondsAgo = lastSync ? Math.floor((Date.now() - lastSync) / 1000) : null
  const label = secondsAgo === null ? '—' : secondsAgo < 60 ? `${secondsAgo}s ago` : `${Math.floor(secondsAgo / 60)}m ago`

  return (
    <div className="px-3 py-2 text-xs">
      <div className="flex items-center gap-2 text-slate-400">
        <span className={`w-1.5 h-1.5 rounded-full ${connected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
        {connected ? 'Live · Syncing' : 'Disconnected'}
      </div>
      <p className="text-slate-600 mt-0.5">Last: {label}</p>
    </div>
  )
}

export default function Sidebar({ active, onSelect }) {
  return (
    <aside className="w-56 h-screen bg-[#0F1420] border-r border-slate-800 flex flex-col p-4">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-8 h-8 rounded bg-cyan-500 flex items-center justify-center font-bold text-slate-900">M</div>
        <div>
          <p className="text-white font-bold text-sm tracking-wide" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>MERCORA</p>
          <p className="text-slate-500 text-xs">Intelligence</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => onSelect(label)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors ${
              active === label
                ? 'bg-cyan-500/10 text-cyan-400'
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      <StatusIndicator />
    </aside>
  )
}