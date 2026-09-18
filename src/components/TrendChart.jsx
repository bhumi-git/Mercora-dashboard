import { useApi } from '../hooks/useApi'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function TrendChart({ campaignId }) {
  const { data, loading } = useApi(campaignId ? `/metrics/${campaignId}/trend` : null, [campaignId])

  if (!campaignId || loading) {
    return <div className="bg-[#111726] border border-slate-800 rounded-lg p-4 h-72 animate-pulse" />
  }

  return (
    <div className="bg-[#111726] border border-slate-800 rounded-lg p-4">
      <p className="text-white text-sm font-medium mb-4">Performance Trend — CVR</p>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
          <XAxis dataKey="date" stroke="#64748B" fontSize={12} />
          <YAxis stroke="#64748B" fontSize={12} />
          <Tooltip contentStyle={{ background: '#111726', border: '1px solid #1E293B' }} />
          <Line type="monotone" dataKey="cvr" stroke="#22D3EE" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}