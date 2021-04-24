import React from 'react'
import { useSelector } from 'react-redux'

export const MenuIcon = () => {
  const darkMode = useSelector((state) => +state.settings.darkMode)
  const darkModeCached = +JSON.parse(localStorage.getItem('darkMode'))
  const color = darkMode || darkModeCached ? '#fff' : '#121212'

  return (
    <svg
      width="24"
      height="16"
      viewBox="0 0 24 16"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 16H24V13.3333H0V16ZM0 9.33333H24V6.66667H0V9.33333ZM0 0V2.66667H24V0H0Z"
        fill={color}
      />
    </svg>
  )
}
