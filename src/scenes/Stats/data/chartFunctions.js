export const generateChartTitle = (tooltipItem, data) => {
  return data.labels[tooltipItem[0].index]
}

export const generateChartTimeLabel = (tooltipItem, data) => {
  const { currentValue, percentage } = extractChartData(tooltipItem, data)
  const hours = Math.floor(currentValue / 3600)
  const minutes = Math.floor((currentValue % 3600) / 60)

  return `${hours}h ${minutes}m (${percentage}%)`
}

export const generateChartSessionsLabel = (tooltipItem, data) => {
  const { currentValue, percentage } = extractChartData(tooltipItem, data)

  return `${currentValue} (${percentage}%)`
}

const extractChartData = (tooltipItem, data) => {
  const dataset = data.datasets[tooltipItem.datasetIndex]
  const meta = dataset._meta[Object.keys(dataset._meta)[0]]
  const total = meta.total
  const currentValue = dataset.data[tooltipItem.index]
  const percentage = parseFloat(((currentValue / total) * 100).toFixed(1))

  return { currentValue, percentage }
}
