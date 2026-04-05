'use client'

import { useEffect, useState } from 'react'

type CounterDemoProps = {
  expanded?: boolean
}

export function CounterDemo({ expanded = false }: CounterDemoProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCount((current) => current + 1)
    }, 1000)

    return () => {
      window.clearInterval(timer)
    }
  }, [])

  return (
    <div className={`counter-demo ${expanded ? 'counter-demo-expanded' : ''}`}>
      <span className="eyebrow">State persistence demo</span>
      <strong>{count}</strong>
      <p>The same running instance should keep counting while you enter and exit fullscreen.</p>
    </div>
  )
}
