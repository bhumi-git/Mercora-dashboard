import { useApi } from '../hooks/useApi'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function TrendChart({ campaignId }) {
  const { data, loading } = useApi(campaignId ? `/metrics/${campaignId}/trend` : null, [campaignId])

  if (!campaignId || loading) {
    return <div className="bg-[#111726] border border-slate-800 rounded-lg p-4 h-72 animate-pulse" />
  }

  return (
    <div className="bg-[#111726] border border-slate-800 rounded-lg p-4">
      <p className="text-white text-sm font-medium mb-4">Performance Trends</p>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="impressions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22D3EE" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="conversions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#818CF8" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#818CF8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#34D399" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#34D399" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis dataKey="date" stroke="#64748B" fontSize={11} />
          <YAxis stroke="#64748B" fontSize={11} />
          <Tooltip contentStyle={{ background: '#0F1420', border: '1px solid #1E293B', borderRadius: 8 }} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
          <Area type="monotone" dataKey="impressions" name="Impressions" stroke="#22D3EE" fill="url(#impressions)" strokeWidth={2} />
          <Area type="monotone" dataKey="conversions" name="Conversions" stroke="#818CF8" fill="url(#conversions)" strokeWidth={2} />
          <Area type="monotone" dataKey="revenue" name="Revenue ($)" stroke="#34D399" fill="url(#revenue)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}