import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import KpiCard from './KpiCard'
import AnomalyFeed from './AnomalyFeed'
import TrendChart from './TrendChart'
import IngestModal from './IngestModal'

export default function Overview() {
  const [showModal, setShowModal] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)
  const [selectedCampaignId, setSelectedCampaignId] = useState(null)

   const activeCampaignId = selectedCampaignId ?? null  // null = "All"

  
  const { data: campaigns } = useApi('/campaigns', [refreshKey])
  const { data: summary, loading: summaryLoading } = useApi(
       activeCampaignId ? `/summary?campaign_id=${activeCampaignId}` : '/summary',
       [refreshKey, activeCampaignId]
    )
    const { data: anomalies, loading: anomaliesLoading } = useApi('/anomalies', [refreshKey])
 
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Campaign Intelligence
          </h1>
          <p className="text-slate-500 text-sm">{campaigns?.length ?? '—'} active campaigns</p>
        </div>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
  <button
    onClick={() => setSelectedCampaignId(null)}
    className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${
      selectedCampaignId === null ? 'bg-cyan-500 text-slate-900 font-medium' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
    }`}
  >
    All
  </button>
  {campaigns?.map((c) => (
    <button
      key={c.id}
      onClick={() => setSelectedCampaignId(c.id)}
      className={`px-3 py-1.5 text-xs rounded-full whitespace-nowrap transition-colors ${
        selectedCampaignId === c.id ? 'bg-cyan-500 text-slate-900 font-medium' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
      }`}
    >
      {c.name}
    </button>
  ))}
</div>
        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 bg-cyan-500 text-slate-900 text-sm font-medium rounded hover:bg-cyan-400 transition-colors"
        >
          + Ingest Data
        </button>
      </div>


      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        <KpiCard label="Total Impressions" value={summary?.total_impressions?.toLocaleString()} loading={summaryLoading} />
        <KpiCard label="Conversion Rate" value={`${(summary?.conversion_rate * 100).toFixed(2)}%`} loading={summaryLoading} />
        <KpiCard label="Revenue" value={`$${summary?.revenue?.toLocaleString()}`} loading={summaryLoading} />
        <KpiCard label="Cost Per Acquisition" value={`$${summary?.cost_per_acquisition}`} loading={summaryLoading} />
        <KpiCard label="Active Campaigns" value={summary?.active_campaigns} loading={summaryLoading} />
        <KpiCard label="Anomalies Detected" value={summary?.anomalies_detected} loading={summaryLoading} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <TrendChart campaignId={activeCampaignId ?? campaigns?.[0]?.id} />
        </div>
        <AnomalyFeed anomalies={anomalies} loading={anomaliesLoading} campaigns={campaigns} />
      </div>

      {showModal && (
        <IngestModal
          onClose={() => setShowModal(false)}
          onSuccess={() => setRefreshKey(k => k + 1)}
        />
      )}
    </div>
  )
}