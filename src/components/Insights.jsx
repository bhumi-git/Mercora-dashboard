import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { Sparkles } from 'lucide-react'

const severityColor = {
  mild: 'text-amber-400',
  moderate: 'text-orange-400',
  severe: 'text-red-400',
}

export default function Insights() {
  const { data: campaigns } = useApi('/campaigns')
  const { data: allAnomalies } = useApi('/anomalies')
  const [selectedId, setSelectedId] = useState(null)
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const existingForSelected = allAnomalies?.filter(a => a.campaign_id === selectedId) ?? []

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

  const showNewResults = result && result.detected > 0
  const showExisting = selectedId && (!result || result.detected === 0) && existingForSelected.length > 0
  const showNothingAtAll = selectedId && result && result.detected === 0 && existingForSelected.length === 0

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
          onChange={(e) => { setSelectedId(Number(e.target.value)); setResult(null) }}
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

      {showNewResults && (
        <div className="bg-[#111726] border border-slate-800 rounded-lg p-4">
          <p className="text-cyan-400 text-sm font-medium mb-3">
            {result.detected} new {result.detected === 1 ? 'anomaly' : 'anomalies'} found
          </p>
          <div className="space-y-3">
            {result.anomalies.map((a, i) => (
              <div key={i} className="border-l-2 border-cyan-500 pl-3">
                <p className="text-white text-sm">{a.metric.toUpperCase()} · {a.date} · <span className={`uppercase text-xs ${severityColor[a.severity]}`}>{a.severity}</span></p>
                <p className="text-slate-400 text-sm mt-1">{a.explanation ?? 'Analysis pending...'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showExisting && (
        <div className="bg-[#111726] border border-slate-800 rounded-lg p-4">
          <p className="text-slate-400 text-sm font-medium mb-3">
            No new anomalies — showing {existingForSelected.length} previously detected for this campaign
          </p>
          <div className="space-y-3">
            {existingForSelected.map((a) => (
              <div key={a.id} className="border-l-2 border-slate-600 pl-3">
                <p className="text-white text-sm">{a.metric.toUpperCase()} · {a.date} · <span className={`uppercase text-xs ${severityColor[a.severity]}`}>{a.severity}</span></p>
                <p className="text-slate-400 text-sm mt-1">{a.explanation ?? 'Analysis pending...'}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {showNothingAtAll && (
        <p className="text-slate-500 text-sm">No anomalies — this campaign's metrics are fully within expected range.</p>
      )}
    </div>
  )
}