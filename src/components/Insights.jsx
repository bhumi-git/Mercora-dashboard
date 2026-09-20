import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { Sparkles } from 'lucide-react'

export default function Insights() {
  const { data: campaigns } = useApi('/campaigns')
  const [selectedId, setSelectedId] = useState(null)
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const runAnalysis = async () => {
    if (!selectedId) return
    setRunning(true)
    setError(null)
    setResult(null)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/anomalies/${selectedId}/detect`, {
        method: 'POST',
        headers: { 'x-api-key': import.meta.env.VITE_API_KEY },
      })
      if (!res.ok) throw new Error(`Analysis failed (${res.status})`)
      setResult(await res.json())
    } catch (e) {
      setError(e.message)
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Insights
        </h1>
        <p className="text-slate-500 text-sm">Run AI analysis on a specific campaign</p>
      </div>

      <div className="bg-[#111726] border border-slate-800 rounded-lg p-4 flex items-center gap-3">
        <select
          value={selectedId ?? ''}
          onChange={(e) => setSelectedId(Number(e.target.value))}
          className="bg-slate-800 text-white text-sm rounded px-3 py-2 border border-slate-700 flex-1"
        >
          <option value="" disabled>Select a campaign...</option>
          {campaigns?.map((c) => (
            <option key={c.id} value={c.id}>{c.name} — {c.channel}</option>
          ))}
        </select>
        <button
          onClick={runAnalysis}
          disabled={!selectedId || running}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-500 text-slate-900 text-sm font-medium rounded disabled:opacity-40 hover:bg-cyan-400 transition-colors"
        >
          <Sparkles size={14} />
          {running ? 'Analyzing...' : 'Run Analysis'}
        </button>
      </div>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      {result && (
        <div className="bg-[#111726] border border-slate-800 rounded-lg p-4">
          <p className="text-white text-sm font-medium mb-3">
            {result.detected} new {result.detected === 1 ? 'anomaly' : 'anomalies'} found
          </p>
          {result.detected === 0 && (
            <p className="text-slate-500 text-sm">No new anomalies — this campaign's metrics are within expected range.</p>
          )}
          <div className="space-y-3">
            {result.anomalies.map((a, i) => (
              <div key={i} className="border-l-2 border-cyan-500 pl-3">
                <p className="text-white text-sm">{a.metric.toUpperCase()} · {a.date} · <span className="uppercase text-cyan-400 text-xs">{a.severity}</span></p>
                <p className="text-slate-400 text-sm mt-1">{a.explanation ?? 'Analysis pending...'}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}