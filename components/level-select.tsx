"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lock, Star } from "lucide-react"
import type { Difficulty } from "@/types/game-types"
import { useEffect } from "react"

interface LevelSelectProps {
  difficulty: Difficulty
  currentLevel: number
  totalLevels: number
  unlockedLevels: number
  onSelectLevel: (level: number) => void
  onSelectDifficulty: (difficulty: Difficulty) => void
}

export default function LevelSelect({
  difficulty,
  currentLevel,
  totalLevels,
  unlockedLevels,
  onSelectLevel,
  onSelectDifficulty,
}: LevelSelectProps) {
  const levelThemes = {
    easy: [
      "Farm Animals",
      "Colors",
      "Fruits",
      "Family",
      "School Items",
      "Body Parts",
      "Weather",
      "Clothing",
      "Numbers",
      "Shapes",
    ],
    medium: [
      "Ocean Life",
      "Space Adventure",
      "Jungle Safari",
      "City Life",
      "Sports World",
      "Food Festival",
      "Music Journey",
      "Art Gallery",
      "Transportation",
      "Nature Hike",
    ],
    hard: [
      "Ancient Civilizations",
      "Scientific Discoveries",
      "Literary Classics",
      "World Geography",
      "Historical Figures",
      "Mathematical Concepts",
      "Technological Innovations",
      "Environmental Science",
      "Cultural Traditions",
      "Astronomical Wonders",
    ],
  }

  // Cyberpunk themed images for each level
  const levelImages = {
    easy: [
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=400&h=300&fit=crop",
    ],
    medium: [
      "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1548407260-da850faa41e3?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1569982175971-d92b01cf8694?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=300&fit=crop",
    ],
    hard: [
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1581090700227-1e37b190418e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop",
    ],
  }

  useEffect(() => {
    // Log the current level selection for debugging
    console.log(
      `Selected difficulty: ${difficulty}, Current level: ${currentLevel}, Unlocked levels: ${unlockedLevels[difficulty]}`,
    )
  }, [difficulty, currentLevel, unlockedLevels])

  return (
    <div className="flex flex-col gap-6">
      <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.3 }}>
        <h2 className="text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          Select a Level
        </h2>
        <p className="text-center text-zinc-400">Choose your next word adventure</p>
      </motion.div>

      <Tabs
        defaultValue={difficulty}
        onValueChange={(value) => onSelectDifficulty(value as Difficulty)}
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 w-full mb-4 bg-zinc-900/50 p-1">
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

        {(["easy", "medium", "hard"] as Difficulty[]).map((diff) => (
          <TabsContent key={diff} value={diff} className="mt-0">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: totalLevels }).map((_, index) => {
                const level = index + 1
                // Level 1 is ALWAYS unlocked, other levels depend on progress
                const isUnlocked = level === 1 || level <= unlockedLevels[diff]
                const isCurrentLevel = level === currentLevel && diff === difficulty
                const themes = levelThemes[diff]
                const theme = themes[index % themes.length]
                const image = levelImages[diff][index % levelImages[diff].length]

                return (
                  <motion.div
                    key={level}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                  >
                    <Card
                      className={`overflow-hidden transition-all border ${
                        isCurrentLevel
                          ? "border-cyan-500 shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                          : isUnlocked
                            ? "border-zinc-800 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] cursor-pointer"
                            : "border-zinc-800 opacity-50"
                      }`}
                      onClick={() => isUnlocked && onSelectLevel(level)}
                    >
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={image || "/placeholder.svg?height=300&width=300"}
                          alt={theme}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "/placeholder.svg?height=300&width=300"
                          }}
                        />
                        {isUnlocked ? (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2">
                            <div className={`text-2xl font-bold ${isCurrentLevel ? "text-cyan-400" : "text-white"}`}>
                              {level}
                            </div>
                          </div>
                        ) : (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Lock className="h-8 w-8 text-zinc-400" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-3 flex flex-col items-center justify-center text-center bg-zinc-900">
                        {isUnlocked ? (
                          <>
                            <div className="text-xs text-zinc-400 mb-1">{theme}</div>
                            <div className="flex">
                              {Array.from({ length: 3 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < ((level % 3) + 1) ? "text-yellow-500 fill-yellow-500" : "text-zinc-700"
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        ) : (
                          <span className="text-xs text-zinc-500">Complete previous levels</span>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
