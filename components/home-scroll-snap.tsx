'use client'

import { useEffect, useRef } from 'react'

const DURATION = 900 // ms — increase for even smoother feel
const WHEEL_THRESHOLD = 30 // min deltaY to trigger snap

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function animateScrollTo(targetY: number, duration: number, onDone: () => void) {
  const startY = window.scrollY
  const diff = targetY - startY
  if (Math.abs(diff) < 1) { onDone(); return }
  const startTime = performance.now()

  function step(now: number) {
    const t = Math.min((now - startTime) / duration, 1)
    window.scrollTo(0, startY + diff * easeInOutCubic(t))
    if (t < 1) {
      requestAnimationFrame(step)
    } else {
      onDone()
    }
  }

  requestAnimationFrame(step)
}

export function HomeScrollSnap() {
  const animating = useRef(false)
  const lastSection = useRef(0)

  useEffect(() => {
    const sectionIds = ['hero', 'projects']

    function getSectionTops() {
      return sectionIds.map((id) => {
        const el = document.getElementById(id)
        return el ? el.getBoundingClientRect().top + window.scrollY : 0
      })
    }

    function getCurrentIndex(tops: number[]) {
      const mid = window.scrollY + window.innerHeight / 2
      let idx = 0
      for (let i = 0; i < tops.length; i++) {
        if (tops[i] <= mid) idx = i
      }
      return idx
    }

    function handleWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD) return

      const tops = getSectionTops()
      const currentIdx = getCurrentIndex(tops)
      const direction = e.deltaY > 0 ? 1 : -1
      const targetIdx = Math.max(0, Math.min(currentIdx + direction, tops.length - 1))

      if (targetIdx === currentIdx && targetIdx === lastSection.current && animating.current) {
        e.preventDefault()
        return
      }

      if (targetIdx === currentIdx) return

      e.preventDefault()
      if (animating.current) return

      animating.current = true
      lastSection.current = targetIdx
      animateScrollTo(tops[targetIdx], DURATION, () => {
        animating.current = false
      })
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  return null
}
