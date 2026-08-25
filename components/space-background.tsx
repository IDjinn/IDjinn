'use client'

import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  z: number
  pz: number
}

const MAX_SPEED = 8
const STAR_COUNT = 400
const RAMP_DURATION = 3500 // ms to reach full speed

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let width = window.innerWidth
    let height = window.innerHeight
    let cx = width / 2
    let cy = height / 2
    const startTime = performance.now()

    canvas.width = width
    canvas.height = height

    const stars: Star[] = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width - cx,
      y: Math.random() * height - cy,
      z: Math.random() * width,
      pz: 0,
    }))

    function resetStar(star: Star) {
      star.x = Math.random() * width - cx
      star.y = Math.random() * height - cy
      star.z = width
      star.pz = star.z
    }

    function easeInQuad(t: number) {
      return t * t
    }

    function draw(now: number) {
      const elapsed = now - startTime
      const t = Math.min(elapsed / RAMP_DURATION, 1)
      const speed = MAX_SPEED * easeInQuad(t)

      ctx!.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx!.fillRect(0, 0, width, height)

      for (const star of stars) {
        star.pz = star.z
        star.z -= speed

        if (star.z <= 0) {
          resetStar(star)
          continue
        }

        const sx = (star.x / star.z) * width + cx
        const sy = (star.y / star.z) * height + cy
        const px = (star.x / star.pz) * width + cx
        const py = (star.y / star.pz) * height + cy

        if (sx < 0 || sx > width || sy < 0 || sy > height) {
          resetStar(star)
          continue
        }

        const size = Math.max(0.5, (1 - star.z / width) * 3)
        const opacity = 1 - star.z / width

        ctx!.beginPath()
        ctx!.strokeStyle = `rgba(255, 255, 255, ${opacity})`
        ctx!.lineWidth = size
        ctx!.moveTo(px, py)
        ctx!.lineTo(sx, sy)
        ctx!.stroke()
      }

      animationId = requestAnimationFrame(draw)
    }

    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, width, height)
    animationId = requestAnimationFrame(draw)

    const handleResize = () => {
      width = window.innerWidth
      height = window.innerHeight
      cx = width / 2
      cy = height / 2
      canvas.width = width
      canvas.height = height
      ctx.fillStyle = 'black'
      ctx.fillRect(0, 0, width, height)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 h-full w-full"
      aria-hidden="true"
    />
  )
}
