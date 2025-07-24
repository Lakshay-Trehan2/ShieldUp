"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Crown, Zap, ArrowUp, Target } from "lucide-react"
import type { DifficultyLevel } from "@/app/page"
import FallingCodeBg from "./falling-code-bg"

interface LevelUpScreenProps {
  currentLevel: DifficultyLevel
  nextLevel: DifficultyLevel
  score: number
  teamName: string
  onLevelUp: (level: DifficultyLevel) => void
  onContinue: () => void
}

const levelInfo = {
  beginner: {
    name: "Security Novice",
    icon: Star,
    color: "from-green-500 to-emerald-600",
    description: "Learning the basics of cybersecurity",
  },
  intermediate: {
    name: "Security Practitioner",
    icon: Target,
    color: "from-blue-500 to-indigo-600",
    description: "Applying security knowledge in real scenarios",
  },
  advanced: {
    name: "Security Expert",
    icon: Trophy,
    color: "from-purple-500 to-violet-600",
    description: "Mastering complex security challenges",
  },
  expert: {
    name: "Security Champion",
    icon: Crown,
    color: "from-yellow-500 to-orange-600",
    description: "Leading cybersecurity excellence",
  },
}

const difficultyChanges = {
  intermediate: [
    "More complex phishing scenarios",
    "Advanced social engineering tactics",
    "Multi-step attack scenarios",
    "Shorter time limits for challenges",
  ],
  advanced: [
    "Sophisticated attack vectors",
    "Business impact considerations",
    "Regulatory compliance scenarios",
    "Advanced threat detection",
  ],
  expert: [
    "Zero-day exploit scenarios",
    "Advanced persistent threats",
    "Executive-level decision making",
    "Crisis management situations",
  ],
}

export default function LevelUpScreen({
  currentLevel,
  nextLevel,
  score,
  teamName,
  onLevelUp,
  onContinue,
}: LevelUpScreenProps) {
  const CurrentIcon = levelInfo[currentLevel].icon
  const NextIcon = levelInfo[nextLevel].icon
  const changes = difficultyChanges[nextLevel] || []

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <FallingCodeBg />

      <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-black/80 dark:bg-gray-900/80 backdrop-blur-md text-white border border-purple-700">
        <CardHeader className="text-center space-y-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg p-8">
          <div className="flex justify-center">
            <div className="p-6 bg-purple-700/50 rounded-full animate-pulse">
              <ArrowUp className="w-16 h-16 stroke-white stroke-2" />
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-4xl font-bold tracking-tight">
              <span className="text-yellow-400 glow">🎉</span> Level Up Achieved!
            </CardTitle>
            <p className="text-xl text-purple-200">Congratulations, {teamName}!</p>
          </div>
        </CardHeader>

        <CardContent className="space-y-8 p-8">
          <div className="text-center space-y-4">
            <div className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 p-6 rounded-xl border border-green-700">
              <h3 className="text-2xl font-bold text-green-400 mb-2 glow">Outstanding Performance!</h3>
              <p className="text-green-300 text-lg">
                You scored <span className="font-bold text-2xl text-yellow-400 glow">{score}</span> points and have
                earned a promotion!
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Current Level */}
            <div className="text-center space-y-4">
              <h4 className="text-lg font-semibold text-gray-400">Current Level</h4>
              <div className="p-6 bg-gray-800 rounded-xl border-2 border-gray-700">
                <div
                  className={`p-4 bg-gradient-to-r ${levelInfo[currentLevel].color} rounded-full w-fit mx-auto mb-4`}
                >
                  <CurrentIcon className="w-12 h-12 text-white" />
                </div>
                <Badge className={`mb-2 bg-gradient-to-r ${levelInfo[currentLevel].color} text-white border-0`}>
                  {levelInfo[currentLevel].name}
                </Badge>
                <p className="text-sm text-gray-300">{levelInfo[currentLevel].description}</p>
              </div>
            </div>

            {/* Next Level */}
            <div className="text-center space-y-4">
              <h4 className="text-lg font-semibold text-gray-400">New Level Available</h4>
              <div className="p-6 bg-gradient-to-br from-blue-900/20 to-indigo-900/20 rounded-xl border-2 border-blue-700 shadow-lg">
                <div
                  className={`p-4 bg-gradient-to-r ${levelInfo[nextLevel].color} rounded-full w-fit mx-auto mb-4 animate-pulse`}
                >
                  <NextIcon className="w-12 h-12 text-white" />
                </div>
                <Badge
                  className={`mb-2 bg-gradient-to-r ${levelInfo[nextLevel].color} text-white border-0 text-lg px-4 py-2`}
                >
                  {levelInfo[nextLevel].name}
                </Badge>
                <p className="text-sm text-gray-300">{levelInfo[nextLevel].description}</p>
              </div>
            </div>
          </div>

          {/* What's New */}
          <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 p-6 rounded-xl border border-purple-700">
            <h3 className="text-xl font-semibold text-purple-300 mb-4 flex items-center space-x-2">
              <Zap className="w-6 h-6 stroke-purple-400" />
              <span>What's New at {levelInfo[nextLevel].name} Level:</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {changes.map((change, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-purple-400">{change}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => onLevelUp(nextLevel)}
              className="px-8 py-3 text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transform hover:scale-105 transition-all duration-300 text-white"
            >
              🚀 Accept Challenge - Play {levelInfo[nextLevel].name} Level
            </Button>

            <Button
              onClick={onContinue}
              variant="outline"
              className="px-8 py-3 text-lg border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
            >
              Continue Current Level
            </Button>
          </div>

          <div className="text-center bg-gradient-to-r from-yellow-900/20 to-orange-900/20 p-4 rounded-lg border border-yellow-700">
            <p className="text-yellow-300 text-sm">
              💡 <strong>Pro Tip:</strong> Higher levels offer more points but greater challenges. You can always return
              to easier levels later!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
