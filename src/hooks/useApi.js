import { useState, useEffect } from 'react'
import { apiGet } from '../lib/api'

export function useApi(path, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

useEffect(() => {
  if (!path) { setLoading(false); return }
  let cancelled = false
  setLoading(true)
  apiGet(path)
    .then(d => { if (!cancelled) { setData(d); setError(null) } })
    .catch(e => { if (!cancelled) setError(e.message) })
    .finally(() => { if (!cancelled) setLoading(false) })
  return () => { cancelled = true }
}, deps)

  return { data, loading, error }
}