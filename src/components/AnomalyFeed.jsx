const severityColor = {
  mild: 'border-amber-500 text-amber-400',
  moderate: 'border-orange-500 text-orange-400',
  severe: 'border-red-500 text-red-400',
}

export default function AnomalyFeed({ anomalies, loading, campaigns }) {
  const campaignName = (id) => campaigns?.find(c => c.id === id)?.name ?? `Campaign ${id}`

  if (loading) {
    return <div className="bg-[#111726] border border-slate-800 rounded-lg p-4 h-72 animate-pulse" />
  }

  return (
    <div className="bg-[#111726] border border-slate-800 rounded-lg p-4">
      <p className="text-white text-sm font-medium mb-4">Anomalies · {anomalies?.length ?? 0} active</p>
      <div className="space-y-3 max-h-64 overflow-y-auto">
        {anomalies?.length === 0 && <p className="text-slate-500 text-sm">No anomalies detected.</p>}
        {anomalies?.map((a) => (
          <div key={a.id} className={`border-l-2 pl-3 ${severityColor[a.severity] ?? 'border-slate-600'}`}>
            <p className="text-white text-sm font-medium">{campaignName(a.campaign_id)}</p>
            <p className="text-xs text-slate-400">
              {a.metric.toUpperCase()} {a.actual} <span className="text-slate-600">vs {a.expected} expected</span>
            </p>
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">{a.explanation}</p>
          </div>
        ))}
      </div>
    </div>
  )
}