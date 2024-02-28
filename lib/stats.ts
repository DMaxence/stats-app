export type IntervalProps =
  // '1h' |
  '24h' | '7d' | '30d' | '90d' | '180d' | '365d' | 'all'

export const INTERVALS = [
  // {
  //   display: 'Last hour',
  //   value: '1h',
  // },
  // {
  //   display: 'Last 24 hours',
  //   value: '24h',
  // },
  {
    display: 'Last 7 days',
    value: '7d',
  },
  {
    display: 'Last 30 days',
    value: '30d',
  },
  {
    display: 'Last 3 months',
    value: '90d',
  },
  {
    display: 'Last 6 months',
    value: '180d',
  },
  {
    display: 'Last year',
    value: '365d',
  },
  {
    display: 'All Time',
    value: 'all',
  },
]

export const intervalData = {
  // '1h': {
  //   startDate: new Date(Date.now() - 3600000),
  //   granularity: 'minute',
  // },
  // '24h': {
  //   startDate: new Date(Date.now() - 86400000),
  //   granularity: 'hour',
  //   steps: 1,
  //   value: 3600000,
  // },
  '7d': {
    startDate: new Date(Date.now() - 604800000),
    granularity: 'day',
    steps: 7,
    value: 86400000,
  },
  '30d': {
    startDate: new Date(Date.now() - 2592000000),
    granularity: 'day',
    steps: 30,
    value: 86400000,
  },
  '90d': {
    startDate: new Date(Date.now() - 7776000000),
    granularity: 'month',
    steps: 3,
    value: 2592000000,
  },
  '180d': {
    startDate: new Date(Date.now() - 15552000000),
    granularity: 'month',
    steps: 6,
    value: 2592000000,
  },
  '365d': {
    startDate: new Date(Date.now() - 31536000000),
    granularity: 'month',
    steps: 12,
    value: 2592000000,
  },
  all: {
    // Mystats founding date
    startDate: new Date('2023-01-17'),
    granularity: 'month',
    steps: 12,
    value: 2592000000,
  },
}

export type LocationTabs = 'country' | 'city' | 'region'

export type DeviceTabs = 'device' | 'browser' | 'os' | 'ua'

export const fillArrayForInterval = (interval: string) =>
  Array.from(
    {
      length: intervalData[interval as keyof typeof intervalData].steps,
    },
    (_, i) =>
      new Date(
        Date.now() -
          (intervalData[interval as keyof typeof intervalData].steps - i - 1) *
            intervalData[interval as keyof typeof intervalData].value
      )
  )
