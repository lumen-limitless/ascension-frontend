import { commify } from '@ethersproject/units'
import { useMemo } from 'react'
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import Loader from '../ui/Loader'

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="border border-purple-500 bg-purple-900 p-2">
        <p className="label">{`${new Date(
          parseInt(label) * 1000
        ).toLocaleDateString()}: ${commify(payload[0].value)}`}</p>
      </div>
    )
  }

  return null
}

export default function TotalStakedChart({
  stakingData,
}: {
  stakingData: any
}) {
  const max = useMemo(() => {
    if (!stakingData || stakingData.length === 0) return 0
    return Math.ceil(
      Math.max(...stakingData.map((d: any) => d.totalAssets)) * 1.1
    )
  }, [stakingData])
  return (
    <>
      <div className="h-[500px] w-full">
        {!stakingData || stakingData.length === 0 ? (
          <Loader />
        ) : (
          <ResponsiveContainer height={500}>
            <AreaChart
              data={stakingData}
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
                dataKey="id"
                tickFormatter={(value) =>
                  new Date(value * 1000).toLocaleDateString()
                }
              />
              <YAxis
                domain={[0, max]}
                tickFormatter={(value) => commify(value)}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="totalAssets"
                stroke="#943259"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorUv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </>
  )
}
