'use client'

import React, { createContext } from 'react'
import Money from './money'
import Toggle from './toggle'
import { useSearchParams } from 'next/navigation'
import InputMoney from './input-money'
import { useAuth } from '@clerk/nextjs'
import supabaseClient from '@/lib/supabaseClient'
import { fillArrayForInterval, intervalData } from '@/lib/stats'
import { formatTimestamp } from '@/lib/time'

export const StatsContext = createContext<{
  interval: string
  netWorth: { date: string; Worth: number }[]
  lastOccurence: { created_at: Date; value: number } | undefined
  refreshMoney: () => void
  isLoading: boolean
}>({
  interval: '',
  netWorth: [],
  lastOccurence: {} as { created_at: Date; value: number },
  refreshMoney: () => {},
  isLoading: false,
})

type RowType = {
  created_at: Date
  value: number
}

export default function Stats({}: {}) {
  const { getToken, userId } = useAuth()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = React.useState(true)
  const [moneyRows, setMoneyRows] = React.useState<RowType[]>([])

  const interval = searchParams?.get('interval') || '30d'

  const fetchMoney = React.useCallback(async () => {
    const token = await getToken({ template: 'supabase' })
    const supabase = await supabaseClient(token as string)
    const { data: moneyRows, error } = await supabase
      .from('money')
      .select()
      .eq('user_id', userId)
      .gte(
        'created_at',
        intervalData[interval as keyof typeof intervalData].startDate
          .toISOString()
          .replace('T', ' ')
          .replace('Z', '')
      )
      .order('created_at', { ascending: true })

    if (error) {
      console.error('error', error)
    } else {
      const parsedValues = moneyRows?.reduce((acc, { created_at, value }) => {
        let date = formatTimestamp(created_at, interval)
        if (!acc[date]) {
          acc[date] = []
        }
        acc[date] = acc[date].concat(value)
        return acc
      }, {} as { [key: string]: number[] })

      const result = fillArrayForInterval(interval).reduce((acc, curr) => {
        let date = formatTimestamp(curr, interval)
        acc.push({
          created_at: curr,
          value:
            interval === '7d' || interval === '30d'
              ? parsedValues[date]?.[parsedValues[date].length - 1] ||
                acc[acc.length - 1]?.value ||
                0
              : parsedValues[date]?.reduce((a: number, b: number) => a + b, 0) /
                  (parsedValues[date]?.length || 1) ||
                acc[acc.length - 1]?.value ||
                0,
        })
        return acc
      }, [] as RowType[])

      setMoneyRows(result)
      setIsLoading(false)
    }
  }, [getToken, userId, interval])

  React.useEffect(() => {
    fetchMoney()
  }, [fetchMoney])

  return (
    <StatsContext.Provider
      value={{
        interval,
        netWorth: moneyRows?.map((d) => ({
          date: formatTimestamp(d.created_at, interval),
          Worth: d.value,
        })),
        lastOccurence: moneyRows.findLast((m) => m.value),
        refreshMoney: fetchMoney,
        isLoading,
      }}
    >
      <div className="">
        <Toggle />
        <div className="grid gap-5">
          <InputMoney />
          <Money />
        </div>
      </div>
    </StatsContext.Provider>
  )
}
