"use client"

import { useEffect, useState, useRef } from "react"

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isUnlocked, setIsUnlocked] = useState(false)
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })

      // Create trail effect
      createTrail(e.clientX, e.clientY)
    }

    const handleMouseDown = () => {
      setIsClicking(true)
      setIsUnlocked(true)

      // Reset unlock state after animation
      setTimeout(() => {
        setIsUnlocked(false)
      }, 500)
    }

    const handleMouseUp = () => {
      setIsClicking(false)
    }

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.classList.contains("cursor-interactive") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest(".cursor-interactive")
      ) {
        setIsHovering(true)
      }
    }

    const handleMouseLeave = (e: Event) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.classList.contains("cursor-interactive") ||
        target.closest("button") ||
        target.closest("input") ||
        target.closest("select") ||
        target.closest(".cursor-interactive")
      ) {
        setIsHovering(false)
      }
    }

    // Add event listeners
    document.addEventListener("mousemove", updateMousePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseover", handleMouseEnter)
    document.addEventListener("mouseout", handleMouseLeave)

    return () => {
      document.removeEventListener("mousemove", updateMousePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleMouseEnter)
      document.removeEventListener("mouseout", handleMouseLeave)
    }
  }, [])

  const createTrail = (x: number, y: number) => {
    const trail = document.createElement("div")
    trail.className = "cursor-trail"
    trail.style.left = `${x - 2}px`
    trail.style.top = `${y - 2}px`

    document.body.appendChild(trail)

    // Remove trail after animation
    setTimeout(() => {
      if (document.body.contains(trail)) {
        document.body.removeChild(trail)
      }
    }, 500)
  }

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor ${isHovering ? "magnetic-cursor" : ""}`}
      style={{
        left: `${mousePosition.x - 16}px`,
        top: `${mousePosition.y - 16}px`,
      }}
    >
      <div
        className={`cursor-lock ${isClicking ? "clicking" : ""} ${isHovering ? "hovering" : ""} ${
          isUnlocked ? "unlocked" : ""
        }`}
      />
    </div>
  )
}
