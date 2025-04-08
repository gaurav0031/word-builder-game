export type GameState = "registration" | "start" | "level-select" | "play" | "complete"
export type Difficulty = "easy" | "medium" | "hard"
export type GameMode = "story" | "practice"

export interface Word {
  word: string
  hint: string
  image?: string
}

export interface LevelData {
  id: number
  title: string
  story: string
  lesson: string
  words: Word[]
}

export interface UserData {
  name: string
  age: string
  email: string
}
