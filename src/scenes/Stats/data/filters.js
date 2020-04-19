export const filters = [
  { name: 'This week', value: 'THIS_WEEK' },
  { name: 'This month', value: 'THIS_MONTH' },
  { name: 'This year', value: 'THIS_YEAR' },
  { name: '7 days', displayName: 'Last 7 days', value: '7_DAYS' },
  {
    name: '30 days',
    displayName: 'Last 30 days',
    value: '30_DAYS',
    default: true,
  },
  { name: '3 months', displayName: 'Last 3 months', value: '3_MONTHS' },
  { name: '6 months', displayName: 'Last 6 months', value: '6_MONTHS' },
  { name: '1 year', displayName: 'Last year', value: '1_YEAR' },
]

export const getFilterFn = (filter) => {
  let filterFn

  switch (filter.value) {
    case 'THIS_WEEK':
      filterFn = isThisWeek
      break
    case 'THIS_MONTH':
      filterFn = isThisMonth
      break
    case 'THIS_YEAR':
      filterFn = isThisYear
      break
    case '7_DAYS':
      filterFn = isLast7Days
      break
    case '30_DAYS':
      filterFn = isLast30Days
      break
    case '3_MONTHS':
      filterFn = isLast3Months
      break
    case '6_MONTHS':
      filterFn = isLast6Months
      break
    case '1_YEAR':
      filterFn = isLastYear
      break

    default:
      break
  }

  return filterFn
}

const isThisWeek = (day, dayjs) => {
  return dayjs().week() === dayjs(day).week()
}

const isThisMonth = (day, dayjs) => {
  return dayjs().month() === dayjs(day).month()
}

const isThisYear = (day, dayjs) => {
  return dayjs().year() === dayjs(day).year()
}

const isLast7Days = (day, dayjs) => {
  return dayjs(day).isSameOrAfter(dayjs().subtract(7, 'd'))
}
const isLast30Days = (day, dayjs) => {
  return dayjs(day).isSameOrAfter(dayjs().subtract(30, 'd'))
}

const isLast3Months = (day, dayjs) => {
  return dayjs(day).isSameOrAfter(dayjs().subtract(3, 'M'))
}

const isLast6Months = (day, dayjs) => {
  return dayjs(day).isSameOrAfter(dayjs().subtract(6, 'M'))
}
const isLastYear = (day, dayjs) => {
  return dayjs(day).isSameOrAfter(dayjs().subtract(1, 'y'))
}
