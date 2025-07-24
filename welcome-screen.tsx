"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Lock, Network, Users, Zap, Code, Terminal, Sparkles, Gamepad2, Target } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import FallingCodeBg from "./falling-code-bg"

interface WelcomeScreenProps {
  onStart: (teamName: string, department: string) => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [teamName, setTeamName] = useState("")
  const [department, setDepartment] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const departments = [
    { value: "hr", label: "Human Resources", icon: "👥", color: "from-pink-500 to-rose-500" },
    { value: "it", label: "Information Technology", icon: "💻", color: "from-blue-500 to-cyan-500" },
    { value: "sales", label: "Sales & Business Development", icon: "📈", color: "from-green-500 to-emerald-500" },
    { value: "marketing", label: "Marketing & Communications", icon: "📢", color: "from-purple-500 to-violet-500" },
    { value: "finance", label: "Finance & Accounting", icon: "💰", color: "from-yellow-500 to-orange-500" },
    { value: "operations", label: "Operations & Management", icon: "⚙️", color: "from-indigo-500 to-blue-500" },
    { value: "general", label: "General/Mixed Departments", icon: "🏢", color: "from-gray-500 to-slate-500" },
  ]

  const handleStart = () => {
    if (teamName.trim() && department) {
      onStart(teamName.trim(), department)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <FallingCodeBg />

      {/* Animated background elements */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      <div className="absolute inset-0 hologram-effect opacity-10"></div>

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-xl float-animation"></div>
      <div
        className="absolute bottom-20 right-20 w-48 h-48 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl float-animation"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-xl float-animation"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
        <div
          className={`w-full max-w-6xl mx-auto transition-all duration-1000 ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {/* Hero Section */}
          <div className="text-center mb-12">
            {/* Logo and Brand */}
            <div className="flex items-center justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-full shadow-2xl">
                  <Shield className="w-16 h-16 text-white shield-glow" />
                </div>
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-4 mb-8">
              <h1 className="responsive-title font-black bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent neon-text">
                ShieldUp
              </h1>
              <div className="flex items-center justify-center space-x-2 text-xl md:text-2xl text-gray-300">
                <Gamepad2 className="w-6 h-6 text-blue-400" />
                <span className="font-semibold">Interactive Cybersecurity Training</span>
                <Target className="w-6 h-6 text-purple-400" />
              </div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="glass-morphism p-6 rounded-2xl cyber-border group hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Gamified Learning</h3>
                <p className="text-gray-400 text-sm">
                  Interactive scenarios and challenges that make cybersecurity training engaging and memorable
                </p>
              </div>

              <div className="glass-morphism p-6 rounded-2xl cyber-border group hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Team-Based</h3>
                <p className="text-gray-400 text-sm">
                  Build security awareness across your entire team with collaborative challenges and shared achievements
                </p>
              </div>

              <div className="glass-morphism p-6 rounded-2xl cyber-border group hover:scale-105 transition-all duration-300">
                <div className="bg-gradient-to-r from-purple-500 to-violet-500 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-12 transition-transform">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Real-World Scenarios</h3>
                <p className="text-gray-400 text-sm">
                  Practice with authentic cybersecurity challenges based on actual workplace threats
                </p>
              </div>
            </div>
          </div>

          {/* Main Form Card */}
          <Card className="glass-morphism border-0 shadow-2xl max-w-2xl mx-auto">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div
                    className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                  <div
                    className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                  ></div>
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-white mb-2">Initialize Security Protocol</CardTitle>
              <p className="text-gray-400">Configure your team settings to begin the cybersecurity training mission</p>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Team Name Input */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-sm font-medium text-blue-300">
                  <Terminal className="w-4 h-4" />
                  <span>Team Designation</span>
                </label>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Enter your team name (e.g., Cyber Guardians, Digital Defenders...)"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleStart()}
                    className="bg-black/20 border-blue-500/30 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400/20 pl-12 cursor-interactive"
                  />
                  <Code className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-400" />
                </div>
              </div>

              {/* Department Selection */}
              <div className="space-y-3">
                <label className="flex items-center space-x-2 text-sm font-medium text-purple-300">
                  <Network className="w-4 h-4" />
                  <span>Department Division</span>
                </label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger className="bg-black/20 border-purple-500/30 text-white focus:border-purple-400 focus:ring-purple-400/20 cursor-interactive">
                    <SelectValue placeholder="Select your operational department..." />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-purple-500/30">
                    {departments.map((dept) => (
                      <SelectItem key={dept.value} value={dept.value} className="text-white hover:bg-purple-500/20">
                        <div className="flex items-center space-x-3">
                          <span className="text-lg">{dept.icon}</span>
                          <span>{dept.label}</span>
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${dept.color}`}></div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Start Button */}
              <div className="pt-4">
                <Button
                  onClick={handleStart}
                  disabled={!teamName.trim() || !department}
                  className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:from-blue-700 hover:via-purple-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl relative overflow-hidden group cursor-interactive"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <div className="flex items-center space-x-3 relative z-10">
                    <Shield className="w-6 h-6" />
                    <span>Launch ShieldUp Training</span>
                    <Zap className="w-6 h-6" />
                  </div>
                </Button>
              </div>

              {/* Security Features */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-700/50">
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Lock className="w-4 h-4 text-green-400" />
                  <span>Secure Training Environment</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Shield className="w-4 h-4 text-blue-400" />
                  <span>Real-time Threat Simulation</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span>Team Progress Tracking</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <Target className="w-4 h-4 text-cyan-400" />
                  <span>Adaptive Difficulty</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bottom CTA */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-blue-500/20 px-6 py-3 rounded-full border border-green-500/30">
              <Sparkles className="w-5 h-5 text-green-400" />
              <span className="text-green-300 font-medium">Ready to become a cybersecurity champion?</span>
              <Sparkles className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
