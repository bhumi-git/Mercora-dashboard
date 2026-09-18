import { LayoutDashboard, Megaphone, TriangleAlert, Sparkles, Sun, Moon } from 'lucide-react'

const navItems = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'Campaigns', icon: Megaphone },
  { label: 'Anomalies', icon: TriangleAlert },
  { label: 'Insights', icon: Sparkles },
]

export default function Sidebar({ active, onSelect, theme, onToggleTheme }) {
  return (
    <aside className="w-56 h-screen bg-[#0F1420] dark:bg-[#0F1420] border-r border-slate-800 flex flex-col p-4">
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

      <button
        onClick={onToggleTheme}
        className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-slate-200 text-sm"
      >
        {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </button>
    </aside>
  )
}