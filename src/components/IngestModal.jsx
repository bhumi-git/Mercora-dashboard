import { useState } from 'react'

export default function IngestModal({ onClose, onSuccess }) {
  const [file, setFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleUpload = async () => {
    if (!file) return
    setUploading(true)
    setError(null)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/datasets`, {
        method: 'POST',
        body: formData,
      })
      if (!res.ok) throw new Error(`Upload failed (${res.status})`)
      const data = await res.json()
      setResult(data)
      onSuccess?.()
    } catch (e) {
      setError(e.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={onClose}>
      <div
        className="bg-[#111726] border border-slate-800 rounded-lg p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-white font-semibold mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
          Ingest Data
        </h3>
        <p className="text-slate-500 text-sm mb-4">Upload a CSV, JSON, or Excel file of campaign metrics.</p>

        <input
          type="file"
          accept=".csv,.json,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full text-sm text-slate-400 mb-4 file:mr-3 file:py-2 file:px-3 file:rounded file:border-0 file:bg-cyan-500/10 file:text-cyan-400 file:text-sm hover:file:bg-cyan-500/20"
        />

        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}

        {result && (
          <div className="bg-slate-800/50 rounded p-3 mb-4 text-sm space-y-1">
            <p className="text-emerald-400">{result.inserted} rows inserted, {result.skipped} skipped</p>
            <p className="text-cyan-400">{result.new_anomalies_detected} new anomalies detected</p>
            {result.failed.length > 0 && (
              <p className="text-red-400">{result.failed.length} rows failed validation</p>
            )}
          </div>
        )}

        <div className="flex gap-2 justify-end">
          <button onClick={onClose} className="px-3 py-2 text-slate-400 text-sm hover:text-slate-200">
            {result ? 'Close' : 'Cancel'}
          </button>
          {!result && (
            <button
              onClick={handleUpload}
              disabled={!file || uploading}
              className="px-4 py-2 bg-cyan-500 text-slate-900 text-sm font-medium rounded disabled:opacity-40 disabled:cursor-not-allowed hover:bg-cyan-400 transition-colors"
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}