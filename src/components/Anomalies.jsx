import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { RefreshCw } from 'lucide-react'

const severityStyle = {
  mild: 'border-amber-500 bg-amber-500/5',
  moderate: 'border-orange-500 bg-orange-500/5',
  severe: 'border-red-500 bg-red-500/5',
}
const severityBadge = {
  mild: 'text-amber-400 bg-amber-500/10',
  moderate: 'text-orange-400 bg-orange-500/10',
  severe: 'text-red-400 bg-red-500/10',
}

export default function Anomalies() {
  const [filter, setFilter] = useState('all')
  const [retrying, setRetrying] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const { data: anomalies, loading } = useApi('/anomalies', [refreshKey])
  const { data: campaigns } = useApi('/campaigns')

  const campaignName = (id) => campaigns?.find(c => c.id === id)?.name ?? `Campaign ${id}`
  const filtered = filter === 'all' ? anomalies : anomalies?.filter(a => a.severity === filter)
  const missingCount = anomalies?.filter(a => !a.explanation).length ?? 0

  const retryMissing = async () => {
    setRetrying(true)
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/anomalies/retry-explanations`, {
        method: 'POST',
        headers: { 'x-api-key': import.meta.env.VITE_API_KEY },
      })
      setRefreshKey((k) => k + 1)
    } finally {
      setRetrying(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Anomalies
          </h1>
          <p className="text-slate-500 text-sm">{anomalies?.length ?? '—'} total detected</p>
        </div>
        <div className="flex items-center gap-2">
          {missingCount > 0 && (
            <button
              onClick={retryMissing}
              disabled={retrying}
              className="flex items-center gap-1.5 text-cyan-400 text-xs border border-cyan-900 px-3 py-1.5 rounded hover:bg-cyan-500/10 transition-colors disabled:opacity-40"
            >
              <RefreshCw size={12} className={retrying ? 'animate-spin' : ''} />
              {retrying ? 'Retrying...' : `Retry ${missingCount} pending`}
            </button>
          )}
          <div className="flex gap-1 bg-[#111726] border border-slate-800 rounded-lg p-1">
            {['all', 'mild', 'moderate', 'severe'].map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 text-xs rounded capitalize transition-colors ${
                  filter === s ? 'bg-cyan-500 text-slate-900 font-medium' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading && <div className="bg-[#111726] border border-slate-800 rounded-lg h-40 animate-pulse" />}
      {!loading && filtered?.length === 0 && (
        <p className="text-slate-500 text-sm">No anomalies match this filter.</p>
      )}

      <div className="space-y-3">
        {filtered?.map((a) => (
          <div key={a.id} className={`border-l-4 rounded-r-lg p-4 bg-[#111726] border border-slate-800 ${severityStyle[a.severity]}`}>
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-white font-medium">{campaignName(a.campaign_id)}</p>
                <p className="text-slate-500 text-xs">{a.date}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded uppercase font-medium ${severityBadge[a.severity]}`}>
                {a.severity}
              </span>
            </div>
            <p className="text-slate-300 text-sm mb-2">
              {a.metric.toUpperCase()} dropped to <span className="text-white font-medium">{a.actual}</span>
              <span className="text-slate-500"> — expected {a.expected}</span>
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              {a.explanation ?? 'Analysis pending...'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}