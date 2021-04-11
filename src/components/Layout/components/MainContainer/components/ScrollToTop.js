import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export const ScrollToTop = ({ container }) => {
  const { pathname } = useLocation()

  useEffect(() => {
    container.current.scrollTo(0, 0)
  }, [container, pathname])

  return null
}
