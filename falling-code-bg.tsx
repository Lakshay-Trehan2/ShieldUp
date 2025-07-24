"use client"

import { useEffect, useState } from "react"

interface CodeChar {
  id: number
  char: string
  x: number
  y: number
  speed: number
  opacity: number
  color: string
}

export default function FallingCodeBg() {
  const [codeChars, setCodeChars] = useState<CodeChar[]>([])

  const codeCharacters = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "{",
    "}",
    "[",
    "]",
    "(",
    ")",
    "<",
    ">",
    "/",
    "\\",
    "|",
    "-",
    "_",
    "=",
    "+",
    "*",
    "&",
    "%",
    "$",
    "#",
    "@",
    "!",
    "?",
    ".",
    ",",
    ";",
    ":",
    "'",
    '"',
    "`",
    "~",
    "^",
  ]

  const colors = [
    "rgba(14, 165, 233, 0.8)", // cyan
    "rgba(59, 130, 246, 0.7)", // blue
    "rgba(16, 185, 129, 0.6)", // green
    "rgba(139, 92, 246, 0.5)", // purple
    "rgba(236, 72, 153, 0.4)", // pink
  ]

  useEffect(() => {
    const createCodeChar = (id: number): CodeChar => ({
      id,
      char: codeCharacters[Math.floor(Math.random() * codeCharacters.length)],
      x: Math.random() * window.innerWidth,
      y: -20,
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
    })

    // Initialize with some characters
    const initialChars = Array.from({ length: 50 }, (_, i) => createCodeChar(i))
    setCodeChars(initialChars)

    let animationId: number
    let charId = 50

    const animate = () => {
      setCodeChars((prev) => {
        const updated = prev.map((char) => ({
          ...char,
          y: char.y + char.speed,
          opacity: char.y > window.innerHeight * 0.8 ? char.opacity * 0.98 : char.opacity,
        }))

        // Remove characters that are off screen
        const filtered = updated.filter((char) => char.y < window.innerHeight + 50 && char.opacity > 0.1)

        // Add new characters occasionally
        if (Math.random() < 0.3 && filtered.length < 80) {
          filtered.push(createCodeChar(charId++))
        }

        return filtered
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {codeChars.map((char) => (
        <div
          key={char.id}
          className="absolute font-mono text-sm font-bold select-none"
          style={{
            left: `${char.x}px`,
            top: `${char.y}px`,
            color: char.color,
            opacity: char.opacity,
            textShadow: `0 0 10px ${char.color}`,
            transform: `rotate(${Math.sin(char.y * 0.01) * 10}deg)`,
          }}
        >
          {char.char}
        </div>
      ))}
    </div>
  )
}
