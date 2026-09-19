import { useState, useEffect } from 'react'
import Splash from './components/Splash'
import Sidebar from './components/Sidebar'
import { getInitialTheme, applyTheme } from './lib/theme'
import Overview from './components/Overview'
import Campaigns from './components/Campaigns'
import Anomalies from './components/Anomalies'
import Insights from './components/Insights'
import ChatPanel from './components/ChatPanel'
import { Sparkles } from 'lucide-react'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [active, setActive] = useState('Overview')
  const [theme, setTheme] = useState(getInitialTheme())
  const [showChat, setShowChat] = useState(false)

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />

  return (
    <div className="flex bg-[#0B0F17] min-h-screen">
      <Sidebar active={active} onSelect={setActive} />
    
      <main className="flex-1 p-6">
      {active === 'Overview' && <Overview />}
      {active === 'Campaigns' && <Campaigns />}
      {active === 'Anomalies' && <Anomalies />}
      {active === 'Insights' && <Insights />}
    </main>
    {!showChat && (
  <button
    onClick={() => setShowChat(true)}
    className="fixed bottom-6 right-6 w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center shadow-lg hover:bg-cyan-400 transition-colors z-40"
  >
    <Sparkles size={20} className="text-slate-900" />
  </button>
)}
{showChat && <ChatPanel onClose={() => setShowChat(false)} />}
    </div>
  )
}

export default App