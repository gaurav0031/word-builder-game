"use client"

import { useCallback, useEffect, useRef } from "react"

export function useSoundEffects(enabled = true) {
  const soundsRef = useRef<Record<string, HTMLAudioElement | null>>({})

  useEffect(() => {
    // Create empty sound objects with error handling
    try {
      // Define sound types
      const soundTypes = ["click", "correct", "wrong", "success", "hint"]

      // Initialize with null values
      const sounds: Record<string, HTMLAudioElement | null> = {}
      soundTypes.forEach((type) => {
        sounds[type] = null
      })

      // Only try to create audio objects if we're in a browser environment
      if (typeof window !== "undefined" && typeof Audio !== "undefined") {
        // Create audio objects with error handling
        soundTypes.forEach((type) => {
          try {
            const audio = new Audio()
            // Set audio properties but don't set src yet
            audio.volume = 0.5
            sounds[type] = audio
          } catch (e) {
            console.warn(`Could not create audio for ${type}:`, e)
            sounds[type] = null
          }
        })
      }

      soundsRef.current = sounds
    } catch (e) {
      console.warn("Error initializing sound effects:", e)
    }

    // Clean up
    return () => {
      Object.values(soundsRef.current).forEach((sound) => {
        if (sound) {
          try {
            sound.pause()
            sound.currentTime = 0
          } catch (e) {
            console.warn("Error cleaning up sound:", e)
          }
        }
      })
    }
  }, [])

  const playSound = useCallback(
    (sound: string) => {
      if (!enabled) return

      try {
        // Use console feedback instead of actual sounds
        console.log(`Playing sound: ${sound}`)

        // If we have a valid audio object, we could try to play it
        // But for now, we'll just simulate the sound effect
        const audio = soundsRef.current[sound]
        if (audio) {
          // Instead of trying to play the audio file, we'll just log it
          // This prevents the error while still providing feedback
          // audio.play().catch(e => console.error('Error playing sound:', e));
        }
      } catch (e) {
        console.warn(`Error with sound "${sound}":`, e)
      }
    },
    [enabled],
  )

  return { playSound }
}
