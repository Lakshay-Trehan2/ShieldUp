"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Brain,
  Shield,
  Users,
  Settings,
  TrendingUp,
  Megaphone,
  DollarSign,
  Building,
  Target,
  Clock,
  Award,
} from "lucide-react"
import type { DifficultyLevel } from "@/app/page"
import FallingCodeBg from "./falling-code-bg"

interface QuizRoundProps {
  teamName: string
  department: string
  difficultyLevel: DifficultyLevel
  onComplete: (score: number) => void
}

const departmentQuizzes = {
  hr: [
    {
      id: 1,
      question: "When handling employee personal information, what's the most secure approach?",
      options: [
        "Store all employee data in easily accessible shared folders",
        "Use encrypted systems with role-based access controls",
        "Keep physical copies as backup in unlocked filing cabinets",
        "Share employee data freely within the HR team",
      ],
      correct: 1,
      explanation:
        "Employee data must be encrypted and access should be limited to only those who need it for their job functions.",
    },
    // Add more HR questions...
  ],
  it: [
    {
      id: 1,
      question: "What's the most critical factor when implementing Multi-Factor Authentication (MFA)?",
      options: [
        "Making it as convenient as possible for users",
        "Ensuring it covers all critical systems and accounts",
        "Using only SMS-based authentication for simplicity",
        "Implementing it only for executive accounts",
      ],
      correct: 1,
      explanation:
        "MFA should be comprehensive across all critical systems. SMS alone is vulnerable; use app-based or hardware tokens when possible.",
    },
    // Add more IT questions...
  ],
  general: [
    {
      id: 1,
      question: "What is the most effective way to create a strong password?",
      options: [
        "Use a combination of uppercase, lowercase, numbers, and symbols",
        "Use a long passphrase with multiple unrelated words",
        "Use the same strong password for all accounts",
        "Use personal information like birthdays and names",
      ],
      correct: 1,
      explanation:
        "Long passphrases with unrelated words are both secure and memorable. For example: 'Coffee-Mountain-Purple-42' is stronger than 'P@ssw0rd1'.",
    },
    {
      id: 2,
      question: "Which of these is a clear sign of a phishing email?",
      options: [
        "It comes from a colleague's email address",
        "It has perfect grammar and spelling",
        "It creates urgency and asks for immediate action",
        "It includes the company logo",
      ],
      correct: 2,
      explanation:
        "Phishing emails often create false urgency to pressure you into acting quickly without thinking. Always take time to verify suspicious requests.",
    },
    // Add more general questions...
  ],
}

