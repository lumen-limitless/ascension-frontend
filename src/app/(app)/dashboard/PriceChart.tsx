'use client'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { CHAIN_NAME } from '@/constants'
import Loader from '@/components/ui/Loader'
import { arbitrum } from 'wagmi/chains'
import { ascensionTokenAddress } from '@/wagmi/generated'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="border border-purple-500 bg-purple-900 p-2">
        <p className="label">{`${new Date(
          parseInt(label) * 1000
        ).toLocaleDateString()}: $${parseFloat(payload[0].value).toFixed(
          3
        )}`}</p>
      </div>
    )
  }

  return null
}

export default function PriceChart({ priceData }: { priceData: any }) {
  return (
    <div className="h-[500px] w-full">
      {!priceData ? (
        <Loader />
      ) : (
        <>
          <ResponsiveContainer height={500}>
            <AreaChart
              data={
                priceData.coins[
                  `${CHAIN_NAME[arbitrum.id]}:${ascensionTokenAddress}`
                ].prices
              }
              margin={{
                top: 10,
                right: 20,
                left: 20,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#943259" stopOpacity={0.66} />
                  <stop offset="95%" stopColor="#2d1a62" stopOpacity={0.33} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="timestamp"
                tickFormatter={(value) =>
                  new Date(value * 1000).toLocaleDateString()
                }
              />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#943259"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </>
      )}
    </div>
  )
}
