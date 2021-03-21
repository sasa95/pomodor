import { useRef, useEffect } from 'react'

const useMounted = () => {
  const isMountRef = useRef(true)
  useEffect(() => {
    isMountRef.current = false
  }, [])
  return isMountRef.current
}

export default useMounted
