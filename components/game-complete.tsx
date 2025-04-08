"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sparkles, Star, Trophy, Home, Share2, Award } from "lucide-react"
import type { Difficulty } from "@/types/game-types"
import confetti from "canvas-confetti"
import { useEffect } from "react"

interface GameCompleteProps {
  score: number
  stars: number
  difficulty: Difficulty
  userName: string
  onRestart: () => void
}

export default function GameComplete({ score, stars, difficulty, userName, onRestart }: GameCompleteProps) {
  useEffect(() => {
    // Trigger confetti when component mounts
    const duration = 5 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: any = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  const getAchievementMessage = () => {
    if (stars >= 25) return "Vocabulary Master"
    if (stars >= 15) return "Word Hacker"
    if (stars >= 10) return "Cyber Linguist"
    return "Novice Explorer"
  }

  const getDifficultyBonus = () => {
    switch (difficulty) {
      case "easy":
        return 1
      case "medium":
        return 1.5
      case "hard":
        return 2
      default:
        return 1
    }
  }

  const finalScore = Math.floor(score * getDifficultyBonus())

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 mb-2">
          Mission Complete!
        </h1>
        <div className="flex items-center gap-2 text-xl text-zinc-300">
          <Sparkles className="h-6 w-6 text-yellow-500" />
          <span>Congratulations, {userName}!</span>
          <Sparkles className="h-6 w-6 text-yellow-500" />
        </div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full"
      >
        <Card className="border border-zinc-800 bg-black/50 backdrop-blur-xl shadow-[0_0_15px_rgba(56,189,248,0.15)]">
          <CardContent className="p-6 flex flex-col items-center gap-6">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-1 text-cyan-400">Your Results</h2>
              <p className="text-zinc-400">You've completed the {difficulty} difficulty!</p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full">
              <motion.div
                className="flex flex-col items-center p-4 bg-zinc-900/50 rounded-lg shadow-sm border border-zinc-800"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Trophy className="h-8 w-8 text-cyan-400 mb-2" />
                <motion.div
                  className="text-3xl font-bold text-zinc-300"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.7,
                  }}
                >
                  {finalScore}
                </motion.div>
                <div className="text-sm text-zinc-500">Total Score</div>
              </motion.div>

              <motion.div
                className="flex flex-col items-center p-4 bg-zinc-900/50 rounded-lg shadow-sm border border-zinc-800"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <Star className="h-8 w-8 text-yellow-500 fill-yellow-500 mb-2" />
                <motion.div
                  className="text-3xl font-bold text-zinc-300"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.7,
                  }}
                >
                  {stars}
                </motion.div>
                <div className="text-sm text-zinc-500">Stars Earned</div>
              </motion.div>
            </div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="relative"
            >
              <Badge className="px-4 py-2 text-lg bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-0">
                <Award className="h-4 w-4 mr-2" />
                {getAchievementMessage()}
              </Badge>
              <motion.div
                className="absolute -z-10 inset-0 bg-cyan-500/20 blur-xl rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
              />
            </motion.div>

            <motion.div
              className="text-center text-sm text-zinc-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <p>You've expanded your vocabulary and improved your word-building skills!</p>
              <p>Keep playing to unlock more levels and learn new words.</p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.5 }}
        className="flex gap-4"
      >
        <Button
          variant="outline"
          size="lg"
          onClick={onRestart}
          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
        >
          <Home className="mr-2 h-5 w-5" />
          Return Home
        </Button>

        <Button
          size="lg"
          onClick={() => {
            try {
              navigator.share({
                title: "Word Builder Quest",
                text: `I scored ${finalScore} points and earned ${stars} stars in Word Builder Quest!`,
              })
            } catch (err) {
              alert("Sharing is not available on this device")
            }
          }}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-[0_0_15px_rgba(56,189,248,0.5)] border-0"
        >
          <Share2 className="mr-2 h-5 w-5" />
          Share Results
        </Button>
      </motion.div>
    </div>
  )
}
