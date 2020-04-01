import { useState, useEffect } from 'react'

const useMounted = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])
  return isMounted
}

export default useMounted
