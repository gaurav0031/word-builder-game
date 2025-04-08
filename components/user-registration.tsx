"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Rocket, User, Mail, Calendar, ArrowRight } from "lucide-react"
import { z } from "zod"

const userSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  age: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0 && Number(val) < 100, {
    message: "Age must be a number between 1-99",
  }),
  email: z.string().email({ message: "Invalid email address" }),
})

type UserData = z.infer<typeof userSchema>

interface UserRegistrationProps {
  onComplete: (userData: UserData) => void
}

export default function UserRegistration({ onComplete }: UserRegistrationProps) {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    age: "",
    email: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      userSchema.parse(userData)
      onComplete(userData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as string] = err.message
          }
        })
        setErrors(newErrors)
      }
    }
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          Word Builder Quest
        </h1>
        <p className="text-center text-zinc-400 mt-2">Join the adventure to master vocabulary in a cyberpunk world</p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full"
      >
        <Card className="border border-zinc-800 bg-black/50 backdrop-blur-xl shadow-[0_0_15px_rgba(56,189,248,0.15)]">
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-zinc-400">
                  <User className="h-4 w-4 inline mr-2" />
                  Your Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="bg-zinc-900/50 border-zinc-800 focus:border-cyan-500 focus:ring-cyan-500/20"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="age" className="text-zinc-400">
                  <Calendar className="h-4 w-4 inline mr-2" />
                  Your Age
                </Label>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={userData.age}
                  onChange={handleChange}
                  placeholder="Enter your age"
                  className="bg-zinc-900/50 border-zinc-800 focus:border-cyan-500 focus:ring-cyan-500/20"
                />
                {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-400">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Your Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="bg-zinc-900/50 border-zinc-800 focus:border-cyan-500 focus:ring-cyan-500/20"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium py-2 rounded-md transition-all duration-300 shadow-[0_0_15px_rgba(56,189,248,0.5)]"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Begin Your Adventure
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-center text-zinc-500 text-sm"
      >
        <p>Your data is securely stored and only used to enhance your learning experience.</p>
      </motion.div>
    </div>
  )
}
