"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle, HelpCircle, RefreshCw, ArrowRight, Star, Clock, Shield } from "lucide-react"
import type { Difficulty, GameMode } from "@/types/game-types"
import { useGameData } from "@/hooks/use-game-data"
import { ConfettiEffect } from "./confetti-effect"

interface GamePlayProps {
  difficulty: Difficulty
  level: number
  gameMode: GameMode
  onComplete: (score: number, stars: number) => void
  playSound: (sound: string) => void
}

export default function GamePlay({ difficulty, level, gameMode, onComplete, playSound }: GamePlayProps) {
  const { getLevelData } = useGameData()
  const levelData = getLevelData(difficulty, level)

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [selectedLetters, setSelectedLetters] = useState<string[]>([])
  const [availableLetters, setAvailableLetters] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [hints, setHints] = useState(3)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(60)
  const [stars, setStars] = useState(0)
  const [showStory, setShowStory] = useState(gameMode === "story")
  const [timerActive, setTimerActive] = useState(false)
  const [letterAnimation, setLetterAnimation] = useState<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const currentWord = levelData.words[currentWordIndex]
  const totalWords = levelData.words.length

  // Initialize the game
  useEffect(() => {
    if (currentWord) {
      setIsLoading(true)
      // Simulate loading time for better UX
      const timer = setTimeout(() => {
        resetWordState()
        setIsLoading(false)
      }, 500)

      return () => clearTimeout(timer)
    }

    // Start timer
    if (!showStory && !isLoading) {
      setTimerActive(true)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [currentWord, showStory])

  // Add a console log to help debug the current level's words
  useEffect(() => {
    console.log(`Loading level ${level} words for difficulty ${difficulty}:`, levelData.words)
  }, [level, difficulty, levelData])

  // Handle timer
  useEffect(() => {
    if (timerActive) {
      startTimer()
    } else if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [timerActive])

  const startTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    if (timeLeft === 0) {
      setTimeLeft(getDifficultyTime())
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          setTimerActive(false)
          handleTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const getDifficultyTime = () => {
    switch (difficulty) {
      case "easy":
        return 60
      case "medium":
        return 45
      case "hard":
        return 30
      default:
        return 60
    }
  }

  const handleTimeUp = () => {
    playSound("wrong")
    nextWord(false)
  }

  const resetWordState = () => {
    // Create scrambled letters
    if (!currentWord) return // Guard clause to prevent errors

    const wordLetters = currentWord.word.split("")
    const extraLetters = getExtraLetters(difficulty, wordLetters.length)
    const allLetters = [...wordLetters, ...extraLetters]

    // Shuffle letters
    const shuffled = allLetters.sort(() => Math.random() - 0.5)

    setSelectedLetters([])
    setAvailableLetters(shuffled)
    setIsCorrect(null)

    // Reset timer if it was previously stopped
    if (!timerActive && !showStory) {
      setTimeLeft(getDifficultyTime())
      setTimerActive(true)
    }
  }

  const getExtraLetters = (diff: Difficulty, wordLength: number): string[] => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    const extraCount = diff === "easy" ? 2 : diff === "medium" ? 4 : 6

    return Array.from({ length: extraCount }, () => {
      return alphabet[Math.floor(Math.random() * alphabet.length)]
    })
  }

  const handleLetterClick = (letter: string, index: number) => {
    playSound("click")

    // Set animation for the clicked letter
    setLetterAnimation(index)
    setTimeout(() => setLetterAnimation(null), 300)

    // Remove from available and add to selected
    const newAvailable = [...availableLetters]
    newAvailable.splice(index, 1)

    setAvailableLetters(newAvailable)
    setSelectedLetters([...selectedLetters, letter])
  }

  const handleSelectedLetterClick = (letter: string, index: number) => {
    playSound("click")

    // Remove from selected and add back to available
    const newSelected = [...selectedLetters]
    newSelected.splice(index, 1)

    setSelectedLetters(newSelected)
    setAvailableLetters([...availableLetters, letter])
  }

  const handleCheck = () => {
    // Stop the timer when checking answer
    setTimerActive(false)

    const userWord = selectedLetters.join("")
    const isWordCorrect = userWord.toLowerCase() === currentWord.word.toLowerCase()

    setIsCorrect(isWordCorrect)

    if (isWordCorrect) {
      playSound("correct")

      // Show confetti for correct answer
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)

      const wordScore = calculateWordScore()
      setScore((prev) => prev + wordScore)
    } else {
      playSound("wrong")
    }
  }

  const calculateWordScore = () => {
    const baseScore = difficulty === "easy" ? 10 : difficulty === "medium" ? 20 : 30
    const timeBonus = Math.floor(timeLeft / 5)
    return baseScore + timeBonus
  }

  const handleUseHint = () => {
    if (hints <= 0) return

    playSound("hint")
    setHints((prev) => prev - 1)

    // Find the correct next letter
    const currentUserWord = selectedLetters.join("")
    const targetWord = currentWord.word.toLowerCase()

    if (currentUserWord.length < targetWord.length) {
      const nextCorrectLetter = targetWord[currentUserWord.length]

      // Find this letter in available letters
      const letterIndex = availableLetters.findIndex((l) => l.toLowerCase() === nextCorrectLetter)

      if (letterIndex !== -1) {
        handleLetterClick(availableLetters[letterIndex], letterIndex)
      }
    }
  }

  const handleReset = () => {
    playSound("click")

    // Put all selected letters back to available
    setAvailableLetters([...availableLetters, ...selectedLetters])
    setSelectedLetters([])
    setIsCorrect(null)
  }

  const nextWord = (wasCorrect: boolean) => {
    // Start the timer for the next word
    setTimerActive(true)

    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    // Calculate stars for this word
    if (wasCorrect) {
      const wordStars = calculateWordStars()
      setStars((prev) => prev + wordStars)
    }

    // Check if we've completed enough words to advance
    const requiredCorrectWords = 4 // User needs 4 out of 5 correct to advance
    const isLastWord = currentWordIndex >= totalWords - 1
    const shouldAdvance =
      wasCorrect &&
      (isLastWord || // Last word completed correctly
        currentWordIndex >= requiredCorrectWords - 1) // At least 4 words completed correctly

    if (shouldAdvance) {
      // Level complete - advance to next level
      onComplete(score, stars)
    } else if (currentWordIndex < totalWords - 1) {
      // Move to next word in current level
      setCurrentWordIndex((prev) => prev + 1)
      setIsCorrect(null)
      setTimeLeft(getDifficultyTime())
    } else {
      // Failed to get enough correct, but reached end - retry level
      setCurrentWordIndex(0)
      setIsCorrect(null)
      setTimeLeft(getDifficultyTime())
      // Optional: Show a message that they need to try again
    }
  }

  const calculateWordStars = () => {
    if (timeLeft > getDifficultyTime() * 0.7) return 3
    if (timeLeft > getDifficultyTime() * 0.4) return 2
    return 1
  }

  const handleContinueStory = () => {
    playSound("click")
    setShowStory(false)
    setTimerActive(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <AnimatePresence mode="wait">
        {showStory ? (
          <motion.div
            key="story"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            <Card className="border border-zinc-800 bg-black/50 backdrop-blur-xl shadow-[0_0_15px_rgba(56,189,248,0.15)]">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-cyan-400">{levelData.title}</h2>
                <p className="text-zinc-400 mb-4">{levelData.story}</p>
                <p className="text-sm font-medium text-zinc-300">
                  In this level, you'll learn about: <span className="text-cyan-400">{levelData.lesson}</span>
                </p>
              </CardContent>
            </Card>

            <Button
              onClick={handleContinueStory}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-[0_0_15px_rgba(56,189,248,0.5)] border-0"
            >
              Start Building Words
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="gameplay"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-4"
          >
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-12"
              >
                <div className="w-12 h-12 border-4 border-zinc-700 border-t-cyan-500 rounded-full animate-spin"></div>
                <p className="mt-4 text-zinc-400">Loading next word...</p>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="px-3 py-1 border-zinc-700 bg-zinc-900/50">
                    <Shield className="h-4 w-4 text-cyan-400 mr-1" />
                    <span className="text-zinc-300">Hints: {hints}</span>
                  </Badge>

                  <motion.div
                    animate={{
                      scale: timeLeft <= 10 && timerActive ? [1, 1.1, 1] : 1,
                    }}
                    transition={{
                      repeat: timeLeft <= 10 && timerActive ? Number.POSITIVE_INFINITY : 0,
                      duration: 0.5,
                    }}
                  >
                    <Badge
                      variant="outline"
                      className={`px-3 py-1 border-zinc-700 bg-zinc-900/50 ${timeLeft <= 10 ? "border-red-500/50" : ""}`}
                    >
                      <Clock className={`h-4 w-4 mr-1 ${timeLeft <= 10 ? "text-red-500" : "text-red-400"}`} />
                      <span className={timeLeft <= 10 ? "text-red-400" : "text-zinc-300"}>Time: {timeLeft}s</span>
                    </Badge>
                  </motion.div>
                </div>

                <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`absolute top-0 left-0 h-full ${
                      timeLeft <= 10
                        ? "bg-gradient-to-r from-red-500 to-orange-500"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600"
                    }`}
                    initial={{ width: "100%" }}
                    animate={{ width: `${(timeLeft / getDifficultyTime()) * 100}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-medium text-zinc-300">
                    Word {currentWordIndex + 1} of {totalWords}
                  </h3>
                  <p className="text-zinc-400">{currentWord.hint}</p>
                </div>

                <Card className="border border-zinc-800 bg-black/50 backdrop-blur-xl shadow-[0_0_15px_rgba(56,189,248,0.15)]">
                  <CardContent className="p-4 flex flex-col items-center">
                    {currentWord && currentWord.image && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="h-32 w-full flex items-center justify-center"
                      >
                        <img
                          src={currentWord.image || "/placeholder.svg"}
                          alt={currentWord.word}
                          className="h-32 object-contain rounded-lg border border-zinc-800 p-2 bg-zinc-900/50"
                          onError={(e) => {
                            // Fallback to placeholder if image fails to load
                            e.currentTarget.src = `/placeholder.svg?height=300&width=300`
                            console.error(`Failed to load image for word: ${currentWord.word}`)
                          }}
                        />
                      </motion.div>
                    )}

                    <div className="flex gap-2 flex-wrap justify-center mb-6 min-h-[60px]">
                      {selectedLetters.length === 0 ? (
                        <div className="text-zinc-500 text-sm italic">Select letters to build your word</div>
                      ) : (
                        selectedLetters.map((letter, index) => (
                          <motion.button
                            key={`selected-${index}`}
                            initial={{ scale: 0.8 }}
                            animate={{
                              scale: 1,
                              boxShadow:
                                isCorrect === true
                                  ? [
                                      "0 0 0px rgba(34, 197, 94, 0)",
                                      "0 0 20px rgba(34, 197, 94, 0.7)",
                                      "0 0 0px rgba(34, 197, 94, 0)",
                                    ]
                                  : isCorrect === false
                                    ? [
                                        "0 0 0px rgba(239, 68, 68, 0)",
                                        "0 0 20px rgba(239, 68, 68, 0.7)",
                                        "0 0 0px rgba(239, 68, 68, 0)",
                                      ]
                                    : "0 0 0px rgba(59, 130, 246, 0)",
                            }}
                            transition={{
                              boxShadow: { repeat: isCorrect !== null ? 3 : 0, duration: 1 },
                            }}
                            className={`w-12 h-12 rounded-md flex items-center justify-center font-bold text-lg
                              ${
                                isCorrect === true
                                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                                  : isCorrect === false
                                    ? "bg-gradient-to-r from-red-500 to-rose-600 text-white"
                                    : "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                              } shadow-[0_0_10px_rgba(56,189,248,0.3)]`}
                            onClick={() => isCorrect === null && handleSelectedLetterClick(letter, index)}
                            disabled={isCorrect !== null}
                          >
                            {letter.toUpperCase()}
                          </motion.button>
                        ))
                      )}
                    </div>

                    <div className="flex gap-2 flex-wrap justify-center mb-6">
                      {availableLetters.map((letter, index) => (
                        <motion.button
                          key={`available-${index}`}
                          initial={{ scale: 0.8 }}
                          animate={{
                            scale: letterAnimation === index ? [1, 1.2, 1] : 1,
                            boxShadow:
                              letterAnimation === index
                                ? [
                                    "0 0 0px rgba(59, 130, 246, 0)",
                                    "0 0 15px rgba(59, 130, 246, 0.7)",
                                    "0 0 0px rgba(59, 130, 246, 0)",
                                  ]
                                : "0 0 0px rgba(59, 130, 246, 0)",
                          }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{
                            scale: { duration: 0.3 },
                            boxShadow: { duration: 0.3 },
                          }}
                          className="w-12 h-12 rounded-md bg-zinc-800 text-zinc-300 flex items-center justify-center font-bold text-lg hover:bg-zinc-700 border border-zinc-700"
                          onClick={() => handleLetterClick(letter, index)}
                          disabled={isCorrect !== null}
                        >
                          {letter.toUpperCase()}
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex gap-2 justify-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                        disabled={selectedLetters.length === 0 || isCorrect !== null}
                        className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Reset
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleUseHint}
                        disabled={hints <= 0 || isCorrect !== null}
                        className="border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                      >
                        <HelpCircle className="h-4 w-4 mr-1" />
                        Hint
                      </Button>

                      <Button
                        size="sm"
                        onClick={handleCheck}
                        disabled={selectedLetters.length === 0 || isCorrect !== null}
                        className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-[0_0_10px_rgba(56,189,248,0.3)] border-0"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Check
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {isCorrect !== null && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div
                      className={`flex items-center gap-2 font-medium ${isCorrect ? "text-green-500" : "text-red-500"}`}
                    >
                      {isCorrect ? (
                        <>
                          <CheckCircle className="h-5 w-5" />
                          <span>Correct! Great job!</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="h-5 w-5" />
                          <span>Not quite right. The correct word is: {currentWord.word}</span>
                        </>
                      )}
                    </div>

                    {isCorrect && (
                      <motion.div
                        className="flex items-center gap-1"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 260,
                          damping: 20,
                          delay: 0.1,
                        }}
                      >
                        {Array.from({ length: calculateWordStars() }).map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ rotate: -30, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ delay: 0.1 + i * 0.1 }}
                          >
                            <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}

                    <Button
                      onClick={() => nextWord(isCorrect)}
                      className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-[0_0_15px_rgba(56,189,248,0.5)] border-0"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {/* Add confetti effect */}
      <ConfettiEffect active={showConfetti} />
    </div>
  )
}
