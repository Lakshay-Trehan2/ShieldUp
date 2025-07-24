"use client"

import { useState } from "react"
import WelcomeScreen from "@/components/welcome-screen"
import ScenarioChallenge from "@/components/scenario-challenge"
import QuizRound from "@/components/quiz-round"
import TipsAndTakeaways from "@/components/tips-takeaways"
import FinalScore from "@/components/final-score"
import LevelUpScreen from "@/components/level-up-screen"

export type DifficultyLevel = "beginner" | "intermediate" | "advanced" | "expert"

export type GameState = {
  currentSection: number
  teamName: string
  department: string
  difficultyLevel: DifficultyLevel
  scenarioScore: number
  quizScore: number
  totalScore: number
  completedLevels: DifficultyLevel[]
  showLevelUp: boolean
}

export default function CyberCollabGame() {
  const [gameState, setGameState] = useState<GameState>({
    currentSection: 0,
    teamName: "",
    department: "",
    difficultyLevel: "beginner",
    scenarioScore: 0,
    quizScore: 0,
    totalScore: 0,
    completedLevels: [],
    showLevelUp: false,
  })

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState((prev) => {
      const newState = { ...prev, ...updates }
      // Calculate total score
      newState.totalScore = newState.scenarioScore + newState.quizScore
      return newState
    })
  }

  const nextSection = () => {
    setGameState((prev) => ({ ...prev, currentSection: prev.currentSection + 1 }))
  }

  const checkLevelUp = (totalScore: number, currentLevel: DifficultyLevel) => {
    const levelThresholds = {
      beginner: 80, // Adjusted for 2 sections instead of 3
      intermediate: 100,
      advanced: 120,
    }

    if (currentLevel === "beginner" && totalScore >= levelThresholds.beginner) {
      return "intermediate"
    }
    if (currentLevel === "intermediate" && totalScore >= levelThresholds.intermediate) {
      return "advanced"
    }
    if (currentLevel === "advanced" && totalScore >= levelThresholds.advanced) {
      return "expert"
    }
    return null
  }

  const handleGameComplete = (score: number, section: "scenario" | "quiz") => {
    const updates: Partial<GameState> = {}

    if (section === "scenario") updates.scenarioScore = score
    if (section === "quiz") updates.quizScore = score

    const newTotalScore = gameState.scenarioScore + gameState.quizScore + score
    const nextLevel = checkLevelUp(newTotalScore, gameState.difficultyLevel)

    if (nextLevel && !gameState.completedLevels.includes(gameState.difficultyLevel)) {
      updates.showLevelUp = true
      updates.completedLevels = [...gameState.completedLevels, gameState.difficultyLevel]
    }

    updateGameState(updates)

    if (updates.showLevelUp) {
      // Don't advance section yet, show level up screen first
      return
    }

    nextSection()
  }

  const handleLevelUp = (newLevel: DifficultyLevel) => {
    updateGameState({
      difficultyLevel: newLevel,
      showLevelUp: false,
      currentSection: 1, // Restart from scenarios with new difficulty
      scenarioScore: 0,
      quizScore: 0,
    })
  }

  const resetGame = () => {
    setGameState({
      currentSection: 0,
      teamName: "",
      department: "",
      difficultyLevel: "beginner",
      scenarioScore: 0,
      quizScore: 0,
      totalScore: 0,
      completedLevels: [],
      showLevelUp: false,
    })
  }

  const renderCurrentSection = () => {
    if (gameState.showLevelUp) {
      const nextLevel = checkLevelUp(gameState.totalScore, gameState.difficultyLevel)
      return (
        <LevelUpScreen
          currentLevel={gameState.difficultyLevel}
          nextLevel={nextLevel as DifficultyLevel}
          score={gameState.totalScore}
          teamName={gameState.teamName}
          onLevelUp={handleLevelUp}
          onContinue={() => {
            updateGameState({ showLevelUp: false })
            nextSection()
          }}
        />
      )
    }

    switch (gameState.currentSection) {
      case 0:
        return (
          <WelcomeScreen
            onStart={(teamName, department) => {
              updateGameState({ teamName, department })
              nextSection()
            }}
          />
        )
      case 1:
        return (
          <ScenarioChallenge
            teamName={gameState.teamName}
            department={gameState.department}
            difficultyLevel={gameState.difficultyLevel}
            onComplete={(score) => handleGameComplete(score, "scenario")}
          />
        )
      case 2:
        return (
          <QuizRound
            teamName={gameState.teamName}
            department={gameState.department}
            difficultyLevel={gameState.difficultyLevel}
            onComplete={(score) => handleGameComplete(score, "quiz")}
          />
        )
      case 3:
        return <TipsAndTakeaways onContinue={nextSection} />
      case 4:
        return <FinalScore gameState={gameState} onRestart={resetGame} />
      default:
        return (
          <WelcomeScreen
            onStart={(teamName, department) => {
              updateGameState({ teamName, department })
              nextSection()
            }}
          />
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-cyan-900 transition-colors duration-300">
      {renderCurrentSection()}
    </div>
  )
}
