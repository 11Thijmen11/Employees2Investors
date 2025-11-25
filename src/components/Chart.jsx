import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const API_KEY = '0VQE4F6FE9NZ37FR' 

export default function Chart(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPrice, setCurrentPrice] = useState(null)
  const [priceChange, setPriceChange] = useState(null)

  useEffect(() => {
    // Fetch S&P 500 (SPY ETF as proxy) intraday data
    const fetchSP500Data = async () => {
      try {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=SPY&interval=5min&apikey=${API_KEY}`
        )
        const result = await response.json()

        if (result['Error Message'] || result['Note']) {
          throw new Error('API limit bereikt of ongeldige key')
        }

        const timeSeries = result['Time Series (5min)']
        if (!timeSeries) {
          throw new Error('Geen data beschikbaar')
        }

        // Convert to chart format (last 30 data points for readability)
        const chartData = Object.entries(timeSeries)
          .slice(0, 30)
          .reverse()
          .map(([time, values]) => {
            // Convert ET to Dutch time (ET + 6 hours)
            const etTime = new Date(time + ' EST')
            const nlTime = new Date(etTime.getTime() + (6 * 60 * 60 * 1000))
            const hours = nlTime.getHours().toString().padStart(2, '0')
            const minutes = nlTime.getMinutes().toString().padStart(2, '0')
            
            return {
              time: `${hours}:${minutes}`,
              price: parseFloat(values['4. close']),
              fullTime: time,
              showLabel: minutes === '00' || minutes === '30' // Only show :00 and :30
            }
          })

        setData(chartData)
        
        // Calculate price change
        if (chartData.length > 0) {
          const latest = chartData[chartData.length - 1].price
          const oldest = chartData[0].price
          const change = ((latest - oldest) / oldest * 100).toFixed(2)
          setCurrentPrice(latest.toFixed(2))
          setPriceChange(change)
        }

      } catch (err) {
        console.error('Error fetching S&P 500 data:', err)
        setError(err.message)
        // Fallback to demo data
        setData([
          { time: '09:30', price: 450 },
          { time: '10:00', price: 452 },
          { time: '10:30', price: 451 },
          { time: '11:00', price: 455 },
          { time: '11:30', price: 458 },
          { time: '12:00', price: 457 },
          { time: '12:30', price: 460 }
        ])
        setCurrentPrice('460.00')
        setPriceChange('+2.22')
      } finally {
        setLoading(false)
      }
    }

    fetchSP500Data()
    
    // Refresh every 5 minutes
    const interval = setInterval(fetchSP500Data, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  if (loading) return (
    <div className="card-dark">
      <div className="flex items-center justify-center h-64">
        <div className="text-lightOnDark">📊 S&P 500 data laden...</div>
      </div>
    </div>
  )

  return (
    <div className="card-dark">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-lightOnDark">S&P 500 (SPY)</h3>
          <p className="text-sm text-lightOnDark/70">Live data • NL: 15:30-22:00 | US: 09:30-16:00 ET</p>
        </div>
        {currentPrice && (
          <div className="text-right">
            <div className="text-2xl font-bold text-lightOnDark">${currentPrice}</div>
            <div className={`text-sm font-semibold ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {priceChange >= 0 ? '↑' : '↓'} {priceChange}%
            </div>
          </div>
        )}
      </div>
      
      

      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#ffffff22" />
            <XAxis 
              dataKey="time" 
              stroke="#FFF5E6"
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
              tickFormatter={(value, index) => {
                // Only show times at :00 and :30
                const minutes = value.split(':')[1]
                return (minutes === '00' || minutes === '30') ? value : ''
              }}
            />
            <YAxis 
              domain={["dataMin - 2", "dataMax + 2"]} 
              stroke="#FFF5E6"
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#2b1206', 
                borderRadius: 8, 
                color: '#FFF5E6',
                border: '1px solid #F19C47'
              }} 
              itemStyle={{ color: '#FFF5E6' }}
              formatter={(value) => [`$${value}`, 'Prijs']}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#F19C47" 
              strokeWidth={3} 
              dot={{ r: 2, fill: '#F19C47' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
