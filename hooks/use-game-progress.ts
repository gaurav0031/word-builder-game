"use client"

import { useState, useEffect } from "react"
import type { Difficulty, UserData } from "@/types/game-types"

interface GameProgress {
  userData: UserData | null
  unlockedLevels: Record<Difficulty, number>
  stars: number
  score: number
  currentLevel: number
  difficulty: Difficulty
}

const defaultProgress: GameProgress = {
  userData: null,
  unlockedLevels: {
    easy: 1, // Level 1 is always unlocked by default
    medium: 1, // Level 1 is always unlocked by default
    hard: 1, // Level 1 is always unlocked by default
  },
  stars: 0,
  score: 0,
  currentLevel: 1,
  difficulty: "easy",
}

export function useGameProgress() {
  const [progress, setProgress] = useState<GameProgress>(defaultProgress)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load progress from localStorage on mount
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem("wordBuilderProgress")
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress)

        // Ensure level 1 is always unlocked for all difficulties
        const ensuredProgress = {
          ...parsed,
          unlockedLevels: {
            easy: Math.max(1, parsed.unlockedLevels?.easy || 1),
            medium: Math.max(1, parsed.unlockedLevels?.medium || 1),
            hard: Math.max(1, parsed.unlockedLevels?.hard || 1),
          },
        }

        setProgress(ensuredProgress)
      }
      setIsLoaded(true)
    } catch (error) {
      console.error("Failed to load game progress:", error)
      setIsLoaded(true)
    }
  }, [])

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("wordBuilderProgress", JSON.stringify(progress))
      } catch (error) {
        console.error("Failed to save game progress:", error)
      }
    }
  }, [progress, isLoaded])

  const updateUserData = (userData: UserData) => {
    setProgress((prev) => ({
      ...prev,
      userData,
    }))
  }

  const updateUnlockedLevels = (difficulty: Difficulty, level: number) => {
    setProgress((prev) => {
      const currentUnlocked = prev.unlockedLevels[difficulty]
      if (level <= currentUnlocked) return prev

      return {
        ...prev,
        unlockedLevels: {
          ...prev.unlockedLevels,
          [difficulty]: level,
        },
      }
    })
  }

  const updateScore = (newScore: number) => {
    setProgress((prev) => ({
      ...prev,
      score: newScore,
    }))
  }

  const updateStars = (newStars: number) => {
    setProgress((prev) => ({
      ...prev,
      stars: newStars,
    }))
  }

  const updateCurrentLevel = (level: number) => {
    setProgress((prev) => ({
      ...prev,
      currentLevel: level,
    }))
  }

  const updateDifficulty = (difficulty: Difficulty) => {
    setProgress((prev) => ({
      ...prev,
      difficulty,
    }))
  }

  const resetProgress = () => {
    setProgress(defaultProgress)
  }

  return {
    ...progress,
    isLoaded,
    updateUserData,
    updateUnlockedLevels,
    updateScore,
    updateStars,
    updateCurrentLevel,
    updateDifficulty,
    resetProgress,
  }
}
