import { useState } from 'react'
import { useApi } from '../hooks/useApi'
import { apiGet } from '../lib/api'
import { Trash2 } from 'lucide-react'

export default function Campaigns() {
  const { data: campaigns, loading, refetch } = useApi('/campaigns')
  const [deletingId, setDeletingId] = useState(null)

  const handleDelete = async (id, name) => {
    if (!confirm(`Delete "${name}"? This removes all its metrics and anomalies too.`)) return
    setDeletingId(id)
    await fetch(`${import.meta.env.VITE_API_URL}/campaigns/${id}`, {
      method: 'DELETE',
      headers: { 'x-api-key': import.meta.env.VITE_API_KEY },
    })
    setDeletingId(null)
    window.location.reload()
  }

  const handleResetAll = async () => {
    if (!confirm('Clear ALL campaigns, metrics, and anomalies? This cannot be undone.')) return
    await fetch(`${import.meta.env.VITE_API_URL}/reset`, {
      method: 'DELETE',
      headers: { 'x-api-key': import.meta.env.VITE_API_KEY },
    })
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Campaigns</h1>
          <p className="text-slate-500 text-sm">{campaigns?.length ?? '—'} total</p>
        </div>
        <button
          onClick={handleResetAll}
          className="text-red-400 text-xs border border-red-900 px-3 py-1.5 rounded hover:bg-red-500/10 transition-colors"
        >
          Clear All Data
        </button>
      </div>

      <div className="bg-[#111726] border border-slate-800 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-slate-500 text-xs uppercase">
              <th className="text-left font-medium px-4 py-3">Campaign</th>
              <th className="text-left font-medium px-4 py-3">Platform</th>
              <th className="text-left font-medium px-4 py-3">Status</th>
              <th className="text-right font-medium px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={4} className="px-4 py-6 text-slate-600">Loading...</td></tr>
            )}
            {campaigns?.map((c) => (
              <tr key={c.id} className="border-b border-slate-800/50 hover:bg-slate-800/30 transition-colors">
                <td className="px-4 py-3 text-white font-medium">{c.name}</td>
                <td className="px-4 py-3 text-slate-400">{c.channel}</td>
                <td className="px-4 py-3">
                  <span className="text-emerald-400 text-xs bg-emerald-500/10 px-2 py-1 rounded">{c.status}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => handleDelete(c.id, c.name)}
                    disabled={deletingId === c.id}
                    className="text-slate-500 hover:text-red-400 transition-colors disabled:opacity-40"
                  >
                    <Trash2 size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}