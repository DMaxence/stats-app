export const formatTimestamp = (e: Date, interval: string) => {
  switch (interval) {
    case '1h':
      return new Date(e).toLocaleTimeString('en-us', {
        hour: 'numeric',
        minute: 'numeric',
      })
    case '24h':
      return new Date(e)
        .toLocaleDateString('en-us', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
        })
        .replace(',', ' ')
    case '90d':
    case '180d':
    case '365d':
    case 'all':
      return new Date(e).toLocaleDateString('en-us', {
        month: 'short',
        year: 'numeric',
      })
    default:
      return new Date(e).toLocaleDateString('en-us', {
        month: 'short',
        day: 'numeric',
      })
  }
}
