import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

// Simple chart component using Recharts. It fetches dummy data from local JSON.
export default function Chart(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // fetch dummy JSON shipped with the app
    fetch('/src/data/prices.json')
      .then(r => r.json())
      .then(d => setData(d))
      .catch(() => {
        // fallback dummy data
        setData([
          { time: '09:00', price: 100 },
          { time: '10:00', price: 102 },
          { time: '11:00', price: 101 },
          { time: '12:00', price: 105 },
          { time: '13:00', price: 108 }
        ])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div>Loading chart…</div>

  return (
    <div className="card-dark">
      <h3 className="text-lg font-semibold mb-2 text-lightOnDark">Demo beurskoersen</h3>
      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#ffffff22" />
            <XAxis dataKey="time" stroke="#FFF5E6" />
            <YAxis domain={["dataMin - 5", "dataMax + 5"]} stroke="#FFF5E6" />
            <Tooltip contentStyle={{ backgroundColor: '#2b1206', borderRadius: 8, color: '#FFF5E6' }} itemStyle={{ color: '#FFF5E6' }} />
            <Line type="monotone" dataKey="price" stroke="#F19C47" strokeWidth={3} dot={{ r: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
