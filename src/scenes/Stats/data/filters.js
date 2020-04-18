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

export const isThisWeek = (day, dayjs) => {
  return dayjs().week() === dayjs(day).week()
}

export const isThisMonth = (day, dayjs) => {
  return dayjs().month() === dayjs(day).month()
}

export const isThisYear = (day, dayjs) => {
  return dayjs().year() === dayjs(day).year()
}

export const isLast7Days = (day, dayjs) => {
  return dayjs(day).isSameOrAfter(dayjs().subtract(7, 'd'))
}
export const isLast30Days = (day, dayjs) => {
  return dayjs(day).isSameOrAfter(dayjs().subtract(30, 'd'))
}

export const isLast3Months = (day, dayjs) => {
  return dayjs(day).isSameOrAfter(dayjs().subtract(3, 'M'))
}

export const isLast6Months = (day, dayjs) => {
  return dayjs(day).isSameOrAfter(dayjs().subtract(6, 'M'))
}
export const isLastYear = (day, dayjs) => {
  return dayjs(day).isSameOrAfter(dayjs().subtract(1, 'y'))
}
