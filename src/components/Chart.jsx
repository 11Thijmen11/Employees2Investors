import React, { useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'

const API_KEY = '0VQE4F6FE9NZ37FR' 

export default function Chart(){
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPrice, setCurrentPrice] = useState(null)
  const [priceChange, setPriceChange] = useState(null)
  const [lastUpdateDate, setLastUpdateDate] = useState(null)
  const [showInfo, setShowInfo] = useState(false)

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

        // Get all data points from the full trading day
        const allData = Object.entries(timeSeries)
          .map(([time, values]) => {
            const timeOnly = time.split(' ')[1].substring(0, 5)
            const [etHours, etMinutes] = timeOnly.split(':').map(Number)
            
            // Convert ET to NL time (ET + 6 hours for CET)
            let nlHours = etHours + 6
            if (nlHours >= 24) nlHours -= 24
            
            return {
              time: `${nlHours.toString().padStart(2, '0')}:${etMinutes.toString().padStart(2, '0')}`,
              price: parseFloat(values['4. close']),
              fullTime: time,
              nlHours,
              etHours
            }
          })
          // Filter for trading hours: ET 09:30-16:00 = NL 15:30-22:00
          .filter(item => {
            return (item.etHours >= 9 && item.etHours < 16) || 
                   (item.etHours === 16 && item.time.split(':')[1] === '00')
          })
          .reverse() // Oldest to newest
        
        // Only keep :00 and :30 times for cleaner display
        const chartData = allData.filter(item => {
          const minutes = item.time.split(':')[1]
          return minutes === '00' || minutes === '30'
        })

        setData(chartData)
        
        // Get the date from the first data point
        if (chartData.length > 0) {
          const firstDataDate = chartData[0].fullTime.split(' ')[0]
          const [year, month, day] = firstDataDate.split('-')
          setLastUpdateDate(`${day}-${month}-${year}`)
        }
        
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
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-lightOnDark">S&P 500 (SPY)</h3>
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="text-lightOnDark/70 hover:text-lightOnDark transition-colors"
              title="Informatie"
            >
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full border-2 border-current text-xs font-bold">i</span>
            </button>
          </div>
          <p className="text-sm text-lightOnDark/70">Live data • NL: 15:30-22:00 | US: 09:30-16:00 ET</p>
          {lastUpdateDate && (
            <p className="text-xs text-lightOnDark/60 mt-1">Datum: {lastUpdateDate}</p>
          )}
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
      
      {/* Info box */}
      {showInfo && (
        <div className="mb-4 p-4 bg-lightOnDark/10 rounded-lg border border-secondary/30">
          <h4 className="text-sm font-bold text-lightOnDark mb-2">📊 Hoe werkt deze grafiek?</h4>
          <ul className="text-xs text-lightOnDark/80 space-y-1">
            <li>• De grafiek toont de S&P 500 koers via SPY ETF</li>
            <li>• Data wordt elke 5 minuten ververst tijdens handelstijden</li>
            <li>• Tijden zijn weergegeven in Nederlandse tijd (CET)</li>
            <li>• Buiten handelstijden zie je data van de laatste handelsdag</li>
            <li>• Hover over de lijn voor exacte prijs en tijd</li>
          </ul>
        </div>
      )}

      <div style={{ width: '100%', height: 360 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid stroke="#ffffff22" />
            <XAxis 
              dataKey="time" 
              stroke="#FFF5E6"
              tick={{ fontSize: 11 }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={60}
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
              formatter={(value) => [`$${value.toFixed(2)}`, 'Prijs']}
              labelFormatter={(label) => `Tijd: ${label}`}
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
