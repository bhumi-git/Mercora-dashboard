import { useState, useEffect } from 'react'
import Splash from './components/Splash'
import Sidebar from './components/Sidebar'
import { getInitialTheme, applyTheme } from './lib/theme'
import Overview from './components/Overview'

function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [active, setActive] = useState('Overview')
  const [theme, setTheme] = useState(getInitialTheme())

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  if (showSplash) return <Splash onDone={() => setShowSplash(false)} />

  return (
    <div className="flex bg-[#0B0F17] min-h-screen">
      <Sidebar
        active={active}
        onSelect={setActive}
        theme={theme}
        onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <main className="flex-1 p-6">
       {active === 'Overview' ? <Overview /> : <h2 className="text-white text-xl">{active} — content coming next</h2>}
      </main>
    </div>
  )
}

export default App