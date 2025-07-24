"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, Lightbulb, Lock, Shield, Eye, Smartphone, Wifi } from "lucide-react"
import FallingCodeBg from "./falling-code-bg"

interface TipsAndTakeawaysProps {
  onContinue: () => void
}

const securityTips = [
  {
    icon: Lock,
    title: "Always Lock Your Screen",
    description: "Use Windows+L or Cmd+Ctrl+Q whenever you step away, even for a moment.",
    color: "blue",
  },
  {
    icon: Eye,
    title: "Think Before You Click",
    description: "Verify suspicious emails and links through official channels before taking action.",
    color: "green",
  },
  {
    icon: Shield,
    title: "Use Strong, Unique Passwords",
    description: "Create long passphrases and use different passwords for each account.",
    color: "purple",
  },
  {
    icon: Smartphone,
    title: "Enable Multi-Factor Authentication",
    description: "Add an extra layer of security to all your important accounts.",
    color: "indigo",
  },
  {
    icon: Wifi,
    title: "Be Cautious on Public Wi-Fi",
    description: "Avoid accessing sensitive information on unsecured networks.",
    color: "cyan",
  },
]

export default function TipsAndTakeaways({ onContinue }: TipsAndTakeawaysProps) {
  const downloadCheatSheet = () => {
    const cheatSheetContent = `
CYBERSECURITY QUICK REFERENCE GUIDE

🔒 ESSENTIAL SECURITY HABITS:
• Always lock your screen when stepping away (Windows+L / Cmd+Ctrl+Q)
• Think before you click - verify suspicious emails through official channels
• Use strong, unique passwords or passphrases for each account
• Enable Multi-Factor Authentication (MFA) on all important accounts
• Keep software updated with automatic security patches
• Be cautious on public Wi-Fi networks
• Report suspicious activities to IT security immediately

📧 PHISHING RED FLAGS:
• Urgent language demanding immediate action
• Requests for passwords or sensitive information
• Suspicious sender addresses or domains
• Generic greetings instead of your name
• Unexpected attachments or links

🔐 PASSWORD BEST PRACTICES:
• Use long passphrases with unrelated words
• Include numbers and symbols when required
• Never reuse passwords across accounts
• Use a password manager when possible
• Change passwords if you suspect compromise

📱 DEVICE SECURITY:
• Lock devices with PINs, passwords, or biometrics
• Install updates promptly
• Only download apps from official stores
• Use device encryption when available
• Enable remote wipe capabilities

Remember: When in doubt, ask your IT security team!
    `

    const blob = new Blob([cheatSheetContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "cybersecurity-cheat-sheet.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadPoster = () => {
    const posterContent = `
╔══════════════════════════════════════════════════════════════╗
║                    SECURITY REMINDER POSTER                  ║
║                                                              ║
║  🔒 LOCK YOUR SCREEN                                         ║
║     Windows+L or Cmd+Ctrl+Q when stepping away              ║
║                                                              ║
║  🤔 THINK BEFORE YOU CLICK                                   ║
║     Verify suspicious emails through official channels      ║
║                                                              ║
║  🔐 USE STRONG PASSWORDS                                     ║
║     Long passphrases with unrelated words                   ║
║                                                              ║
║  📱 ENABLE MFA                                               ║
║     Add extra security to important accounts                ║
║                                                              ║
║  📶 BE CAUTIOUS ON PUBLIC WI-FI                             ║
║     Avoid sensitive activities on unsecured networks        ║
║                                                              ║
║  ⚠️  WHEN IN DOUBT, ASK IT SECURITY!                        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
    `

    const blob = new Blob([posterContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "security-reminder-poster.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900">
      <FallingCodeBg />

      <Card className="w-full max-w-5xl mx-auto shadow-2xl border-0 bg-gray-800/95 backdrop-blur-md text-white">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <Lightbulb className="w-8 h-8 text-yellow-500 glow" />
            <CardTitle className="text-3xl font-bold text-white">Security Tips & Takeaways</CardTitle>
          </div>
          <p className="text-gray-400 text-lg">Key habits to keep your workplace secure</p>
        </CardHeader>

        <CardContent className="space-y-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {securityTips.map((tip, index) => {
              const IconComponent = tip.icon
              return (
                <div
                  key={index}
                  className={`p-6 rounded-lg border-l-4 bg-gradient-to-br from-${tip.color}-700 to-${tip.color}-900 border-${tip.color}-500 hover:shadow-lg transition-all duration-300 cyber-card`}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 bg-${tip.color}-600 rounded-full shadow-md`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-200 mb-2">{tip.title}</h3>
                      <p className="text-gray-400 text-sm">{tip.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-6 rounded-lg border border-blue-700 shadow-md">
            <h3 className="text-xl font-semibold text-blue-300 mb-4 text-center">Take These Resources With You</h3>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={downloadCheatSheet}
                variant="outline"
                className="flex items-center space-x-2 border-blue-500 text-blue-300 hover:bg-blue-800 bg-transparent"
              >
                <Download className="w-4 h-4" />
                <span>Download Cheat Sheet</span>
              </Button>

              <Button
                onClick={downloadPoster}
                variant="outline"
                className="flex items-center space-x-2 border-indigo-500 text-indigo-300 hover:bg-indigo-800 bg-transparent"
              >
                <Download className="w-4 h-4" />
                <span>Download Security Poster</span>
              </Button>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-green-900 to-emerald-900 p-6 rounded-lg border border-green-700 shadow-md">
            <h3 className="text-2xl font-bold text-green-300 mb-2">
              🎉 Thanks for working together to make your workplace safer!
            </h3>
            <p className="text-green-400 mb-4">
              Remember: Cybersecurity is a team effort. Every action you take helps protect everyone.
            </p>

            <Button
              onClick={onContinue}
              className="px-8 py-3 text-lg bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              See Your Team's Final Score
            </Button>
          </div>
        </CardContent>
      </Card>
      <style jsx>{`
        .glow {
          text-shadow: 0 0 8px rgba(255, 255, 0, 0.7);
        }

        .cyber-card {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  )
}
