"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export function AccessibilityMenu() {
  const [fontSize, setFontSize] = useState(16)
  const [highContrast, setHighContrast] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Set isMounted to true after component mounts
  useEffect(() => {
    setIsMounted(true)
  }, [])

  //Alt + 1
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Verifica se Alt + 1 foi pressionado
      if (e.altKey && e.key === '1') {
        e.preventDefault()
        const target = document.getElementById('conteudo')
        if (target) {
          target.focus()
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  //Alt + 2
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Verifica se Alt + 2 foi pressionado
      if (e.altKey && e.key === '2') {
        e.preventDefault()
        const target = document.getElementById('menu')
        if (target) {
          target.focus()
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])


//Alt + 3
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Verifica se Alt + 3 foi pressionado
      if (e.altKey && e.key === '3') {
        e.preventDefault()
        const target = document.getElementById('rodape')
        if (target) {
          target.focus()
          target.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  // Função para aumentar o tamanho da fonte
  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 2)
      document.documentElement.style.fontSize = `${fontSize + 2}px`
    }
  }

  // Função para diminuir o tamanho da fonte
  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2)
      document.documentElement.style.fontSize = `${fontSize - 2}px`
    }
  }

  // Função para alternar o contraste alto
  const toggleHighContrast = () => {
    setHighContrast(!highContrast)
    document.body.classList.toggle("high-contrast")
  }

  // If not mounted yet (during SSR), render a simplified version
  if (!isMounted) {
    return (
      <nav aria-label="Menu de acessibilidade" className="bg-gray-100 py-2 px-4 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="h-4 bg-gray-200 rounded w-48 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>
      </nav>
    )
  }

  return (
    <nav id="menu-acessibilidade" aria-label="Menu de acessibilidade" className="bg-gray-100 py-2 px-4 text-sm sticky top-0 z-50">
      <div className="container mx-auto flex flex-wrap justify-between items-center">
        <ul className="flex space-x-4">
          <li>
            <Link
              href="#conteudo"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-700"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("conteudo")?.focus()
                document.getElementById("conteudo")?.scrollIntoView({ behavior: "smooth" })
              }}
              tabIndex={1}
            >
              Ir para conteúdo [1]
            </Link>
          </li>
          <li>
            <Link
              href="#menu"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-700"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("menu")?.focus()
                document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
              }}
              tabIndex={1}
            >
              Ir para menu [2]
            </Link>
          </li>
          <li>
            <Link
              href="#rodape"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-700"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("rodape")?.focus()
                document.getElementById("rodape")?.scrollIntoView({ behavior: "smooth" })
              }}
              tabIndex={1}
            >
              Ir para rodapé [3]
            </Link>
          </li>
          {/*<li>
            <Link
              href="#acessibilidade"
              className="hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-700"
            >
              Ir à acessibilidade [4]
            </Link>
          </li>*/}
        </ul>

        <div className="flex items-center space-x-4">
          <button
            onClick={increaseFontSize}
            aria-label="Aumentar tamanho da fonte"
            className="focus:outline-none focus:ring-2 focus:ring-cyan-700"
            tabIndex={1}
          >
            A+ <span className="sr-only">Aumentar tamanho da fonte</span>
          </button>
          <button
            onClick={decreaseFontSize}
            aria-label="Diminuir tamanho da fonte"
            className="focus:outline-none focus:ring-2 focus:ring-cyan-700"
            tabIndex={1}
          >
            A- <span className="sr-only">Diminuir tamanho da fonte</span>
          </button>
          <button
            onClick={toggleHighContrast}
            aria-label="Alternar alto contraste"
            className="focus:outline-none focus:ring-2 focus:ring-cyan-700"
            tabIndex={1}
          >
            Alto contraste
          </button>
        </div>
      </div>
    </nav>
  )
}
