'use client'
import { useContext } from 'react'

import { LoadingSpinner } from '@/app/icons'
import { useAuth } from '@clerk/nextjs'
import { AreaChart, Card, Title } from '@tremor/react'
import { redirect } from 'next/navigation'
import { StatsContext } from '.'

export default function Money() {
  const { userId } = useAuth()

  if (!userId) {
    redirect('/')
  }
  const { isLoading, netWorth, lastOccurence } = useContext(StatsContext)

  return (
    <>
      <Card>
        <Title>Net worth</Title>
        <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
          {Intl.NumberFormat('us', { style: 'currency', currency: 'EUR' })
            .format(lastOccurence?.value || 0)
            .toString()}
        </p>

        {isLoading ? (
          <div className="h-72 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : netWorth.length > 0 ? (
          <AreaChart
            className="mt-4 h-72"
            data={netWorth}
            index="date"
            categories={['Worth']}
            colors={['indigo']}
            valueFormatter={(number: number) =>
              Intl.NumberFormat('us', { style: 'currency', currency: 'EUR' })
                .format(number)
                .toString()
            }
          />
        ) : (
          <div className="flex h-[300px] items-center justify-center">
            <p className="text-sm text-gray-600">No data available</p>
          </div>
        )}
      </Card>
    </>
  )
}
