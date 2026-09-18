import { useApi } from '../hooks/useApi'
import KpiCard from './KpiCard'
import AnomalyFeed from './AnomalyFeed'
import TrendChart from './TrendChart'

export default function Overview() {
  const { data: summary, loading: summaryLoading } = useApi('/summary')
  const { data: anomalies, loading: anomaliesLoading } = useApi('/anomalies')
  const { data: campaigns } = useApi('/campaigns')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Campaign Intelligence
        </h1>
        <p className="text-slate-500 text-sm">{campaigns?.length ?? '—'} active campaigns</p>
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
          <TrendChart campaignId={campaigns?.[0]?.id} />
        </div>
        <AnomalyFeed anomalies={anomalies} loading={anomaliesLoading} campaigns={campaigns} />
      </div>
    </div>
  )
}