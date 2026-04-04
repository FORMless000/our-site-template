'use client'

import { useEffect, useRef } from 'react'

type SignalStageProps = {
  height?: number
}

export function SignalStage({ height = 420 }: SignalStageProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext('2d')
    if (!context) {
      return
    }

    let animationFrame = 0
    let frame = 0

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      const ratio = window.devicePixelRatio || 1

      canvas.width = bounds.width * ratio
      canvas.height = bounds.height * ratio
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
    }

    const render = () => {
      const width = canvas.clientWidth
      const currentHeight = canvas.clientHeight

      context.clearRect(0, 0, width, currentHeight)
      context.fillStyle = '#07131f'
      context.fillRect(0, 0, width, currentHeight)

      for (let index = 0; index < 48; index += 1) {
        const angle = frame * 0.016 + index * 0.21
        const radius = 30 + index * 5.8
        const x = width * 0.48 + Math.cos(angle) * radius
        const y = currentHeight * 0.48 + Math.sin(angle * 1.35) * radius * 0.54
        const size = 5 + ((index % 6) + 1) * 1.7
        const hue = 172 + (index % 8) * 7

        context.beginPath()
        context.fillStyle = `hsla(${hue}, 88%, 64%, 0.12)`
        context.arc(x, y, size * 2.4, 0, Math.PI * 2)
        context.fill()

        context.beginPath()
        context.fillStyle = `hsla(${hue}, 92%, 74%, 0.78)`
        context.arc(x, y, size, 0, Math.PI * 2)
        context.fill()
      }

      context.strokeStyle = 'rgba(245, 158, 11, 0.28)'
      context.lineWidth = 1.2
      context.beginPath()
      context.moveTo(width * 0.08, currentHeight * 0.7)
      context.bezierCurveTo(
        width * 0.25,
        currentHeight * 0.15,
        width * 0.68,
        currentHeight * 0.82,
        width * 0.92,
        currentHeight * 0.26,
      )
      context.stroke()

      context.strokeStyle = 'rgba(94, 234, 212, 0.2)'
      context.beginPath()
      context.moveTo(width * 0.14, currentHeight * 0.16)
      context.bezierCurveTo(
        width * 0.34,
        currentHeight * 0.88,
        width * 0.66,
        currentHeight * 0.08,
        width * 0.88,
        currentHeight * 0.72,
      )
      context.stroke()

      frame += 1
      animationFrame = window.requestAnimationFrame(render)
    }

    resize()
    render()
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div className="signal-stage" style={{ height }}>
      <canvas ref={canvasRef} />
    </div>
  )
}