const getDepartmentIcon = (department: string) => {
  const icons = {
    hr: Users,
    it: Settings,
    sales: TrendingUp,
    marketing: Megaphone,
    finance: DollarSign,
    operations: Settings,
    general: Building,
  }
  return icons[department as keyof typeof icons] || Building
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

const getQuizByDifficulty = (dept: string, difficulty: DifficultyLevel) => {
  const baseQuiz = departmentQuizzes[dept as keyof typeof departmentQuizzes] || departmentQuizzes.general

  let questions = shuffleArray(baseQuiz)
  questions = questions.map((question) => {
    const correctOption = question.options[question.correct]
    const shuffledOptions = shuffleArray(question.options)
    const newCorrectIndex = shuffledOptions.findIndex((option) => option === correctOption)

    return {
      ...question,
      options: shuffledOptions,
      correct: newCorrectIndex,
    }
  })

  if (difficulty === "beginner") return questions.slice(0, 3)
  if (difficulty === "intermediate") return questions.slice(0, 4)
  if (difficulty === "advanced") return questions.slice(0, 5)
  return questions.slice(0, 6)
}

export default function QuizRound({ teamName, department, difficultyLevel, onComplete }: QuizRoundProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [quizQuestions, setQuizQuestions] = useState<any[]>([])
  const [timeLeft, setTimeLeft] = useState(90)
  const [isActive, setIsActive] = useState(true)

  const DepartmentIcon = getDepartmentIcon(department)

  useEffect(() => {
    const randomizedQuestions = getQuizByDifficulty(department, difficultyLevel)
    setQuizQuestions(randomizedQuestions)
  }, [department, difficultyLevel])

  // Timer effect
  useEffect(() => {
    if (!isActive || showFeedback) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [isActive, showFeedback])

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex)
    setShowFeedback(true)
    setIsActive(false)

    if (optionIndex === quizQuestions[currentQuestion].correct) {
      const timeBonus = Math.floor(timeLeft / 10)
      setScore((prev) => prev + 15 + timeBonus)
      setCorrectAnswers((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setSelectedOption(null)
      setShowFeedback(false)
      setTimeLeft(90)
      setIsActive(true)
    } else {
      onComplete(score)
    }
  }

  if (quizQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900">
        <div className="text-purple-300 text-xl animate-pulse">Loading knowledge assessment...</div>
      </div>
    )
  }

  const currentQuestionData = quizQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100
  const accuracyRate = Math.round((correctAnswers / (currentQuestion + (showFeedback ? 1 : 0))) * 100) || 0

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-blue-900/30">
      <FallingCodeBg />

      {/* Animated background */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header Stats */}
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-full shadow-lg pulse-glow">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Knowledge Assessment</h1>
                <p className="text-gray-400">
                  Team: {teamName} | Department: {department}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{score}</div>
                <div className="text-xs text-gray-400">POINTS</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">{accuracyRate}%</div>
                <div className="text-xs text-gray-400">ACCURACY</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${timeLeft < 20 ? "text-red-400 animate-pulse" : "text-blue-400"}`}>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                </div>
                <div className="text-xs text-gray-400">TIME LEFT</div>
              </div>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-400">
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">{difficultyLevel.toUpperCase()}</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-400">{correctAnswers} correct answers</span>
              </div>
            </div>

            <div className="relative">
              <Progress value={progress} className="h-4 bg-slate-800" />
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full"></div>
            </div>
          </div>

          {/* Main Quiz Card */}
          <Card className="glass-morphism border-purple-500/30 shadow-2xl">
            <CardHeader className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 border-b border-purple-500/30">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-500/20 p-4 rounded-xl shadow-lg">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl md:text-2xl text-white mb-2">🧠 Security Knowledge Challenge</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Brain className="w-4 h-4" />
                      <span>Critical Thinking Required</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Timed Assessment</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              {/* Question */}
              <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 p-6 rounded-xl border-l-4 border-purple-400 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <div
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                        showFeedback
                          ? currentQuestionData.correct === currentQuestionData.correct
                            ? "border-green-400 bg-green-400"
                            : selectedOption === currentQuestionData.correct
                              ? "border-red-400 bg-red-400"
                              : "border-gray-500 bg-gray-500"
                          : "border-gray-400 group-hover:border-purple-400"
                      }`}
                    >
                      {showFeedback && (
                        <>
                          {currentQuestionData.correct === currentQuestionData.correct && (
                            <span className="text-white">Correct</span>
                          )}
                          {selectedOption === currentQuestionData.correct &&
                            currentQuestionData.correct !== currentQuestionData.correct && (
                              <span className="text-white">Incorrect</span>
                            )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-purple-300 mb-4">
                      Question {currentQuestion + 1}
                    </h3>
                    <p className="text-white text-base md:text-lg leading-relaxed">{currentQuestionData.question}</p>
                  </div>
                </div>
              </div>

              {/* Answer Options */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white flex items-center space-x-2 mb-6">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span>Select the best answer:</span>
                </h4>

                <div className="grid gap-4">
                  {currentQuestionData.options.map((option: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => !showFeedback && isActive && handleOptionSelect(index)}
                      disabled={showFeedback || !isActive}
                      className={`group relative p-6 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.01] cursor-interactive ${
                        selectedOption === index
                          ? index === currentQuestionData.correct
                            ? "border-green-400 bg-gradient-to-r from-green-900/40 to-emerald-900/40 shadow-lg shadow-green-500/20"
                            : "border-red-400 bg-gradient-to-r from-red-900/40 to-pink-900/40 shadow-lg shadow-red-500/20"
                          : showFeedback
                            ? index === currentQuestionData.correct
                              ? "border-green-400 bg-gradient-to-r from-green-900/40 to-emerald-900/40 shadow-lg shadow-green-500/20"
                              : "border-slate-600 bg-slate-800/30"
                            : "border-slate-600 hover:border-purple-400 hover:bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-700/50 hover:shadow-lg hover:shadow-purple-500/10 glass-morphism"
                      } ${showFeedback || !isActive ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                              showFeedback
                                ? index === currentQuestionData.correct
                                  ? "border-green-400 bg-green-400"
                                  : selectedOption === index
                                    ? "border-red-400 bg-red-400"
                                    : "border-gray-500 bg-gray-500"
                                : "border-gray-400 group-hover:border-purple-400"
                            }`}
                          >
                            {showFeedback && (
                              <>
                                {index === currentQuestionData.correct && <span className="text-white">Correct</span>}
                                {selectedOption === index && index !== currentQuestionData.correct && (
                                  <span className="text-white">Incorrect</span>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-white text-base md:text-lg leading-relaxed">{option}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
