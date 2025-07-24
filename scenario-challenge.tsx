"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  XCircle,
  Mail,
  Laptop,
  Users,
  DollarSign,
  TrendingUp,
  Megaphone,
  Settings,
  Building,
  Shield,
  AlertTriangle,
  Zap,
  Target,
  Clock,
  Star,
} from "lucide-react"
import type { DifficultyLevel } from "@/app/page"
import FallingCodeBg from "./falling-code-bg"

interface ScenarioChallengeProps {
  teamName: string
  department: string
  difficultyLevel: DifficultyLevel
  onComplete: (score: number) => void
}

const departmentScenarios = {
  hr: [
    {
      id: 1,
      icon: Mail,
      title: "Employee Data Phishing",
      situation:
        "You receive an email claiming to be from the CEO asking for all employee salary information for an 'urgent board meeting.' The email has slight spelling errors and comes from a Gmail account.",
      options: [
        {
          text: "Send the salary data immediately to help the CEO",
          correct: false,
          explanation: "CEO impersonation is a common attack. Always verify through official channels.",
        },
        {
          text: "Call the CEO directly using the company directory to verify",
          correct: true,
          explanation: "Perfect! Always verify unusual requests through known contact methods.",
        },
        {
          text: "Forward the request to your manager for approval",
          correct: false,
          explanation: "While involving your manager is good, you should first verify the request's authenticity.",
        },
        {
          text: "Reply asking for more details about the meeting",
          correct: false,
          explanation: "Engaging with potential phishing emails can confirm your email is active to attackers.",
        },
      ],
    },
    {
      id: 2,
      icon: Users,
      title: "Candidate Background Check",
      situation:
        "A job candidate emails you directly asking to expedite their background check by providing their SSN and personal details via email to 'speed up the process.'",
      options: [
        {
          text: "Accept the information via email to help the candidate",
          correct: false,
          explanation: "Personal information should never be collected via unsecured email.",
        },
        {
          text: "Direct them to use the official secure portal for background checks",
          correct: true,
          explanation: "Excellent! Always use official, secure channels for sensitive information.",
        },
        {
          text: "Ask them to text the information instead",
          correct: false,
          explanation: "Text messages are also unsecured. Use official processes only.",
        },
        {
          text: "Schedule a phone call to collect the information verbally",
          correct: false,
          explanation: "While better than email, official secure processes should still be used.",
        },
      ],
    },
    {
      id: 3,
      icon: Laptop,
      title: "Remote Employee Setup",
      situation:
        "A new remote employee says they can't access the company VPN and asks you to email them confidential onboarding documents so they can start working immediately.",
      options: [
        {
          text: "Email the documents to help them get started quickly",
          correct: false,
          explanation: "Confidential documents should never be sent via unsecured email.",
        },
        {
          text: "Connect them with IT support to resolve VPN access first",
          correct: true,
          explanation: "Perfect! Proper access controls must be established before sharing confidential information.",
        },
        {
          text: "Upload documents to a personal cloud service for them",
          correct: false,
          explanation: "Personal cloud services are not approved for company confidential information.",
        },
        {
          text: "Send documents via encrypted personal messaging app",
          correct: false,
          explanation: "Use only company-approved secure channels for confidential information.",
        },
      ],
    },
    // Add more HR scenarios...
  ],
  it: [
    {
      id: 1,
      icon: Mail,
      title: "Urgent System Access Request",
      situation:
        "You receive an email from someone claiming to be a new executive assistant who needs immediate admin access to 'prepare for the CEO's presentation tomorrow.' The request bypasses normal approval processes.",
      options: [
        {
          text: "Grant temporary access to help with the urgent request",
          correct: false,
          explanation: "Never bypass security protocols, even for seemingly urgent requests.",
        },
        {
          text: "Verify the person's identity and follow standard approval processes",
          correct: true,
          explanation: "Perfect! Always follow established security procedures regardless of urgency.",
        },
        {
          text: "Give limited access just for the presentation",
          correct: false,
          explanation: "Any access without proper verification and approval is a security risk.",
        },
        {
          text: "Ask your manager to approve the emergency access",
          correct: false,
          explanation: "Even manager approval requires proper identity verification first.",
        },
      ],
    },
    // Add more IT scenarios...
  ],
  // Add other departments with similar structure...
  general: [
    {
      id: 1,
      icon: Mail,
      title: "Suspicious Email Link",
      situation:
        "You receive an urgent email from 'IT Support' asking you to click a link to verify your account credentials immediately to avoid suspension.",
      options: [
        {
          text: "Click the link immediately to avoid account suspension",
          correct: false,
          explanation:
            "This is likely a phishing attempt. Legitimate IT departments rarely ask for credentials via email.",
        },
        {
          text: "Forward the email to colleagues to warn them",
          correct: false,
          explanation:
            "Forwarding suspicious emails can spread the threat. Instead, report it to your IT security team.",
        },
        {
          text: "Contact IT directly through official channels to verify",
          correct: true,
          explanation: "Perfect! Always verify suspicious requests through official channels before taking action.",
        },
        {
          text: "Delete the email and ignore it",
          correct: false,
          explanation: "While not clicking is good, you should report suspicious emails to help protect others.",
        },
      ],
    },
    // Add more general scenarios...
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

const getScenariosByDifficulty = (dept: string, difficulty: DifficultyLevel) => {
  const baseScenarios = departmentScenarios[dept as keyof typeof departmentScenarios] || departmentScenarios.general

  let scenarios = shuffleArray(baseScenarios)
  scenarios = scenarios.map((scenario) => ({
    ...scenario,
    options: shuffleArray(scenario.options),
  }))

  if (difficulty === "beginner") return scenarios.slice(0, 3)
  if (difficulty === "intermediate") return scenarios.slice(0, 4)
  if (difficulty === "advanced") return scenarios.slice(0, 5)
  return scenarios
}

export default function ScenarioChallenge({
  teamName,
  department,
  difficultyLevel,
  onComplete,
}: ScenarioChallengeProps) {
  const [currentScenario, setCurrentScenario] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [showFeedback, setShowFeedback] = useState(false)
  const [score, setScore] = useState(0)
  const [scenarios, setScenarios] = useState<any[]>([])
  const [timeLeft, setTimeLeft] = useState(120) // 2 minutes per scenario
  const [isActive, setIsActive] = useState(true)

  const DepartmentIcon = getDepartmentIcon(department)

  useEffect(() => {
    const randomizedScenarios = getScenariosByDifficulty(department, difficultyLevel)
    setScenarios(randomizedScenarios)
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

    if (scenarios[currentScenario].options[optionIndex].correct) {
      const timeBonus = Math.floor(timeLeft / 10) // Bonus points for quick response
      setScore((prev) => prev + 25 + timeBonus)
    }
  }

  const handleNext = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario((prev) => prev + 1)
      setSelectedOption(null)
      setShowFeedback(false)
      setTimeLeft(120)
      setIsActive(true)
    } else {
      onComplete(score)
    }
  }

  if (scenarios.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        <div className="text-cyan-300 text-xl animate-pulse">Loading threat scenarios...</div>
      </div>
    )
  }

  const currentScenarioData = scenarios[currentScenario]
  const IconComponent = currentScenarioData.icon
  const progress = ((currentScenario + 1) / scenarios.length) * 100

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-red-900/20 to-orange-900/20">
      <FallingCodeBg />

      {/* Animated background */}
      <div className="absolute inset-0 cyber-grid opacity-10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-6xl mx-auto">
          {/* Header Stats */}
          <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-red-600 to-orange-600 p-3 rounded-full shadow-lg">
                <AlertTriangle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Threat Detection Challenge</h1>
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
                <div className={`text-2xl font-bold ${timeLeft < 30 ? "text-red-400 animate-pulse" : "text-blue-400"}`}>
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, "0")}
                </div>
                <div className="text-xs text-gray-400">TIME LEFT</div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">
                Scenario {currentScenario + 1} of {scenarios.length}
              </span>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">{difficultyLevel.toUpperCase()}</Badge>
            </div>
            <div className="relative">
              <Progress value={progress} className="h-3 bg-slate-800" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full"></div>
            </div>
          </div>

          {/* Main Scenario Card */}
          <Card className="glass-morphism border-red-500/30 shadow-2xl mb-8">
            <CardHeader className="bg-gradient-to-r from-red-900/50 to-orange-900/50 border-b border-red-500/30">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-r from-red-600 to-orange-600 p-4 rounded-xl shadow-lg">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl md:text-2xl text-white mb-2">🚨 {currentScenarioData.title}</CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>Threat Level: HIGH</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Response Required</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-8">
              {/* Scenario Description */}
              <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 p-6 rounded-xl border-l-4 border-red-400 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="bg-red-500/20 p-2 rounded-lg mt-1">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-300 mb-3">⚠️ Security Incident Detected</h3>
                    <p className="text-gray-300 leading-relaxed text-base md:text-lg">
                      {currentScenarioData.situation}
                    </p>
                  </div>
                </div>
              </div>

              {/* Response Options */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-white flex items-center space-x-2 mb-6">
                  <Shield className="w-5 h-5 text-blue-400" />
                  <span>How should your team respond to this threat?</span>
                </h4>

                <div className="grid gap-4">
                  {currentScenarioData.options.map((option: any, index: number) => (
                    <button
                      key={index}
                      onClick={() => !showFeedback && handleOptionSelect(index)}
                      disabled={showFeedback || !isActive}
                      className={`group relative p-6 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] cursor-interactive ${
                        selectedOption === index
                          ? option.correct
                            ? "border-green-400 bg-gradient-to-r from-green-900/40 to-emerald-900/40 shadow-lg shadow-green-500/20"
                            : "border-red-400 bg-gradient-to-r from-red-900/40 to-pink-900/40 shadow-lg shadow-red-500/20"
                          : showFeedback
                            ? option.correct
                              ? "border-green-400 bg-gradient-to-r from-green-900/40 to-emerald-900/40 shadow-lg shadow-green-500/20"
                              : "border-slate-600 bg-slate-800/30"
                            : "border-slate-600 hover:border-blue-400 hover:bg-gradient-to-r hover:from-slate-800/50 hover:to-slate-700/50 hover:shadow-lg hover:shadow-blue-500/10 glass-morphism"
                      } ${showFeedback || !isActive ? "cursor-default" : "cursor-pointer"}`}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1">
                          <div
                            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                              showFeedback
                                ? option.correct
                                  ? "border-green-400 bg-green-400"
                                  : selectedOption === index
                                    ? "border-red-400 bg-red-400"
                                    : "border-gray-500 bg-gray-500"
                                : "border-gray-400 group-hover:border-blue-400"
                            }`}
                          >
                            {showFeedback && (
                              <>
                                {option.correct ? (
                                  <CheckCircle className="w-5 h-5 text-white" />
                                ) : selectedOption === index ? (
                                  <XCircle className="w-5 h-5 text-white" />
                                ) : null}
                              </>
                            )}
                            {!showFeedback && (
                              <span className="text-sm font-bold text-gray-400 group-hover:text-blue-400">
                                {String.fromCharCode(65 + index)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex-1">
                          <p className="font-medium text-white text-base md:text-lg mb-2">{option.text}</p>

                          {showFeedback && (selectedOption === index || option.correct) && (
                            <div className="mt-4 p-4 bg-slate-800/60 rounded-lg border border-slate-600">
                              <div className="flex items-start space-x-2">
                                <div className={`p-1 rounded ${option.correct ? "bg-green-500/20" : "bg-red-500/20"}`}>
                                  {option.correct ? (
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                  ) : (
                                    <XCircle className="w-4 h-4 text-red-400" />
                                  )}
                                </div>
                                <p className="text-sm text-gray-300 leading-relaxed">{option.explanation}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {showFeedback && (
                <div className="flex justify-center mt-8">
                  <Button
                    onClick={handleNext}
                    size="lg"
                    className="px-12 py-4 text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 shadow-2xl relative overflow-hidden group cursor-interactive"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                    <div className="flex items-center space-x-3 relative z-10">
                      {currentScenario < scenarios.length - 1 ? (
                        <>
                          <span>Next Threat</span>
                          <Zap className="w-5 h-5" />
                        </>
                      ) : (
                        <>
                          <span>Continue to Knowledge Assessment</span>
                          <Star className="w-5 h-5" />
                        </>
                      )}
                    </div>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
