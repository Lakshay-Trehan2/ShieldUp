"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Star, Download, RotateCcw } from "lucide-react"
import type { GameState } from "@/app/page"
import FallingCodeBg from "./falling-code-bg"
import Image from "next/image"

interface FinalScoreProps {
  gameState: GameState
  onRestart: () => void
}

export default function FinalScore({ gameState, onRestart }: FinalScoreProps) {
  const { teamName, scenarioScore, quizScore, totalScore } = gameState

  const getBadgeInfo = (score: number) => {
    if (score >= 140)
      return {
        title: "Elite Cyber Guardians",
        color: "bg-gradient-to-r from-yellow-400 to-orange-500",
        icon: Trophy,
      }
    if (score >= 120)
      return { title: "Digital Defenders", color: "bg-gradient-to-r from-blue-500 to-purple-600", icon: Award }
    if (score >= 100)
      return { title: "Cybersecurity Sentinels", color: "bg-gradient-to-r from-green-500 to-blue-500", icon: Star }
    if (score >= 80)
      return { title: "InfoSec Protectors", color: "bg-gradient-to-r from-indigo-500 to-purple-500", icon: Award }
    return { title: "Security Apprentices", color: "bg-gradient-to-r from-gray-500 to-gray-600", icon: Star }
  }

  const badgeInfo = getBadgeInfo(totalScore)
  const BadgeIcon = badgeInfo.icon
  const maxPossibleScore = 145 // 100 (scenarios) + 45 (quiz)
  const percentage = Math.round((totalScore / maxPossibleScore) * 100)

  const downloadCertificate = async () => {
    try {
      console.log("Starting certificate generation...")

      // Dynamically import jsPDF
      const jsPDFModule = await import("jspdf")
      const jsPDF = jsPDFModule.jsPDF

      console.log("jsPDF imported successfully")

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      })

      console.log("PDF document created")

      // Background
      doc.setFillColor(30, 41, 59) // Dark blue
      doc.rect(0, 0, 297, 210, "F")

      // Decorative border
      doc.setDrawColor(14, 165, 233) // Primary blue
      doc.setLineWidth(2)
      doc.rect(10, 10, 277, 190)

      // Inner border
      doc.setLineWidth(0.5)
      doc.rect(15, 15, 267, 180)

      // Header section
      doc.setTextColor(14, 165, 233)
      doc.setFontSize(28)
      doc.setFont("helvetica", "bold")
      doc.text("CERTIFICATE OF ACHIEVEMENT", 148.5, 40, { align: "center" })

      doc.setFontSize(16)
      doc.setFont("helvetica", "normal")
      doc.text("Cybersecurity Awareness Excellence", 148.5, 50, { align: "center" })

      // Company branding section (simplified - no image loading)
      doc.setFontSize(20)
      doc.setTextColor(14, 165, 233)
      doc.text("🛡️ CYBER SECURITY TRAINING", 148.5, 70, { align: "center" })

      // Main content
      doc.setTextColor(203, 213, 225) // Light gray
      doc.setFontSize(14)
      doc.text("This certifies that the team", 148.5, 90, { align: "center" })

      // Team name (highlighted)
      doc.setTextColor(255, 255, 255) // White
      doc.setFontSize(32)
      doc.setFont("helvetica", "bold")
      doc.text(teamName, 148.5, 110, { align: "center" })

      // Achievement description
      doc.setTextColor(203, 213, 225)
      doc.setFontSize(12)
      doc.setFont("helvetica", "normal")
      doc.text("has successfully completed the Cyber Collab: Security Awareness Quest", 148.5, 125, { align: "center" })
      doc.text("and demonstrated exceptional commitment to workplace cybersecurity best practices.", 148.5, 135, {
        align: "center",
      })

      // Achievement level
      doc.setTextColor(16, 185, 129) // Green
      doc.setFontSize(16)
      doc.setFont("helvetica", "bold")
      doc.text(badgeInfo.title, 148.5, 150, { align: "center" })

      // Score section background
      doc.setFillColor(15, 23, 42) // Very dark blue
      doc.setDrawColor(51, 65, 85)
      doc.roundedRect(50, 160, 197, 25, 3, 3, "FD")

      // Final score
      doc.setTextColor(14, 165, 233)
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text(`Final Achievement Score: ${totalScore} / ${maxPossibleScore} points (${percentage}%)`, 148.5, 170, {
        align: "center",
      })

      // Individual scores
      doc.setFontSize(12)
      doc.setFont("helvetica", "normal")
      doc.text(`Scenario Challenges: ${scenarioScore} points`, 80, 180, { align: "center" })
      doc.text(`Knowledge Assessment: ${quizScore} points`, 217, 180, { align: "center" })

      // Footer
      doc.setTextColor(100, 116, 139) // Gray
      doc.setFontSize(10)
      const currentDate = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      doc.text(`Completed: ${currentDate}`, 25, 195)
      doc.text('"Securing the digital frontier, together."', 272, 195, { align: "right" })

      // Add decorative corner elements
      doc.setDrawColor(14, 165, 233)
      doc.setLineWidth(1)
      // Top left corner
      doc.line(20, 20, 35, 20)
      doc.line(20, 20, 20, 35)
      // Top right corner
      doc.line(262, 20, 277, 20)
      doc.line(277, 20, 277, 35)
      // Bottom left corner
      doc.line(20, 175, 35, 175)
      doc.line(20, 175, 20, 190)
      // Bottom right corner
      doc.line(262, 175, 277, 175)
      doc.line(277, 175, 277, 190)

      console.log("PDF content generated, saving...")

      // Save the PDF
      doc.save(`${teamName}-Cybersecurity-Certificate.pdf`)

      console.log("Certificate downloaded successfully")
    } catch (error) {
      console.error("Error generating certificate:", error)

      // Show user-friendly error message
      const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"
      alert(`There was an error generating the certificate: ${errorMessage}. Please try again.`)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <FallingCodeBg />

      <Card className="w-full max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto border-0 bg-black/80 text-white">
        <CardHeader className="text-center space-y-3 sm:space-y-6">
          {/* Company Logo */}
          <div className="flex justify-center mb-2 sm:mb-4">
            <div className="relative p-2 sm:p-4 bg-white/10 backdrop-blur-md rounded-xl sm:rounded-2xl border border-white/20 shadow-xl sm:shadow-2xl">
              <Image
                src="/images/company-logo.png"
                alt="Company Logo"
                width={60}
                height={30}
                className="sm:w-[80px] sm:h-[40px] object-contain filter brightness-110 contrast-110"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <div className={`p-4 sm:p-6 rounded-full ${badgeInfo.color} shadow-lg animate-pulse`}>
              <BadgeIcon className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
            </div>
          </div>

          <div className="space-y-2">
            <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow">
              Congratulations, {teamName}!
            </CardTitle>
            <Badge className={`text-sm sm:text-lg px-3 sm:px-4 py-1.5 sm:py-2 ${badgeInfo.color} text-white border-0`}>
              {badgeInfo.title}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-8">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="bg-gradient-to-r from-blue-900 to-blue-700 p-4 sm:p-6 rounded-lg border border-blue-500 shadow-md">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 drop-shadow">Final Team Score</h3>
              <div className="text-4xl sm:text-6xl font-bold text-blue-300 mb-2">{totalScore}</div>
              <p className="text-blue-200 text-sm sm:text-base">
                out of {maxPossibleScore} possible points ({percentage}%)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="bg-gradient-to-r from-green-900 to-green-700 p-3 sm:p-4 rounded-lg border border-green-500 text-center shadow-md">
              <h4 className="font-semibold text-green-300 mb-1 drop-shadow text-sm sm:text-base">
                Scenario Challenges
              </h4>
              <div className="text-xl sm:text-2xl font-bold text-green-200">{scenarioScore}</div>
              <p className="text-xs sm:text-sm text-green-200">out of 100 points</p>
            </div>

            <div className="bg-gradient-to-r from-purple-900 to-purple-700 p-3 sm:p-4 rounded-lg border border-purple-500 text-center shadow-md">
              <h4 className="font-semibold text-purple-300 mb-1 drop-shadow text-sm sm:text-base">Knowledge Quiz</h4>
              <div className="text-xl sm:text-2xl font-bold text-purple-200">{quizScore}</div>
              <p className="text-xs sm:text-sm text-purple-200">out of 45 points</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-900 to-orange-900 p-4 sm:p-6 rounded-lg border border-yellow-500 shadow-md">
            <h3 className="text-lg sm:text-xl font-semibold text-yellow-300 mb-2 sm:mb-3 text-center drop-shadow">
              🎯 What You've Accomplished
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
              <div className="space-y-1 sm:space-y-2">
                <p className="text-yellow-200">✅ Learned to identify phishing attempts</p>
                <p className="text-yellow-200">✅ Practiced secure password habits</p>
                <p className="text-yellow-200">✅ Understood MFA importance</p>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <p className="text-yellow-200">✅ Spotted workplace vulnerabilities</p>
                <p className="text-yellow-200">✅ Reinforced security best practices</p>
                <p className="text-yellow-200">✅ Built team security awareness</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Button
              onClick={downloadCertificate}
              className="flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow text-sm sm:text-base"
            >
              <Download className="w-4 h-4" />
              <span>Download Certificate</span>
            </Button>

            <Button
              onClick={onRestart}
              variant="outline"
              className="flex items-center justify-center space-x-2 border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent text-sm sm:text-base"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Play Again</span>
            </Button>
          </div>

          <div className="text-center bg-gradient-to-r from-green-900 to-emerald-900 p-4 sm:p-6 rounded-lg border border-green-500 shadow-md">
            <h3 className="text-lg sm:text-xl font-bold text-green-300 mb-2 drop-shadow">🛡️ Keep the momentum going!</h3>
            <p className="text-green-200 text-sm sm:text-base">
              Share what you've learned with other teams and continue practicing these security habits daily. Remember:
              cybersecurity is everyone's responsibility!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
