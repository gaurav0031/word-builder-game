"use client"

import { useEffect, useRef } from "react"
import confetti from "canvas-confetti"

interface ConfettiEffectProps {
  active: boolean
  duration?: number
}

export function ConfettiEffect({ active, duration = 3000 }: ConfettiEffectProps) {
  const activeRef = useRef(active)

  useEffect(() => {
    activeRef.current = active
  }, [active])

  useEffect(() => {
    if (!active) return

    // Use a more reliable approach for confetti
    const runConfetti = () => {
      const count = 200
      const defaults = {
        origin: { y: 0.7 },
        zIndex: 5000,
      }

      function fire(particleRatio: number, opts: any) {
        confetti({
          ...defaults,
          ...opts,
          particleCount: Math.floor(count * particleRatio),
        })
      }

      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      })

      fire(0.2, {
        spread: 60,
      })

      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      })

      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      })

      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      })
    }

    // Run confetti immediately
    runConfetti()

    // Run again after a short delay to ensure it works
    const timer = setTimeout(() => {
      if (activeRef.current) {
        runConfetti()
      }
    }, 300)

    return () => {
      clearTimeout(timer)
      activeRef.current = false
    }
  }, [active])

  return null
}
