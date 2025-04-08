"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Brain, Sparkles, Rocket, RefreshCw } from "lucide-react"
import type { Difficulty, GameMode } from "@/types/game-types"
import { useGameProgress } from "@/hooks/use-game-progress"

interface GameStartProps {
  onStart: () => void
  onSelectDifficulty: (difficulty: Difficulty) => void
  onSelectGameMode: (mode: GameMode) => void
  difficulty: Difficulty
  gameMode: GameMode
  userName: string
}

export default function GameStart({
  onStart,
  onSelectDifficulty,
  onSelectGameMode,
  difficulty,
  gameMode,
  userName,
}: GameStartProps) {
  const { resetProgress } = useGameProgress()

  return (
    <div className="flex flex-col items-center gap-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          Welcome, {userName}!
        </h1>
        <p className="text-zinc-400 mt-2 max-w-md">
          Prepare to embark on a cyberpunk vocabulary adventure. Build words, unlock achievements, and become a language
          master!
        </p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full"
      >
        <Card className="border border-zinc-800 bg-black/50 backdrop-blur-xl shadow-[0_0_15px_rgba(56,189,248,0.15)]">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-cyan-400">Game Settings</h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2 text-zinc-400">Select Difficulty:</h3>
                <Tabs
                  defaultValue={difficulty}
                  onValueChange={(value) => onSelectDifficulty(value as Difficulty)}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-3 w-full bg-zinc-900/50 p-1">
                    <TabsTrigger
                      value="easy"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                    >
                      Easy
                    </TabsTrigger>
                    <TabsTrigger
                      value="medium"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                    >
                      Medium
                    </TabsTrigger>
                    <TabsTrigger
                      value="hard"
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                    >
                      Hard
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 text-zinc-400">Select Game Mode:</h3>
                <Tabs
                  defaultValue={gameMode}
                  onValueChange={(value) => onSelectGameMode(value as GameMode)}
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-2 w-full bg-zinc-900/50 p-1">
                    <TabsTrigger
                      value="story"
                      className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                    >
                      <BookOpen className="h-4 w-4" />
                      <span>Story Mode</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="practice"
                      className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-600 data-[state=active]:text-white"
                    >
                      <Brain className="h-4 w-4" />
                      <span>Practice Mode</span>
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative"
      >
        <Button
          size="lg"
          onClick={onStart}
          className="px-8 py-6 text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white shadow-[0_0_15px_rgba(56,189,248,0.5)] border-0"
        >
          <Rocket className="mr-2 h-5 w-5" />
          Launch Adventure
          <Sparkles className="ml-2 h-5 w-5 text-yellow-300" />
        </Button>

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

      {/* Debug button to reset progress - can be removed in production */}
      <div className="mt-4 text-xs text-zinc-500">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm("Are you sure you want to reset all game progress? This cannot be undone.")) {
              resetProgress()
              window.location.reload()
            }
          }}
          className="text-zinc-500 hover:text-zinc-300"
        >
          <RefreshCw className="h-3 w-3 mr-1" />
          Reset Progress
        </Button>
      </div>
    </div>
  )
}
