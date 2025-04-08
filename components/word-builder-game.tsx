"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Star, Trophy, BookOpen, Home, Volume2, VolumeX, Zap, User } from "lucide-react"
import GameStart from "./game-start"
import LevelSelect from "./level-select"
import GamePlay from "./game-play"
import GameComplete from "./game-complete"
import UserRegistration from "./user-registration"
import type { GameState, Difficulty, GameMode, UserData } from "@/types/game-types"
import { useGameData } from "@/hooks/use-game-data"
import { useSoundEffects } from "@/hooks/use-sound-effects"
import { useGameProgress } from "@/hooks/use-game-progress"

export default function WordBuilderGame() {
  const {
    userData,
    unlockedLevels,
    stars,
    score,
    currentLevel,
    difficulty,
    isLoaded,
    updateUserData,
    updateUnlockedLevels,
    updateScore,
    updateStars,
    updateCurrentLevel,
    updateDifficulty,
  } = useGameProgress()

  const [gameState, setGameState] = useState<GameState>("registration")
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [gameMode, setGameMode] = useState<GameMode>("story")
  const { toast } = useToast()
  const { getLevelData } = useGameData()
  const { playSound } = useSoundEffects(soundEnabled)
  const [localCurrentLevel, setLocalCurrentLevel] = useState(1)

  const totalLevels = 10

  // Debug function to check unlocked levels
  useEffect(() => {
    if (isLoaded) {
      console.log("Unlocked levels:", unlockedLevels)
    }
  }, [isLoaded, unlockedLevels])

  const handleUserRegistration = (data: UserData) => {
    updateUserData(data)
    setGameState("start")
    toast({
      title: "Welcome aboard!",
      description: `Great to have you with us, ${data.name}!`,
    })
  }

  const handleStartGame = () => {
    playSound("click")
    setGameState("level-select")
  }

  const handleSelectLevel = (level: number) => {
    playSound("click")
    setLocalCurrentLevel(level)
    updateCurrentLevel(level)
    setGameState("play")
  }

  const handleSelectDifficulty = (diff: Difficulty) => {
    playSound("click")
    updateDifficulty(diff)
    // Don't reset current level when changing difficulty
    // This allows players to keep their progress in each difficulty
  }

  const handleCompleteLevel = (earnedScore: number, earnedStars: number) => {
    playSound("success")
    const newScore = score + earnedScore
    const newStars = stars + earnedStars

    updateScore(newScore)
    updateStars(newStars)

    // Unlock the next level
    const nextLevel = localCurrentLevel + 1
    updateUnlockedLevels(difficulty, nextLevel)

    if (localCurrentLevel < totalLevels) {
      toast({
        title: "Level Complete!",
        description: `You earned ${earnedScore} points and ${earnedStars} stars!`,
      })

      // Update both local and stored current level
      setLocalCurrentLevel(nextLevel)
      updateCurrentLevel(nextLevel)

      // Return to level select to show progress
      setGameState("level-select")
    } else {
      setGameState("complete")
    }
  }

  const handleReturnHome = () => {
    playSound("click")
    setGameState("start")
  }

  const handleToggleSound = () => {
    setSoundEnabled((prev) => !prev)
  }

  const handleSelectGameMode = (mode: GameMode) => {
    playSound("click")
    setGameMode(mode)
  }

  useEffect(() => {
    // Log sound status on component mount
    console.log("Sound effects initialized, enabled:", soundEnabled)
  }, [soundEnabled])

  useEffect(() => {
    if (isLoaded && userData) {
      setGameState("start")
    }
  }, [isLoaded, userData])

  return (
    <div className="w-full max-w-4xl p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="border-0 bg-black/40 backdrop-blur-xl shadow-[0_0_30px_rgba(56,189,248,0.15)] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 pointer-events-none"></div>
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600"></div>

          <CardContent className="p-6 relative z-10">
            <header className="flex justify-between items-center mb-6">
              <motion.div
                className="flex items-center gap-2"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Zap className="h-6 w-6 text-cyan-400" />
                </motion.div>
                <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                  Word Builder Quest
                </h1>
              </motion.div>

              <motion.div
                className="flex items-center gap-4"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {userData && gameState !== "registration" && (
                  <Badge variant="outline" className="px-3 py-1 border-zinc-700 bg-zinc-900/50">
                    <User className="h-4 w-4 text-cyan-400 mr-1" />
                    <span className="text-zinc-300">{userData.name}</span>
                  </Badge>
                )}

                {gameState !== "start" && gameState !== "registration" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleReturnHome}
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                  >
                    <Home className="h-5 w-5" />
                  </Button>
                )}

                {gameState !== "registration" && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleToggleSound}
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                  >
                    {soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                  </Button>
                )}
              </motion.div>
            </header>

            {gameState !== "start" && gameState !== "complete" && gameState !== "registration" && (
              <motion.div
                className="mb-6 flex flex-col gap-2"
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="px-3 py-1 border-zinc-700 bg-zinc-900/50">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-zinc-300">{stars}</span>
                  </Badge>

                  <Badge variant="outline" className="px-3 py-1 border-zinc-700 bg-zinc-900/50">
                    <Trophy className="h-4 w-4 text-cyan-400 mr-1" />
                    <span className="text-zinc-300">{score} points</span>
                  </Badge>

                  <Badge variant="outline" className="px-3 py-1 border-zinc-700 bg-zinc-900/50">
                    <BookOpen className="h-4 w-4 text-emerald-400 mr-1" />
                    <span className="text-zinc-300">
                      Level {gameState === "play" ? localCurrentLevel : currentLevel}/{totalLevels}
                    </span>
                  </Badge>
                </div>

                <div className="relative h-2 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-500 to-blue-600"
                    initial={{ width: 0 }}
                    animate={{
                      width: `${((gameState === "play" ? localCurrentLevel : currentLevel) / totalLevels) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {gameState === "registration" && (
                <motion.div
                  key="registration"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <UserRegistration onComplete={handleUserRegistration} />
                </motion.div>
              )}

              {gameState === "start" && (
                <motion.div
                  key="start"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <GameStart
                    onStart={handleStartGame}
                    onSelectDifficulty={handleSelectDifficulty}
                    onSelectGameMode={handleSelectGameMode}
                    difficulty={difficulty}
                    gameMode={gameMode}
                    userName={userData?.name || "Player"}
                  />
                </motion.div>
              )}

              {gameState === "level-select" && (
                <motion.div
                  key="level-select"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <LevelSelect
                    difficulty={difficulty}
                    currentLevel={currentLevel}
                    totalLevels={totalLevels}
                    onSelectLevel={handleSelectLevel}
                    onSelectDifficulty={handleSelectDifficulty}
                    unlockedLevels={unlockedLevels}
                  />
                </motion.div>
              )}

              {gameState === "play" && (
                <motion.div
                  key="play"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <GamePlay
                    difficulty={difficulty}
                    level={localCurrentLevel}
                    onComplete={handleCompleteLevel}
                    gameMode={gameMode}
                    playSound={playSound}
                  />
                </motion.div>
              )}

              {gameState === "complete" && (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <GameComplete
                    score={score}
                    stars={stars}
                    difficulty={difficulty}
                    userName={userData?.name || "Player"}
                    onRestart={() => {
                      setGameState("start")
                      // Don't reset progress when completing the game
                      // This allows players to keep their achievements
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
