export default function KpiCard({ label, value, change, changeLabel, loading }) {
  if (loading) {
    return (
      <div className="bg-[#111726] border border-slate-800 rounded-lg p-4 animate-pulse">
        <div className="h-3 w-20 bg-slate-700 rounded mb-3" />
        <div className="h-6 w-16 bg-slate-700 rounded" />
      </div>
    )
  }
  return (
    <div className="bg-[#111726] border border-slate-800 rounded-lg p-4 transition-all hover:border-slate-700">
      <p className="text-slate-400 text-xs mb-1">{label}</p>
      <p className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        {value}
      </p>
      {change && (
        <p className={`text-xs mt-1 ${change.startsWith('-') ? 'text-red-400' : 'text-emerald-400'}`}>
          {change} <span className="text-slate-500">{changeLabel}</span>
        </p>
      )}
    </div>
  )
}